import React, { useEffect } from 'react';
import {
  Routes,
  Route
} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { IStore } from 'services';

import Home from 'pages/home/Home'
import useUser from 'helpers/useUser'
import { routes } from 'helpers/routes'
import AdminPanel from 'pages/admin-panel/AdminPanel';
import Notification from 'components/notification';
import Header from 'components/header'
import Quotes from 'pages/quotes/Quotes';

import './asset/scss/typography.scss'
import './asset/scss/fonts.scss'
import './App.scss'

function App() {
  const dispatch = useDispatch()
  const {
    hasUser
  } = useUser()
  const notifications = useSelector((store: IStore) => store.notificationsStore.notifications)
  const hasNotifications = notifications.length > 0

  return (
    <div className="App">
      <div className="layout">
        <Header />
        <Routes>
          <Route path={routes.adminPanel} element={<AdminPanel />} />
          <Route path={routes.default} element={<Home />} />
          <Route path={routes.quotes} element={<Quotes />} />
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
