import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import AuthContext from '../AuthProvider/AuthContext';
import Navbar from '../Component/Navbar';
import { Loader } from 'lucide-react';

const Root = () => {
  const {loader} = useContext(AuthContext)
  
    return (
        <div>
          <Navbar></Navbar>
       {   loader? <Loader></Loader>:
          <Outlet></Outlet>}  
        </div>
    );
};

export default Root;<h1>Root</h1>