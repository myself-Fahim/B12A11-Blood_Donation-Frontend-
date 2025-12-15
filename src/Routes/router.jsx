import { createBrowserRouter } from "react-router";

import Login from "../Pages/login";
import Register from "../Pages/register";
import Home from "../Pages/Home";
import Root from "../Layout/Root";
const router = createBrowserRouter([
    {

        path:'/',
        Component:Root,
        children:[
            {
                path:'/',
                Component:Home
            },
            {
                path:'login',
                Component:Login
            },
            {
                path:'register',
                Component:Register
            }
        ]
    }
])

export default router