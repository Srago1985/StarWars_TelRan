import { useCurrentHero } from '../hooks/useCurrentHero.ts';
import { useHero } from '../hooks/useHero.ts';
import { personFields } from '../utils/personFields.ts';

const AboutMe = () => {
  const { heroID } = useCurrentHero();
  const { person, loading, error } = useHero(heroID);

  return (
    <section className="pt-4 mt-4">
      <h2 className="text-center text-2xl">About me</h2>
      {loading ? (
        <p className="text-3xl text-justify leading-normal tracking-widest">Loading character...</p>
      ) : error ? (
        <p className="text-3xl text-justify leading-normal tracking-widest">{error}</p>
      ) : (
        <>
          {personFields.map(({ label, key }) => (
            <p key={key} className="text-3xl text-justify leading-normal tracking-widest">
              {label}: {person?.[key] || 'Unknown'}
            </p>
          ))}
        </>
      )}
    </section>
  );
};

export default AboutMe;

