import { useEffect, useState } from 'react';
import { base_url } from '../utils/constants.ts';
import { PlanetData } from '../utils/types.ts';

interface PlanetsListProps {
  id?: string;
  name?: string;
  [key: string]: any;
}

const PlanetsList = ({ id = "planet", name = "planet", ...props }: PlanetsListProps) => {
  const [planets, setPlanets] = useState<PlanetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadPlanets = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${base_url}/v1/planets`);
        if (!response.ok) {
          throw new Error('Failed to load planets');
        }
        const planetsData = await response.json() as PlanetData[];
        setPlanets(planetsData);
      } catch (err) {
        console.error(err);
        setError('Unable to load planets');
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();
  }, []);

  return (
    <select id={id} name={name} {...props} className='w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]'>
      <option value="">Select a planet...</option>
      {loading ? (
        <option value="">Loading planets...</option>
      ) : error ? (
        <option value="">Error loading planets</option>
      ) : (
        planets.map((planet, index) => (
          <option key={index} value={planet.name.toLowerCase().replace(/\s+/g, '-')}>
            {planet.name}
          </option>
        ))
      )}
    </select>
  );
};

export default PlanetsList;