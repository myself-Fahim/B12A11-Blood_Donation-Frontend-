import React, { useContext } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import { Link, NavLink } from 'react-router';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';

const Navbar = () => {
    const { user } = useContext(AuthContext)

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                alert('Signout Successfully')
            })
    }

    return (
        <div>
            <div className='bg-red-800 px-[5px] lg:px-[70px]'>
                <div className="flex justify-between p-3 ">
                    <div className="navbar-start">
                        <div className="dropdown text-white">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 20 20" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex="-1"
                                className="menu menu-sm dropdown-content bg-red-800 rounded-box z-5 mt-3 w-52 p-2 shadow">
                                <NavLink to='/'>Home</NavLink>
                                <NavLink to='/search' className='mr-5 p-2' >Search</NavLink>
                                <NavLink to='/donation' className='mr-5 p-2' >Donation</NavLink>
                                <NavLink to='/dashboard'>Dashboard</NavLink>


                            </ul>
                        </div>
                        <div className=' hidden md:flex items-center gap-2'>
                            <div className='w-[30px] h-[30px] '>
                                <img src="https://i.ibb.co.com/JRZxnf9H/blood-drop-with-plus-heart-shape-blood-donation-concept-blood-donation-logo-illustration-vector.jpg"
                                    className='w-full h-full rounded-full object-cover' />
                            </div>

                            <a className=" text-xl text-white font-bold">Blood-Donation</a>
                        </div>
                        <a className="md:hidden text-xl text-white font-bold shrink-0">Paw-Mart</a>
                    </div>
                    <div className="navbar-center mr-5 lg:mr-0 hidden lg:flex">
                        <ul className=" px-1 text-white font-bold">
                            <NavLink to='/' className='mr-5 py-2 px-3'>Home</NavLink>
                            <NavLink to='/search' className='mr-5 p-2' >Search</NavLink>
                            <NavLink to='/donation' className='mr-5 p-2' >Donation</NavLink>
                            <NavLink to='/dashboard' className='mr-5 p-2' >Dashboard</NavLink>


                        </ul>
                    </div>

                    <div className="navbar-end flex gap-2 md:gap-3">
                        {
                            user ? <Link onClick={handleSignout} className='btn px-2 md:px-6' to='/login'>Log Out</Link> :
                                <>
                                    <Link className='btn' to='/login'>Login</Link>
                                </>
                        }

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;