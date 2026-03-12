import friend0 from '../assets/main.jpg'
import friend1 from '../assets/friend1.jpg'
import friend2 from '../assets/friend2.jpg'
import friend3 from '../assets/friend3.jpg'
import friend4 from '../assets/friend4.jpg'
import friend5 from '../assets/friend5.jpg'
import friend6 from '../assets/friend6.jpg'
import friend7 from '../assets/friend7.jpg'
import friend8 from '../assets/friend8.jpg'
import friend9 from '../assets/friend9.jpg'

export const base_url: string = `https://sw-info-api.herokuapp.com`
export const appRoutes = {
    home: '/home',
    aboutMe: '/about me',
    starWars: '/star wars',
    contact: '/contact'
} as const;
export const heroQueryParam = 'hero';

export const navItems = [
    { label: 'Home', to: appRoutes.home },
    { label: 'About me', to: appRoutes.aboutMe },
    { label: 'Star Wars', to: appRoutes.starWars },
    { label: 'Contact', to: appRoutes.contact }
] as const;
export const version = '/v1';
export const characters = {
    luke: {
        name: "Luke Skywalker",
        img: friend0,
        url: `${base_url+version}/peoples/1`
    },
    c3po:{
        name: "C-3PO",
        img: friend2,
        url: `${base_url+version}/peoples/2`
    },
    r2d2:{
        name: "R2-D2",
        img: friend1,
        url: `${base_url+version}/peoples/3`
    },
    leia:{
        name: "Leia Organa",
        img: friend9,
        url: `${base_url+version}/peoples/5`
    },
    obi_wan:{
        name: "Obi-Wan Kenobi",
        img: friend8,
        url: `${base_url+version}/peoples/10`
    },
    chewbacca:{
        name: "Chewbacca",
        img: friend4,
        url: `${base_url+version}/peoples/13`
    },
    han_solo:{
        name: "Han Solo",
        img: friend5,
        url: `${base_url+version}/peoples/14`
    },
    yoda:{
        name: "Yoda",
        img: friend6,
        url: `${base_url+version}/peoples/0`
    },
    ewok:{
        name: "Wicket Systri Warrick",
        img: friend3,
        url: `${base_url+version}/peoples/30`
    },
    falcon:{
        name: "Millennium Falcon",
        img: friend7,
        url: `${base_url+version}/transports/10`
    }
} as const;

export type HeroID = keyof typeof characters;

export const defaultHeroID: HeroID = 'luke';
export const defaultHero = characters[defaultHeroID];

export const isHeroID = (value: string): value is HeroID => value in characters;

export const friends: HeroID[] = [defaultHeroID, 'r2d2', 'c3po', 'ewok', 'chewbacca', 'han_solo', 'yoda', 'falcon', 'obi_wan', 'leia'];

