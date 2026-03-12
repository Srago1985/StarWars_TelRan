import Navigation from "./Navigation.tsx";
import { useCurrentHero } from "../hooks/useCurrentHero.ts";

const Header = () => {
  const { hero } = useCurrentHero();

  return (
    <header className="rounded-t-3xl bg-gray mb-3">
      <Navigation />
      <h1 className="text-center text-4xl py-6">{hero.name}</h1>
    </header>
  );
};

export default Header;