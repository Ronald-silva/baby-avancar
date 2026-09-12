import { Hero } from "@/shared/ui/hero";
import { MarketingHeader } from "@/shared/ui/marketing-header";

export default function HomePage() {
  return (
    <>
      <MarketingHeader />
      <main>
        <Hero />
      </main>
    </>
  );
}
