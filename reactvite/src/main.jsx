import React from 'react'  // ❗ You forgot to import React — needed for JSX and React.createElement
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

// this is the custom  fucntion which show case that we can pass fyucntion also other than the jsx 
function MyApp() {
   return (
      <div>
         <h1>dealdyog</h1>
      </div>
   )
}

// this show error beacuse react do not accet thses elments in this format
const reactElement = {
    type: 'a',
    props: {
        href: 'http://goggle.com',
        target: '_blank'
    },
    children: 'Click me to visit Google'
}
// this is the  orignial format first declare the tag then object then the inner text
const reactElementOriginal = React.createElement(
   'a',
   { href: 'https://google.com', target: '_blank' },
   'click me to visit google'
)

// example 
const anotherElement = (
   <a href="https://google.com" target='_blank'>visit Google</a>
)

createRoot(document.getElementById('root')).render(
  
   //<App />
   //<MyApp />   // ❗ Here MyApp is a React component, you should call it as <MyApp />, not MyApp()
   anotherElement

)

// end of the day ham jsx ke alawa fucntion bhi execute or render kara skate h isme for ex Mapp()
// baically  in backgorud <app/> is parse into the tree like structure beacuse  react do not understand html for examle in custom react file we decalare the schema this is orginal like data and this app is parsed into that data

export default MyApp;