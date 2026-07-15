import { CLI_MODULES, CLI_SYSTEM } from '../../content/cli'

export default function ModuleSelector({ activeIndex, onSelect }) {
  return (
    <div className="border-t border-cli-border px-4 py-3 font-mono text-xs md:px-5">
      <p className="mb-2 text-neutral-500">
        root@wedecode/nav &gt; SELECT MODULE [↑↓ arrows · ENTER or click]
      </p>
      <div className="flex flex-wrap gap-2">
        {CLI_MODULES.map((module, index) => {
          const active = index === activeIndex
          return (
            <button
              key={module.id}
              type="button"
              onClick={() => onSelect(index)}
              className={`rounded-sm px-2.5 py-1 transition-colors ${
                active
                  ? 'bg-cli-accent text-black'
                  : 'border border-cli-border text-neutral-400 hover:border-neutral-500 hover:text-neutral-200'
              }`}
            >
              {active ? '>' : ' '} {module.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function TerminalPrompt({ input, onChange, onSubmit, onKeyDown, inputRef }) {
  return (
    <form
      className="border-t border-cli-border px-4 py-3 md:px-5"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit()
      }}
    >
      <label className="flex items-center gap-2 font-mono text-sm">
        <span className="shrink-0 text-cli-accent">
          {CLI_SYSTEM.prompt}:{CLI_SYSTEM.cwd}$
        </span>
        <input
          ref={inputRef}
          value={input}
          onChange={(event) => onChange(event.target.value)}
          onKeyDown={onKeyDown}
          className="min-w-0 flex-1 bg-transparent text-neutral-100 outline-none placeholder:text-neutral-600"
          placeholder="type a command (try: help)"
          spellCheck={false}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        />
      </label>
    </form>
  )
}
