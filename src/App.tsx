import React from 'react';
import {
  Routes,
  Route
} from 'react-router-dom'

import Home from 'pages/home/Home'
import useUser from 'helpers/useUser'
import { routes } from 'routes'
import AdminPanel from 'pages/admin-panel/AdminPanel';

import './asset/scss/typography.scss'
import './asset/scss/fonts.scss'
import './App.scss'

function App() {
  const {
    hasUser
  } = useUser()

  return (
    <div className="App">
      <Routes>
        <Route path={routes.adminPanel} element={<AdminPanel />} />
        <Route path={routes.default} element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
