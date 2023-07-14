import { TodoItem } from '@/components/ServerComponent'
import React from 'react'
import  {cookies} from "next/headers"
import {redirect} from "next/navigation"
const fetchTodo = async (token)=>{
  try{
    const res = await fetch(`${process.env.URL}/api/mytask`,{
      cache:"no-cache",
      headers:{
        cookie:`token=${token}`,
      }
    });
    const data= await res.json();
    // console.log(data)
    if(!data.success) return [];
    return data.tasks;
  }catch(err){
    return [];
  }
}
const todos =async () => {
  
  const token = cookies().get("token")?.value;
  if(!token) return redirect("/login")
  const tasks = await fetchTodo(token);
  return (
    <div>
       <section className="todosContainer">
        {tasks?.map((i)=>{
         return <TodoItem
           title={i.title}
           description={i.description}
           id={i._id}
           key={i._id}
           completed={i.isCompleted}
           />
        })}
      </section>
    </div>
  )
}

export default todos
