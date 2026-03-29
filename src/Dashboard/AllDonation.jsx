import React, { useContext, useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Component/Loader';
import { useNavigate } from 'react-router';
import AuthContext from '../AuthProvider/AuthContext';

// ── Icons ─────────────────────────────────────────────────────────────────────
const EditIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
);
const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="3 6 5 6 21 6" />
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
        <path d="M10 11v6M14 11v6" />
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
    </svg>
);
const ViewIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
        <circle cx="12" cy="12" r="3" />
    </svg>
);
const DoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
);
const CancelIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
    </svg>
);
const SearchIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
);
const FilterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
    </svg>
);
const BloodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6 8 4 13 4 16a8 8 0 0 0 16 0c0-3-2-8-8-14z" />
    </svg>
);

// ── Status badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
    const styles = {
        pending:    'bg-yellow-100 text-yellow-800 border border-yellow-300',
        inprogress: 'bg-blue-100 text-blue-800 border border-blue-300',
        done:       'bg-green-100 text-green-800 border border-green-300',
        canceled:   'bg-red-100 text-red-800 border border-red-300',
    };
    const dots = {
        pending:    'bg-yellow-500',
        inprogress: 'bg-blue-500',
        done:       'bg-green-500',
        canceled:   'bg-red-500',
    };
    return (
        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.pending}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.pending}`} />
            {status}
        </span>
    );
};

// ── Blood group badge ─────────────────────────────────────────────────────────
const BloodBadge = ({ group }) => (
    <span className="inline-block px-2.5 py-1 rounded-full text-xs font-bold bg-red-100 text-red-800 border border-red-300">
        {group}
    </span>
);

// ── Stat card ─────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, total, colorClass, barClass }) => (
    <div className="flex-1 min-w-[120px] bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className={`text-3xl font-extrabold leading-none ${colorClass}`}>{value}</div>
        <div className="text-sm text-gray-500 mt-1">{label}</div>
        <div className="mt-3 h-1.5 rounded-full bg-gray-100">
            <div
                className={`h-full rounded-full ${barClass} transition-all duration-500`}
                style={{ width: total ? `${(value / total) * 100}%` : '0%' }}
            />
        </div>
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const AllDonation = () => {
    const axiosSecure = useAxiosSecure();
    const [requestInfo, setRequestInfo] = useState(null);
    const [filterInfo, setFilterInfo]   = useState(null);
    const [loading, setLoading]         = useState(true);
    const [search, setSearch]           = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const reqId     = useRef(null);
    const navigator = useNavigate();
    const { role }  = useContext(AuthContext);

    useEffect(() => {
        axiosSecure('/request')
            .then(res => { setRequestInfo(res.data || []); setFilterInfo(res.data || []); })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [axiosSecure]);

    const applyFilters = (data, searchVal, statusVal) => {
        let result = data;
        if (statusVal !== 'All') result = result.filter(r => r.status === statusVal);
        if (searchVal.trim()) {
            const q = searchVal.toLowerCase();
            result = result.filter(r =>
                r.recipient?.toLowerCase().includes(q) ||
                r.requester?.toLowerCase().includes(q) ||
                r.bloodGrp?.toLowerCase().includes(q)
            );
        }
        return result;
    };

    const handleSearch = val => { setSearch(val); setFilterInfo(applyFilters(requestInfo, val, statusFilter)); };
    const handleStatus = val => { setStatusFilter(val); setFilterInfo(applyFilters(requestInfo, search, val)); };

    const handleDelete = (id) => {
        axiosSecure.delete(`/request/id/delete/${id}`).catch(err => console.log(err));
        setFilterInfo(prev => prev.filter(r => r._id !== id));
        setRequestInfo(prev => prev.filter(r => r._id !== id));
        document.getElementById('my_modal_3').close();
    };

    const handleEdit      = id => navigator(`/dashboard/updatedonation/${id}`, { state: 'all-donation' });
    const handleView      = id => navigator(`/dashboard/donation-request-details/${id}`);
    const openDeleteModal = id => { reqId.current = id; document.getElementById('my_modal_3').showModal(); };

    const patchStatus = (id, newStatus, rollback) => {
        const item = filterInfo.find(u => u._id === id);
        setFilterInfo(prev => prev.map(u => u._id === id ? { ...u, status: newStatus } : u));
        axiosSecure.put(`/update/id/${id}`, { ...item, status: newStatus }).catch(() => {
            setFilterInfo(prev => prev.map(u => u._id === id ? { ...u, status: rollback } : u));
        });
    };

    const handleDone   = id => patchStatus(id, 'done',     'inprogress');
    const handleCancel = id => patchStatus(id, 'canceled', 'inprogress');

    const total      = requestInfo?.length ?? 0;
    const pending    = requestInfo?.filter(r => r.status === 'pending').length    ?? 0;
    const inprogress = requestInfo?.filter(r => r.status === 'inprogress').length ?? 0;
    const done       = requestInfo?.filter(r => r.status === 'done').length       ?? 0;

    return (
        <div className="min-h-screen bg-slate-50 px-6 lg:px-10 py-8">

            {/* ── Header ── */}
            <div className="mb-7">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white">
                        <BloodIcon />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900">All Donation Requests</h1>
                </div>
                <p className="text-sm text-slate-500 ml-[52px]">
                    Track and manage all blood donation requests across the platform.
                </p>
            </div>

            {/* ── Stat cards ── */}
            <div className="flex flex-wrap gap-4 mb-7">
                <StatCard label="Total"       value={total}      total={total} colorClass="text-indigo-600" barClass="bg-indigo-500" />
                <StatCard label="Pending"     value={pending}    total={total} colorClass="text-yellow-600" barClass="bg-yellow-400" />
                <StatCard label="In Progress" value={inprogress} total={total} colorClass="text-blue-600"   barClass="bg-blue-500"   />
                <StatCard label="Done"        value={done}       total={total} colorClass="text-green-600"  barClass="bg-green-500"  />
            </div>

            {/* ── Toolbar ── */}
            <div className="flex flex-wrap items-center gap-3 mb-5">
                {/* Search */}
                <div className="relative flex-1 min-w-[220px]">
                    <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <SearchIcon />
                    </span>
                    <input
                        type="text"
                        placeholder="Search by recipient, donor or blood group…"
                        value={search}
                        onChange={e => handleSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none shadow-sm focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all"
                    />
                </div>

                {/* Filter */}
                <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                        <FilterIcon />
                    </span>
                    <select
                        value={statusFilter}
                        onChange={e => handleStatus(e.target.value)}
                        className="appearance-none pl-8 pr-8 py-2.5 text-sm bg-white border border-gray-200 rounded-xl outline-none shadow-sm cursor-pointer focus:border-red-400 focus:ring-2 focus:ring-red-100 transition-all min-w-[160px]"
                    >
                        <option value="All">All Status</option>
                        <option value="pending">Pending</option>
                        <option value="inprogress">In Progress</option>
                        <option value="done">Done</option>
                        <option value="canceled">Canceled</option>
                    </select>
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none text-xs">▾</span>
                </div>

                {/* Count */}
                {filterInfo && (
                    <span className="ml-auto text-sm text-slate-400 whitespace-nowrap">
                        {filterInfo.length} request{filterInfo.length !== 1 ? 's' : ''}
                    </span>
                )}
            </div>

            {/* ── Content ── */}
            {filterInfo == null ? (
                <Loader />
            ) : filterInfo.length === 0 ? (
                <div className="bg-white border border-gray-200 rounded-2xl py-16 text-center shadow-sm">
                    <div className="text-5xl mb-3">🩸</div>
                    <p className="text-base font-semibold text-slate-600">No requests found</p>
                    <p className="text-sm text-slate-400 mt-1">Try adjusting your search or filter.</p>
                </div>
            ) : (
                <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse min-w-[900px]">
                            <thead>
                                <tr className="bg-slate-50 border-b border-gray-200">
                                    {['Recipient', 'Location', 'Date & Time', 'Blood Group', 'Donor Info', 'Status', 'Actions'].map(h => (
                                        <th key={h} className="px-5 py-3.5 text-left text-[11px] font-bold text-slate-400 uppercase tracking-widest whitespace-nowrap">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filterInfo.map((request, idx) => (
                                    <tr
                                        key={request._id}
                                        className={`transition-colors hover:bg-red-50 ${idx < filterInfo.length - 1 ? 'border-b border-slate-100' : ''}`}
                                    >
                                        {/* Recipient */}
                                        <td className="px-5 py-4 font-semibold text-slate-900 text-sm whitespace-nowrap">
                                            {request.recipient}
                                        </td>

                                        {/* Location */}
                                        <td className="px-5 py-4 text-sm text-slate-500 whitespace-nowrap">
                                            {`${request.recipientDistrict}, ${request.recipientUpazila}`}
                                        </td>

                                        {/* Date & Time */}
                                        <td className="px-5 py-4 whitespace-nowrap">
                                            <div className="text-sm font-semibold text-slate-900">{request.donationDate}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">{request.donationTime}</div>
                                        </td>

                                        {/* Blood group */}
                                        <td className="px-5 py-4">
                                            <BloodBadge group={request.bloodGrp} />
                                        </td>

                                        {/* Donor info */}
                                        <td className="px-5 py-4">
                                            <div className="text-sm font-semibold text-slate-900">{request.requester}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">{request.requesterEmail}</div>
                                        </td>

                                        {/* Status */}
                                        <td className="px-5 py-4">
                                            <StatusBadge status={request.status} />
                                        </td>

                                        {/* Actions */}
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-4 flex-nowrap">
                                                <div className="tooltip tooltip-top" data-tip="View Details">
                                                    <button onClick={() => handleView(request._id)}
                                                        className="btn btn-sm btn-warning btn-outline p-2" aria-label="View">
                                                        <ViewIcon />
                                                    </button>
                                                </div>
                                                {role === 'admin' && (
                                                    <div className="tooltip tooltip-top" data-tip="Edit">
                                                        <button onClick={() => handleEdit(request._id)}
                                                            className="btn btn-sm btn-primary btn-outline p-2" aria-label="Edit">
                                                            <EditIcon />
                                                        </button>
                                                    </div>
                                                )}
                                                {role === 'admin' && (
                                                    <div className="tooltip tooltip-top" data-tip="Delete">
                                                        <button onClick={() => openDeleteModal(request._id)}
                                                            className="btn btn-sm btn-error btn-outline p-2" aria-label="Delete">
                                                            <DeleteIcon />
                                                        </button>
                                                    </div>
                                                )}
                                                {request.status === 'inprogress' && (
                                                    <div className="tooltip tooltip-top" data-tip="Mark as Done">
                                                        <button onClick={() => handleDone(request._id)}
                                                            className="btn btn-sm btn-success btn-outline p-2" aria-label="Mark done">
                                                            <DoneIcon />
                                                        </button>
                                                    </div>
                                                )}
                                                {request.status === 'inprogress' && (
                                                    <div className="tooltip tooltip-top" data-tip="Cancel">
                                                        <button onClick={() => handleCancel(request._id)}
                                                            className="btn btn-sm btn-error btn-outline p-2" aria-label="Cancel">
                                                            <CancelIcon />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* ── Delete modal ── */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box rounded-2xl p-8 max-w-sm text-center">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
                    </form>
                    <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 mx-auto mb-4">
                        <DeleteIcon />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">Delete Request</h3>
                    <p className="text-sm text-slate-500 mb-6">
                        Are you sure you want to delete this donation request? This action cannot be undone.
                    </p>
                    <div className="flex justify-center gap-3">
                        <form method="dialog">
                            <button className="btn btn-outline px-6">Cancel</button>
                        </form>
                        <button
                            onClick={() => handleDelete(reqId.current)}
                            className="btn btn-error text-white px-6">
                            Yes, Delete
                        </button>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AllDonation;