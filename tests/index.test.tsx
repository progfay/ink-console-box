import React from 'react'
import { render } from 'ink-testing-library'
import { ConsoleBox } from '../lib'

const waitCall = (): { callback: () => void, called: Promise<void> } => {
  let callback: () => void = () => {}
  const called: Promise<void> = new Promise(resolve => { callback = resolve })
  return { callback, called }
}

describe('<ConsoleBox>', () => {
  it('Single line', async () => {
    const { callback, called } = waitCall()

    const { lastFrame } = render(
      <ConsoleBox
        func={console => {
          console.log(12345)
        }}
        onSuccess={callback}
        onFailed={callback}
      />
    )

    await called
    expect(lastFrame()).toMatchSnapshot()
  })

  it('Multi line', async () => {
    const { callback, called } = waitCall()

    const { lastFrame } = render(
      <ConsoleBox
        func={console => {
          console.log(12345)
          console.log(12345)
        }}
        onSuccess={callback}
        onFailed={callback}
      />
    )

    await called
    expect(lastFrame()).toMatchSnapshot()
  })

  it('Error', async () => {
    const { callback, called } = waitCall()

    const handlers = {
      handleSuccess: () => {
        callback()
      },
      handleFailed: () => {
        callback()
      }
    }
    const onSuccess = jest.spyOn(handlers, 'handleSuccess')
    const onFailed = jest.spyOn(handlers, 'handleFailed')

    const { lastFrame } = render(
      <ConsoleBox
        func={() => {
          throw Error('error!')
        }}
        onSuccess={handlers.handleSuccess}
        onFailed={handlers.handleFailed}
      />
    )

    await called
    expect(lastFrame()).toMatchSnapshot()
    expect(onSuccess).not.toHaveBeenCalled()
    expect(onFailed).toHaveBeenCalled()
  })
})
