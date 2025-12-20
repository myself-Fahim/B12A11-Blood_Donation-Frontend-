import React, { useContext } from 'react';
import { Outlet } from 'react-router';
import Aside from '../Component/Aside';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';

const DashBoardLayout = () => {
   
    return (
        <div className='h-screen'>
            <div className='flex h-full'>
                <Aside></Aside>
                {

                 <div className='flex-1 h-full overflow-y-auto'>
                      <Outlet></Outlet>
                </div>
                }
             
            </div>
           
        </div>
    );
};

export default DashBoardLayout;