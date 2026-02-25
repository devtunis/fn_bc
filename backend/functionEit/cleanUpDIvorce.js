import cleanupOffeers from "./cleanupOffeers.js"
import { emitone,emitUser } from "./emitUser.js"

export function CleanUpDIvorce(io,queeSet,id1,id2){
 emitone(io,"divorce",id1,{test:true,yourdivorce:id2})
 emitone(io,"divorce",id2,{test:true,yourdivorce:id1})

 const key = [id1,id2].sort().join("_")
 queeSet.deleteKeyChannel(key)
 queeSet.DelteCouple(id1,id2)
}

export function MatchingCouple(io,queeSet,id1,id2)
{
        //  if(queeSet.isIdinqueee(id2)){
        //     queeSet.delete(id2)
        //  }
        //   queeSet.delete(id1)
         emitUser(io,"matching",id2,id1,true)
         queeSet.AddCouple(id1,id2)
         cleanupOffeers(queeSet, id1, io)
         cleanupOffeers(queeSet, id2, io) 
         

}
 


export function MatchingCoupleSpecial(io,queeSet,id1,id2)
{
   
         queeSet.delete(id1)
         queeSet.AddCouple(id1,id2)
         emitUser(io,"matching",id1,id2,true)
         cleanupOffeers(queeSet, id1, io)
         cleanupOffeers(queeSet, id2, io) 
         

}






 

