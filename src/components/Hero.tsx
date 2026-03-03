import hero from '../assets/main.jpg'

const Hero = () => {
    return (
        <section className="float-left w-1/4 mr-3">
            <img className="w-full shadow-hero" src={hero} alt="Luke Skywalker"/>
        </section>
    )
}

export default Hero;