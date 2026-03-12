import { PlanetData } from '../utils/types.ts';

interface PlanetsListProps {
  planets: PlanetData[];
  id?: string;
  name?: string;
  [key: string]: any;
}

const PlanetsList = ({ planets, id = "planet", name = "planet", ...props }: PlanetsListProps) => {
  return (
    <select id={id} name={name} {...props} className='w-full p-3 border border-solid rounded-sm mt-1.5 mb-4 resize-y border-[#ccc]'>
      <option value="">Select a planet...</option>
      {planets.map((planet, index) => (
        <option key={index} value={planet.name.toLowerCase().replace(/\s+/g, '-')}>
          {planet.name}
        </option>
      ))}
    </select>
  );
};

export default PlanetsList;