//it is a very simplified, custom simulation of how React creates and renders DOM elements behind the scenes. It's not actual React, but it helps you understand what React's core does at a low level.

function customRender(reactElement,container){
    /*
    const domElement = document.createElement(reactElement.type)
    domElement.innerHTML = reactElement.children
    domElement.setAttribute("href",reactElement.props.href)
    domElement.setAttribute("target",reactElement.props.target)
    container.appendChild(domElement)
    */
   //this is the second way 
   const domElement = document.createElement(reactElement.type)
   domElement.innerHTML = reactElement.children
   for(const prop in reactElement.props){
    domElement.setAttribute(prop,reactElement.props[prop])
   }
   container.appendChild(domElement);
}

// this is react like object
const reactElement = {
    type: 'a',
    props : {
        href : 'http://goggle.com',
        target: '_blank'
    },
    children : 'Click me to visit Google'
}


const maincontainer = document.getElementById('root')
customRender(reactElement,maincontainer)
