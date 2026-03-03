import {useEffect, useState} from "react";
import {base_url} from "../utils/constants.ts";
import { FilmData } from "../utils/types.ts";

const OpeningCrawl = () => {
    const [openingCrawl, setOpeningCrawl] = useState<string | null>(() => sessionStorage.getItem('openingCrawl') || null)

    useEffect(() => {
        if (!openingCrawl) {
        const episode = Math.floor(Math.random() * 6) + 1
        fetch(`${base_url}/v1/films/${episode}`)
            .then(res => res.json())
            .then((data: FilmData) => {
                setOpeningCrawl(data.opening_crawl)
                sessionStorage.setItem('openingCrawl', data.opening_crawl)
            })
            .catch(() => setOpeningCrawl('Error loading opening crawl'))
        }
    }, [openingCrawl])

    
        return (
            <p className="text-3xl text-justify leading-normal tracking-widest">{openingCrawl}</p>
        )
    
}

export default OpeningCrawl;