import React, { useContext } from 'react'
import './App.css';
import Auth from './components/auth/Auth';
import Feed from './components/feed/Feed';
import Navbar from './components/navbar/Navbar';
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider'

function App() {
  // use UserContext to determine if the user is logged in
  const { token, logout } = useContext(UserContext)

  return (
    <div className="webPage">
      <Navbar logout={logout} />
      <Routes>
        <Route
          exact path='/'
          element={token ? <Navigate to='/feed'/> : <Auth />}
        />
        <Route
          path ='/feed'
          element={<Feed />}
        />
      </Routes>
    </div>
  );
}

export default App;
