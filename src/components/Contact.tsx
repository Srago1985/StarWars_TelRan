import PlanetsList from './PlanetsList';
import { usePlanets } from '../hooks/usePlanets.ts';

const Contact = () => {
    const { planets, loading, error } = usePlanets();

    return (
        <div className="border rounded-b-[5px] bg-transparent p-5">
            <form>
                <label>
                    First Name
                    <input type="text" className='w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]' name="firstname" placeholder="Your name.." />
                </label>

                <label>
                    Last Name
                    <input type="text" className='w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]' name="lastname" placeholder="Your last name.." />
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
                    Subject
                    <textarea name="subject" placeholder="Write something.." className='h-50 w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]'></textarea>
                </label>

                <input className='bg-[#04AA6D] text-white py-3 px-5 border-none rounded-sm cursor-pointer hover:bg-[#45a049]' type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Contact;