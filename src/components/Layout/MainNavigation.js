import { Link } from "react-router-dom";
import React, { useContext } from "react";
import classes from "./MainNavigation.module.css";
import AuthContext from "../../Store/auth-context";

const MainNavigation = () => {
  const authctx = useContext(AuthContext);
  const deleteTokenHandler = () => {
    authctx.removeToken();
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>{!authctx.validLogin && <Link to="/auth">Login</Link>}</li>
          <li>{authctx.validLogin && <Link to="/profile">Profile</Link>}</li>
          <li>
            {authctx.validLogin && (
              <button onClick={deleteTokenHandler}>Logout</button>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
