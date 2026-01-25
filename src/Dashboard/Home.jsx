import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Component/Loader';
import { Link, useNavigate } from 'react-router';
import { FaUsersLine } from "react-icons/fa6";
import { RiRefund2Fill } from "react-icons/ri";
import { BiSolidDonateBlood } from "react-icons/bi";
import { FiTrendingUp, FiUsers, FiHeart, FiCalendar, FiMapPin, FiClock } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const DashboardHome = () => {
    const { user, role } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [requestInfo, setRequestInfo] = useState(null);
    const [totalUser, setTotalUser] = useState(null);
    const [totalreq, setTotalreq] = useState(null);
    const [chartData, setChartData] = useState({
        bloodTypeData: [],
        monthlyData: [],
        statusData: []
    });
    const reqId = useRef(null);
    const navigator = useNavigate();

    const handleEdit = (id) => {
        navigator(`/dashboard/updatedonation/${id}`);
    };

    useEffect(() => {
        axiosSecure('/users')
            .then(res => setTotalUser(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure]);

    useEffect(() => {
        axiosSecure('/request')
            .then(res => {
                setTotalreq(res.data);
                
                // Process data for charts
                const bloodTypes = {};
                const statuses = {};
                const monthlyRequests = {};
                
                res.data.forEach(request => {
                    // Blood type distribution
                    bloodTypes[request.bloodGrp] = (bloodTypes[request.bloodGrp] || 0) + 1;
                    
                    // Status distribution
                    const status = request.status || 'pending';
                    statuses[status] = (statuses[status] || 0) + 1;
                    
                    // Monthly requests
                    const month = new Date(request.donationDate).toLocaleDateString('en-US', { month: 'short' });
                    monthlyRequests[month] = (monthlyRequests[month] || 0) + 1;
                });
                
                setChartData({
                    bloodTypeData: Object.entries(bloodTypes).map(([type, count]) => ({ name: type, value: count })),
                    statusData: Object.entries(statuses).map(([status, count]) => ({ name: status, value: count })),
                    monthlyData: Object.entries(monthlyRequests).map(([month, count]) => ({ month, requests: count }))
                });
            })
            .catch(err => console.log(err));
    }, [axiosSecure]);

    useEffect(() => {
        if (!user) return;
        axiosSecure(`/request/${user?.email}`)
            .then(res => {
                setRequestInfo(res.data);
            })
            .catch(err => console.log(err));
    }, [user, axiosSecure]);

    const handleDelete = (id) => {
        axiosSecure.delete(`/request/id/delete/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        const newReq = requestInfo.filter(info => info._id !== id);
        setRequestInfo(newReq);
        document.getElementById('my_modal_3').close();
    };

    const openDeleteModal = (id) => {
        reqId.current = id;
        document.getElementById('my_modal_3').showModal();
    };

    const handleView = (id) => {
        navigator(`/dashboard/donation-request-details/${id}`);
    };

    const COLORS = ['#dc2626', '#ea580c', '#d97706', '#ca8a04', '#65a30d', '#16a34a', '#059669', '#0891b2'];

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Welcome Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                        Welcome back, <span className="text-red-600">{user?.displayName || 'User'}!</span>
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        {role === 'donor' ? 'Thank you for being a life-saver' : 'Manage the blood donation platform'}
                    </p>
                </div>

                {/* Stats Cards */}
                {(role === 'admin' || role === 'volunteer') && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <div className="card-base p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Users</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {totalUser ? totalUser.length.toLocaleString() : '...'}
                                    </p>
                                </div>
                                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                                    <FiUsers className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-green-600 dark:text-green-400">+12% from last month</span>
                            </div>
                        </div>

                        <div className="card-base p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Requests</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {totalreq ? totalreq.length.toLocaleString() : '...'}
                                    </p>
                                </div>
                                <div className="p-3 bg-red-100 dark:bg-red-900 rounded-full">
                                    <BiSolidDonateBlood className="w-6 h-6 text-red-600 dark:text-red-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-green-600 dark:text-green-400">+8% from last month</span>
                            </div>
                        </div>

                        <div className="card-base p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Lives Saved</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">
                                        {totalreq ? Math.floor(totalreq.length * 0.7).toLocaleString() : '...'}
                                    </p>
                                </div>
                                <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full">
                                    <FiHeart className="w-6 h-6 text-green-600 dark:text-green-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-green-600 dark:text-green-400">+15% from last month</span>
                            </div>
                        </div>

                        <div className="card-base p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Funding</p>
                                    <p className="text-3xl font-bold text-gray-900 dark:text-white">$2,450</p>
                                </div>
                                <div className="p-3 bg-yellow-100 dark:bg-yellow-900 rounded-full">
                                    <RiRefund2Fill className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                                </div>
                            </div>
                            <div className="mt-4 flex items-center text-sm">
                                <FiTrendingUp className="w-4 h-4 text-green-500 mr-1" />
                                <span className="text-green-600 dark:text-green-400">+5% from last month</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Charts Section for Admin/Volunteer */}
                {(role === 'admin' || role === 'volunteer') && totalreq && (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Blood Type Distribution */}
                        <div className="card-base p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Blood Type Distribution
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={chartData.bloodTypeData}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                                        outerRadius={80}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {chartData.bloodTypeData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        {/* Monthly Requests */}
                        <div className="card-base p-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                Monthly Requests
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={chartData.monthlyData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="month" />
                                    <YAxis />
                                    <Tooltip />
                                    <Bar dataKey="requests" fill="#dc2626" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                )}

                {/* Recent Donations for Donors */}
                {role === 'donor' && (
                    <div className="card-base p-6 mb-8">
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Your Recent Donation Requests
                            </h2>
                            <Link
                                to="/dashboard/request"
                                className="btn-primary-custom"
                            >
                                Add New Request
                            </Link>
                        </div>

                        {requestInfo ? (
                            requestInfo.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                        <thead className="bg-gray-50 dark:bg-gray-800">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Recipient
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Location
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Date & Time
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Blood Group
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Status
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                                            {requestInfo.slice(0, 5).map(request => (
                                                <tr key={request._id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {request.recipient}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                                                            <FiMapPin className="w-4 h-4 mr-1 text-gray-400" />
                                                            {request.recipientDistrict}, {request.recipientUpazila}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900 dark:text-white flex items-center">
                                                            <FiClock className="w-4 h-4 mr-1 text-gray-400" />
                                                            {request.donationDate} at {request.donationTime}
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                                                            {request.bloodGrp}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                                            request.status === 'pending' 
                                                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                                                                : request.status === 'completed'
                                                                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                                : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                                                        }`}>
                                                            {request.status || 'pending'}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                                        <div className="flex space-x-2">
                                                            <button
                                                                onClick={() => handleEdit(request._id)}
                                                                className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                                                            >
                                                                Edit
                                                            </button>
                                                            <button
                                                                onClick={() => handleView(request._id)}
                                                                className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                                                            >
                                                                View
                                                            </button>
                                                            <button
                                                                onClick={() => openDeleteModal(request._id)}
                                                                className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                                                            >
                                                                Delete
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <div className="text-center py-12">
                                    <BiSolidDonateBlood className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                        No donation requests yet
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                                        Start by creating your first blood donation request
                                    </p>
                                    <Link
                                        to="/dashboard/request"
                                        className="btn-primary-custom"
                                    >
                                        Create Request
                                    </Link>
                                </div>
                            )
                        ) : (
                            <Loader />
                        )}

                        {requestInfo && requestInfo.length > 5 && (
                            <div className="mt-6 text-center">
                                <Link
                                    to="/dashboard/mydonation"
                                    className="btn-secondary-custom"
                                >
                                    View All Requests
                                </Link>
                            </div>
                        )}
                    </div>
                )}

                {/* Delete Modal */}
                <dialog id="my_modal_3" className="modal">
                    <div className="modal-box bg-white dark:bg-gray-800">
                        <form method="dialog">
                            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                                ✕
                            </button>
                        </form>
                        <h3 className="font-bold text-lg text-gray-900 dark:text-white">Confirm Deletion</h3>
                        <p className="py-4 text-gray-600 dark:text-gray-400">
                            Are you sure you want to delete this donation request? This action cannot be undone.
                        </p>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => document.getElementById('my_modal_3').close()}
                                className="btn-secondary-custom"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(reqId.current)}
                                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </dialog>
            </div>
        </div>
    );
};

export default DashboardHome;