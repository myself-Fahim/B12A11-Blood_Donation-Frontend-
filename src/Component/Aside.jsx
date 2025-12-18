import React, { useState } from 'react';
import { NavLink } from 'react-router';

const Aside = () => {
    const [isActive,setIsActive] = useState(false)
    return (
        <div>
            <div className="drawer lg:drawer-open">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col items-center justify-center">
                    {/* Page content here */}
                    <label htmlFor="my-drawer-3" className="btn drawer-button lg:hidden">
                        Open drawer
                    </label>
                </div>
                <div className="drawer-side ">
                    <label htmlFor="my-drawer-3" aria-label="close sidebar" className="drawer-overlay "></label>
                    <ul className="menu bg-red-950 text-white min-h-full w-80 p-4">
                        {/* Sidebar content here */}
                        <h1 className='text-3xl font-bold mb-8 
                      '>Admin Pannel</h1>

                        <div className='flex flex-col'>
                            <NavLink to='/dashboard' end className='text-xl font-bold mb-3 py-2 px-2'>Home</NavLink>
                            <NavLink to='/dashboard/Profile' className='text-xl font-bold py-2 px-2 mb-3'>Profile</NavLink>
                            <NavLink to='/dashboard/mydonation' className='text-xl font-bold py-2 px-2 mb-5'>My Donation</NavLink>
                        </div>

                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Aside;