import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
/*
function App() {

  let [Counter,setCounter] = useState(15) // it is a use state

  //let Counter = 0 ye propogate hoga par ui me change nahi hoga

  const AddValue = ()=>{
    Counter = Counter+1; //aise counter update nahi hoga hame setcounter use karna padega 
    setCounter(Counter) // briefing  jasise hi set counter me value atti h react andar se ract karta h trrigger karta h or automaticaally pura ka pura dom apka analiyize hota h kha kah par value h jo hmae update karni h

  }

  const Removevalue =()=>{
    Counter = Counter-1;
    setCounter(Counter)
  }
  return (
    <>
      <h1>Counter Value: {Counter}</h1>
      <button onClick={AddValue}>Add value</button>
      <button onClick={Removevalue}>Remove value</button>
    </>
  )
}

// state change karne ka ye matlab nahi h ki value cahnge akr di itska ye matlab h ki is chang eko propogate kara jata h ui ke andar
export default App

*/








function App() {

  let [Counter, setCounter] = useState(15) // it is a use state

  //let Counter = 0 ye propogate hoga par ui me change nahi hoga

  const AddValue = () => {
    if (Counter < 20) {
      Counter = Counter + 1; //aise counter update nahi hoga hame setcounter use karna padega 
      setCounter(Counter)
    }
    // briefing  jasise hi set counter me value atti h react andar se ract karta h trrigger karta h or automaticaally pura ka pura dom apka analiyize hota h kha kah par value h jo hmae update karni h

  }

  const Removevalue = () => {
    if (Counter > 0) {
      Counter = Counter - 1;
      setCounter(Counter)
    }

  }
  return (
    <>
      <h1>Counter Value: {Counter}</h1>
      <button onClick={AddValue}>Add value</button>
      <button onClick={Removevalue}>Remove value</button>
    </>
  )
}


// state change karne ka ye matlab nahi h ki value cahnge akr di itska ye matlab h ki is chang eko propogate kara jata h ui ke andar
export default App