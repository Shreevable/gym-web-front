export default function WeDecodeLogo({ className = '', showWordmark = true }) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <img
        src="/logo.png"
        alt=""
        width={36}
        height={36}
        className="h-8 w-8 shrink-0 object-contain lg:h-9 lg:w-9"
        decoding="async"
      />
      {showWordmark ? (
        <span className="type-display-tight text-xl font-semibold text-white lg:text-2xl">
          WeDecode.io
        </span>
      ) : null}
    </span>
  )
}
