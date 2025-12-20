import React, { useContext, useEffect, useRef, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';
import { Navigate, useNavigate } from 'react-router';


const MyDonation = () => {
    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [requestInfo, setRequestInfo] = useState(null)
     const navigator = useNavigate()
        const reqId = useRef(null)

    useEffect(() => {
        axiosSecure(`/request/all-request/${user?.email}`)
            .then(res => setRequestInfo(res.data))
            .catch(err => console.log(err))
    }, [axiosSecure, user?.email])

        const handleEdit = (id) => {
            navigator(`/dashboard/updatedonation/${id}`,{state:'my-donation'})
      
    }



      const handleDelete = (id) => {
        axiosSecure.delete(`/request/id/delete/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        const newReq = requestInfo.filter(info => info._id != id)
        setRequestInfo(newReq)
        document.getElementById('my_modal_3').close()

    }

    const openDeleteModal = (id) => {
        reqId.current = id;
        document.getElementById('my_modal_3').showModal()


    }

    const handleView = (id) => {
        navigator(`/dashboard/donation-request-details/${id}`)

    }
    return (

        <div>

            <h1 className='text-center text-red-800 text-2xl font-bold mt-10 mb-10'>My Donation Request</h1>
            {
                requestInfo ?
                <div className="overflow-x-auto mx-4 lg:mx-10">
                {
                    requestInfo ? requestInfo.length > 0 ? 
                    <table className="table  shadow-2xl md:max-w-[1000px] pl-5 md:pl-20 mb-[50px]">
                        {/* head */}
                        <thead >
                            <tr className='text-xl font-bold'>
                                <th>Recipient Name</th>
                                <th>Recipient location</th>
                                <th>Donation date</th>
                                <th>Donation time</th>
                                <th>Blood group</th>
                                <th>Donation status</th>
                                <th>Donor information</th>
                            </tr>
                        </thead>


                        <tbody>
                            {
                                requestInfo.map(request => <tr key={request._id}>

                                    <td className=' font-semibold'>
                                        {request.recipient}
                                    </td>
                                    <td className='font-semibold'>
                                        {`${request.recipientDistrict},${request.recipientUpazila}`}
                                    </td>
                                    <td className=' px-4 py-2 font-semibold'>{request.donationDate}</td>
                                    <td className=' px-4 py-2 font-semibold'>{request.donationTime}</td>
                                    <td className=' px-4 py-2 font-semibold'>{request.bloodGrp}</td>
                                    <td className=' px-4 py-2 font-semibold'>{request.status}</td>
                                    <td className=' px-4 py-2 font-semibold'>{`${request.requester}, ${request.requesterEmail}`}</td>
                                    <td>
                                        <button onClick={() => handleEdit(request._id)} className='btn btn-primary'>Edit</button>
                                    </td>
                                    <td>
                                        <button onClick={() => openDeleteModal(request._id)} className='btn btn-error'>Delete</button>
                                    </td>
                                    <td>
                                        <button onClick={() => handleView(request._id)} className='btn btn-warning'>View</button>
                                    </td>

                                </tr>)
                            }
                        </tbody>

                    



                    </table> : <p className='text-center my-8 font-bold text-xl text-[grey]'>No Available Data</p>
                     : <Loader></Loader>

                }

            </div>
                    : <Loader></Loader>
            }


              
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>
                    <h3 className="font-bold text-lg">Delete!</h3>
                    <p className="py-4">Do you want to delete?</p>

                    <div className='flex justify-end'>
                        <button onClick={() => handleDelete(reqId.current)} className='btn btn-error px-5 text-white font-bold'>Yes</button>
                    </div>
                </div>
            </dialog>


        </div>
    );
};

export default MyDonation;