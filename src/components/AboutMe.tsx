import { useEffect, useState } from 'react';
import { PersonData } from '../utils/types.ts';
import { useParams } from 'react-router';
import { characters } from '../utils/constants.ts';
import ErrorPage from './ErrorPage.tsx';

const CACHE_KEY = 'personsCache';
const CACHE_TTL_MS = 30 * 24 * 60 * 60 * 1000;

type PersonsCache = Record<string, { data: PersonData; timestamp: number }>;

const readPersonsCache = (): PersonsCache => {
  const raw = localStorage.getItem(CACHE_KEY);
  if (!raw) return {};

  try {
    return JSON.parse(raw) as PersonsCache;
  } catch {
    return {};
  }
};

const writePersonsCache = (cache: PersonsCache) => {
  localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
};

const AboutMe = () => {
  const { heroID } = useParams();
  const isValidHero = Boolean(heroID && heroID in characters);

  const [person, setPerson] = useState<PersonData | null>(null);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchPerson = async () => {
      if (!isValidHero || !heroID) {
        return;
      }

      const now = Date.now();
      const cache = readPersonsCache();
      const cachedHero = cache[heroID];

      if (cachedHero && now - cachedHero.timestamp <= CACHE_TTL_MS) {
        setPerson(cachedHero.data);
        setError('');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await fetch(characters[heroID as keyof typeof characters].url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data: PersonData = await response.json();
        setPerson(data);

        cache[heroID] = { data, timestamp: now };
        writePersonsCache(cache);
      } catch (err) {
        setError('Failed to fetch character data. Please try again later.');
        setPerson(null);
      } finally {
        setLoading(false);
      }
    };

    fetchPerson();
  }, [heroID, isValidHero]);

  if (!isValidHero) {
    return <ErrorPage />;
  }

  return (
    <section className="pt-4 mt-4">
      <h2 className="text-center text-2xl">About me</h2>
      {loading ? (
        <p className="text-3xl text-justify leading-normal tracking-widest">Loading character...</p>
      ) : error ? (
        <p className="text-3xl text-justify leading-normal tracking-widest">{error}</p>
      ) : (
        <>
          <p className="text-3xl text-justify leading-normal tracking-widest">Name: {person?.name || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Birth year: {person?.birth_year || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Gender: {person?.gender || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Height: {person?.height || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Mass: {person?.mass || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Hair color: {person?.hair_color || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Skin color: {person?.skin_color || "Unknown"}</p>
          <p className="text-3xl text-justify leading-normal tracking-widest">Eye color: {person?.eye_color || "Unknown"}</p>
        </>
      )}
    </section>
  );
};

export default AboutMe;

