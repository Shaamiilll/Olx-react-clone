import { createContext, useState } from "react";
import { app, auth, db, storage } from "../firebase/config"; // Assuming firebaseConfig contains your Firebase initialization

export const FirebaseContext = createContext(null);
export const AuthContext = createContext(null);

export default function Context({ children }) {
  const [user, setUser] = useState(null);

  return (
    <FirebaseContext.Provider value={{ app, auth, db, storage }}>
      <AuthContext.Provider value={{ user, setUser }}>
        {children}
      </AuthContext.Provider>
    </FirebaseContext.Provider>
  );
}
