"use client"
import { Context } from '@/components/Clients';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import {redirect} from "next/navigation"
import { toast } from 'react-hot-toast';
const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {user, setUser} = useContext(Context)
  const loginHandler  =async(e)=>{
    e.preventDefault();
    console.log(password)
    console.log(email)
    try{
    const res= await fetch("/api/auth/login",{
        method:"POST",
        body:JSON.stringify({
          email,password
        }),
        headers:{
          "Content-Type":"application/json"
        }
      });
      const data = await res.json();
      if(!data.success){
        return toast.error(data.message);
      }
      setUser(data.user)
      return toast.success(data.message);
    }catch(err){
      return toast.error(err.message);
      
    }
  }
  if(user._id) return redirect("/")
  return (
    <div className="login">
      <section>
        <form onSubmit={loginHandler}>
            <input onChange={(e)=> setEmail(e.target.value)} value={email} type="email" placeholder="Enter Email" />
            <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Enter Password" />
        
            <button type="submit">Login</button>
            <p>Or</p>
            <Link href="/register">New User </Link>
        </form>
      </section>
    </div>
  )
}

export const metadata = {
    title: 'Login Page',
    description: 'This is a Todo App Project made for Next.js series',
  }

export default page
