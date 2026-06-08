const inputClasses =
  'w-full rounded-lg border border-neutral-600 bg-neutral-900 px-3 py-2 text-neutral-100 placeholder:text-neutral-400'

export function TextInput(props) {
  return <input {...props} className={inputClasses} />
}

export function TextArea(props) {
  return <textarea {...props} className={inputClasses} />
}

export function SelectInput(props) {
  return <select {...props} className={inputClasses} />
}

export function SubmitButton({ children }) {
  return (
    <button
      type="submit"
      className="type-display-tight mt-1 rounded-full border border-neutral-400 bg-neutral-100 px-4 py-2.5 text-sm font-semibold tracking-wide text-neutral-900 transition hover:bg-white"
    >
      {children}
    </button>
  )
}
