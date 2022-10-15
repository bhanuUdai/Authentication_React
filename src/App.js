import { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import Layout from './components/Layout/Layout';
import UserProfile from './components/Profile/UserProfile';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import AuthContext from './Store/auth-context';
function App() {

  const authctx=useContext(AuthContext)
  let isLogin=authctx.validLogin

  return (
    <Layout>
      <Switch>
        <Route path='/' exact>
          <HomePage />
        </Route>
       {!isLogin && <Route path='/auth'>
          <AuthPage />
        </Route>}
       <Route path='/profile'>
         {isLogin && <UserProfile />}
         {!isLogin && <Redirect to='/auth'/>}
        </Route>
        <Route path='*'>
        <Redirect to='/'/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;