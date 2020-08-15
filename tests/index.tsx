import React from 'react'
import { render } from 'ink-testing-library'
import { ConsoleBox } from '../lib'

import type { Func } from '../lib'

const test = async (): Promise<void> => {
  let callback: () => void = () => {}
  const end = new Promise(resolve => { callback = resolve })

  const func: Func = console => {
    console.log(12345)
  }

  const { lastFrame } = render(<ConsoleBox func={func} onSuccess={callback} onFailed={callback} />)

  await end
  console.log(lastFrame())
}

test()
  .catch(console.error)
