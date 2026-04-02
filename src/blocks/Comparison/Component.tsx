interface ComparisonFeature {
  label: string
  value?: string
  included?: boolean
}

interface ComparisonProduct {
  name: string
  mediaUrl?: string
  features?: ComparisonFeature[]
}

interface ComparisonProps {
  headline?: string
  subheadline?: string
  products?: ComparisonProduct[]
}

export default function ComparisonComponent({ headline, subheadline, products = [] }: ComparisonProps) {
  // Collect all unique feature labels across all products
  const allFeatureLabels = Array.from(
    new Set(products.flatMap(p => (p.features || []).map(f => f.label)))
  )

  return (
    <section className="bg-[#101213] py-24 px-6 md:px-12">
      <div className="container mx-auto max-w-5xl">
        {(headline || subheadline) && (
          <div className="text-center mb-16">
            {headline && (
              <h2 className="text-4xl md:text-5xl font-semibold uppercase tracking-tight text-[#F4F3EC] mb-4">
                {headline}
              </h2>
            )}
            {subheadline && (
              <p className="text-base font-light text-[#787878] max-w-xl mx-auto">{subheadline}</p>
            )}
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-[#4B4B4B]">
            <thead>
              <tr className="border-b border-[#4B4B4B]">
                <th className="text-left px-6 py-4 text-xs font-semibold uppercase tracking-widest text-[#787878] bg-[#181818]" />
                {products.map((product, i) => (
                  <th key={i} className="px-6 py-4 bg-[#181818] border-l border-[#4B4B4B]">
                    {product.mediaUrl && (
                      <img src={product.mediaUrl} alt={product.name} className="h-16 object-contain mx-auto mb-3" />
                    )}
                    <span className="block text-sm font-semibold uppercase tracking-wide text-[#F4F3EC]">
                      {product.name}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#4B4B4B]">
              {allFeatureLabels.map((featureLabel, ri) => (
                <tr key={ri} className="hover:bg-[#181818] transition-colors">
                  <td className="px-6 py-4 text-sm font-light text-[#787878]">{featureLabel}</td>
                  {products.map((product, pi) => {
                    const feature = product.features?.find(f => f.label === featureLabel)
                    return (
                      <td key={pi} className="px-6 py-4 text-center border-l border-[#4B4B4B]">
                        {feature ? (
                          feature.value ? (
                            <span className="text-sm font-medium text-[#F4F3EC]">{feature.value}</span>
                          ) : feature.included ? (
                            <span className="text-[#059FFF] text-lg">✓</span>
                          ) : (
                            <span className="text-[#4B4B4B] text-lg">—</span>
                          )
                        ) : (
                          <span className="text-[#4B4B4B] text-lg">—</span>
                        )}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
