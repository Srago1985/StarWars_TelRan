import { useCurrentHero } from '../hooks/useCurrentHero.ts';

const Hero = () => {
    const { hero } = useCurrentHero();

    return (
        <section className="float-left w-1/4 mr-3">
            <img className="w-full shadow-hero" src={hero.img} alt={hero.name}/>
        </section>
    )
}

export default Hero;