import { createContext, useContext, useState } from "react";

const SearchContext = createContext();
const SearchProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    keyword:"",
    resulr:[]
  });

  
  
  return (
    <SearchContext.Provider value={[auth, setAuth]}>
      {children}
    </SearchContext.Provider>
  );
};

// custom hook
const useSearch= () => useContext(SearchContext);

export { SearchProvider, useSearch };
