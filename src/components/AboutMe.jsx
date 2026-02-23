import { useEffect, useState } from 'react';
import { base_url } from '../utils/constants.js';

const AboutMe = () => {
  const [person, setPerson] = useState(() => {
    const saved = localStorage.getItem('person');
    const savedTimestamp = localStorage.getItem('personTimestamp');
    
    if (saved && savedTimestamp) {
      const now = Date.now();
      const saved30DaysAgo = now - (30 * 24 * 60 * 60 * 1000); // 30 дней в миллисекундах
      
      if (parseInt(savedTimestamp) > saved30DaysAgo) {
        return JSON.parse(saved); 
      }
    }
    return null; 
  });

  const [loading, setLoading] = useState(!person);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadRandomPerson = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch(`${base_url}/v1/peoples`);
        if (!response.ok) {
          throw new Error('Failed to load person');
        }
        const people = await response.json();
        if (!Array.isArray(people) || people.length === 0) {
          throw new Error('No people available');
        }
        const randomPerson = people[Math.floor(Math.random() * people.length)];
        
        setPerson(randomPerson);
        localStorage.setItem('person', JSON.stringify(randomPerson));
        localStorage.setItem('personTimestamp', Date.now().toString());
      } catch (err) {
        console.error(err);
        setError('Unable to load person');
      } finally {
        setLoading(false);
      }
    };

    if (!person) {
      loadRandomPerson();
    }
  }, [person]);

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

