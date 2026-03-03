import { createContext } from 'react';

interface ChangePageContextType {
  changePage?: (page: string) => void;
}

export const ChangePageContext = createContext<ChangePageContextType>({});