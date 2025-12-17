import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import AuthContext from '../AuthProvider/AuthContext';
import Navbar from '../Component/Navbar';

const Root = () => {
  const {loader} = useContext(AuthContext)
  
    return (
        <div>
          <Navbar></Navbar>
       {   loader? <p>Loading....</p> :
          <Outlet></Outlet>}  
        </div>
    );
};

export default Root;<h1>Root</h1>