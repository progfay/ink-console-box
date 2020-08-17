import React, { useState, useRef, useEffect, useCallback } from 'react'
import { Box, useApp } from 'ink'
import { Console } from 'console'
import { Line } from './Line'
import { ConsoleStream } from './ConsoleStream'

import type { BoxProps } from 'ink'

export type Func = (console: Console) => (void | Promise<void>)

export interface ConsoleBoxProps extends BoxProps {
  func: Func
  onSuccess?: () => void
  onFailed?: (e: Error) => void
  showLineNumber?: boolean
}

export const ConsoleBox: React.FC<ConsoleBoxProps> = ({ func, onSuccess, onFailed, showLineNumber = true, ...boxProps }) => {
  const [lines, setLines] = useState<string[]>([])
  const { exit } = useApp()

  const handler = useCallback((line) => {
    setLines(previous => [...previous, line])
  }, [])

  const consoleRef = useRef<Console>(new Console({
    stdout: new ConsoleStream(handler),
    stderr: new ConsoleStream(handler),
    colorMode: true
  }))

  useEffect(() => {
    const run = async (func: Func): Promise<void> => {
      try {
        await func(consoleRef.current)
        onSuccess?.()
      } catch (e) {
        consoleRef.current.error(e.toString())
        onFailed?.(e as Error)
      }
    }

    run(func)
      .catch(exit)
  }, [])

  const maxLineNumberDigitLength = lines.length.toString().length

  return (
    <Box flexDirection='column' {...boxProps}>
      {
        lines.map((line, i) => (
          <Line
            key={`line-${i}`}
            lineNumber={showLineNumber
              ? (i + 1).toString().padStart(maxLineNumberDigitLength, ' ')
              : undefined}
            text={line}
          />
        ))
      }
    </Box>
  )
}
