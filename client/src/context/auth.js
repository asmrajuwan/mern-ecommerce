import axios from "axios";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

const provider = new GoogleAuthProvider();

export const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  const googleLogin = ()=>{
   
    return signInWithPopup(auth, provider )
}

  //default axios
  axios.defaults.headers.common["Authorization"] = auth?.token

  useEffect(() => {
    const data = localStorage.getItem("auth");
    if (data) {
      const parseData = JSON.parse(data);  
      setAuth({
        ...auth,
        user: parseData.user,
        token: parseData.token,
      });
    }
    //eslint-disable-next-line
  }, []);

 

  return (
    <AuthContext.Provider value={
      [auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

// custom hook
const useAuth = () => useContext(AuthContext);

export { AuthProvider, useAuth };

