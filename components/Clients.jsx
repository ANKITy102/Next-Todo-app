"use client"

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, createContext, useContext, useEffect } from "react"
import { Toaster, toast } from "react-hot-toast";

export const Context = createContext({user:{}})
export const ContextProvider = ({children}) =>{
    useEffect(()=>{
        fetch("/api/auth/me").then(res=>res.json()).then(data=>{
            if(data.success) setUser(data.user);
        })
    },[]) 
    const [user, setUser] = useState({});
    return <Context.Provider
        value={{
            user,
            setUser
        }}
    >{children}
        <Toaster/>
    </Context.Provider>
}




export const LogoutButton = ()=>{
    const {user, setUser} = useContext(Context)
    const logoutHandler =async ()=>{
        try {
            const res = await fetch("/api/auth/logout");
            const data= await res.json();
            if(!data.success) return toast.error(data.message);
            setUser({});
            toast.success(data.message);
        } catch (error) {
            toast.error(error.message);
        }
    }
    return (

    <>
    {user._id?
    <button className="btn" onClick={logoutHandler}>Logout</button>
    
    :(

         <Link href={"/login"}>Login</Link>
    )}
    </>
    )
}


export const TodoButton = ({id,completed})=>{
    const router = useRouter();
    const deleteHandler = async(id)=>{
        try {
            const res = await fetch(`/api/task/${id}`,{
                method:"DELETE",
            })
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error.message);
        }
    }
    
    const updateHandler = async(id)=>{
        try {
            const res = await fetch(`/api/task/${id}`,{
                method:"PUT",
            })
            const data = await res.json();
            if(!data.success) return toast.error(data.message);
            toast.success(data.message);
            router.refresh();
        } catch (error) {
            return toast.error(error.message);
        }
    }
    
    return <>
        <input type="checkbox" checked={completed} onClick={()=>updateHandler(id)}/>
        <button className="btn" onClick={()=>deleteHandler(id)}>Delete</button>
    </>
}


