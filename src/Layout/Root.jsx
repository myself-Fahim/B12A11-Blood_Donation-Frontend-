import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router';
import AuthContext from '../AuthProvider/AuthContext';
import Navbar from '../Component/Navbar';
import Loader from '../Component/Loader';
import Footer from '../Component/Footer';

const Root = () => {
  const {loading} = useContext(AuthContext);

  return (
    <div className="min-h-screen flex flex-col">
      {
        loading ? <Loader /> :
          <>
            <Navbar />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </>
      }
    </div>
  );
};

export default Root;