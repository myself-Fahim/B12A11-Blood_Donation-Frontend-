import React, { useContext, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import AuthContext from "../AuthProvider/AuthContext";
import useAxiosSecure from "../Hooks/useAxiosSecure";
import toast, { Toaster } from 'react-hot-toast';
import { FiHome, FiUser, FiHeart, FiPlus, FiUsers, FiList, FiSettings, FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { BiDonateBlood } from 'react-icons/bi';
import { MdAdminPanelSettings } from 'react-icons/md';

const Aside = () => {
    const { role, user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [modifyUser, setModifyUser] = useState(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        if (!user?.email) return;
        axiosSecure('/users')
            .then(res => {
                const loginUser = res.data.find(data => data.email === user.email);
                setModifyUser(loginUser);
            })
            .catch(err => console.log(err));
    }, [axiosSecure, user?.email]);

    const isBlocked = modifyUser?.status === "block";

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const menuItems = {
        donor: [
            { to: "/dashboard", icon: FiHome, label: "Dashboard", end: true },
            { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
            { to: "/dashboard/request", icon: FiPlus, label: "Add Request", blocked: isBlocked },
            { to: "/dashboard/mydonation", icon: FiHeart, label: "My Donations" }
        ],
        admin: [
            { to: "/dashboard", icon: FiHome, label: "Dashboard", end: true },
            { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
            { to: "/dashboard/admin/alluser", icon: FiUsers, label: "All Users" },
            { to: "/dashboard/admin/allrequest", icon: FiList, label: "All Donations" }
        ],
        volunteer: [
            { to: "/dashboard", icon: FiHome, label: "Dashboard", end: true },
            { to: "/dashboard/profile", icon: FiUser, label: "Profile" },
            { to: "/dashboard/admin/allrequest", icon: FiList, label: "All Donations" }
        ]
    };

    const currentMenuItems = menuItems[role] || [];

    return (
        <>
            <Toaster />
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden fixed top-4 left-4 z-50">
                <button
                    onClick={toggleSidebar}
                    className="p-2 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition-colors duration-200"
                >
                    {isSidebarOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
                </button>
            </div>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-white dark:bg-gray-900 shadow-xl transform transition-transform duration-300 ease-in-out ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
            }`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="p-2 bg-red-100 dark:bg-red-900 rounded-full">
                                {role === 'admin' ? (
                                    <MdAdminPanelSettings className="w-6 h-6 text-red-600 dark:text-red-400" />
                                ) : (
                                    <BiDonateBlood className="w-6 h-6 text-red-600 dark:text-red-400" />
                                )}
                            </div>
                            <div>
                                <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                    {role?.charAt(0).toUpperCase() + role?.slice(1)} Panel
                                </h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Welcome, {user?.displayName || 'User'}
                                </p>
                            </div>
                        </div>
                        
                        {isBlocked && (
                            <div className="p-3 bg-red-100 dark:bg-red-900 border border-red-200 dark:border-red-800 rounded-lg">
                                <p className="text-sm text-red-800 dark:text-red-200 font-medium">
                                    Account Blocked
                                </p>
                                <p className="text-xs text-red-600 dark:text-red-300">
                                    Some features are restricted
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Navigation Menu */}
                    <nav className="flex-1 p-4 space-y-2">
                        {currentMenuItems.map((item) => {
                            const IconComponent = item.icon;
                            const isDisabled = item.blocked;
                            
                            if (isDisabled) {
                                return (
                                    <div
                                        key={item.to}
                                        className="flex items-center space-x-3 px-4 py-3 text-gray-400 dark:text-gray-600 cursor-not-allowed rounded-lg"
                                    >
                                        <IconComponent className="w-5 h-5" />
                                        <span className="font-medium">{item.label} (Blocked)</span>
                                    </div>
                                );
                            }

                            return (
                                <NavLink
                                    key={item.to}
                                    to={item.to}
                                    end={item.end}
                                    onClick={() => setIsSidebarOpen(false)}
                                    className={({ isActive }) =>
                                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                                            isActive
                                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-200 shadow-sm'
                                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                                        }`
                                    }
                                >
                                    <IconComponent className="w-5 h-5" />
                                    <span className="font-medium">{item.label}</span>
                                </NavLink>
                            );
                        })}
                    </nav>

                    {/* Footer */}
                    <div className="p-4 border-t border-gray-200 dark:border-gray-700 space-y-2">
                        <Link
                            to="/"
                            onClick={() => setIsSidebarOpen(false)}
                            className="flex items-center space-x-3 px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-all duration-200"
                        >
                            <FiHome className="w-5 h-5" />
                            <span className="font-medium">Back to Home</span>
                        </Link>
                        
                        <button
                            onClick={() => {
                                // Add logout functionality here
                                setIsSidebarOpen(false);
                            }}
                            className="flex items-center space-x-3 px-4 py-3 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all duration-200 w-full"
                        >
                            <FiLogOut className="w-5 h-5" />
                            <span className="font-medium">Sign Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Aside;
