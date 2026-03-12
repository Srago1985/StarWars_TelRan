import { useEffect, useState } from 'react';
import { type HeroID } from '../utils/constants.ts';
import { getHeroByID } from '../utils/heroStorage.ts';
import { loadHeroData } from '../utils/heroService.ts';
import { PersonData } from '../utils/types.ts';

interface UseHeroResult {
  currentHeroID: HeroID;
  person: PersonData | null;
  loading: boolean;
  error: string;
}

export const useHero = (heroID: HeroID): UseHeroResult => {
  const currentHeroID = heroID;

  const [person, setPerson] = useState<PersonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const controller = new AbortController();
    let isActive = true;

    const fetchPerson = async () => {
      const hero = getHeroByID(currentHeroID);

      try {
        setLoading(true);
        setError('');
        const data = await loadHeroData(currentHeroID, controller.signal);
        if (!isActive) {
          return;
        }
        setPerson(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        if (!isActive) {
          return;
        }
        setError('Failed to fetch character data. Please try again later.');
        setPerson(null);
      } finally {
        if (isActive) {
          setLoading(false);
        }
      }
    };

    fetchPerson();

    return () => {
      isActive = false;
      controller.abort();
    };
  }, [currentHeroID]);

  return {
    currentHeroID,
    person,
    loading,
    error,
  };
};