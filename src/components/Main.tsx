import Home from "./Home.tsx";
import AboutMe from "./AboutMe.tsx";
import Contact from "./Contact.tsx";
import StarWars from "./StarWars.tsx";
import {appRoutes} from "../utils/constants.ts";
import { Routes, Route } from "react-router";
import ErrorPage from "./ErrorPage.tsx";


const Main = () => {
    return (
        <Routes>
            <Route path = "/" element={<Home />} />
            <Route path = { appRoutes.home } element={<Home />} />
            <Route path = { appRoutes.aboutMe } element={<AboutMe />} />
            <Route path = { appRoutes.starWars } element={<StarWars />} />
            <Route path = { appRoutes.contact } element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Main;