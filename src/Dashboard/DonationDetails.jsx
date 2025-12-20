import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useParams } from 'react-router';
import { Loader } from 'lucide-react';
import AuthContext from '../AuthProvider/AuthContext';

const DonationDetails = () => {

    const axiosSecure = useAxiosSecure()
    const { id } = useParams()
    const [detailInfo, setDetailInfo] = useState(null)
    const { user } = useContext(AuthContext)

    useEffect(() => {
        axiosSecure(`/request/id/${id}`)
            .then(res => setDetailInfo(res.data))
            .then(err => console.log(err))
    }, [axiosSecure, id])



    console.log(detailInfo)

    const handleDonation = (e) => {
        e.preventDefault()
        const newDonation = { ...detailInfo, status: 'inprogress' }
        setDetailInfo(newDonation)
        axiosSecure.put(`/update/id/${id}`, newDonation)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        document.getElementById('my_modal_3').close()
    }



    return (
        <div>
            {
                detailInfo ? <div>


                    <div className='  px-[20px] lg:px-[70px]  pt-10  rounded-[20px] bg-white shadow-2xl   mt-20 w-fit mx-auto'>
                        <h1 className='font-bold border  w-fit bg-red-800 mb-6 p-1 px-2 rounded-[10px] text-white'>Status : {detailInfo.status}</h1>
                        <div className='flex flex-col md:flex-row gap-3 md:gap-20'>
                            <div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Requester</h1>
                                    <h1 className='font-semibold'>{detailInfo.requester}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Requester Email</h1>
                                    <h1 className='font-semibold'>{detailInfo.requesterEmail}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Hospital</h1>
                                    <h1 className='font-semibold'>{detailInfo.hospital}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Date</h1>
                                    <h1 className='font-semibold'>{detailInfo.donationDate}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Time</h1>
                                    <h1 className='font-semibold'>{detailInfo.donationTime}</h1>
                                </div>
                            </div>

                            <div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Recipient</h1>
                                    <h1 className='font-semibold'>{detailInfo.recipient}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Recipient District</h1>
                                    <h1 className='font-semibold'>{detailInfo.recipientDistrict}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Recipient Upazila</h1>
                                    <h1 className='font-semibold'>{detailInfo.recipientUpazila}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Blood Group</h1>
                                    <h1 className='font-semibold'>{detailInfo.bloodGrp}</h1>
                                </div>
                                <div className='mb-4'>
                                    <h1 className='font-bold text-xl mb-1'>Address</h1>
                                    <h1 className='font-semibold'>{detailInfo.address}</h1>
                                </div>
                            </div>

                        </div>

                    </div>
                </div> : <Loader></Loader>
            }


            <button onClick={() => document.getElementById('my_modal_3').showModal()} className='btn btn-primary mt-10 font-bold block mx-auto'>Donate</button>





            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Confirm Donate!</h3>

                    <form onSubmit={handleDonation} className='mt-8'>
                        <label className="label font-bold">Requester Name</label>
                        <input
                            readOnly
                            type="text"
                            name="name"
                            className="input w-full"
                            placeholder="Select name"
                            Value={user.displayName}

                        />

                        <label className="label font-bold">Requester Email</label>
                        <input
                            readOnly
                            type="email"
                            name="email"
                            className="input w-full"
                            placeholder="Select email"
                            Value={user.email}
                        />

                        <button className='block mx-auto mt-7 btn text-white btn-primary
                        '>Confirm</button>
                    </form>
                </div>
            </dialog>



        </div>
    );
};

export default DonationDetails;