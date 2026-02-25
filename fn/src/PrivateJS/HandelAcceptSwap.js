//HandelAcceptSwap(socket,item.sender,socket.id)

export function HandelAcceptSwap(io, sender, me) {
    console.log("the sender",sender,"me", me)
    //io.to(sender)
    io.emit("SwapNodes",{sender,me})

}
 


 