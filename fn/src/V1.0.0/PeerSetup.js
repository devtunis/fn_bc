/*!
 * PeerSetup.js
 * -------------------------------------------------------------
 * WebRTC Peer Connection Utility
 * -------------------------------------------------------------
 * Author: Ghaith Nahdi
 * License: MIT
 * 
 * Description:
 *  This class simplifies the setup of WebRTC peer connections
 *  for browser-to-browser video chat applications. It handles:
 *    - Local camera/mic initialization
 *    - Adding local and remote tracks
 *    - Buffering and adding ICE candidates
 *    - Creating and answering offers
 *    - Graceful cleanup of resources
 * 
 * Usage:
 *    import PeerSetup from './PeerSetup';
 *    const peerSetup = new PeerSetup(localVideoRef, peerRef, remoteVideoRef);
 *    await peerSetup._intializCamera();
 * -------------------------------------------------------------
 */





import iceConfiguration from "./iceConfiguration";  
import constraint from "./constraint";

class PeerSetup{
 
    constructor (localVideoRef,peer,remoteVideoRef) {
   
        this.peer = peer   || new RTCPeerConnection(iceConfiguration)
        this.localVideoRef = localVideoRef
        this.remoteVideoRef = remoteVideoRef 
        this.localStream = null
        this.buffer = []
      // should be work here  this._intializCamera()
     
    } 

     putwaitice(ice){
        this.buffer.push(ice)
     }
     getbuffer(){
        return this.buffer
     }

    
     addicefromthebuffer(){
       if(this.buffer.length>0){
     
        this.buffer.forEach(async(ice)=>{
        await this.peer.current.addIceCandidate(new RTCIceCandidate(ice));
        console.log("✅ ICE candidate eat it  successfully from buffer")
        })
        this.buffer = []
        }
     }



    async _intializCamera(){

        this.localStream  = await navigator.mediaDevices.getUserMedia(constraint)
        this.localVideoRef.current.srcObject = this.localStream

        this.addlocaltracks()
        this.addremotetracks()

        
            

    }

    close(){
        const D = new Date()
        console.log("clean up the function ...",D.getHours(),":",D.getMinutes())
        this.localStream?.getTracks().forEach(track=>track.stop())
         // track
        if(this.localVideoRef){

            this.localVideoRef.srcObject = null 
        }
        if(this.remoteVideoRef){
            this.remoteVideoRef.srcObject  = null
        }
         if(this.peer.current){

         this.peer.current?.close()
         this.peer.current = null
       
         this.peer.onicecandidate  = null

         }
         this.localStream = null
        
         
    }
    
    addlocaltracks(){
     this.localStream.getTracks().forEach(track => {
            this.peer.current.addTrack(track,this.localStream)
            
        });
    }
   
    addremotetracks(){
       
      this.peer.current.ontrack  = (event)=>{
        
        this.remoteVideoRef.current.srcObject  = event.streams[0]
      }
    }

    async CreateOffer() {
    try {
      
        const offer = await this.peer.current.createOffer();
        await this.peer.current.setLocalDescription(offer);

        
        return this.peer.current.localDescription;  
    } catch (error) {
        console.log("Error creating offer:", error);
        throw error;
    }
    }

    async CreateAnswer(offer){
        try{ 
          // should be the offer parse things  
        await  this.peer.current.setRemoteDescription(new RTCSessionDescription(offer))             
        const answer =  await  this.peer.current.createAnswer()
        await  this.peer.current.setLocalDescription(answer)
        return this.peer.current.localDescription
        }catch(error){
            console.log(error)        
            throw error
        }
    }

 async MakeConnectionAB (setRemoteAnswer)  {
 try {
          await this.peer.current.setRemoteDescription(setRemoteAnswer);
          console.log("✅✅✅✅ A got remote answer, connection is ready!");


     
     
 }catch(error){
    console.log(error)
    throw error
 }

 }

    
  async addIceF(data){
    try {
     
        await this.peer.current.addIceCandidate(new RTCIceCandidate(data));
        console.log("✅ ICE candidate added successfully");
        
        
    } catch(err) {
        console.error("❌ Failed to add ICE candidate:", err);
    }
}
 
async shareScreen (){
        const newStream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
        const newTrack = newStream.getVideoTracks()[0];

        // replace track in PeerConnection
        const sender = this.peer.current.getSenders().find(s => s.track.kind === "video");
        sender.replaceTrack(newTrack);

        newTrack.onended = async() => {
            console.log("Screen sharing has stopped.");
            // Perform cleanup or update UI
            await this.returnToscreen()
            };


}
   async returnToscreen (){
        const newStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        const newTrack = newStream.getVideoTracks()[0];

        // replace track in PeerConnection
        const sender = this.peer.current.getSenders().find(s => s.track.kind === "video");
        sender.replaceTrack(newTrack);

        // event to track the screen if stoped sharing

} 

async ping(){
    console.log("here the ping establish")
}



}

export default PeerSetup





















// Record the state of the server is down or no

// pc.oniceconnectionstatechange = () => {
 //  console.log('ICE:', pc.iceConnectionState);
// };
//  if (pc) pc.close();

// pc.addEventListener("iceconnectionstatechange", (event) => {
//   if (pc.iceConnectionState === "failed") {
//     /* possibly reconfigure the connection in some way here */
//     /* then request ICE restart */
//     pc.restartIce();
//   }
// })