import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import {BrowserRouter } from "react-router-dom"
import StoreGlobal from './Store/StoreGlobal.jsx'
 
createRoot(document.getElementById('root')).render(
  
   <StoreGlobal>  
      <BrowserRouter>
       
          <App />
      </BrowserRouter>
      </StoreGlobal>

  ,
)
