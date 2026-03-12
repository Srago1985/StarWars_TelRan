import Friend from "./Friend.tsx";
import {friends} from "../utils/constants.ts";
import { useCurrentHero } from "../hooks/useCurrentHero.ts";

const DreamTeam = () => {
    const { heroID: currentHeroID } = useCurrentHero();
    const otherHeroes = friends.filter((heroID) => heroID !== currentHeroID);

    return (
        <section className="float-right w-1/2 border rounded-b-3xl grid grid-cols-3 gap-3">
            <h2 className="col-span-3 text-center text-2xl">Dream team</h2>
            {otherHeroes.map((heroID, i) => <Friend heroID={heroID} key={heroID} pos={i + 1}/>)}
        </section>
    )
}

export default DreamTeam;