import React, { useState } from "react";
import AuthContext from "./auth-context";
const ContextProvider = (prop) => {
  const [token, setToken] = useState("");

  const getTokenHandler = (tkn) => {
    setToken(tkn);
    console.log("called");
  };

  const removeTokenHandler = () => {
    setToken("");
  };

  console.log("token", token);

  return (
    <AuthContext.Provider
      value={{
        tokenId: token,
        getToken: getTokenHandler,
        removeToken: removeTokenHandler,
      }}
    >
      {prop.children}
    </AuthContext.Provider>
  );
};

export default ContextProvider;
