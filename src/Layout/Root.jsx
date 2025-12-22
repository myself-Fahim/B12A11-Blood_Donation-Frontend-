import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import AuthContext from '../AuthProvider/AuthContext';
import Navbar from '../Component/Navbar';
import Loader from '../Component/Loader';


const Root = () => {
  const {loading} = useContext(AuthContext)



  return (

    <div>
      {
        loading ? <Loader></Loader> :
          <div>
            <Navbar></Navbar>
            <Outlet></Outlet>
          </div>
      }
    </div>
  );
};

export default Root; <h1>Root</h1>