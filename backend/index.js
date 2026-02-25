import 'dotenv/config';        
import express from 'express';
import { Server } from 'socket.io';
import {createServer} from "node:http"
import Quee from './Quee.js';
import {emitUser,emitone} from './functionEit/emitUser.js';
import cleanupOffeers from './functionEit/cleanupOffeers.js';
import { CleanUpDIvorce, MatchingCouple, MatchingCoupleSpecial } from './functionEit/cleanUpDIvorce.js';
import { Mutex } from 'async-mutex';
import { Make, Make2 } from './handlers/Handlers.js';
import limiter from './middleware/Limmter.js';
 
// fix the time when you connected the app
const app = express();

const httpServer = createServer(app)
const io  = new Server(httpServer,{
    cors:{
        origin:"https://fn-bc.vercel.app"
    }
})
 
 
 

function fetchRooms(){
          const arr  = []
          const  pairs  = [...queeSet.getrooms().values()].map((r)=>r.peers)
          pairs.forEach((item)=>{
          const r = {id:item[0]+item[1],x : item[0],y:item[1]}
          arr.push(r)
          })
         
          io.emit("disconnectPeople",arr)
}

app.use(limiter)



 

const queeSet = new Quee()

const userLocks = new Map();


function getUserLock(userId) {
  if (!userLocks.has(userId)) userLocks.set(userId, new Mutex());
  return userLocks.get(userId);
}

async function runWithUserLocks(users, fn) {
 
  const sortedUsers = [...users].sort();
  const acquiredLocks = [];

  try {
    for (const u of sortedUsers) {
      const lock = getUserLock(u);
      await lock.acquire();
      acquiredLocks.push(lock);
    }

    await fn() 
  } finally {
   
    acquiredLocks.forEach(lock => lock.release());
  }
}


 
let UnlockMessage = 0
let timeBannde ;

io.on("connection",async(socket)=>{
 

 


  console.log("connected ✅",socket.id)
 
   

 
 




 

 socket.on("SwapNodes",async({sender,me})=>{

    await  runWithUserLocks([sender, me], async () => {

    const array = queeSet.AccetSawap(sender,me)


 
    array["idCleanDivorces"] && array["idCleanDivorces"].forEach((item)=>{
      CleanUpDIvorce(io,queeSet,item[0],item[1])
      
    })
    array["MatchingCouple"] &&   array["MatchingCouple"].forEach((item)=>{
      MatchingCouple(io,queeSet,item[0],item[1])
    })
    array["AlonePerson"] &&  array["AlonePerson"].forEach((item)=>{
       emitone(io,"alone",item,true)
    })
   array["MatchingSpecialCouple"] &&  array["MatchingSpecialCouple"].forEach((item)=>{
      MatchingCoupleSpecial(io,queeSet,item[0],item[1])
    })
  
    fetchRooms()
 
    })
  

   
 })




//-----------------------------------------swap node----------------------------------------------




// and devtools   line 87 check it  for hack {target}
// and do race condtion of users skippper : : : :: :: : important
// and see beahvior many skeep this button apepar <skip>

 


socket.on("Unlock",  ({id})=>{
//   let now = new Date()
//  if(now - timeBannde>=5000){
//   UnlockMessage = 0;
//  }

//  if(UnlockMessage>=2){
//   console.log("you alot")
//   timeBannde =new Date()
//   return
//  }


      const SkipResponse = queeSet.HandelSkip(id)
 
      for(const TypeAction in SkipResponse){
       Make[TypeAction](io,queeSet,SkipResponse[TypeAction])
      }
      console.log(SkipResponse)
      fetchRooms()
   //UnlockMessage++;
 })
 
 




socket.on("swap",(id)=>{
  console.log(queeSet.getrealtionoffer())
})







socket.on("start",(id)=>{
  
   if(id!=undefined || !id){
   queeSet.AddItem(id)
   }



  const  next = queeSet.bringIce(id)
  if(!next) {
    
      emitone(io,"alone",id,true)
    
  }
  else{
  
   
 
   
      cleanupOffeers(queeSet,next,io)

      queeSet.delete(id)
      queeSet.delete(next)
  
      emitUser(io,"matching",next,id,true)
      queeSet.AddCouple(next,id)
  }



})








socket.on("SwitchPrivateOffer",({target,sender})=>{
   
    queeSet.addRealtionCheat(sender,target)
    io.to(target).emit("SwitchPrivateOffer",{sender,msg:"ask for matche"})
    
})
socket.on("ice-candidate",({candidate,target })=>{
  io.to(target).emit("ice-candidate",candidate)
 
})
 socket.on("Offer",({sdp,target,myid })=>{
   
  io.to(target).emit("Offer",{sdp,myid})
 
})
socket.on("Answer",({sdp,target})=>{
 
  io.to(target).emit("Answer",sdp)
})
socket.on("showQuee",()=>{
     const date = new Date()
     queeSet.display()
     console.log(`${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`)
  

    

})
socket.on("listenRooms",(room)=>{
      
     queeSet.addChannel(room.Key,{peers :room.peers})
     io.emit("roomsTalking",{uniqueId : room.Key,x : room.peers[0],y :room.peers[1]}); 
    

})
socket.on("PrivateMessage",({type,target,Sender,msg,time})=>{
    
  io.to(target).emit("PrivateMessage",{type,Sender,msg,time})
})
socket.on("getusers",()=>{
    const arr = []
      const pairs = [...queeSet.getrooms().values()].map((i)=>i.peers)
      pairs.forEach((item)=>{
      const r = {id:item[0]+item[1],x : item[0],y:item[1]}
      arr.push(r)
      })
       


  socket.emit("receiveUsers",arr)
})
socket.on("disconnect",()=>{
   console.log("disconnect ❌",socket.id)
   const ResponseDisconnect   = queeSet.HandelDisconnect(socket.id)
   for(const TypeOfAction in ResponseDisconnect){
  
    Make2[TypeOfAction](io,queeSet,ResponseDisconnect[TypeOfAction])
     fetchRooms()
   }

   console.log(ResponseDisconnect)
  
  })
 
 
})
 




































app.get("/",(req,res)=>{
  res.status(200).json({mesage :"gmail : nahdigyth@gmail.com"})
})










const PORT = 8080
httpServer.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
 















