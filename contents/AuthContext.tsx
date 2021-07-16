import { createContext, useState } from "react";
import {api} from "../pages/api/api";
import { setCookie } from 'nookies';
import Router from 'next/router'
type SignInData = {
    email: string;
    password: string;
}
type AuthContextType={
    isAuthenticated: boolean;
    user: string;
    signIn: (data: SignInData) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }) {
    const[user,setUser] = useState()
    
    const isAuthenticated = !!user;

    async function signIn(data: SignInData){
        const resp = await api.post('/login',{data})
       setCookie(undefined,'authtoken', 'token', {maxAge: 60*60})
       
       setUser(user)

       Router.push('/dashboard');
    }
   return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
        {children}
    </AuthContext.Provider>
  )
}