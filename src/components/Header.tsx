import { ChangePageContext } from "../utils/context.ts";
import Navigation from "./Navigation.tsx";
import { useLocation } from "react-router";
import { characters } from "../utils/constants.ts";

interface HeaderProps {
  changePage: (page: string) => void;
}

type HeroID = keyof typeof characters;

const isHeroID = (value: string): value is HeroID => value in characters;

const Header = ({ changePage }: HeaderProps) => {
  const { pathname } = useLocation();
  const decodedPath = decodeURIComponent(pathname).toLowerCase();
  const heroIDFromUrl = decodedPath.split("/")[2] ?? "";

  const isAboutMeRoute = decodedPath.startsWith("/about me/");
  const title = isAboutMeRoute && isHeroID(heroIDFromUrl)
    ? characters[heroIDFromUrl].name
    : "Luke Skywalker";

  return (
    <header className="rounded-t-3xl bg-gray mb-3">
      <ChangePageContext value={{ changePage }}>
        <Navigation />
      </ChangePageContext>
      <h1 className="text-center text-4xl py-6">{title}</h1>
    </header>
  );
};

export default Header;