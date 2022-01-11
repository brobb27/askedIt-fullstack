import React, { useContext } from 'react'
import './App.css';
import Auth from './components/auth/Auth';
import Feed from './components/feed/Feed';
import Navbar from './components/navbar/Navbar';
import Profile from './components/profile/Profile';
import PostPage from './components/postPage/PostPage';
import ProtectedRoute from './components/protectedRoute/ProtectedRoute';
import { Routes, Route, Navigate } from 'react-router-dom'
import { UserContext } from './context/UserProvider'

function App() {
  // use UserContext to determine if the user is logged in
  const { token, logout } = useContext(UserContext)

  return (
    <div className="webPage">
      {token && <Navbar logout={logout} /> }
      <Routes>
        <Route
          exact path='/'
          element={token ? <Navigate to='/feed'/> : <Auth />}
        />
        <Route path='/feed' element={<ProtectedRoute token={token}/>}>
          <Route 
            path=''
            element={<Feed />}
          />
        </Route>
        <Route path='/profile' element={<ProtectedRoute token={token}/>}>
          <Route 
            path=''
            element={<Profile />}
          />
        </Route>
        <Route path='/post/:postId' element={<ProtectedRoute token={token} />}>
          <Route
            path=''
            element={<PostPage />}
          />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
