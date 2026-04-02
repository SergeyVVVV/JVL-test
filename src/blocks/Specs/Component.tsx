interface SpecsProps {
  headline?: string
  groups?: Array<{
    label: string
    rows?: Array<{ label: string; value: string }>
  }>
}

export default function SpecsComponent({ headline, groups = [] }: SpecsProps) {
  return (
    <section className="bg-[#101213] py-24 px-6 md:px-12">
      <div className="container mx-auto max-w-4xl">
        {headline && (
          <h2 className="text-4xl font-semibold uppercase tracking-tight text-[#F4F3EC] mb-12">
            {headline}
          </h2>
        )}
        <div className="flex flex-col gap-10">
          {groups.map((group, i) => (
            <div key={i}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-[#059FFF] mb-4">
                {group.label}
              </h3>
              <div className="border border-[#4B4B4B] divide-y divide-[#4B4B4B]">
                {group.rows?.map((row, j) => (
                  <div key={j} className="grid grid-cols-2 px-6 py-4 hover:bg-[#181818] transition-colors duration-150">
                    <span className="text-sm font-light text-[#787878]">{row.label}</span>
                    <span className="text-sm font-medium text-[#F4F3EC]">{row.value}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
