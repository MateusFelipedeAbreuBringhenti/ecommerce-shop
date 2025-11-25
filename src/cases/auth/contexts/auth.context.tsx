import { createContext, useEffect, useState, type ReactNode } from "react";
import type { AuthResponse, UserResponse } from "../dtos/auth.dto";

interface AuthContextType{
    user: UserResponse | null;
    
    signIn: (data: AuthResponse) => void;
    singOut:() => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

type AuthContextProvideProps = {
    children: ReactNode
}
export function AuthContextProvide( {
    children
}: AuthContextProvideProps){
    const [user,setUser] = useState<UserResponse | null>(null);

    useEffect(()=>{

        const userStoraged = localStorage.getItem('user');
        // const tokenStoraged = localStorage.getItem('token');
        
        if (userStoraged) setUser(JSON.parse(userStoraged))
        

    }, [])

    function signIn(data: AuthResponse){
        setUser(data.user)

        localStorage.setItem('user', JSON.stringify (data.user))
        localStorage.setItem('token', data.accessToken);
    }

    function singOut(){

        setUser(null);

        localStorage.removeItem('user')
        localStorage.removeItem('token')

    }

    return(
        <AuthContext.Provider value= {{user, signIn, singOut}}>
            {children}
        </AuthContext.Provider>
    )
}