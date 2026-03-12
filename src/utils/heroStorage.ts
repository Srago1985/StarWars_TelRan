import { characters, defaultHeroID, isHeroID, type HeroID } from './constants.ts';
import { PersonData } from './types.ts';

const CACHE_KEY = 'personsCache';
const HERO_ID_KEY = 'personHeroID';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

export type PersonsCache = Record<string, { data: PersonData; timestamp: number }>;

export const readPersonsCache = (): PersonsCache => {
  if (typeof window === 'undefined') {
    return {};
  }

  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) {
    return {};
  }

  try {
    return JSON.parse(raw) as PersonsCache;
  } catch {
    return {};
  }
};

export const writePersonsCache = (cache: PersonsCache) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

export const isCacheFresh = (timestamp: number) => Date.now() - timestamp <= CACHE_TTL_MS;

export const getStoredHeroID = (): HeroID => {
  if (typeof window === 'undefined') {
    return defaultHeroID;
  }

  const storedHeroID = localStorage.getItem(HERO_ID_KEY);
  return storedHeroID && isHeroID(storedHeroID) ? storedHeroID : defaultHeroID;
};

export const setStoredHeroID = (heroID: HeroID) => {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.setItem(HERO_ID_KEY, heroID);
};

export const getHeroByID = (heroID: HeroID) => characters[heroID];