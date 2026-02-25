import io from "socket.io-client"


const socket = io("https://fn-bc-2.onrender.com",
    {
        autoConnect:false,
 
    }
)

export default  socket

 
