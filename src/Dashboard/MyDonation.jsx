import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';
import { useNavigate } from 'react-router';
// Optional: Install lucide-react or use your preferred icon library
import { Edit3, Trash2, Eye, CheckCircle, XCircle, Filter } from 'lucide-react';

const MyDonation = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useContext(AuthContext);
    const [requestInfo, setRequestInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [statusFilter, setStatusFilter] = useState('All');
    const navigator = useNavigate();
    const reqId = useRef(null);

    useEffect(() => {
        if (user?.email) {
            axiosSecure(`/request/all-request/${user?.email}`)
                .then(res => setRequestInfo(res.data || []))
                .catch(err => console.error(err))
                .finally(() => setLoading(false));
        }
    }, [axiosSecure, user?.email]);

    // Optimized Filtering Logic
    const filteredData = useMemo(() => {
        return statusFilter === 'All' 
            ? requestInfo 
            : requestInfo.filter(info => info.status === statusFilter);
    }, [statusFilter, requestInfo]);

    const handleStatusUpdate = async (id, newStatus) => {
        const singleUser = requestInfo.find(u => u._id === id);
        const updatedData = { ...singleUser, status: newStatus };

        // Optimistic Update UI
        const previousState = [...requestInfo];
        setRequestInfo(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));

        try {
            await axiosSecure.put(`/update/id/${id}`, updatedData);
        } catch (err) {
            console.error(err);
            setRequestInfo(previousState); // Rollback on error
        }
    };

    const handleDelete = async (id) => {
        try {
            await axiosSecure.delete(`/request/id/delete/${id}`);
            setRequestInfo(prev => prev.filter(info => info._id !== id));
            document.getElementById('delete_modal').close();
        } catch (err) {
            console.error(err);
        }
    };

    if (loading) return <Loader />;

    return (
        <div className="p-4 lg:p-10 bg-base-100 min-h-screen">
            {/* Header Section */}
            <div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-primary">My Donation Requests</h1>
                    <p className="text-base-content/60">Manage and track your blood donation posts.</p>
                </div>

                <div className="flex items-center gap-3 bg-base-200 p-3 rounded-xl shadow-sm">
                    <Filter size={20} className="text-primary" />
                    <span className="font-semibold hidden sm:inline">Filter:</span>
                    <select 
                        onChange={(e) => setStatusFilter(e.target.value)} 
                        value={statusFilter}
                        className="select select-bordered select-sm focus:outline-none"
                    >
                        <option value="All">All Status</option>
                        <option value="inprogress">In Progress</option>
                        <option value="pending">Pending</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                </div>
            </div>

            {/* Table Section */}
            <div className="max-w-7xl mx-auto bg-base-100 rounded-2xl shadow-xl border border-base-200 overflow-hidden">
                <div className="overflow-x-auto">
                    {filteredData.length > 0 ? (
                        <table className="table table-zebra w-full">
                            <thead className="bg-base-200 text-base-content">
                                <tr>
                                    <th>Recipient</th>
                                    <th>Location</th>
                                    <th>Date & Time</th>
                                    <th>Blood Group</th>
                                    <th>Status</th>
                                    <th className="text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((request) => (
                                    <tr key={request._id} className="hover:bg-base-200/50 transition-colors">
                                        <td>
                                            <div className="font-bold">{request.recipient}</div>
                                            <div className="text-xs opacity-50">{request.requesterEmail}</div>
                                        </td>
                                        <td className="text-sm">
                                            {request.recipientDistrict}, {request.recipientUpazila}
                                        </td>
                                        <td>
                                            <div className="font-medium">{request.donationDate}</div>
                                            <div className="text-xs text-primary">{request.donationTime}</div>
                                        </td>
                                        <td>
                                            <span className="badge badge-error badge-outline font-bold">
                                                {request.bloodGrp}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge font-semibold capitalize ${
                                                request.status === 'done' ? 'badge-success' :
                                                request.status === 'inprogress' ? 'badge-info' :
                                                request.status === 'canceled' ? 'badge-ghost' : 'badge-warning'
                                            }`}>
                                                {request.status}
                                            </span>
                                        </td>
                                        <td className="flex justify-center items-center gap-2">
                                            {/* Logic-based Action Buttons */}
                                            {request.status === 'inprogress' && (
                                                <>
                                                    <button onClick={() => handleStatusUpdate(request._id, 'done')} className="btn btn-ghost btn-circle btn-sm text-success tooltip" data-tip="Mark Done">
                                                        <CheckCircle size={20} />
                                                    </button>
                                                    <button onClick={() => handleStatusUpdate(request._id, 'canceled')} className="btn btn-ghost btn-circle btn-sm text-error tooltip" data-tip="Cancel">
                                                        <XCircle size={20} />
                                                    </button>
                                                </>
                                            )}
                                            
                                            <div className="divider divider-horizontal mx-0"></div>
                                            
                                            <button onClick={() => navigator(`/dashboard/donation-request-details/${request._id}`)} className="btn btn-ghost btn-circle btn-sm text-info tooltip" data-tip="View Details">
                                                <Eye size={18} />
                                            </button>
                                            <button onClick={() => navigator(`/dashboard/updatedonation/${request._id}`, { state: 'my-donation' })} className="btn btn-ghost btn-circle btn-sm text-warning tooltip" data-tip="Edit">
                                                <Edit3 size={18} />
                                            </button>
                                            <button onClick={() => { reqId.current = request._id; document.getElementById('delete_modal').showModal(); }} className="btn btn-ghost btn-circle btn-sm text-error tooltip" data-tip="Delete">
                                                <Trash2 size={18} />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <div className="py-20 text-center">
                            <h3 className="text-xl font-semibold text-base-content/40">No records found for this status</h3>
                        </div>
                    )}
                </div>
            </div>

            {/* Delete Modal */}
            <dialog id="delete_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box border-t-4 border-error">
                    <h3 className="font-bold text-xl flex items-center gap-2">
                        <Trash2 className="text-error" /> Confirm Deletion
                    </h3>
                    <p className="py-4 text-base-content/70">Are you sure you want to remove this donation request? This action cannot be undone.</p>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>
                        <button onClick={() => handleDelete(reqId.current)} className="btn btn-error text-white">Delete Permanently</button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyDonation;