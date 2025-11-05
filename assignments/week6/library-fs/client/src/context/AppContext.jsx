import { createContext } from 'react';

const AppContext = createContext();

const baseurl = import.meta.env.VITE_BASE_URL;
export const AppContextProvider = ({ children }) => {
  return (
    <AppContext.Provider value={{ baseurl }}>{children}</AppContext.Provider>
  );
};

export default AppContext;
