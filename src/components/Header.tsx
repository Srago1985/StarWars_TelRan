import { ChangePageContext } from "../utils/context.ts";
import Navigation from "./Navigation.tsx";

interface HeaderProps {
    changePage: (page: string) => void;
}

const Header = ({changePage}: HeaderProps) => {
    return (
        <header className="rounded-t-3xl bg-gray mb-3">
            <ChangePageContext value={{changePage}}>
                <Navigation />
            </ChangePageContext>
            <h1 className="text-center text-4xl py-6">Luke Skywalker</h1>
        </header>
    )
}

export default Header;