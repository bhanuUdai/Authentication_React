import { Link } from 'react-router-dom';
import React,{useContext, useState,useEffect } from 'react';
import classes from './MainNavigation.module.css';
import AuthContext from '../../Store/auth-context';

const MainNavigation = () => {

const [isToken,setIsToken]=useState(false)
  const authctx=useContext(AuthContext)
  const deleteTokenHandler=()=>
  {
    authctx.removeToken()
  }

  useEffect(()=>
  {
    if(authctx.tokenId)
    {
      setIsToken(true)
    }
    else{
      setIsToken(false)
    }
  },[authctx.tokenId])

 

  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            {!isToken && <Link to='/auth'>Login</Link>}
          </li>
          <li>
            {isToken && <Link to='/profile'>Profile</Link>}
          </li>
          <li>
            { isToken && <button onClick={deleteTokenHandler} >Logout</button>}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
