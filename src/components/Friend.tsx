import { HeroID } from "../utils/constants.ts";
import { getHeroByID } from "../utils/heroStorage.ts";
import { useCurrentHero } from "../hooks/useCurrentHero.ts";

interface FriendProps {
    heroID: HeroID;
    pos: number;
}

const Friend = ({heroID, pos}: FriendProps) => {
    const { setHeroID } = useCurrentHero();
    const hero = getHeroByID(heroID);
    let styles = "w-full";
    if (pos === 9) {
        styles += " rounded-br-3xl";
    }
    if (pos === 7) {
        styles += " rounded-bl-3xl";
    }

    const handleSelectHero = () => {
        setHeroID(heroID);
    };

    return (
        <button type="button" className="block w-full cursor-pointer" onClick={handleSelectHero} aria-label={`Select ${hero.name}`}>
            <img className={styles} src={hero.img} alt={hero.name} title={hero.name}/>
        </button>
    )
}

export default Friend;