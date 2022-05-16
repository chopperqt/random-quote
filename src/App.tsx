
import {
  Routes,
  Route
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

import './asset/scss/typography.scss'
import './asset/scss/fonts.scss'
import './App.scss'

function App() {
  const { NotificationStore: { notifications } } = Stores()
  const hasNotifications = notifications.length > 0

  return (
    <div className="App">
      <div className="layout">
        <Header />
        <Routes>
          <Route path={routes.adminPanel} element={<AdminPanel />} />
          <Route path={routes.default} element={<Home />} />
          <Route path={`${routes.default}/:id`} element={<Home />} />
          <Route path={routes.quotes} element={<Quotes />} />
          <Route path={routes.profile} element={<Profile />} />
          <Route path={routes.logIn} element={<Login />} />
          <Route path={routes.signUp} element={<SignUp />} />
        </Routes>
      </div>
      {hasNotifications && (
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
      )}
    </div>
  );
}

export default App;
