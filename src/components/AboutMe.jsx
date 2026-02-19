import { useEffect, useState } from 'react';
import { base_url } from '../utils/constants.js';

const AboutMe = () => {
   const [person, setPerson] = useState(null);
   const [loading, setLoading] = useState(true);
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
            } catch (err) {
                console.error(err);
                setError('Unable to load person');
            } finally {
                setLoading(false);
            }
        };

        loadRandomPerson();
    }, []);

    return (
    <section className="pt-4 mt-4">
      <h2 className="text-center">About me</h2>
      {loading ? (
        <p className="far-galaxy">Loading character...</p>
      ) : error ? (
        <p className="far-galaxy">{error}</p>
      ) : (
        <>
          
          <p className="far-galaxy">Name: {person?.name || "Unknown"}</p>
          <p className="far-galaxy">Birth year: {person?.birth_year || "Unknown"}</p>
          <p className="far-galaxy">Gender: {person?.gender || "Unknown"}</p>
          <p className="far-galaxy">Height: {person?.height || "Unknown"}</p>
          <p className="far-galaxy">Mass: {person?.mass || "Unknown"}</p>
          <p className="far-galaxy">Hair color: {person?.hair_color || "Unknown"}</p>
          <p className="far-galaxy">Skin color: {person?.skin_color || "Unknown"}</p>
          <p className="far-galaxy">Eye color: {person?.eye_color || "Unknown"}</p>
        </>
      )}
    </section>
  );
};

export default AboutMe;