import Waves from "../waves/Waves"
 
import "./RoomChannel.css"
 const facePictures = [
  "https://randomuser.me/api/portraits/men/1.jpg",
  "https://randomuser.me/api/portraits/women/2.jpg",
  "https://randomuser.me/api/portraits/men/3.jpg",
  "https://randomuser.me/api/portraits/women/4.jpg",
 
  "https://randomuser.me/api/portraits/women/6.jpg",
  "https://randomuser.me/api/portraits/men/7.jpg",
  "https://randomuser.me/api/portraits/women/8.jpg",
  "https://randomuser.me/api/portraits/men/9.jpg",
  "https://randomuser.me/api/portraits/women/10.jpg"
];
 


const RoomChannel = ({fnG,roomid,x,y ,socketid,ru}) => {
   
  return (
    <div className="room-channel" >
      <div className="titleroom">Room {roomid}</div>

      <div className="inforamtion_room">

        <div className="users_information">
          <div className="user1 user"><img src={facePictures[roomid]}/> <h2 style={{fontSize:"10px",color: socketid==x  && "red"}}>{x}</h2>   {![x,y].includes(socketid) ? <span onClick={()=>ru(x)} >🔗</span> : <span onClick={()=>fnG()}>🔓</span>}   </div>
          <div className="user2 user"><img src={facePictures[roomid+1]}/> <h2 style={{fontSize:"10px" ,color:socketid==y && "red"}}>{y}</h2> { ![x,y].includes(socketid)? <span onClick={()=>ru(y)} >🔗</span> :<span onClick={()=>fnG()}>🔓</span>}</div>
          
        </div>

        <div className="wavesUsers"><Waves/></div>
      </div>

      
    </div>
  )
}

export default RoomChannel