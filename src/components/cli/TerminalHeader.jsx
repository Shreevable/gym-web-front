import { BRAND_TAGLINE, BRAND_TITLE, CLI_SYSTEM } from '../../content/cli'

function SysCell({ label, value, accent = false, status = false }) {
  return (
    <span className="whitespace-nowrap">
      <span className="text-neutral-500">{label}</span>{' '}
      <span
        className={
          status
            ? 'text-cli-status'
            : accent
              ? 'text-cli-accent'
              : 'text-neutral-300'
        }
      >
        {value}
      </span>
    </span>
  )
}

export default function TerminalHeader({ uptime }) {
  return (
    <header className="border-b border-cli-border px-4 py-3 font-mono text-[0.68rem] leading-relaxed md:px-5 md:text-xs">
      <div className="flex flex-col gap-2 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <SysCell label="SYS.NAME" value={`${CLI_SYSTEM.name} ${CLI_SYSTEM.version}`} />
          <SysCell label="SYS.AUTH" value={CLI_SYSTEM.auth} accent />
          <SysCell label="SYS.NODE" value={CLI_SYSTEM.node} />
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-1">
          <SysCell label="UPTIME" value={uptime} />
          <SysCell label="TERMINAL" value="TTY0" />
          <SysCell label="STATUS" value="200" status />
        </div>
      </div>
    </header>
  )
}

export function TerminalLogo() {
  return (
    <div className="space-y-2">
      <p className="font-mono text-[0.65rem] text-neutral-600">$ cat /etc/brand.txt</p>
      <h1 className="font-mono text-3xl font-semibold tracking-[0.38em] text-cli-accent md:text-4xl">
        {BRAND_TITLE}
      </h1>
      <p className="font-mono text-sm text-neutral-400">{BRAND_TAGLINE}</p>
    </div>
  )
}

export function TerminalStatusBadge() {
  return (
    <div className="inline-flex items-center gap-2 border border-cli-accent/40 px-3 py-1.5 font-mono text-xs text-cli-accent">
      <span aria-hidden className="inline-block h-2 w-2 rounded-full bg-cli-accent animate-pulse" />
      RLaaS ONLINE — POST-TRAINING INFRASTRUCTURE ACTIVE
    </div>
  )
}
