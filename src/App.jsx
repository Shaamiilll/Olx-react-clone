import React, { useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext, FirebaseContext } from './store/FirebaseContext';
import { onAuthStateChanged } from 'firebase/auth';
import { } from './store/FirebaseContext'
import Post from './store/PostContext'
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Create from './pages/Create'
import View from './pages/ViewPost'
import './App.css';

function App() {
  const { app, auth, db } = useContext(FirebaseContext);
  const { setUser } = useContext(AuthContext)

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  })
  return (
    <div>
      <Post>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </Router>
      </Post>

    </div>
  );
}

export default App;
