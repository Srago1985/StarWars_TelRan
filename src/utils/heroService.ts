import { type HeroID } from './constants.ts';
import { getHeroByID, isCacheFresh, readPersonsCache, writePersonsCache } from './heroStorage.ts';
import { PersonData } from './types.ts';

export const loadHeroData = async (heroID: HeroID, signal?: AbortSignal): Promise<PersonData> => {
  const cache = readPersonsCache();
  const cachedHero = cache[heroID];

  if (cachedHero && isCacheFresh(cachedHero.timestamp)) {
    return cachedHero.data;
  }

  const hero = getHeroByID(heroID);
  const response = await fetch(hero.url, { signal });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data: PersonData = await response.json();
  cache[heroID] = { data, timestamp: Date.now() };
  writePersonsCache(cache);

  return data;
};