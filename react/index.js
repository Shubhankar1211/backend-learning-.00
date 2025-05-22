// summuary of 9.1 react
// For static website we dont need react
// do not incerese the bundel size 
//react is just an easier way to write normal html/css and js, it's a new syntax that under the hood gets converted to html/css/js
//just how chatgpt is na esier way to write code , React is an easier way to write html and css
//  why react
/*
people realised it's harder to do DOM  manipulation the conventional way
ther weere librarires that come into pictures thet made it slightly easy , but still  for a very  big app it's  very hard(jquery) unde rthe hood the react complier convert your code  to html/css/js


// some react jargon 
to create a react app we ussually to worry about the two things state and components
creators of fronted frameworks realiesd that all websites can effectively be divided into two parts for dynamic part

an object that represents the correct state of the app 
it represents the dynamic things in your app(things that changes)
for example , the value of the counter

how a DOM element should render , given a state 
it is a re-usable dynamic html snippet that changes given the state 


a state chenge trigger a re-render 
a re-render represents the actual DOM being manipulte when the state changes

simple react is
you usually to define all your componts once then you have to do is update the state of your app, react takes care of re-rendering your app

if interview ask what is jsx it is html say it technically it is not html is is  xml
 jsx menas javascript xml
 // jsx stands for js xml . it is a syntax extension for js ,
 //  most commonly used with react ,a popular js lib for building user interfase , 
 // jsx allows you to erite html like code directly within js .
 // this makes it easier to create and manage the user interface in react applications
 */

 /*
 to read baout the fibre go to this repo react-fiber-architecture
 virtual dom h abhi bhi bu use use karni wali algo ko ham fibre khte h 
 interview question-: feturee of fibre
 ans -: it include the ablity to pause,abort , or resuse work as new update; the ability to assign priority to diffrent types of update 
hydration is the process when react format id formed but the the fucnctionality is not there in it so when the js come provide functionality this process is called hydration
what is reconciliation
the slog react uses to diff one tree with another to determine which parts need to be changed
reconsilition is the alog behind what is popularly understanf as the "virtual dom"
kyo use karna chiye kyo ki agar list ki performance ko imrove karna h keys karni chiye 
diffing of kists is perfromed using keys . keys shouldd be stabel predictible and uniques

whole summary 
1.The createRoot create's its own DOM and then compare it with the web browser's DOM and only update those components which are actually updated.
2.But the browser removes the whole DOM and then recrates the whole DOM with the updated values this is called reload.
3. However virtual DOM tracks whole DOM like a tree like structure and updates only those values which were only changed.
4. But some values depends on network call so if we update a value it might get update immediately via a network call.
5. So we will have to update it again. To avoid this overhead we can drop the updation calls for the immediate value update.
6. The current algo used by the React is called the React Fibre algo.
7. The algo react uses to differentiate the web browser's tree and React's tree formed through create root is called reconciliation.
8. Reconciliation is the algo behind what popularly known as the Virtual-DOM.
9.In UI it is not necessary for every update to be applied immediately.

we will continue react  when we reached home
react is a cakewalk we you know js 
*
 */