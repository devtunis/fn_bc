function cleanupOffeers(queeSet, next, io) {

     if (queeSet.hasRealtion(next)) {
          queeSet.hasRealtion(next).forEach((itertor) => {
               io.to(itertor).emit("removeid", next)

          })

     }
     queeSet.delteRelationChear(next)
}


export default cleanupOffeers 
