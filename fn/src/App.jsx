import React from 'react'
import {Routes,Route } from "react-router-dom"
import SocketProvider from './SocketProvider/SocketProvider'
import Waves from './waves/Waves'
import Fire from './Componet/Fire'
import Test from './Test'
 
 

const Room =  React.lazy(()=>import("./Componet/Room"))

const App = () => {

  return (
    <Routes>
     
       
       <Route path='/' element={<>
        
        <React.Suspense fallback={<div>waiting </div>}>
        <SocketProvider> 
          <Room/>
          </SocketProvider>
        </React.Suspense>
      
        </>}/>
        <Route path='/t' element={<Fire/>}/>
        <Route path='/test' element={<Test/>}/>
        
    </Routes>


  )
}

export default App