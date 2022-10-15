import { useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import classes from "./AuthForm.module.css";
import AuthContext from "../../Store/auth-context";
const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loader, setLoader] = useState(false);
  const history=useHistory()  // we push desired path in useHistory and it will redirect the user there
  const authctx=useContext(AuthContext)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoader(true);

    const enteredEmail = enteredEmailRef.current.value;
    const enteredPassword = enteredPasswordRef.current.value;

    if (isLogin) {
      let res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY",
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      enteredEmailRef.current.value=''
      enteredPasswordRef.current.value=''
      try {
        setLoader(false);
        if (res.ok) {
          let data = await res.json();
          authctx.getToken(data.idToken)
          history.push('/profile')
          console.log(data.idToken);
        } else {
          let data = await res.json();
          throw Error(data.error.message);
        }
      } catch (err) {
        alert(err);
      }
    } else {
      let res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCSqjiKRacE_Kq1VBbV-oRPsKmxAsCULHY", // this key will be in project setting , web api key
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      //this whole format of signup with email/password is clearly mentioned in Firebase Auth Rest Api site

      try {
        setLoader(false);
        if (res.ok) {
          let data = await res.json();
          console.log(data);
        } else {
          let data = await res.json();
          throw Error(data.error.message);
          // console.log(data.error.message);
        }
      } catch (err) {
        alert(err);
        console.log(err);
      }
    }
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input ref={enteredEmailRef} type="email" id="email" required />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            ref={enteredPasswordRef}
            type="password"
            id="password"
            required
          />
        </div>
        <div className={classes.actions}>
          {!loader && (
            <button onClick={submitHandler}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {loader && <p>Sending Request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
