import { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [LoginName, setLoginName] = useState("");  
  const [pd, setPd] = useState("");  

  return (
    <LoginContext.Provider value={{ LoginName, setLoginName, pd, setPd }}>
      {children}
    </LoginContext.Provider>
  );
}

export default function useLoginName() {
  return useContext(LoginContext);
}