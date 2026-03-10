import Home from "./Home.tsx";
import AboutMe from "./AboutMe.tsx";
import Contact from "./Contact.tsx";
import StarWars from "./StarWars.tsx";
import {navItems} from "../utils/constants.ts";
import { Routes, Route, Navigate } from "react-router";
import ErrorPage from "./ErrorPage.tsx";



const Main = () => {

    return (
        <Routes>
            <Route path = "/" element={<Home />} />
            <Route path = { `/${navItems[0]}` } element={<Home />} />
            <Route path = { `/${navItems[1]}` } element={<Navigate to={`/${navItems[1]}/luke`} replace />} />
            <Route path = { `/${navItems[1]}/:heroID` } element={<AboutMe />} />
            <Route path = { `/${navItems[2]}` } element={<StarWars />} />
            <Route path = { `/${navItems[3]}` } element={<Contact />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    )
}

export default Main;