import { createBrowserRouter } from "react-router";
import Login from "../Pages/login";
import Register from "../Pages/register";
import Home from "../Pages/Home";
import About from "../Pages/About";
import Contact from "../Pages/Contact";
import Blog from "../Pages/Blog";
import DonationDetails from "../Pages/DonationDetails";
import Root from "../Layout/Root";
import DashBoardLayout from "../dashboardLayout/dashBoardLayout";
import DashboardHome from "../Dashboard/Home";
import Profile from "../Dashboard/Profile";
import MyDonation from "../Dashboard/MyDonation";
import AddRequest from "../Dashboard/AddRequest";
import PrivateRoute from "./PrivateRoute";
import UpdateDonation from "../Dashboard/UpdateDonation";
import DonationDetailsPrivate from "../Dashboard/DonationDetails";
import AllUser from "../Dashboard/AllUser";
import AllDonation from "../Dashboard/AllDonation";
import Search from "../Pages/Search";
import DonationPublic from "../Pages/DonationPublic";

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
                path:'search',
                Component:Search
            },
            {
                path:'donation',
                Component:DonationPublic
            },
            {
                path:'donation-details/:id',
                Component:DonationDetails
            },
            {
                path:'about',
                Component:About
            },
            {
                path:'contact',
                Component:Contact
            },
            {
                path:'blog',
                Component:Blog
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
        element:<PrivateRoute>
            <DashBoardLayout></DashBoardLayout>
        </PrivateRoute>,
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
            {
                path:'updatedonation/:id',
                element:<UpdateDonation></UpdateDonation>
            },
            {
                path:'donation-request-details/:id',
                element:<DonationDetailsPrivate></DonationDetailsPrivate>
            },
            {
                path:'/dashboard/admin/alluser',
                element:<AllUser></AllUser>
            },
            {
                path:'/dashboard/admin/allrequest',
                element:<AllDonation></AllDonation>
            },
        ]
    }
])

export default router