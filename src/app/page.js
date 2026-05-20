import Hero from "./components/Hero";
import Card from "./components/PetCard";
import WhyAdopt from "./components/WhyAdopt";
import SuccessStories from "./components/SuccessStories";
import PetCareTips from "./components/PetCareTips";
import AllPets from "./components/ALlPets";

export default function Home() {
  return (
    <>
    <Hero />
    <AllPets />
    <SuccessStories />
    <WhyAdopt />
    <PetCareTips />
    </>
  );
}
