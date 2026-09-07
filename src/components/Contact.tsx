import PlanetsList from './PlanetsList';
import { usePlanets } from '../hooks/usePlanets.ts';
import { useCurrentHero } from '../hooks/useCurrentHero.ts';

const Contact = () => {
    const { planets, loading, error } = usePlanets();
    const { hero } = useCurrentHero();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);

        // Build query string
        const queryString = new URLSearchParams({ hero: hero.name }).toString();

        try {
            const response = await fetch(`https://nvqm4o24yj5d46ztf7cazcqoki0ilgcm.lambda-url.us-east-1.on.aws/?${queryString}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (result.success) {
                alert('Message sent successfully! May the Force be with you.');
                e.target.reset();
            } else {
                alert('Failed to send message: ' + result.message);
            }
        } catch (error) {
            alert('Error sending message: ' + error.message);
        }
    };

    return (
        <div className="border rounded-b-[5px] bg-transparent p-5">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name
                    <input type="text" className='w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]' name="firstname" placeholder="Your name.." required />
                </label>

                <label>
                    Last Name
                    <input type="text" className='w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]' name="lastname" placeholder="Your last name.." required />
                </label>

                <label>
                    Planet
                    {loading ? (
                        <div>Загрузка планет...</div>
                    ) : error ? (
                        <div style={{color: 'red'}}>{error}</div>
                    ) : (
                        <PlanetsList
                            name="planet"
                            id="planet"
                            planets={planets}
                        />
                    )}
                </label>

                <label>
                    Message
                    <textarea name="message" placeholder="Write your message here..." className='h-50 w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]' required />
                </label>

                <button type="submit" className='bg-[#04AA6D] text-white py-3 px-5 border-none rounded-sm cursor-pointer hover:bg-[#45a049]'>
                    Submit
                </button>
            </form>
        </div>
    )
}

export default Contact;