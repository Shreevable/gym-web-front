import { CALENDLY_SCHEDULE_URL } from '../../constants/links'

function OutputLine({ line }) {
  if (line.type === 'command') {
    return (
      <div className="font-mono text-sm">
        <span className="text-cli-accent">$</span>{' '}
        <span className="text-neutral-100">{line.text}</span>
      </div>
    )
  }

  if (line.type === 'system') {
    return <p className="font-mono text-xs text-neutral-500">{line.text}</p>
  }

  if (line.type === 'error') {
    return <p className="font-mono text-sm text-red-400">{line.text}</p>
  }

  return (
    <div className="space-y-2">
      {line.title ? (
        <p className="font-mono text-sm font-semibold text-white">{line.title}</p>
      ) : null}
      <pre className="overflow-x-auto whitespace-pre-wrap font-mono text-sm leading-relaxed text-neutral-300">
        {line.text}
      </pre>
      {line.action?.type === 'link' ? (
        <a
          href={line.action.href}
          target={line.action.href.startsWith('http') ? '_blank' : undefined}
          rel={line.action.href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-block font-mono text-sm text-cli-accent underline underline-offset-4 hover:text-cli-accent/80"
        >
          → {line.action.label}
        </a>
      ) : null}
    </div>
  )
}

export default function TerminalOutput({ lines, outputRef }) {
  return (
    <div
      ref={outputRef}
      className="terminal-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5 md:px-5"
    >
      <div className="space-y-5">
        {lines.map((line, index) => (
          <OutputLine key={`${line.type}-${index}-${line.text?.slice(0, 24) ?? index}`} line={line} />
        ))}
      </div>
      <div className="mt-6 font-mono text-xs text-neutral-600">
        TIP: ↑↓ command history · Alt+↑↓ switch modules · type `help`
      </div>
    </div>
  )
}
