import { CleanUpDIvorce, MatchingCouple } from "../functionEit/cleanUpDIvorce.js"
import { emitone } from "../functionEit/emitUser.js"

 


const safeForEach  =(array,cb)=>{
    if(!Array.isArray(array) || array.length==0) return
    array.forEach(cb)
}
export const Make = {
 
  resetMatch:(io,queeSet,pairs)=>{
     safeForEach(pairs,(item)=>{
          CleanUpDIvorce(io,queeSet,item[0],item[1])
     })
    
  },
  
  aloneperson:(io,_,pairs)=>{
    safeForEach(pairs,(id)=>{
          emitone(io,"alone",id,true)
    })
   
  },
  
  sessionMatching :(io,queeSet,pairs)=>{
    safeForEach(pairs,(item)=>{
         MatchingCouple(io,queeSet,item[0],item[1])
    })
   

  }
 
  
}
export const Make2  = {
    divorce :(io,queeSet,pairs)=>{
           
           safeForEach(pairs,(id)=>{
            CleanUpDIvorce(io,queeSet,id[0],id[1])
           })
           
 


    },
    aloneperson:(io,queeSet,pairs)=>{
           
           safeForEach(pairs,(itemId)=>{
               emitone(io,"alone",itemId,true)
               queeSet.AddItem(itemId)
           })
               
        
    }
    ,
    sessionMatching:(io,queeSet,pairs)=>{
            
      

        safeForEach(pairs,(id)=>{
            MatchingCouple(io,queeSet,id[0],id[1])
        })

    }
}