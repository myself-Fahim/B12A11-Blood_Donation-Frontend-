import { createBrowserRouter } from "react-router";

import Login from "../Pages/login";
import Register from "../Pages/register";
import Home from "../Pages/Home";
import Root from "../Layout/Root";
import DashBoardLayout from "../dashboardLayout/dashBoardLayout";
import DashboardHome from "../Dashboard/Home";
import Profile from "../Dashboard/Profile";
import MyDonation from "../Dashboard/MyDonation";
import AddRequest from "../Dashboard/AddRequest";



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
    },

    {
        path:'dashboard',
        Component:DashBoardLayout,
        children:[
            {
               path:'/dashboard',
               element:<DashboardHome></DashboardHome>
            },
            {
                path:'profile',
                element:<Profile></Profile>
            },
            {
                path:'mydonation',
                element:<MyDonation></MyDonation>
            },
            {
                path:'request',
                element:<AddRequest></AddRequest>
            },
        ]
    }
])

export default router