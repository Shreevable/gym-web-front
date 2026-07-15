import { useEffect, useRef } from 'react'
import useTerminal from '../../hooks/useTerminal'
import TerminalActions from './TerminalActions'
import TerminalHeader, { TerminalLogo, TerminalStatusBadge } from './TerminalHeader'
import TerminalOutput from './TerminalOutput'
import ModuleSelector, { TerminalPrompt } from './TerminalInput'

export default function TerminalApp() {
  const outputRef = useRef(null)
  const inputRef = useRef(null)
  const {
    lines,
    input,
    setInput,
    submitInput,
    activeModuleIndex,
    navigateModule,
    selectModule,
    recallHistory,
    uptime,
  } = useTerminal()

  useEffect(() => {
    const node = outputRef.current
    if (!node) return
    node.scrollTop = node.scrollHeight
  }, [lines])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleKeyDown = (event) => {
    if (event.key === 'ArrowUp') {
      event.preventDefault()
      if (event.altKey) {
        navigateModule('up')
        return
      }
      recallHistory('up')
      return
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      if (event.altKey) {
        navigateModule('down')
        return
      }
      recallHistory('down')
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-black p-3 md:p-6">
      <div className="terminal-window flex h-[min(920px,100svh-1.5rem)] w-full max-w-5xl flex-col overflow-hidden">
        <div className="flex items-center gap-2 border-b border-cli-border px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" aria-hidden />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" aria-hidden />
          <span className="ml-3 font-mono text-xs text-neutral-500">
            wedecode — ~/rlaas
          </span>
          <div className="ml-auto">
            <TerminalActions />
          </div>
        </div>

        <TerminalHeader uptime={uptime} />

        <div className="border-b border-cli-border px-4 py-4 md:px-5">
          <TerminalLogo />
          <div className="mt-4">
            <TerminalStatusBadge />
          </div>
        </div>

        <TerminalOutput lines={lines} outputRef={outputRef} />

        <ModuleSelector activeIndex={activeModuleIndex} onSelect={selectModule} />
        <TerminalPrompt
          input={input}
          onChange={setInput}
          onSubmit={submitInput}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
        />
      </div>
    </div>
  )
}
