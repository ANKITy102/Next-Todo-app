
import Form from "./addTodoForm"
import Todos from "./todos"
import { Suspense } from "react"

export default async function Home() {
  // console.log(tasks);
  return (
    <div className="container">
      <Form/>
     <Suspense fallback={<h1 style={{
      height:"100%",
      display:"flex",
      alignItems:"center",
      justifyContent:"center"
     }}>loading...</h1>}>
      <Todos/>
     </Suspense>
    </div>
  )
}
