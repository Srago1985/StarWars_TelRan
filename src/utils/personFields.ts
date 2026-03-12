import { PersonData } from './types.ts';

export const personFields: Array<{ label: string; key: keyof PersonData }> = [
  { label: 'Name', key: 'name' },
  { label: 'Birth year', key: 'birth_year' },
  { label: 'Gender', key: 'gender' },
  { label: 'Height', key: 'height' },
  { label: 'Mass', key: 'mass' },
  { label: 'Hair color', key: 'hair_color' },
  { label: 'Skin color', key: 'skin_color' },
  { label: 'Eye color', key: 'eye_color' },
];