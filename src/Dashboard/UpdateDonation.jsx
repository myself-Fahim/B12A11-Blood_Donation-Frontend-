import React, { useContext, useEffect, useState } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Component/Loader';
import { useLocation, useNavigate, useParams } from 'react-router';

// ── Icons ─────────────────────────────────────────────────────────────────────
const BloodIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2C6 8 4 13 4 16a8 8 0 0 0 16 0c0-3-2-8-8-14z" />
    </svg>
);
const UserIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);
const MailIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
    </svg>
);
const HospitalIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M12 8v8M8 12h8" />
    </svg>
);
const LocationIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);
const CalendarIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
);
const ClockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
    </svg>
);
const MessageIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
);
const SaveIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8" />
    </svg>
);

// ── Field wrapper ─────────────────────────────────────────────────────────────
const Field = ({ label, icon, children }) => (
    <div className="flex flex-col gap-1.5">
        <label className="flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span className="text-slate-400">{icon}</span>
            {label}
        </label>
        {children}
    </div>
);

// ── Section heading ───────────────────────────────────────────────────────────
const SectionHeading = ({ title }) => (
    <div className="col-span-1 md:col-span-2 flex items-center gap-3 pt-2">
        <span className="text-xs font-bold text-red-600 uppercase tracking-widest">{title}</span>
        <div className="flex-1 h-px bg-red-100" />
    </div>
);

// ── Main component ────────────────────────────────────────────────────────────
const UpdateDonation = () => {
    const location   = useLocation();
    const { district, upazila } = useContext(AuthContext);
    const { id }     = useParams();
    const axiosSecure = useAxiosSecure();
    const [reqInfo, setReqInfo] = useState(null);
    const navigator  = useNavigate();

    useEffect(() => {
        axiosSecure(`/request/id/${id}`)
            .then(res => setReqInfo(res.data))
            .catch(err => console.log(err));
    }, [axiosSecure, id]);

    const handleForm = (e) => {
        e.preventDefault();
        const formData = {
            requester:         e.target.requesterName.value,
            requesterEmail:    e.target.requesterEmail.value,
            recipient:         e.target.recipientName.value,
            recipientDistrict: e.target.recipientDistrict.value,
            recipientUpazila:  e.target.recipientUpazila.value,
            hospital:          e.target.hospitalName.value,
            address:           e.target.fullAddress.value,
            bloodGrp:          e.target.bloodGroup.value,
            donationDate:      e.target.donationDate.value,
            donationTime:      e.target.donationTime.value,
            message:           e.target.requestMessage.value,
        };
        axiosSecure.put(`/update/id/${id}`, formData);
        if (location.state === 'my-donation')       navigator('/dashboard/mydonation');
        else if (location.state === 'all-donation') navigator('/dashboard/admin/allrequest');
        else                                        navigator('/dashboard');
    };

    if (!reqInfo) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader />
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-50 px-4 py-10">

            {/* ── Page header ── */}
            <div className="max-w-2xl mx-auto mb-6">
                <div className="flex items-center gap-3 mb-1">
                    <div className="w-10 h-10 rounded-xl bg-red-600 flex items-center justify-center text-white shrink-0">
                        <BloodIcon />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Update Donation Request</h1>
                        <p className="text-sm text-slate-500">Edit the details below and save your changes.</p>
                    </div>
                </div>
            </div>

            {/* ── Form card ── */}
            <div className="max-w-2xl mx-auto bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden">

                {/* Card top strip */}
                <div className="bg-red-600 px-6 py-3 flex items-center gap-2">
                    <span className="text-red-200 text-xs font-semibold uppercase tracking-widest">Request ID:</span>
                    <span className="text-white text-xs font-mono">{id}</span>
                </div>

                <form onSubmit={handleForm} className="px-6 py-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">

                        {/* ── Requester section ── */}
                        <SectionHeading title="Requester Information" />

                        <Field label="Requester Name" icon={<UserIcon />}>
                            <input
                                readOnly
                                type="text"
                                name="requesterName"
                                defaultValue={reqInfo.requester}
                                className="input input-bordered w-full bg-slate-50 text-slate-500 cursor-not-allowed"
                            />
                        </Field>

                        <Field label="Requester Email" icon={<MailIcon />}>
                            <input
                                readOnly
                                type="email"
                                name="requesterEmail"
                                defaultValue={reqInfo.requesterEmail}
                                className="input input-bordered w-full bg-slate-50 text-slate-500 cursor-not-allowed"
                            />
                        </Field>

                        {/* ── Recipient section ── */}
                        <SectionHeading title="Recipient Information" />

                        <Field label="Recipient Name" icon={<UserIcon />}>
                            <input
                                required
                                type="text"
                                name="recipientName"
                                defaultValue={reqInfo.recipient}
                                placeholder="Recipient full name"
                                className="input input-bordered w-full focus:border-red-400 focus:outline-none"
                            />
                        </Field>

                        <Field label="Blood Group" icon={<BloodIcon />}>
                            <select
                                required
                                name="bloodGroup"
                                defaultValue={reqInfo.bloodGrp}
                                className="select select-bordered w-full focus:border-red-400 focus:outline-none"
                            >
                                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(g => (
                                    <option key={g}>{g}</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Recipient District" icon={<LocationIcon />}>
                            <select
                                required
                                name="recipientDistrict"
                                defaultValue={reqInfo.recipientDistrict}
                                className="select select-bordered w-full focus:border-red-400 focus:outline-none"
                            >
                                <option disabled value="">{reqInfo.recipientDistrict}</option>
                                {district.map(d => (
                                    <option key={d.id}>{d.name} ({d.bn_name})</option>
                                ))}
                            </select>
                        </Field>

                        <Field label="Recipient Upazila" icon={<LocationIcon />}>
                            <select
                                required
                                name="recipientUpazila"
                                defaultValue={reqInfo.recipientUpazila}
                                className="select select-bordered w-full focus:border-red-400 focus:outline-none"
                            >
                                <option disabled value="">{reqInfo.recipientUpazila}</option>
                                {upazila.map(u => (
                                    <option key={u.id}>{u.name} ({u.bn_name})</option>
                                ))}
                            </select>
                        </Field>

                        {/* ── Hospital section ── */}
                        <SectionHeading title="Hospital & Schedule" />

                        <Field label="Hospital Name" icon={<HospitalIcon />}>
                            <input
                                required
                                type="text"
                                name="hospitalName"
                                defaultValue={reqInfo.hospital}
                                placeholder="e.g. Dhaka Medical College Hospital"
                                className="input input-bordered w-full focus:border-red-400 focus:outline-none"
                            />
                        </Field>

                        <Field label="Full Address" icon={<LocationIcon />}>
                            <input
                                required
                                type="text"
                                name="fullAddress"
                                defaultValue={reqInfo.address}
                                placeholder="e.g. Zahir Raihan Rd, Dhaka"
                                className="input input-bordered w-full focus:border-red-400 focus:outline-none"
                            />
                        </Field>

                        <Field label="Donation Date" icon={<CalendarIcon />}>
                            <input
                                required
                                type="date"
                                name="donationDate"
                                defaultValue={reqInfo.donationDate}
                                className="input input-bordered w-full focus:border-red-400 focus:outline-none"
                            />
                        </Field>

                        <Field label="Donation Time" icon={<ClockIcon />}>
                            <input
                                required
                                type="time"
                                name="donationTime"
                                defaultValue={reqInfo.donationTime}
                                className="input input-bordered w-full focus:border-red-400 focus:outline-none"
                            />
                        </Field>

                        {/* ── Message ── */}
                        <SectionHeading title="Additional Message" />

                        <div className="col-span-1 md:col-span-2">
                            <Field label="Request Message" icon={<MessageIcon />}>
                                <textarea
                                    name="requestMessage"
                                    defaultValue={reqInfo.message}
                                    placeholder="Write in detail why you need blood..."
                                    rows={4}
                                    className="textarea textarea-bordered w-full focus:border-red-400 focus:outline-none resize-none"
                                />
                            </Field>
                        </div>

                    </div>

                    {/* ── Footer ── */}
                    <div className="mt-6 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
                        <p className="text-xs text-slate-400 text-center sm:text-left">
                            Fields marked with <span className="text-red-500 font-bold">*</span> are required. Read-only fields cannot be changed.
                        </p>
                        <button
                            type="submit"
                            className="btn btn-error text-white font-bold px-8 gap-2 shrink-0"
                        >
                            <SaveIcon />
                            Save Changes
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateDonation;