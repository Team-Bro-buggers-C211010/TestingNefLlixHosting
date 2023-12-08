import { createContext, useContext, useState } from "react";


import { 
    createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateCurrentUser,
} from "firebase/auth";
import { auth, db } from "../services/firebase";
const AuthContext = createContext();

export function AuthContextProvider({children}) {

    const [user , setUser] = useState({});

    useEffect(()=> {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) =>{
            setUser(currentUser);
        });
        return() => {
            unsubscribe();
        };
    }, []);

    function signup(email, password){
        createUserWithEmailAndPassword(auth, email, password);
    }
   
    function logIn(email, password){
        return signInWithEmailAndPassword(auth, email, password);
    }

    function logOut(){
        return signOut(auth);
    }


  return <AuthContext.Provider value={{user, signup, logIn, logOut}}>(children)</AuthContext.Provider>;
}

export function UserAuth() {
    return useContext (AuthContext);
}