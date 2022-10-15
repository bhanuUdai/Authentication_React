import React, { useState } from "react";
import AuthContext from "./auth-context";
const ContextProvider = (prop) => {
  const storedToken=localStorage.getItem('token')
  const [token, setToken] = useState(storedToken);
  let setValidLogin=false;
  const getTokenHandler = (tkn) => {
    setToken(tkn);
    localStorage.setItem('token', tkn)
    console.log("called");
  };

  const removeTokenHandler = () => {
    setToken("");
    localStorage.removeItem('token')
  };



  if(token)
  {
    setValidLogin=true
  }
  else{
    setValidLogin=false
  }
  console.log("token", token,setValidLogin);

  return (
    <AuthContext.Provider
      value={{
        tokenId: token,
        getToken: getTokenHandler,
        removeToken: removeTokenHandler,
        validLogin:setValidLogin
      }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
