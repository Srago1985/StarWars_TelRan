import { useEffect, useState } from 'react';
import { base_url } from '../utils/constants.js';
import PlanetsList from './PlanetsList';

const Contact = () => {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPlanets = async () => {
            try {
                const response = await fetch(`${base_url}/v1/planets`);
                if (!response.ok) {
                    throw new Error('Failed to load planets');
                }
                const planetsData = await response.json();
                setPlanets(planetsData);
            } catch (error) {
                console.error('Error loading planets:', error);
                setError('Не удалось загрузить список планет');
            } finally {
                setLoading(false);
            }
        };

        loadPlanets();
    }, []);

    return (
        <div className="container">
            <form>
                <label htmlFor="fname">First Name</label>
                <input type="text" id="fname" name="firstname" placeholder="Your name.." />

                <label htmlFor="lname">Last Name</label>
                <input type="text" id="lname" name="lastname" placeholder="Your last name.." />

                <label htmlFor="planet">Planet</label>
                {loading ? (
                    <div>Загрузка планет...</div>
                ) : error ? (
                    <div style={{color: 'red'}}>{error}</div>
                ) : (
                    <PlanetsList 
                        id="planet" 
                        name="planet" 
                        planets={planets} 
                    />
                )}

                <label htmlFor="subject">Subject</label>
                <textarea id="subject" name="subject" placeholder="Write something.." style={{height: "200px"}}></textarea>

                <input type="submit" value="Submit" />
            </form>
        </div>
    )
}

export default Contact;