import { useState } from "react"

 

const Test = () => {
  const [isgo,setisgo] = useState(true)
  return (
    <>
    
 
    
  <p>tonight is tonight</p>

 {state ? <button onClick={()=>setState(false)}>Stop</button> :<button onClick={()=>console.log("skip happend here")}>Really ?</button>  }
    
    </>
  )
}

export default Test