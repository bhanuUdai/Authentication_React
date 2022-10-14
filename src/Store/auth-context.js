import React from "react";

const AuthContext=React.createContext({
    tokenId:'',
    getToken:()=>{},
    removeToken:()=>{}
})
export default AuthContext 