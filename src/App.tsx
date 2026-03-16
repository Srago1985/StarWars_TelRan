
import Header from "./components/Header.tsx";
import Main from "./components/Main.tsx";
import Footer from "./components/Footer.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import { useCurrentHero } from "./hooks/useCurrentHero.ts";


function App() {
    const { invalidHero } = useCurrentHero();

    if (invalidHero) {
        return <ErrorPage />;
    }

    return (
        <div className={'mx-2'}>
            <Header />
            <Main />
            <Footer/>
        </div>
    )
}

export default App
