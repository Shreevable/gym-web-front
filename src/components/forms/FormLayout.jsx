export default function FormLayout({ form, aside }) {
  return (
    <section className="mb-4 grid grid-cols-1 gap-4 rounded-2xl bg-[#040404] p-5 md:grid-cols-[3fr_2fr]">
      {form}
      {aside}
    </section>
  )
}
