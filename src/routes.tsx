import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import UserTable from "./components/UserTable";
import UserDetail from "./components/UserDetail";

const router = createBrowserRouter([
    {
        path:'/',
        element:<App/>,
        children:[
            {index:true , element:<UserTable/>},
            {path:'/user/:username' , element:<UserDetail/>} 
        ]
    }
])

export default router