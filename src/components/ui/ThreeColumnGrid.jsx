export default function ThreeColumnGrid({ children, className = '' }) {
  return (
    <div className={`mt-4 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5 ${className}`}>
      {children}
    </div>
  )
}
