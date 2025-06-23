
/*function App() {
  const username = "shubhankar"
  let [counterVisible , setcounterVisible] = useState(0);// this is conditional rendering

  useEffect(function(){
    setInterval(() => {
      setcounterVisible(c => !c)
    }, 5000);
  },[])

  return (
    <>
      <Chai />

      <h1>this code is written by {username}</h1>
      {counterVisible ? <Counter></Counter> : null} 
      {counterVisible && <Counter></Counter>}
    </>
  )
}
  */

/*
function App() {
  const [count, setcount] = useState(0);
  function increase() {
    setcount(c => c + 1);
  }
  return <>
    <Counter count={count} />
    <button onClick={increase}>Increase count</button>
  </>
}


function Counter(props) {


  useEffect(function () {
    console.log("mount")

    return function () {
      console.log("unmonted")
    }
  }, [])


  useEffect(function () {
    console.log("count has changed")

    return function () {
      console.log("cleanup inside second effect");
    }
  },[props.count])



  return <>
    Counter{props.count}
  </>
}


*/


// so this{username} is evaluting expression we called this expression eith username we called it evaluting expression
// evaluting expression me hi variable eject karte h 


// this is a simple counter application
/*function Counter() {
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
*/


/*
function Counter() {

  const [count, setcount] = useState(0); // these are called state variavbles


// use effect hook hooks in the life cycle event like mounting re-rendering and de-mounting
// like when the count first time mount or first time take place in dom i only time i wanat to run the logic of setinterval
// simple meaning i wnat to run some logic only on mount(jab phli war ye component render hoyii) use ek baad main logic run hoye only one time usek baad jab dobar run hoye coomponte jab ye lgic run na hoyee 

console.log("counter");// this is how re-rendering like everytime counter run it renders the whole bunch of code

  // gaurd our setinterval form re-renders
  useEffect(function () { // use effect is called every itme but the logic inside it will not run everytime
      let clock = setInterval(function () {
     // setcount(count + 1);// this will not work it will stuck in the count of 1 becuse niche wale array em hamen count ko pass nhai kiya h to make it work we can use fucntion
     setcount(function(count){
      return count+1;
     })
    }, 1000)
    console.log("mounted"); // this only logs only one



    return function(){ // this is clean up or stoping the interval or called de mounting // it is very important things
      clearInterval(clock);
    }
  },[]) // dependency array
  

  
  return <>
    <h1 id="text" >{count}</h1>
    <button onClick={incrementcount}>increase count</button>
  </>
}
*/



// making the linkdin post card 
function App() {
  return (
    <div style={{ background: "#dfe6e9", height: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div>
          <div>
            <PostComponent
              name="100xdevs"
              followerCount="23,888"
              time="12m"
              image="https://thumbs.dreamstime.com/b/apple-logo-white-color-brand-front-store-las-vegas-120446030.jpg"
              description="Learning React is fun!"
            />
            <br />
          </div>
          <div>
            <PostComponent
              name="ReactJS"
              followerCount="500k"
              time="1h"
              image="https://seeklogo.com/images/R/react-logo-7B3CE81517-seeklogo.com.png"
              description="Hooks, Context, and more!"
            />
            <br />
          </div>
          <div>
            <PostComponent
              name="JavaScript Mastery"
              followerCount="1M"
              time="5h"
              image="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png"
              description="Master modern JS."
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const style = {
  width: 250,
  backgroundColor: "white",
  borderRadius: 10,
  borderColor: "gray",
  borderWidth: 1,
  borderStyle: "solid", // important
  display: "flex", // fixed space
  flexDirection: "column",
  padding: 8, // adds padding
  gap: 8, // spacing between image and text
};

function PostComponent({ name, followerCount, time, image, description }) {
  return (
    <div style={style}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <img
          src={
            image ||
            "https://thumbs.dreamstime.com/b/apple-logo-white-color-brand-front-store-las-vegas-120446030.jpg"
          }
          style={{
            width: 30,
            height: 30,
            borderRadius: 20,
          }}
          alt="profile"
        />

        <div style={{ fontSize: 10, marginLeft: 10 }}>
          <b>{name}</b>
          <div>{followerCount} followers</div>
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            <div>{time}</div>
            <img src={""} style={{ width: 10, height: 10 }} alt="" />
            {/* you can put some icon here */}
          </div>
        </div>
      </div>

      <div style={{ fontSize: 12 }}>
        {description}
      </div>
    </div>
  );
}

export default App;


// conditional rendering  kabhi kabhi i want to render this counter varibale render sometimes
// react dom is the render of the react website