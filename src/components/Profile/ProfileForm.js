import classes from './ProfileForm.module.css';
import AuthContext from '../../Store/auth-context';
import { useContext , useRef } from 'react';
import {Redirect} from 'react-router-dom'
const ProfileForm = () => {

  const authctx=useContext(AuthContext)
  const newPasswordRef=useRef()

  if(authctx.validLogin===false)
  {
    return(<Redirect to='/auth' ></Redirect>)  // if user is notlogin means it has noToken and try to access profile page, will redirect to auth page
  }


const submitHandler=async(event)=>
{
  event.preventDefault()
  const newPassword=newPasswordRef.current.value;

  let res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY',{
    method:'POST',
    body:JSON.stringify({
      idToken:authctx.tokenId,
      password:newPassword,
      returnSecureToken:false
    }),
    headers:{"Content-Type": "application/json"}
  })

  newPasswordRef.current.value='';

  try{
    if(res.ok)
    {
      let data= await res.json();
      console.log(data);
      alert("Password Change Successfully");
      authctx.removeToken()
    }
    else{
      let data= await res.json()
      console.log(data)
      throw Error(data.error.message)
    }
  }
  catch(err)
  {
    alert(err)
  }
}

  return (
    <form className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input ref={newPasswordRef} type='password' id='new-password' />
      </div>
      <div className={classes.action}>
        <button onClick={submitHandler} >Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;
