import React, { useContext, useState } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { 
    User, 
    MapPin, 
    Hospital, 
    Droplets, 
    Calendar, 
    Clock, 
    MessageSquare, 
    Send, 
    Mail, 
    UserCircle,
    Navigation
} from 'lucide-react';

const AddRequest = () => {
    const { district, upazila, user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const form = e.target;
        const formData = {
            requester: form.requesterName.value,
            requesterEmail: form.requesterEmail.value,
            recipient: form.recipientName.value,
            recipientDistrict: form.recipientDistrict.value,
            recipientUpazila: form.recipientUpazila.value,
            hospital: form.hospitalName.value,
            address: form.fullAddress.value,
            bloodGrp: form.bloodGroup.value,
            donationDate: form.donationDate.value,
            donationTime: form.donationTime.value,
            message: form.requestMessage.value,
            status: 'pending' 
        };

        try {
            await axiosSecure.post('/request', formData);
            toast.success('Donation Request Created!');
            form.reset();
        } catch (err) {
            toast.error('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-base-200 p-4 lg:p-10">
            <Toaster position="top-right" />
            
            <div className="max-w-4xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-extrabold text-red-800 flex justify-center items-center gap-3">
                        <Droplets className="animate-pulse" size={36} /> Create Donation Request
                    </h1>
                    <p className="text-base-content/60 mt-2 italic">“The gift of blood is the gift of life.”</p>
                </div>

                <div className="bg-base-100 rounded-3xl shadow-xl border border-base-300 overflow-hidden">
                    <form onSubmit={handleSubmit} className="p-6 lg:p-10">
                        
                        {/* Section 1: Requester Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <UserCircle size={18} className="text-red-800" /> Requester Name
                                </label>
                                <input
                                    readOnly
                                    type="text"
                                    name="requesterName"
                                    className="input input-bordered bg-base-200 cursor-not-allowed"
                                    value={user?.displayName || ""}
                                />
                            </div>
                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <Mail size={18} className="text-red-800" /> Requester Email
                                </label>
                                <input
                                    readOnly
                                    type="email"
                                    name="requesterEmail"
                                    className="input input-bordered bg-base-200 cursor-not-allowed"
                                    value={user?.email || ""}
                                />
                            </div>
                        </div>

                        <div className="divider text-red-800/50 font-bold uppercase text-xs tracking-widest">Recipient Details</div>

                        {/* Section 2: Recipient Information */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <User size={18} className="text-red-800" /> Recipient Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="recipientName"
                                    className="input input-bordered focus:border-red-800"
                                    placeholder="Enter full name"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <Droplets size={18} className="text-red-800" /> Blood Group
                                </label>
                                <select required name="bloodGroup" defaultValue="" className="select select-bordered focus:border-red-800">
                                    <option value="" disabled>Select Group</option>
                                    {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => (
                                        <option key={group} value={group}>{group}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <MapPin size={18} className="text-red-800" /> District
                                </label>
                                <select required name="recipientDistrict" defaultValue="" className="select select-bordered">
                                    <option value="" disabled>Select District</option>
                                    {district?.map(d => (
                                        <option key={d.id} value={d.name}>{d.name} ({d.bn_name})</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <Navigation size={18} className="text-red-800" /> Upazila
                                </label>
                                <select required name="recipientUpazila" defaultValue="" className="select select-bordered">
                                    <option value="" disabled>Select Upazila</option>
                                    {upazila?.map(u => (
                                        <option key={u.id} value={u.name}>{u.name} ({u.bn_name})</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="divider text-red-800/50 font-bold uppercase text-xs tracking-widest mt-8">Hospital & Logistics</div>

                        {/* Section 3: Hospital & Time */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="form-control md:col-span-2">
                                <label className="label font-semibold flex items-center gap-2">
                                    <Hospital size={18} className="text-red-800" /> Hospital Name
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="hospitalName"
                                    className="input input-bordered"
                                    placeholder="e.g., Dhaka Medical College Hospital"
                                />
                            </div>

                            <div className="form-control md:col-span-2">
                                <label className="label font-semibold flex items-center gap-2">
                                    <MapPin size={18} className="text-red-800" /> Full Address
                                </label>
                                <input
                                    required
                                    type="text"
                                    name="fullAddress"
                                    className="input input-bordered"
                                    placeholder="House, Road, Area (e.g., Zahir Raihan Rd, Dhaka)"
                                />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <Calendar size={18} className="text-red-800" /> Donation Date
                                </label>
                                <input required type="date" name="donationDate" className="input input-bordered w-full" />
                            </div>

                            <div className="form-control">
                                <label className="label font-semibold flex items-center gap-2">
                                    <Clock size={18} className="text-red-800" /> Donation Time
                                </label>
                                <input required type="time" name="donationTime" className="input input-bordered w-full" />
                            </div>
                        </div>

                        <div className="form-control mt-6">
                            <label className="label font-semibold flex items-center gap-2">
                                <MessageSquare size={18} className="text-red-800" /> Request Message
                            </label>
                            <textarea
                           
                                name="requestMessage"
                                className="textarea textarea-bordered h-28 focus:border-red-800 text-base"
                                placeholder="State the reason or clinical emergency details..."
                            />
                        </div>

                        {/* Submit Button */}
                        <div className="mt-10">
                            <button 
                                type="submit" 
                                disabled={isSubmitting}
                                className="btn btn-block bg-red-800 hover:bg-red-900 text-white border-none shadow-lg text-lg h-14 gap-3 transition-all active:scale-95"
                            >
                                {isSubmitting ? (
                                    <span className="loading loading-spinner"></span>
                                ) : (
                                    <>
                                        <Send size={20} /> Post Donation Request
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AddRequest;