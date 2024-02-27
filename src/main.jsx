import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { FirebaseContext } from './store/FirebaseContext.jsx'
import { app, auth, db } from './firebase/config.jsx'
import Context from './store/FirebaseContext.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <FirebaseContext.Provider value={{ app, auth, db }}>
      <Context>
        <App />
      </Context>
    </FirebaseContext.Provider>
  </React.StrictMode>,
)
