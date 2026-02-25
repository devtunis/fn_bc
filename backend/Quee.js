

function pushIds(array,...args){
     array.push(...args)
}
function pushSKipper(array,...args){
     array.push(...args)
}
function pushDisconnect(array,...args){
    array.push(...args)
}

export default class Quee {
    
    constructor(){
       
        this.k  = new Set()
        this.v  = new Map()
        this.c = new Map()
        this.f = new Map()


    }
    isIdinqueee(id){
        return this.k.has(id)
    }
    delteRelationChear(id){

        if(this.f.has(id)){
            this.f.delete(id)
        }
       
    }
    addRealtionCheat(sender,target){
        if(this.f.has(sender)){
          this.f.get(sender).push(target)   
        }
        else{ 
             
            this.f.set(sender,[target])
        }
        




    }
    getrealtionoffer(){
        return this.f
    }
    hasRealtion(id){ 
        return this.f.has(id) ? this.f.get(id) : null
    }
    addChannel(key,value){
        this.c.set(key,value)
    }
    deleteKeyChannel(key){
        this.c.delete(key)
    }
    HasRelation(id){
        return this.v.has(id)?this.v.get(id): false
    }
    AddCouple(key,value){
    this.v.set(key,value)
    this.v.set(value,key)
    
    } 
    DelteCouple(key,value){
    this.v.delete(value)
    this.v.delete(key)
 
    
    }
    AddItem(key){
    this.k.add(key)
    }
    display(){
    console.log("quee",this.k)
    console.log("-------")
    console.log("this is the freind ship list",this.v)
    console.log("rooms",this.c)
    }
    delete(id){
    if(this.k.has(id)){
       this.k.delete(id)
    } 
    
    }
    getrooms(){
    return this.c
    }
    bringIce(passer){
    for(const value of this.k){
        if(value!=passer){
            return value
        }
       }
       return null
    }
    AccetSawap(sender,me){
        let  Data = {}
        Data["idCleanDivorces"] = []
        Data["MatchingCouple"]  = []
        Data["MatchingSpecialCouple"] = []
        Data["AlonePerson"] =[]
        if(!sender || !me) return

        const Partner = this.HasRelation(me)
        if(Partner){
        
        pushIds(Data["idCleanDivorces"],[me,Partner])
        }
    

        
        const SenderPartner = this.HasRelation(sender)
        if(SenderPartner){
            pushIds(Data["idCleanDivorces"],[sender,SenderPartner])
        }

        
    
        pushIds(Data["MatchingCouple"],[me,sender])

        this.delete(sender)
        

        const exPartner = this.bringIce(Partner)
        if(exPartner){
        
        pushIds(Data["MatchingSpecialCouple"],[exPartner,Partner])
        }else{
            
            this.AddItem(Partner)
            pushIds(Data["AlonePerson"],Partner)
        }
        
    
        if(SenderPartner){
            const  exSenderPartner  = this.bringIce(SenderPartner) 
            if(exSenderPartner){
                this.delete(exSenderPartner)
            
                pushIds(Data["MatchingSpecialCouple"],[exSenderPartner,SenderPartner])
                
            }else{
                this.AddItem(SenderPartner)
                pushIds(Data["AlonePerson"],SenderPartner)
                
            }
        }

        return Data


    }
    HandelSkip(id){
        const data = {
            resetMatch: [],
            aloneperson : [],
            sessionMatching: []
            

        } 

        const PartnerId = this.HasRelation(id) 
        pushSKipper(data.resetMatch,[id,PartnerId])
        const next = this.bringIce(id)
        if(next){
            this.delete(next)
            pushSKipper(data.sessionMatching,[id,next])
            
        }else{
            this.AddItem(id)
            pushSKipper(data.aloneperson,id)


        }

    

        const ChancePartner = this.bringIce(PartnerId)
        if(ChancePartner){
            this.delete(ChancePartner)
            pushSKipper(data.sessionMatching,[PartnerId,ChancePartner])
        }else{
            this.AddItem(PartnerId)
            pushSKipper(data.aloneperson,id)
        }



        return data
       
    }
    HandelDisconnect(id){
        
        const data = {
            divorce : [],
             aloneperson :[],
              sessionMatching : [] 
           
          
        }
       this.delete(id)
       const Partnerid = this.HasRelation(id)
       
       if(Partnerid){
        pushIds(data.divorce,[id,Partnerid])
        const FindPartner = this.bringIce(Partnerid)
        if(FindPartner){
            
                this.delete(FindPartner)
                pushDisconnect(data.sessionMatching,[Partnerid,FindPartner])
        }else{
          
            pushIds(data.aloneperson,Partnerid)
        }
       }
       return data
    } 
    StartMatch(){
        console.log("start match")
    }


}













 


