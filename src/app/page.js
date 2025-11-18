import HeroSection from "@/components/HeroSection/HeroSection";
import Category from "@/components/Category/Category";
import SpecialOffer from "@/components/SpecialOffer/SpecialOffer";
import StoreBenefits from "@/components/StoreBenefits/StoreBenefits";
import BestSellersContainer from "@/components/Bestseller/BestSellersContainer";
import Readables from "@/components/Readables/Readables";

export default function Home() {
  return (
    <main className="min-h-screen bg-surface-base text-text-primary font-vazirmatn p-4">
      <section id="hero" className="-mt-4">
        <HeroSection />
      </section>

      <section id="categories" className="">
        <Category />
      </section>

      <section id="bestseller">
        <BestSellersContainer />
      </section>

      <section id="special-offer">
        <SpecialOffer />
      </section>

      <section id="readables">
        <Readables />
      </section>

      <section id="store-benefits">
        <StoreBenefits />
      </section>
    </main>
  );
}
