 
import socket from './socket'
import { useEffect } from 'react';

const SocketProvider = ({children }) => {
      useEffect(()=>{
        socket.connect()

        return()=>{
            socket.disconnect()
            socket.removeAllListeners()
        }
      },[])
     

socket.on("connect_error", (err) => {
  console.log("Connection failed:", err.message); 
});
  return (
    <>{children}</>
  )
}

export default SocketProvider

 