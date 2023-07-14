

"use client"
import { Context } from '@/components/Clients';
import { redirect } from 'next/navigation';
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { toast } from 'react-hot-toast';
export const metadata = {
  title: 'Register Page',
  description: 'This is a Todo App Project made for Next.js series',
}

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const {user, setUser} = useContext(Context)
  const registerHandler  =async(e)=>{
    e.preventDefault();
    try{
    const res= await fetch("/api/auth/register",{
        method:"POST",
        body:JSON.stringify({
          name,
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
        <form  onSubmit={registerHandler}>
            <input type="text" onChange={(e)=> setName(e.target.value)} value={name} placeholder="Enter Name" />
            <input type="email" onChange={(e)=> setEmail(e.target.value)} value={email} placeholder="Enter Email" />
            <input type="password" onChange={(e)=> setPassword(e.target.value)} value={password} placeholder="Enter Password" />
        
            <button type="submit">Sign Up</button>
            <p>Or</p>
            <Link href="/login">Log In </Link>
        </form>
      </section>
    </div>
  )
}


export default page
