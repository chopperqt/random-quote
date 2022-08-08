import {
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'
import { Stores } from 'services';

import Home from 'pages/home/Home'
import Profile from 'pages/profile';
import { routes } from 'helpers/routes'
import AdminPanel from 'pages/admin-panel/AdminPanel';
import Notification from 'components/notification';
import Header from 'components/header'
import Quotes from 'pages/quotes/Quotes';
import SignUp from 'pages/signup/SignUp';
import Login from 'pages/login/Login';
import useUser from 'helpers/useUser';
import Authors from 'pages/authors/Authors';

import 'react-lazy-load-image-component/src/effects/blur.css'
import './asset/scss/typography.scss'
import './asset/scss/fonts.scss'
import './App.scss'

function App() {
  const { user } = useUser()
  const {
    NotificationStore: { notifications } } = Stores()
  const hasNotifications = notifications.length > 0

  let ComponentLogin = <Navigate to={routes.profile} />
  let ComponentSignup = <Navigate to={routes.profile} />
  let ComponentProfile = <Profile />

  if (!user) {
    ComponentLogin = <Login />
    ComponentSignup = <SignUp />
    ComponentProfile = <Navigate to={routes.logIn} />
  }

  return (
    <div className="App">
      <div className="layout">
        <Header />
        <Routes>
          <Route path={routes.adminPanel} element={<AdminPanel />} />
          <Route path={routes.default} element={<Home />} />
          <Route path={routes.defaultWithId} element={<Home />} />
          <Route path={routes.quotes} element={<Quotes />} />
          <Route path={routes.profile} element={ComponentProfile} />
          <Route path={routes.logIn} element={ComponentLogin} />
          <Route path={routes.signUp} element={ComponentSignup} />
          <Route path={routes.authors} element={<Authors />} />
        </Routes>
      </div>
      {hasNotifications && (
        <div className='notificationWrap'>
          <div className="notification">
            {notifications.map(({
              text,
              id,
              type
            }) => (
              <Notification
                key={id}
                id={id}
                text={text}
                type={type}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
