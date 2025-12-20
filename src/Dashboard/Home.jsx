import React, { useContext, useEffect, useRef, useState } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Loader from '../Component/Loader';
import { Link, useNavigate } from 'react-router';

const DashboardHome = () => {
    const { user } = useContext(AuthContext)
    const axiosSecure = useAxiosSecure()
    const [requestInfo, setRequestInfo] = useState(null)
    const reqId = useRef(null)

    const navigator = useNavigate()

    const handleEdit = (id) => {
        navigator(`/dashboard/updatedonation/${id}`)
    }



    useEffect(() => {

        if (!user) return;
        axiosSecure(`/request/${user?.email}`)
            .then(res => {
                setRequestInfo(res.data)
            })
            .catch(err => console.log(err))
    }, [user, axiosSecure])


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
            <h1 className='text-3xl text-center mt-10'>Welcome <span className='font-bold  text-red-950'>{user.displayName}!</span></h1>

            <h1 className='font-bold text-3xl mt-20 pl-[20px] lg:pl-[70px] mb-8'>Recent Donation</h1>

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

                        {/* document.getElementById('my_modal_3').showModal() */}



                    </table> : <p className='text-center my-8 font-bold text-xl text-[grey]'>No Available Data</p>
                     : <Loader></Loader>

                }

            </div>

          <div className='w-fit mx-auto mt-10'>
                <Link to='/dashboard/mydonation' className='btn bg-red-900 text-white'>View My All Request</Link>
            </div>
            
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

export default DashboardHome;