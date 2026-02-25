import { Fragment, useEffect, useRef } from "react"
import socket from "../SocketProvider/socket"
import { useState } from "react"
import "../index.css"
import PeerSetup from "../V1.0.0/PeerSetup"
import iceConfiguration from "../V1.0.0/iceConfiguration"
import Loader from "./Loader"
import LoadingMatch from "./LoadingMathcing"
import Switch from "./Switch"
import { format } from "date-fns"
import { useGLobalContext } from "../Store/StoreGlobal"
import RoomChannel from "./RoomChannel"
import BigFire from "./Fire"
import {  HandelAcceptSwap} from "../PrivateJS/HandelAcceptSwap"
import isValidUrl from "../PrivateJS/ValidUrl"
 
 

const Room = () => {

  const [icesCandidats,seticesCandidats] = useState([])
  const [Loading,SetLoading] = useState(false)
  const peerConnection = useRef(null)
  const usePeerConnection = useRef()
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [isAlone,setIsAlone] =useState(null)
  const [isMatching,SetIsMatching] =useState(null)
  const [divorce,setdivorce] =useState(false)
  const [startTimer,SetstartTimer] = useState(false)
  const peerid  =  useRef(null)
  const [currentPeerId,SetcurrentPeerId] = useState(null)
  const [messages,Setmessages] = useState([])
  const [x,setx] = useState(()=>JSON.parse(localStorage.getItem("size"))  || 0)
  const [isPick,setisPick] = useState(false)
  const [show,setshow] = useState(false)
  const Refmsg = useRef(null)
  const {tehme,dispatch,usersLoveme}= useGLobalContext()
  const [isTimeToSKipp,setisTimeToSKipp] = useState(false)
  const [arraysRooms,SetarraysRooms] = useState([])
  const [showAnimate,setSHowAnimate] = useState(false)
  const [route,setRoute] = useState("renderMessage")
  const [isgo,setisgo] = useState(true)
  const Lock = useRef(false)
  const Proivder = useRef(null)

 


const HandedlSend =()=>{
      socket.emit("showQuee")
}
useEffect(()=>{
      socket.on("alone",(data)=>{
         console.log("you alone")
         setIsAlone(true)
         setisTimeToSKipp(false)
        
      })
      return()=>{
        socket.off("alone")
      }

  },[])
const HandelMatching = async (data)=>{


  
        
        Proivder.current = data.type
        peerid.current    =  data.peerid
       
        SetcurrentPeerId(data.peerid)
        if(data.type){
          socket.emit("listenRooms",{
           
             peers : [socket.id,data.peerid],
             Key :[socket.id, data.peerid].sort().join("_")
          })
        }
        
        if(data.type && peerid.current && Lock.current == false){
           
          await StartCall()
        }

        console.log(data,"this outpout function")
         
      
       setIsAlone(false)
       SetIsMatching(true)
       SetstartTimer(true)
       setdivorce(false)
      
       setisgo(true)
       
}
useEffect(()=>{

      socket.on("matching",HandelMatching)

      return()=>{
        socket.off("matching",HandelMatching)
      }

 },[])
const  NewConnectionVersion01 = async() =>{
  try{
      console.log("new Connection setup")
      peerConnection.current = new RTCPeerConnection(iceConfiguration)
      usePeerConnection.current  = new PeerSetup(localVideoRef,peerConnection,remoteVideoRef)
      await usePeerConnection.current._intializCamera()

      // built in this inside oop class to know how you can produce it 

      peerConnection.current.oniceconnectionstatechange = () => {
          console.log('ICE STATE:',peerConnection.current.iceConnectionState);
         
          if (
            peerConnection.current.iceConnectionState === 'connected' || 
            peerConnection.current.iceConnectionState === 'completed') 
         {
            setisTimeToSKipp(true);
          }
      };



      peerConnection.current.onicecandidate = (event) => {


          if(peerConnection.current.remoteDescription){
            console.log("........... Remote Description should be this part  ..................",socket.id)
            usePeerConnection.current.addicefromthebuffer();

          }

           if(peerConnection.current.localDescription){
            console.log("........... localDescription Description should be this part  ..................")
          }

            // see other deal && peerConnection.current.remoteDescription 
          if(event.candidate){
           // console.log(event.candidate,":any",peerid.current)
               console.log("162line","we send the data to ",peerid.current,"new connection state:")
               seticesCandidats((prev)=>[...prev,event.candidate])
               socket.emit("ice-candidate", { candidate: event.candidate, target: peerid.current});
          }
      }



  }catch(error){
    console.log(error)
    throw error
  }
}
const HandelCLose = async ()=>{

if(peerConnection.current){
  usePeerConnection.current.close()
  await NewConnectionVersion01()
  await new Promise(resolve => setTimeout(resolve, 50))

 
 
} 
// here im gonna make the lock false so you can run baby 

}
useEffect(()=>{


     const getStauts = async (data)=>{
        Lock.current  = true
   
      
        try {
        setisTimeToSKipp(false)
        SetIsMatching(false) 
        setIsAlone(data.test)
        setdivorce(true)
        SetstartTimer(false)
         
        Setmessages([])
        peerid.current = null // if handelmatch work he gonna fast to him and set the tings
        await   HandelCLose() 
     
 
        
        if(Lock.current==true  && Proivder.current == true && peerid.current){
         
        
          await new Promise(resolve => setTimeout(resolve, 200))  
          await StartCall()     

        }else{
          console.log("no match")
        }
 
        }catch(error){
           console.log(error)
           throw error
        }
      }


      socket.on("divorce",getStauts)
      return()=>{
        socket.off("divorce",getStauts)
      }

     


  },[])



  
useEffect(()=>{

      const init = async()=>{
        try{
          peerConnection.current =  new RTCPeerConnection(iceConfiguration); 
          usePeerConnection.current  = new PeerSetup(localVideoRef,peerConnection,remoteVideoRef)
          await usePeerConnection.current._intializCamera()
      // if peerconnection setremoteddescription really their do it or no

          peerConnection.current.oniceconnectionstatechange = () => {
          console.log('ICE STATE:',peerConnection.current.iceConnectionState);

          if (
            peerConnection.current.iceConnectionState === 'connected' || 
            peerConnection.current.iceConnectionState === 'completed') 
         {
            setisTimeToSKipp(true);
          }

        };



        peerConnection.current.onicecandidate = (event) => {

      

          if(peerConnection.current.remoteDescription){
            //console.log("........... Remote Description should be this part  ..................",socket.id)
            usePeerConnection.current.addicefromthebuffer();

          }

           if(peerConnection.current.localDescription){
            //console.log("........... localDescription Description should be this part  ..................")
          }

            // see other deal && peerConnection.current.remoteDescription 
          if(event.candidate){
           // console.log(event.candidate,":any",peerid.current) // this peerid here safe bcauze all this happend before mathcing
            seticesCandidats((prev)=>[...prev,event.candidate])
            socket.emit("ice-candidate", { candidate: event.candidate, target: peerid.current});
          }
      }

           
        }catch(error){ 
          console.log(error)
        }
      }

      init()


    return()=>{
      
         usePeerConnection.current?.close()
}





    },[])
  async function StartCall(){
    
  
        
      console.log("we send this offer ---------------")
     
      const offer = await  usePeerConnection.current.CreateOffer()
    
      socket.emit("Offer",{sdp : JSON.stringify(offer) , target:peerid.current,myid:socket.id})

 
 
    
  }  







 useEffect(()=>{
  const HandedlAnswer = async (data)=>{
    //  the logic gonna be here if lock false should be dont send the answer of offer from here
 
 const   answerOff = await usePeerConnection.current.CreateAnswer(JSON.parse(data.sdp)) 
 console.log("we accpet offer")
 socket.emit("Answer",{sdp : JSON.stringify(answerOff) , target : data.myid})
  }
 socket.on("Offer",HandedlAnswer)
  
 return()=>{
  socket.off("Offer",HandedlAnswer)
 }
 },[])
 useEffect(()=>{

  const getanswer = async(answer)=>{
    try{
      console.log("we accpet answer")
      usePeerConnection.current.MakeConnectionAB(JSON.parse(answer))
      SetLoading(false)
      
    }catch(error){
      console.log(error) 
    }
  }
 socket.on("Answer",getanswer)
 return()=>{
  socket.off("Answer",getanswer)
 }
  
 },[])

useEffect(()=>{

   const HandelIce = (candidate)=>{
     
    if(peerConnection.current.remoteDescription){
  
 
      usePeerConnection.current.addIceF(candidate)
     
      
   
    } else{
        
      console.log("Change Ice")
      usePeerConnection.current.putwaitice(candidate)
    }

    
   

   }
    socket.on("ice-candidate",HandelIce)
 


return()=>{
  
socket.off("ice-candidate",HandelIce)
}

},[])
const handelmoveing = (e)=>{
 
 if(isPick){
  setx(e.clientX)
  localStorage.setItem("size",JSON.stringify(e.clientX))
  if (e.clientX==0){
  
  localStorage.setItem("size",0)
  setshow(false) 
  setisPick(false)
  }
 }
}
useEffect(() => {
  const handleLeave = () => {
   
      setisPick(false);
    
  };

  document.addEventListener("mouseleave", handleLeave);
  return () => document.removeEventListener("mouseleave", handleLeave);
}, []);
const HandelSend = (e)=>{
   e.preventDefault()
 
   if(!Refmsg.current.value || !peerid.current) return;
  
   const DateTIme = format(new Date(), "HH:mm:ss")
   const SpecialTIme = format(new Date(), "HH:mm")

   socket.emit("PrivateMessage",{type:"message",target: peerid.current,Sender:socket.id,msg : Refmsg.current.value,time:DateTIme})
   Setmessages((prev)=>[...prev,{type:"message",Sender:socket.id,msg : Refmsg.current.value,time:DateTIme}])


   if(messages.length==0){
      Setmessages((prev)=>[...prev,{type:"time",time:SpecialTIme}])
      socket.emit("PrivateMessage",{type:"time",target:peerid.current,Sender:socket.id,msg:"",time:SpecialTIme})
  
   

   }else{
    const currenttime =Number(DateTIme.split(":")[1])
    const DateLastMessage = Number(messages[messages.length-1].time.split(":")[1])
    const DiffTime = Math.abs(DateLastMessage-currenttime)
    if(DiffTime>1){
       Setmessages((prev)=>[...prev,{type:"time",time:SpecialTIme}])
       socket.emit("PrivateMessage",{type:"time",target:peerid.current,Sender:socket.id,msg:"",time:SpecialTIme})
       
    }

    
   }
   
 


 
 
}
useEffect(()=>{
  
  const HandelReceiveMEssage = ({type,Sender,msg,time})=>{
    
  
   
   
    Setmessages((prev)=>[...prev,{type,Sender,msg,time}])
    
  }
  
  socket.on("PrivateMessage",HandelReceiveMEssage)
  return()=>{
    socket.off("PrivateMessage",HandelReceiveMEssage)
  }
},[])

 function renderMessages(){
  return(

    <>
     <button className="navbarContainer stylenavbar" 
        onMouseMove={handelmoveing}
        onMouseUp={()=>setisPick(false)}
        onMouseDown={()=>setisPick(true)} 
        
      ></button>
    
     <div className="chatContainer">

      
    
    {
      
      messages.map((item,index) => (
 
 
     
    <Fragment key={`${item.time}-${item.Sender}-${index}`}>
      {item.type =="time" ? <div className="timeMiddle" ><h4>{item.time}</h4></div>:
      item.Sender==socket.id ?
       <div className="messageRight">
        {isValidUrl(item.msg)   ?
          <a href={item.msg} target="_blank" rel="noopener noreferrer" className="text-white">{item.msg}</a>:<h5>{item.msg}</h5>}
          <div className="timeMessage">{item.time}</div> </div> : 
          <div className="messageLeft"> 
          { isValidUrl(item.msg)   ? 
           <a href={item.msg} target="_blank"  rel="noopener noreferrer" className="text-dark">{item.msg}</a> : <h5>{item.msg}</h5>} 
           <div className="timeMessage">{item.time}</div> </div> }
   
    
    </Fragment>
))

    }
     
     </div>

 <div className="inputSystem" >

  <input type="text" placeholder="Type Something ..."  ref={Refmsg}/>
  <button onClick={(e)=>HandelSend(e)} >send</button>
   
 
 
 </div>
    </>
  )
 }
 useEffect(()=>{

  const HandelRooms =(peersrooms)=>{
    //console.log(peersrooms,"<== twit")
    SetarraysRooms((prev)=>[...prev,peersrooms])

  }
  socket.on("roomsTalking",HandelRooms)
  
  return()=>{
    socket.off("roomsTalking",HandelRooms)
  }
 },[])
 const firehandler =()=>{
  
  
  setSHowAnimate(true)

  setTimeout(() => {
     setSHowAnimate(false)
      socket.emit("Unlock",{id:socket.id})
  }, 1000);
// socket.emit("Unlock",{id:socket.id})
 
 
 }
useEffect(()=>{ 
 const switchmatch = ({sender,msg})=>{
  
    dispatch({type:"SETLOVES",payload : {sender,msg}})
   
 } 
 socket.on("SwitchPrivateOffer",switchmatch)

 return()=>{
  socket.off("SwitchPrivateOffer",switchmatch)

 
 }
 

},[])
//do tanstion in item easy
function changeplace(idTarget){
 
  socket.emit("SwitchPrivateOffer",{target:idTarget,sender:socket.id})

}
useEffect(()=>{
const HandelListenner = (id)=>{
 
  
   dispatch({type:"CLEANUPLOVES",payload:id})

}
  socket.on("removeid",HandelListenner)
  return()=>{
      socket.off("removeid",HandelListenner)

  }
},[])
 function  renderrooms(){
  return(
    <>  
  
   {arraysRooms.length==0? <div style={{color:"white"}}>no users </div>:

    arraysRooms.map((item,index)=> <RoomChannel ru={(idTarget)=>changeplace(idTarget)} fnG={()=>firehandler()} socketid= {socket.id} roomid={index+1} key={item.id} x ={item.x}  y ={item.y} />) }  
   
    </>
  )
 }
 const handelrooms =()=>{
  setRoute("rooms")

  socket.emit("getusers")

 }
useEffect(()=>{

  const handelReceiverooms =(rooms)=>{
      SetarraysRooms(rooms)
  }

  socket.on("receiveUsers",handelReceiverooms)

  return()=>{
  socket.off("receiveUsers",handelReceiverooms)
  }
},[])
useEffect(()=>{


  const handeldisconnect = (rooms)=>{
         SetarraysRooms(rooms)
  }
  socket.on("disconnectPeople",handeldisconnect)

  return()=>{
     socket.off("disconnectPeople",handeldisconnect)
  }
},[])
const shoowsenders = async()=>{
  usePeerConnection.current.shareScreen()
}
const returnToscreen1 =async ()=>{
  usePeerConnection.current.returnToscreen()

}

 
const matchOffer =  ()=>{
  return(
       <> 
        <button className="navbarContainer stylenavbar" 
        onMouseMove={handelmoveing}
        onMouseUp={()=>setisPick(false)}
        onMouseDown={()=>setisPick(true)} 
        
      ></button>

   
     {usersLoveme.length==0 ?<div>no offer</div> : usersLoveme.map((item)=>
     <div className="offer">
      <div className="id">ID: {item.sender}</div>

      <div className="actions">
        <button className="accept" onClick={()=>HandelAcceptSwap(socket,item.sender,socket.id)}>قبول</button>
        <button className="annuler">إلغاء</button>
      </div>
    </div>

    
    )}
       </>

  )
}
function renderContent(){
  switch(route){
    case "renderMessage":
      return renderMessages()
    case "rooms":
      return renderrooms()
      case "matchoffer":
        return matchOffer()
     default:
          return renderMessages()
  }
}
//#0d1117


 

const StartMatch = ()=>{
   
  socket.emit("start",socket.id)
}

const  HandelSKip  = () =>{
  Lock.current = true
  // pass  to me the ball
  socket.emit("Unlock",{id:socket.id})

}


//#212529


//fix intalize the array

  return (
  <>
  
  <main>   
    <div className="text-center bg-dark text-light">{socket.id}</div>  
   { showAnimate && <div style={{position:"absolute",color:"white",width:"100%",height:"100vh",zIndex:"1000"}}><BigFire/></div>}
 
  <div className="ContainerClass" style={{backgroundColor:tehme==true? "#212529": "#fff"}}    onMouseUp={()=>setisPick(false)}  onMouseMove={isPick? handelmoveing: undefined}  > 
        <h2 > {
        isAlone==null ? <span style={{color:"purple"}} onClick={()=>socket.emit("showQuee") }>🟣 Looby</span> : 
        
        isAlone ? <span style={{color:"red"}}  onClick={()=>socket.emit("showQuee")}>🔴 Alone</span> 
        :
        <span style={{color:"green"}}  onClick={()=>socket.emit("showQuee")}>🟢 Connected</span>
        
        }
       </h2>

<div className="ContainerVideos">
 
<div className="video-tile local"> <video ref={localVideoRef}   autoPlay    className="video-self" /> </div>

<div className="video-tile remote">
{/* {isAlone  ?
  <Loader/> 
  : 
  Loading ?  <LoadingMatch/>: 
    
  <>  */}
    <div className="logo">Liinkky<span>.com</span></div>  
    <video ref={remoteVideoRef} autoPlay   className="video-remote"   />
  {/* </>
  

  } */}
</div>


</div>


 {!show &&  
 <div className="open">
  <Switch fn={()=>(setx(370) ,setshow(true),localStorage.setItem("size",370) )} />
    
    <p key={messages.length} className="nbmsg">{messages.length}</p>
   
    <div  style={{cursor:"pointer"}} onClick={()=>dispatch({type:"SetTheme",payload:!tehme})}> {tehme ? <p>☀️</p>:<p>🌑</p> }</div>
      
  </div> 
  
 }
 
<div className="SideBarMessages" style={{width:`${x}px`}}>

 <div className="navbarContainer spnav"   onClick={()=>(setx(0),setshow(false),localStorage.setItem("size",0))}>
  <button type="button" className="btn-close" aria-label="Close"></button>
 </div>
 <div   className="routeSection" >
  <h5  onClick={()=>setRoute("renderMessage")}>message</h5> 
  <h5 onClick={()=>handelrooms()}>rooms</h5>
  <h5 onClick={()=>setRoute("matchoffer")}>offer <span className="offers">{usersLoveme.length}</span></h5>
  
  </div>
 
{

  

renderContent()


}
</div>

{/* 
       setIsAlone(false)
       SetIsMatching(true)
       SetstartTimer(true)
       setdivorce(false)

        */}
    {/* {isMatching &&    
     
   <button onClick={()=>StartCall()} 
    style={{
    background:"black",
    width:"auto",
    borderRadius:"10px",
    border:"none",
    padding:"10px",
    fontWeight:"bold",
    color:"white",
    cursor:"pointer",
    osition:"absolute",
    bottom:0,
    right:0}}>
    Start Call or Prefer to chat messages
    </button> 
    
    }  */}

    {isTimeToSKipp &&(
    
     isgo ?    <button
     
      style={{   background:"red",
    width:"100px",
    borderRadius:"10px",
    border:"none",
    padding:"10px",
    fontWeight:"bold",
    color:"white",
    cursor:"pointer",
    osition:"absolute",
    bottom:0,
    margin:"2px",
    right:0}}
 
      
     onClick={()=>setisgo(false)}>Stop</button> : 
    <button 
    
    onClick={()=> HandelSKip() }
    style={{
    background:"red",
    width:"100px",
    borderRadius:"10px",
    border:"none",
    padding:"10px",
    fontWeight:"bold",
    color:"white",
    cursor:"pointer",
    osition:"absolute",
    bottom:0,
    margin:"2px",
    right:0}}>Really ?</button>)}

 

{(isAlone==null ) &&    <button 
    onClick={()=>StartMatch() }
    style=
    {{
    background:"green",
    width:"100px",
    borderRadius:"10px",
    border:"none",
    padding:"10px",
    fontWeight:"bold",
    color:"white",
    cursor:"pointer",
    osition:"absolute",
    bottom:0,
    margin:"2px",
    right:0
    }}
    >
    join
    </button> }

{/* <button onClick={()=>console.log(Proivder)}>show Provider</button> */}
   </div>






 {/* <button onClick={()=>socket.emit("swap")}>show relation offer</button> */}






  </main>
    </>
  )
}

export default Room









