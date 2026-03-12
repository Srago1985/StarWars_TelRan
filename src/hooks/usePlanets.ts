import { useEffect, useState } from 'react';
import { base_url } from '../utils/constants.ts';
import { PlanetData } from '../utils/types.ts';

const PLANETS_CACHE_KEY = 'starwars_planets';
const PLANETS_CACHE_TS_KEY = 'starwars_planets_timestamp';
const PLANETS_CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

interface UsePlanetsResult {
  planets: PlanetData[];
  loading: boolean;
  error: string | null;
}

const isDataFresh = (timestamp: number): boolean => Date.now() - timestamp < PLANETS_CACHE_TTL_MS;

const savePlanetsToStorage = (planetsData: PlanetData[]): void => {
  localStorage.setItem(PLANETS_CACHE_KEY, JSON.stringify(planetsData));
  localStorage.setItem(PLANETS_CACHE_TS_KEY, Date.now().toString());
};

const loadPlanetsFromStorage = (): PlanetData[] | null => {
  const savedPlanets = localStorage.getItem(PLANETS_CACHE_KEY);
  const savedTimestamp = localStorage.getItem(PLANETS_CACHE_TS_KEY);
  const parsedTimestamp = Number(savedTimestamp);

  if (savedPlanets && Number.isFinite(parsedTimestamp) && isDataFresh(parsedTimestamp)) {
    try {
      const parsedPlanets = JSON.parse(savedPlanets) as PlanetData[];
      return Array.isArray(parsedPlanets) ? parsedPlanets : null;
    } catch {
      return null;
    }
  }

  return null;
};

export const usePlanets = (): UsePlanetsResult => {
  const [planets, setPlanets] = useState<PlanetData[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const loadPlanets = async () => {
      try {
        const cachedPlanets = loadPlanetsFromStorage();
        if (cachedPlanets) {
          setPlanets(cachedPlanets);
          return;
        }

        const response = await fetch(`${base_url}/v1/planets`, { signal: controller.signal });
        if (!response.ok) {
          throw new Error('Failed to load planets');
        }

        const planetsData = await response.json() as PlanetData[];
        setPlanets(planetsData);
        savePlanetsToStorage(planetsData);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        console.error('Error loading planets:', err);
        setError('Не удалось загрузить список планет');
      } finally {
        setLoading(false);
      }
    };

    loadPlanets();

    return () => {
      controller.abort();
    };
  }, []);

  return { planets, loading, error };
};