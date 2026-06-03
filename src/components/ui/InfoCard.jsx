export default function InfoCard({ title, children, className = '' }) {
  return (
    <article className={`rounded-xl bg-[#040404] p-4 ${className}`}>
      {title ? <h3 className="mb-2 text-xl font-medium text-white">{title}</h3> : null}
      <div className="space-y-2">{children}</div>
    </article>
  )
}
