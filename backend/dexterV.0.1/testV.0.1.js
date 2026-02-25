import { CleanUpDIvorce } from "../functionEit/cleanUpDIvorce";

 
function AccpetSwap(io,sender,me){
       if(!sender || !me ) return;
 
       const Partner = this.HasRelation(me) 
       CleanUpDIvorce(io,this,me,Partner)
 
       const SenderPartner = this.HasRelation(sender)
       if(SenderPartner){
          CleanUpDIvorce(io,this,sender,SenderPartner)
       }
   // this part good
       MatchingCouple(io,this,me,sender)
 
       const exPartner = this.bringIce(Partner)
       if(exPartner){
         MatchingCoupleSpecial(io,this,exPartner,Partner)
       }else{
         this.AddItem(Partner)
         emitone(io,"alone",Partner,true)
       }
 
 
 
       if(SenderPartner){
         const exSenderPartner = this.bringIce(SenderPartner)
         if(exSenderPartner){
         MatchingCoupleSpecial(io,this,exSenderPartner,SenderPartner)
         }else{
              this.AddItem(SenderPartner)
              emitone(io,"alone",SenderPartner,true)
         }
       }
 
 
 
 
 
    
     }















socket.on("skip",({id})=>{
   

   const idPartner  =  queeSet.HasRelation(socket.id)
   const key= [id,idPartner].sort().join("_")
 
   queeSet.deleteKeyChannel(key)
   // should be clean it here by to io.to([idpartenr,socketid]) important!
   io.to([idPartner]).emit("divorce",{test:true,yourdivorce:id})
   queeSet.DelteCouple(id,idPartner)
   const ChanceForCheater =  queeSet.bringIce(id)
 
    if(ChanceForCheater){
      queeSet.delete(ChanceForCheater)
      emitUser(io,"matching",ChanceForCheater,id,true)
      queeSet.AddCouple(ChanceForCheater,id)
      cleanupOffeers(queeSet,id,io)
    } 
    else{
           
           queeSet.AddItem(id)
           emitone(io,"alone",id,true)
       }

    const ChancePartner  =  queeSet.bringIce(idPartner)

 

    if(ChancePartner){
      queeSet.delete(ChancePartner)
      queeSet.AddCouple(ChancePartner,idPartner)
      emitUser(io,"matching",ChancePartner,idPartner,true)
      cleanupOffeers(queeSet,idPartner,io)
    }else{
       queeSet.AddItem(idPartner)
       emitone(io,"alone",idPartner,true)
   
    }    
    fetchRooms()
})









  
   const SkipResponse = queeSet.HandelSkip(id)
 
   SkipResponse.resetMatch.length>0 && (
       SkipResponse.resetMatch.forEach((id)=>{
        CleanUpDIvorce(io,queeSet,id[0],id[1])
       })
   )
   SkipResponse.aloneperson.length>0 && (
       SkipResponse.aloneperson.forEach((id)=>{
        emitone(io,"alone",id,true)
       })
   )

    SkipResponse.sessionMatching.length>0 && (
       SkipResponse.sessionMatching.forEach((id)=>{
       MatchingCouple(io,queeSet,id[0],id[1])
       })
   )


   








  function HandelResponse(pairs,actionType,io,queeSet){
   
    pairs.length > 0 && (() => {
        pairs.forEach((id)=>{
         
          switch(actionType){
            case "CleanUpDIvorce":
             CleanUpDIvorce(io,queeSet,id[0],id[1])
            break
            case "aloneperson":
              emitone(io,"alone",id,true)
            break
            case "MatchingCouple":
            MatchingCouple(io,queeSet,id[0],id[1])
            break
          }
        })
    })();


  }



 // gargbage 

   //  SkipResponse.resetMatch.length>0 && (
  //      SkipResponse.resetMatch.forEach((id)=>{
  //       CleanUpDIvorce(io,queeSet,id[0],id[1])
  //      })
  //  )
  //  SkipResponse.aloneperson.length>0 && (
  //      SkipResponse.aloneperson.forEach((id)=>{
  //       emitone(io,"alone",id,true)
  //      })
  //  )

  //   SkipResponse.sessionMatching.length>0 && (
  //      SkipResponse.sessionMatching.forEach((id)=>{
  //      MatchingCouple(io,queeSet,id[0],id[1])
  //      })
  //  )




//pairs.forEach(item => handlers[actionType](io, queeSet, item));




















// search------------------------------------------------------

queeSet.delete(socket.id) 
        
       cleanupOffeers(queeSet,socket.id,io)



        if(queeSet.HasRelation(socket.id)){
          
            
            const idPartner  =  queeSet.HasRelation(socket.id)
            const key= [socket.id,idPartner].sort().join("_")

            queeSet.deleteKeyChannel(key)

            io.to(idPartner).emit("divorce",{test:true,yourdivorce:socket.id})

            queeSet.DelteCouple(socket.id,queeSet.HasRelation(socket.id))
            const Chance =  queeSet.bringIce(idPartner)

            if(Chance){
            queeSet.delete(Chance)
            emitUser(io,"matching",Chance,idPartner,true)
            queeSet.AddCouple(idPartner,Chance)
            } else{
             queeSet.AddItem(idPartner)
             emitone(io,"alone",idPartner,true)
            }
          
         
 
        }
        
         fetchRooms()






















         