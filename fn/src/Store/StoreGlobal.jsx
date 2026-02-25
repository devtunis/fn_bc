import { createContext, useContext ,useEffect,useReducer} from "react";




 
const intialeState = {
    tehme :true,
    usersLoveme : []
}

const reducer = (state,action)=>{
    switch(action.type){
        case "SetTheme":
            return  {...state,tehme:!state.tehme}
        case "SETLOVES":
            return {
                ...state,
                usersLoveme : [...state.usersLoveme,action.payload]
            }
        case 'CLEANUPLOVES':
            return {
                ...state,
                usersLoveme: state.usersLoveme.filter(id=>id.sender!=action.payload)
            }
            default:
                return state

    }
}
const CreateContext = createContext();
const StoreGlobal = ({children}) => {

    const [state,dispatch] = useReducer(reducer,intialeState)
    
    // useEffect(()=>{
    //     console.log(state)
    //   },[state])

  return (
      <CreateContext.Provider value={{tehme:state.tehme,dispatch,usersLoveme:state.usersLoveme}} >
         {children}
      </CreateContext.Provider>
  )
}

export const useGLobalContext =()=>{
    return useContext(CreateContext)
}
export default StoreGlobal