import React from 'react';
import { Outlet } from 'react-router';
import Aside from '../Component/Aside';

const DashBoardLayout = () => {
    return (
        <div>
            <div className='flex'>
                <Aside></Aside>
                 <Outlet></Outlet>
            </div>
           
        </div>
    );
};

export default DashBoardLayout;