import { useState } from "react"
import Chai from "./Chai"
function App() {
  const username = "shubhankar"
  return (
    <>
      <Chai />
      
      <h1>this code is written by {username}</h1>
      <Counter></Counter>
    </>
  )
}


// so this{username} is evaluting expression we called this expression eith username we called it evaluting expression
// evaluting expression me hi variable eject karte h 


// this is a simple counter application
function Counter() {
  const [count , setcount] = useState(0);
  function incrementcount(){
    setcount(count+1);
  }
  function decrementcount(){
    setcount(count-1);
  }
  function resetcount(){
    setcount(0)
  }

  return <>
    <div>
      <h1 id="text" >{count}</h1>
      <button onClick={incrementcount}>increase count</button>
      <button onClick={decrementcount}>decrease count</button>
      <button onClick={resetcount}>Reset count</button>
    </div>
  </>
}
export default App