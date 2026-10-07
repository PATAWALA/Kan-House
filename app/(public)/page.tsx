import Hero from "@/components/home/Hero";
import ReassuranceBanner from "@/components/home/ReassuranceBanner";
import OurCollection from "@/components/home/OurCollection";
import BespokeSolutions from "@/components/home/BespokeSolutions";
import MoreThanFurniture from "@/components/home/MoreThanFurniture";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ReassuranceBanner />
      <OurCollection />
      <BespokeSolutions />
      <MoreThanFurniture />
    </>
  );
}