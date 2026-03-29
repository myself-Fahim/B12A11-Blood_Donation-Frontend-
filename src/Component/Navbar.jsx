import React, { useContext, useState } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import { Link, NavLink } from 'react-router';
import { signOut } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import { useTheme } from '../Context/ThemeContext';
import { FiSun, FiMoon, FiMenu, FiX, FiUser, FiSettings, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { BiDonateBlood } from 'react-icons/bi';

const Navbar = () => {
    const { user } = useContext(AuthContext);
    const { theme, toggleTheme } = useTheme();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

    const handleSignout = () => {
        signOut(auth)
            .then(() => {
                alert('Signed out successfully');
                setIsProfileDropdownOpen(false);
            })
            .catch((error) => {
                console.error('Sign out error:', error);
            });
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const toggleProfileDropdown = () => {
        setIsProfileDropdownOpen(!isProfileDropdownOpen);
    };

    // Navigation links for logged out users
    const publicNavLinks = [
        { to: '/', label: 'Home' },
        { to: '/search', label: 'Find Donors' },
        { to: '/donation', label: 'Donations' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' }
    ];

    // Navigation links for logged in users
    const privateNavLinks = [
        { to: '/', label: 'Home' },
        { to: '/search', label: 'Find Donors' },
        { to: '/donation', label: 'Donations' },
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
        { to: '/blog', label: 'Blog' }
    ];

    const navLinks = user ? privateNavLinks : publicNavLinks;

    return (
        <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-lg border-b border-gray-200 dark:border-gray-700">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-red-600 rounded-full">
                            <BiDonateBlood className="text-white text-xl" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 dark:text-white">BloodConnect</span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 hidden sm:block">Save Lives Together</span>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.map((link) => (
                            <NavLink
                                key={link.to}
                                to={link.to}
                                className={({ isActive }) =>
                                    `px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                                        isActive
                                            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                                            : 'text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400'
                                    }`
                                }
                            >
                                {link.label}
                            </NavLink>
                        ))}
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                            aria-label="Toggle theme"
                        >
                            {theme === 'light' ? (
                                <FiMoon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            ) : (
                                <FiSun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            )}
                        </button>

                        {/* User Authentication */}
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={toggleProfileDropdown}
                                    className="flex items-center space-x-2 p-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors duration-200"
                                >
                                    {user.photoURL ? (
                                        <img
                                            src={user.photoURL}
                                            alt="Profile"
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                    ) : (
                                        <FiUser className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                                    )}
                                    <span className="hidden sm:block text-sm font-medium text-gray-700 dark:text-gray-300">
                                        {user.displayName || 'User'}
                                    </span>
                                    <FiChevronDown className="w-4 h-4 text-gray-500" />
                                </button>

                                {/* Profile Dropdown */}
                                {isProfileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                                        <Link
                                            to="/dashboard/profile"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <FiUser className="mr-3 w-4 h-4" />
                                            Profile
                                        </Link>
                                        <Link
                                            to="/dashboard"
                                            className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                            onClick={() => setIsProfileDropdownOpen(false)}
                                        >
                                            <FiSettings className="mr-3 w-4 h-4" />
                                            Dashboard
                                        </Link>
                                        <button
                                            onClick={handleSignout}
                                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                        >
                                            <FiLogOut className="mr-3 w-4 h-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-3">
                                <Link
                                    to="/login"
                                    className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-300 dark:hover:text-red-400 transition-colors duration-200"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
                                >
                                    Join as Donor
                                </Link>
                            </div>
                        )}

                        {/* Mobile menu button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                        >
                            {isMobileMenuOpen ? (
                                <FiX className="w-6 h-6" />
                            ) : (
                                <FiMenu className="w-6 h-6" />
                            )}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMobileMenuOpen && (
                    <div className="lg:hidden border-t border-gray-200 dark:border-gray-700">
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.to}
                                    to={link.to}
                                    className={({ isActive }) =>
                                        `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                                            isActive
                                                ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200'
                                                : 'text-gray-700 hover:text-red-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:text-red-400 dark:hover:bg-gray-800'
                                        }`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Overlay for dropdowns */}
            {(isProfileDropdownOpen || isMobileMenuOpen) && (
                <div
                    className="fixed inset-0 z-40"
                    onClick={() => {
                        setIsProfileDropdownOpen(false);
                        setIsMobileMenuOpen(false);
                    }}
                />
            )}
        </nav>
    );
};

export default Navbar;