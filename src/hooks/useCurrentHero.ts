import { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import { heroQueryParam, isHeroID, type HeroID } from '../utils/constants.ts';
import { getHeroByID, getStoredHeroID, setStoredHeroID } from '../utils/heroStorage.ts';

export const useCurrentHero = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchString = searchParams.toString();
  const heroFromUrl = searchParams.get(heroQueryParam);

  const heroID: HeroID = heroFromUrl && isHeroID(heroFromUrl) ? heroFromUrl : getStoredHeroID();
  const hero = getHeroByID(heroID);

  useEffect(() => {
    setStoredHeroID(heroID);
  }, [heroID]);

  useEffect(() => {
    if (heroFromUrl === heroID) {
      return;
    }

    const nextParams = new URLSearchParams(searchString);
    nextParams.set(heroQueryParam, heroID);
    setSearchParams(nextParams, { replace: true });
  }, [heroFromUrl, heroID, searchString, setSearchParams]);

  const setHeroID = (nextHeroID: HeroID, replace = true) => {
    const nextParams = new URLSearchParams(searchString);
    nextParams.set(heroQueryParam, nextHeroID);
    setSearchParams(nextParams, { replace });
    setStoredHeroID(nextHeroID);
  };

  return { heroID, hero, setHeroID };
};