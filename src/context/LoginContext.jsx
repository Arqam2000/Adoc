import { createContext, useContext, useEffect, useState } from "react";

export const LoginContext = createContext(null);

export const LoginProvider = ({ children }) => {
  const [LoginName, setLoginName] = useState("");  

  return (
    <LoginContext.Provider value={{ LoginName, setLoginName }}>
      {children}
    </LoginContext.Provider>
  );
}

export default function useLoginName() {
  return useContext(LoginContext);
}