import React from 'react';
import { Outlet } from 'react-router';

const DashBoardLayout = () => {
    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoardLayout;