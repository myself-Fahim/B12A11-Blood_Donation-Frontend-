import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useParams } from 'react-router';
import Loader from '../Component/Loader';
import AuthContext from '../AuthProvider/AuthContext';

// ── Icons ─────────────────────────────────────────────────────────────────────
const BloodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6 8 4 13 4 16a8 8 0 0 0 16 0c0-3-2-8-8-14z" />
    </svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);
const HospitalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
    </svg>
);
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const HeartIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
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
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${styles[status] || styles.pending}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${dots[status] || dots.pending}`} />
            {status}
        </span>
    );
};

// ── Info row ──────────────────────────────────────────────────────────────────
const InfoRow = ({ icon, label, value }) => (
    <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
        <span className="mt-0.5 text-slate-400 shrink-0">{icon}</span>
        <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-sm font-semibold text-slate-800">{value || '—'}</p>
        </div>
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const DonationDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { id } = useParams();
    const [detailInfo, setDetailInfo] = useState(null);
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axiosSecure(`/request/id/${id}`)
            .then(res => setDetailInfo(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure, id]);

    const handleDonation = (e) => {
        e.preventDefault();
        const newDonation = { ...detailInfo, status: 'inprogress' };
        setDetailInfo(newDonation);
        axiosSecure.put(`/update/id/${id}`, newDonation)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
        document.getElementById('my_modal_3').close();
    };

    if (!detailInfo) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">

            {/* ── Page header ── */}
            <div className="max-w-3xl mx-auto mb-6">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-pink-600 flex items-center justify-center text-white">
                        <BloodIcon />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Donation Request Details</h1>
                        <p className="text-sm text-slate-500">Review the information before confirming your donation.</p>
                    </div>
                </div>
            </div>

            {/* ── Main card ── */}
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">

                {/* Card header strip */}
                <div className="bg-pink-600 px-6 py-4 flex items-center justify-between">
                    <div>
                        <p className="text-red-200 text-xs font-semibold uppercase tracking-widest mb-0.5">Recipient</p>
                        <h2 className="text-white text-xl font-bold">{detailInfo.recipient}</h2>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                        <StatusBadge status={detailInfo.status} />
                        <span className="bg-white text-red-700 text-sm font-bold px-3 py-1 rounded-full border border-red-200">
                            {detailInfo.bloodGrp}
                        </span>
                    </div>
                </div>

                {/* Two-column info grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                    {/* Left — Requester info */}
                    <div className="px-6 py-5">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Requester Info</p>
                        <InfoRow icon={<UserIcon />}     label="Name"  value={detailInfo.requester} />
                        <InfoRow icon={<MailIcon />}     label="Email" value={detailInfo.requesterEmail} />
                        <InfoRow icon={<HospitalIcon />} label="Hospital" value={detailInfo.hospital} />
                        <InfoRow icon={<CalendarIcon />} label="Date"  value={detailInfo.donationDate} />
                        <InfoRow icon={<ClockIcon />}    label="Time"  value={detailInfo.donationTime} />
                    </div>

                    {/* Right — Recipient info */}
                    <div className="px-6 py-5">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Recipient Info</p>
                        <InfoRow icon={<LocationIcon />} label="District" value={detailInfo.recipientDistrict} />
                        <InfoRow icon={<LocationIcon />} label="Upazila"  value={detailInfo.recipientUpazila} />
                        <InfoRow icon={<LocationIcon />} label="Address"  value={detailInfo.address} />
                        <InfoRow icon={<BloodIcon />}    label="Blood Group" value={detailInfo.bloodGrp} />
                    </div>
                </div>

                {/* Card footer */}
                <div className="px-6 py-5 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-slate-500 text-center sm:text-left">
                        Ready to save a life? Click <span className="font-semibold text-red-600">Donate</span> to confirm your intent.
                    </p>
                    <button
                        onClick={() => document.getElementById('my_modal_3').showModal()}
                        className="btn btn-error text-white font-bold px-8 gap-2 shrink-0"
                    >
                        <HeartIcon />
                        Donate Now
                    </button>
                </div>
            </div>

            {/* ── Confirm donation modal ── */}
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box rounded-2xl p-8 max-w-sm">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-3 top-3">✕</button>
                    </form>

                    {/* Modal header */}
                    <div className="flex flex-col items-center text-center mb-6">
                        <div className="w-14 h-14 rounded-full bg-red-100 flex items-center justify-center text-red-600 mb-3">
                            <HeartIcon />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">Confirm Donation</h3>
                        <p className="text-sm text-slate-500 mt-1">Your details will be shared with the requester.</p>
                    </div>

                    <form onSubmit={handleDonation} className="flex flex-col gap-4">
                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                                Your Name
                            </label>
                            <input
                                readOnly
                                type="text"
                                name="name"
                                defaultValue={user?.displayName}
                                className="input input-bordered w-full bg-slate-50 text-slate-700 font-medium"
                            />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 block">
                                Your Email
                            </label>
                            <input
                                readOnly
                                type="email"
                                name="email"
                                defaultValue={user?.email}
                                className="input input-bordered w-full bg-slate-50 text-slate-700 font-medium"
                            />
                        </div>

                        <button type="submit" className="btn btn-error text-white font-bold mt-2 gap-2">
                            <HeartIcon />
                            Confirm Donation
                        </button>
                    </form>
                </div>
            </dialog>
        </div>
    );
};

export default DonationDetails;