import React, { useContext } from 'react';
import AuthContext from '../AuthProvider/AuthContext';

import toast, { Toaster } from 'react-hot-toast';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const AddRequest = () => {
    const { district, upazila, user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()


    const handleSubmit = (e) => {

        e.preventDefault();
       
        const requester = e.target.requesterName.value
        const requesterEmail = e.target.requesterEmail.value
        const recipient = e.target.recipientName.value
        const recipientDistrict = e.target.recipientDistrict.value
        const recipientUpazila = e.target.recipientUpazila.value
        const hospital = e.target.hospitalName.value
        const address = e.target.fullAddress.value
        const bloodGrp = e.target.bloodGroup.value
        const donationDate = e.target.donationDate.value
        const donationTime = e.target.donationTime.value
        const message = e.target.requestMessage.value

        const formData = {
            requester,
            requesterEmail,
            recipient,
            recipientDistrict,
            recipientUpazila,
            hospital,
            address,
            bloodGrp,
            donationDate,
            donationTime,
            message
        }
        
        axiosSecure.post('https://blood-donation-rho-one.vercel.app/request',formData)
        .then(res => toast.success('Created Successfully'))
        .catch(err => toast.error(err))

    }


    return (
        <div className='p-5 lg:p-10'>
            <Toaster></Toaster>
            <div className='flex items-center justify-center'>
                <form onSubmit={handleSubmit}>
                    <h1 className='text-center text-red-800 text-3xl font-bold mb-4'>Create Donation Request</h1>
                    <fieldset className="fieldset shadow-2xl py-8 border-base-300 rounded-box w-[300px]  md:w-[600px] border p-4">


                        <label className="label font-bold">Requester Name</label>
                        <input
                            readOnly
                            type="text"
                            name="requesterName"
                            className="input w-full"
                            placeholder="Requester Name"
                            value={user.displayName}

                        />

                        <label className="label font-bold">Requester Email</label>
                        <input
                            readOnly
                            type="email"
                            name="requesterEmail"
                            className="input w-full"
                            placeholder="Requester Email"
                            value={user.email}

                        />

                        <label className="label font-bold">Recipient Name</label>
                        <input
                            required
                            type="text"
                            name="recipientName"
                            className="input w-full"
                            placeholder="Recipient Name"
                        />

                        <label className="label font-bold">Recipient District</label>
                        <select
                            required
                            name="recipientDistrict"
                            defaultValue="Select District"
                            className="select w-full"
                        >
                            <option disabled={true}>Select District</option>
                            {
                                district.map(district => <option key={district.id}>{district.name} ({district.bn_name})</option>)
                            }
                        </select>

                        <label className="label font-bold">Recipient Upazila</label>
                        <select
                            required
                            name="recipientUpazila"
                            defaultValue="Select Upazila"
                            className="select w-full"
                        >
                            <option disabled={true}>Select Upazila</option>
                            {
                                upazila.map(upazila => <option key={upazila.id}>{upazila.name} ({upazila.bn_name})</option>)
                            }
                        </select>

                        <label className="label font-bold">Hospital Name</label>
                        <input
                            required
                            type="text"
                            name="hospitalName"
                            className="input w-full"
                            placeholder="Dhaka Medical College Hospital"
                        />

                        <label className="label font-bold">Full Address Line</label>
                        <input
                            required
                            type="text"
                            name="fullAddress"
                            className="input w-full"
                            placeholder="Zahir Raihan Rd, Dhaka"
                        />

                        <label className="label font-bold">Blood Group</label>
                        <select
                            required
                            name="bloodGroup"
                            defaultValue="Select Blood Group"
                            className="select w-full"
                        >
                            <option disabled={true}>Select Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>

                        <label className="label font-bold">Donation Date</label>
                        <input required type="date" name="donationDate" className="input w-full" />

                        <label className="label font-bold">Donation Time</label>
                        <input required type="time" name="donationTime" className="input w-full" />

                        <label className="label font-bold">Request Message</label>
                        <textarea
                            defaultValue='Write..'
                            name="requestMessage"
                            className="textarea textarea-bordered w-full"
                            placeholder="Write in details why you need blood..."
                            rows={4}
                        />

                        <button className="btn btn-neutral border-none hover:transition ease-in-out mt-4 bg-red-800 text-white">
                            Request
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default AddRequest;