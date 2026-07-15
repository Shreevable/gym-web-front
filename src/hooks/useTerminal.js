import { useCallback, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  CALENDLY_SCHEDULE_URL,
  LINKEDIN_COMPANY_URL,
  SCHEDULE_CALL_LABEL,
} from '../constants/links'
import {
  CLI_FILES,
  CLI_MODULES,
  getFileContent,
  getHelpText,
  getModuleContent,
  getWhoamiText,
} from '../content/cli'
import { footerEmail } from '../content/footer'

function createBootLines(moduleId = 'home') {
  const resolved = moduleIndexFromId(moduleId) >= 0 ? moduleId : 'home'
  const content = getModuleContent(resolved)
  return [
    { type: 'system', text: 'Session initialized. Type `help` for commands.' },
    { type: 'output', text: content.lines.join('\n'), title: content.title },
  ]
}

function moduleIndexFromId(id) {
  return CLI_MODULES.findIndex((module) => module.id === id)
}

function moduleIdFromInput(input) {
  const trimmed = input.trim().toLowerCase()
  const byNumber = Number.parseInt(trimmed, 10)
  if (byNumber >= 1 && byNumber <= CLI_MODULES.length) {
    return CLI_MODULES[byNumber - 1].id
  }
  const byCommand = CLI_MODULES.find((module) => module.command === trimmed)
  return byCommand?.id ?? null
}

export default function useTerminal() {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialModule = searchParams.get('m') ?? 'home'
  const initialIndex = Math.max(0, moduleIndexFromId(initialModule))

  const [activeModuleIndex, setActiveModuleIndex] = useState(
    initialIndex >= 0 ? initialIndex : 0
  )
  const [lines, setLines] = useState(() => createBootLines(initialModule))
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([])
  const [historyIndex, setHistoryIndex] = useState(-1)

  const activeModule = CLI_MODULES[activeModuleIndex]

  const appendLines = useCallback((nextLines) => {
    setLines((prev) => [...prev, ...nextLines])
  }, [])

  const loadModule = useCallback(
    (moduleId, { echoCommand = null, silent = false } = {}) => {
      const index = moduleIndexFromId(moduleId)
      if (index < 0) return false

      setActiveModuleIndex(index)
      setSearchParams(moduleId === 'home' ? {} : { m: moduleId }, { replace: true })

      if (!silent) {
        const content = getModuleContent(moduleId)
        const entries = []

        if (echoCommand) {
          entries.push({ type: 'command', text: echoCommand })
        }

        entries.push({ type: 'output', text: content.lines.join('\n'), title: content.title })
        appendLines(entries)
      }

      return true
    },
    [appendLines, setSearchParams]
  )

  const clearTerminal = useCallback(() => {
    setLines([{ type: 'system', text: 'Terminal cleared.' }])
  }, [])

  const runCommand = useCallback(
    (rawInput) => {
      const trimmed = rawInput.trim()
      if (!trimmed) return

      setHistory((prev) => [trimmed, ...prev].slice(0, 50))
      setHistoryIndex(-1)

      const lower = trimmed.toLowerCase()
      const parts = lower.split(/\s+/)
      const command = parts[0]

      if (command === 'clear') {
        appendLines([{ type: 'command', text: trimmed }])
        clearTerminal()
        return
      }

      if (command === 'help') {
        appendLines([
          { type: 'command', text: trimmed },
          { type: 'output', text: getHelpText() },
        ])
        return
      }

      if (command === 'whoami') {
        appendLines([
          { type: 'command', text: trimmed },
          { type: 'output', text: getWhoamiText() },
        ])
        return
      }

      if (command === 'ls') {
        appendLines([
          { type: 'command', text: trimmed },
          { type: 'output', text: CLI_FILES.map((file) => `  ${file}`).join('\n') },
        ])
        return
      }

      if (command === 'cat') {
        const filename = parts[1]
        if (!filename) {
          appendLines([
            { type: 'command', text: trimmed },
            { type: 'error', text: 'Usage: cat <file>  (try: ls)' },
          ])
          return
        }

        const content = getFileContent(filename)
        if (!content) {
          appendLines([
            { type: 'command', text: trimmed },
            { type: 'error', text: `cat: ${filename}: No such file` },
          ])
          return
        }

        appendLines([
          { type: 'command', text: trimmed },
          { type: 'output', text: content },
        ])
        return
      }

      if (command === 'schedule' || command === 'book') {
        appendLines([
          { type: 'command', text: trimmed },
          {
            type: 'output',
            text: `Opening ${SCHEDULE_CALL_LABEL}...\n${CALENDLY_SCHEDULE_URL}`,
            action: { type: 'link', href: CALENDLY_SCHEDULE_URL, label: SCHEDULE_CALL_LABEL },
          },
        ])
        window.open(CALENDLY_SCHEDULE_URL, '_blank', 'noopener,noreferrer')
        return
      }

      if (command === 'email') {
        appendLines([
          { type: 'command', text: trimmed },
          {
            type: 'output',
            text: footerEmail,
            action: { type: 'link', href: `mailto:${footerEmail}`, label: footerEmail },
          },
        ])
        return
      }

      if (command === 'linkedin') {
        appendLines([
          { type: 'command', text: trimmed },
          {
            type: 'output',
            text: LINKEDIN_COMPANY_URL,
            action: { type: 'link', href: LINKEDIN_COMPANY_URL, label: 'LinkedIn' },
          },
        ])
        return
      }

      const moduleId = moduleIdFromInput(trimmed)
      if (moduleId) {
        loadModule(moduleId, { echoCommand: trimmed })
        return
      }

      appendLines([
        { type: 'command', text: trimmed },
        {
          type: 'error',
          text: `Command not found: ${trimmed}. Type \`help\` for available commands.`,
        },
      ])
    },
    [appendLines, clearTerminal, loadModule]
  )

  const submitInput = useCallback(() => {
    runCommand(input)
    setInput('')
  }, [input, runCommand])

  const selectModule = useCallback(
    (index) => {
      setActiveModuleIndex(index)
      loadModule(CLI_MODULES[index].id, { echoCommand: CLI_MODULES[index].command })
    },
    [loadModule]
  )

  const navigateModule = useCallback(
    (direction) => {
      const next =
        direction === 'up'
          ? (activeModuleIndex - 1 + CLI_MODULES.length) % CLI_MODULES.length
          : (activeModuleIndex + 1) % CLI_MODULES.length
      selectModule(next)
    },
    [activeModuleIndex, selectModule]
  )

  const recallHistory = useCallback(
    (direction) => {
      if (history.length === 0) return

      setHistoryIndex((prev) => {
        const nextIndex =
          direction === 'up'
            ? Math.min(prev + 1, history.length - 1)
            : Math.max(prev - 1, -1)
        setInput(nextIndex === -1 ? '' : history[nextIndex])
        return nextIndex
      })
    },
    [history]
  )

  const uptime = useMemo(() => {
    const start = performance.timeOrigin
    const elapsed = Date.now() - start
    const hours = Math.floor(elapsed / 3_600_000)
    const minutes = Math.floor((elapsed % 3_600_000) / 60_000)
    return `${hours}h ${String(minutes).padStart(2, '0')}m`
  }, [])

  return {
    lines,
    input,
    setInput,
    submitInput,
    runCommand,
    activeModuleIndex,
    activeModule,
    navigateModule,
    selectModule,
    recallHistory,
    uptime,
  }
}
