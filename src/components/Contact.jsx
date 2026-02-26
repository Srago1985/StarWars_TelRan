import { useEffect, useState } from 'react';
import { base_url } from '../utils/constants.js';
import PlanetsList from './PlanetsList';

const Contact = () => {
    const [planets, setPlanets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Функция для проверки актуальности данных в localStorage
    const isDataFresh = (timestamp) => {
        const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 дней в миллисекундах
        return Date.now() - timestamp < thirtyDaysInMs;
    };

    // Функция для сохранения данных в localStorage
    const savePlanetsToStorage = (planetsData) => {
        localStorage.setItem('starwars_planets', JSON.stringify(planetsData));
        localStorage.setItem('starwars_planets_timestamp', Date.now().toString());
    };

    // Функция для загрузки данных из localStorage
    const loadPlanetsFromStorage = () => {
        const savedPlanets = localStorage.getItem('starwars_planets');
        const savedTimestamp = localStorage.getItem('starwars_planets_timestamp');
        
        if (savedPlanets && savedTimestamp && isDataFresh(parseInt(savedTimestamp))) {
            return JSON.parse(savedPlanets);
        }
        return null;
    };

    useEffect(() => {
        const loadPlanets = async () => {
            try {
                // Сначала пытаемся загрузить из localStorage
                const cachedPlanets = loadPlanetsFromStorage();
                
                if (cachedPlanets) {
                    setPlanets(cachedPlanets);
                    setLoading(false);
                    return;
                }

                // Если кэш устарел или отсутствует, загружаем с API
                const response = await fetch(`${base_url}/v1/planets`);
                if (!response.ok) {
                    throw new Error('Failed to load planets');
                }
                const planetsData = await response.json();
                setPlanets(planetsData);
                
                // Сохраняем данные в localStorage
                savePlanetsToStorage(planetsData);
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