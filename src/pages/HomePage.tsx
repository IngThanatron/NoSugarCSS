import { HeroSection } from '@/components/hero/HeroSection'
import { PricingSection } from '@/components/pricing/PricingSection'
import { DemoSection } from '@/components/demo/DemoSection'

export function HomePage() {
  return (
    <main>
      <HeroSection />
      <PricingSection />
      <DemoSection />
    </main>
  )
}
