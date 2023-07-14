"use client";
import React, { useContext, useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { redirect } from "next/navigation";
import { Context } from "@/components/Clients";
const addTodoForm = () => {
  
  const router = useRouter();
  const {user} = useContext(Context);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const submitHandler =async (e)=>{
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          title, description
        })
      })

      const data = await res.json();
      if(!data.success) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
      setTitle("");
      setDescription("");
    } catch (error) {
      toast.error(error.message);
    }

  }
  if(!user._id) return redirect("/login")
  return (
    <div className="login">
      <section>
        <form onSubmit={submitHandler}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Task Title"
          />
          <input
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            placeholder="Task Description"
          />

          <button type="submit">Add Task</button>
        </form>
      </section>
    </div>
  );
};

export default addTodoForm;
