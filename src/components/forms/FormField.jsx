export default function FormField({ label, children }) {
  return (
    <label className="grid gap-1.5 text-sm text-neutral-200">
      <span>{label}</span>
      {children}
    </label>
  )
}
