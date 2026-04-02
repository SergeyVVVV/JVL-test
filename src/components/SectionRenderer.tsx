import HeroComponent from '@/blocks/Hero/Component'
import MediaCopyComponent from '@/blocks/MediaCopy/Component'
import SplitSectionComponent from '@/blocks/SplitSection/Component'
import FeatureGridComponent from '@/blocks/FeatureGrid/Component'
import ProductCardsComponent from '@/blocks/ProductCards/Component'
import SpecsComponent from '@/blocks/Specs/Component'
import FAQComponent from '@/blocks/FAQ/Component'
import CTAComponent from '@/blocks/CTA/Component'
import TrustComponent from '@/blocks/Trust/Component'
import GalleryComponent from '@/blocks/Gallery/Component'
import ComparisonComponent from '@/blocks/Comparison/Component'
import RichContentComponent from '@/blocks/RichContent/Component'

const blockComponents: Record<string, React.ComponentType<any>> = {
  hero: HeroComponent,
  'media-copy': MediaCopyComponent,
  'split-section': SplitSectionComponent,
  'feature-grid': FeatureGridComponent,
  'product-cards': ProductCardsComponent,
  specs: SpecsComponent,
  faq: FAQComponent,
  cta: CTAComponent,
  trust: TrustComponent,
  gallery: GalleryComponent,
  comparison: ComparisonComponent,
  'rich-content': RichContentComponent,
}

export default function SectionRenderer({ section }: { section: { blockType: string } & Record<string, any> }) {
  const Component = blockComponents[section.blockType]
  if (!Component) return null
  return <Component {...section} />
}
