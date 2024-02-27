import React , {useContext , useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {} from './store/FirebaseContext'
import './App.css';
import { AuthContext , FirebaseContext } from './store/FirebaseContext';
import {
  onAuthStateChanged
} from 'firebase/auth';

function App() {
  const { app, auth, db } = useContext(FirebaseContext);
    const { setUser}  = useContext(AuthContext)
  
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        setUser(user);
      });
    })
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
