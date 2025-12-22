import React, { useContext } from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useRef } from 'react';
import { useState } from 'react';
import Loader from '../Component/Loader';
import { useNavigate } from 'react-router';
import AuthContext from '../AuthProvider/AuthContext';


const AllDonation = () => {
    const axiosSecure = useAxiosSecure()
    const [requestInfo, setRequestInfo] = useState(null)
    const reqId = useRef(null)
    const navigator = useNavigate()
    const { role } = useContext(AuthContext)
    const [filterInfo, setFilterInfo] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axiosSecure('/request')
            .then(res => {

                setRequestInfo(res.data || [])
                setFilterInfo(res.data || [])
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false))
    }, [axiosSecure])



    const handleDelete = (id) => {
        axiosSecure.delete(`/request/id/delete/${id}`)
            .then(res => console.log(res.data))
            .catch(err => console.log(err))
        const newReq = filterInfo.filter(info => info._id != id)
        setFilterInfo(newReq)
        document.getElementById('my_modal_3').close()

    }


    const handleEdit = (id) => {
        navigator(`/dashboard/updatedonation/${id}`, { state: 'all-donation' })
    }

    const openDeleteModal = (id) => {
        reqId.current = id;
        document.getElementById('my_modal_3').showModal()


    }

    const handleView = (id) => {
        navigator(`/dashboard/donation-request-details/${id}`)
    }


    const handleDone = (id) => {

        const singleUser = filterInfo.find(user => user._id == id)
        const updatedData = { ...singleUser, status: 'done' }

        setFilterInfo((prev) =>
            prev?.map((u) => (u._id === id ? { ...u, status: "done" } : u))
        );

        axiosSecure.put(`/update/id/${id}`, updatedData)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)

                setFilterInfo((prev) =>
                    prev?.map((u) => (u._id === id ? { ...u, status: "inprogress" } : u))
                );
            })

    }

    const handleCancel = (id) => {

        const singleUser = filterInfo.find(user => user._id == id)
        const updatedData = { ...singleUser, status: 'canceled' }

        setFilterInfo((prev) =>
            prev?.map((u) => (u._id === id ? { ...u, status: "canceled" } : u))
        );

        axiosSecure.put(`/update/id/${id}`, updatedData)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)

                setFilterInfo((prev) =>
                    prev?.map((u) => (u._id === id ? { ...u, status: "inprogress" } : u))
                );
            })

    }


    const handleStatus = (statuss) => {
        const newInfo = (statuss == 'All') ? requestInfo : requestInfo.filter(info => info.status == statuss)
        setFilterInfo(newInfo)
    }


    return (
        <div>
            <div className='flex flex-col lg:flex-row items-center justify-center ml-4 mt-10 gap-2'>
                <h1 className='font-bold text-2xl'>Choose Status :</h1>
                <select onChange={(e) => handleStatus(e.target.value)} name='statusChoose' defaultValue="All" className="select select-primary">
                    <option >All</option>
                    <option>inprogress</option>
                    <option>pending</option>
                    <option>done</option>
                    <option>canceled</option>
                </select>
            </div>


            <div className='mt-10'>
                <div className="overflow-x-auto mx-4 lg:mx-10">
                    {
                        filterInfo ? filterInfo.length > 0 ?
                            <table className="table  shadow-2xl md:max-w-[1000px] pl-5 md:pl-20 mb-[50px] ">
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
                                        filterInfo.map(request => <tr key={request._id}>

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

                                            {
                                                role == 'admin' && <td>
                                                    <button onClick={() => handleEdit(request._id)} className='btn btn-primary'>Edit</button>
                                                </td>
                                            }

                                            {
                                                role == 'admin' && <td>
                                                    <button onClick={() => openDeleteModal(request._id)} className='btn btn-error'>Delete</button>
                                                </td>

                                            }

                                            <td>
                                                <button onClick={() => handleView(request._id)} className='btn btn-warning'>View</button>
                                            </td>

                                            {
                                                request.status == 'inprogress' && <td>
                                                    <button onClick={() => handleDone(request._id)} className='btn bg-green-600 text-white font-bold'>Done</button>
                                                </td>
                                            }

                                            {
                                                request.status == 'inprogress' && <td>
                                                    <button onClick={() => handleCancel(request._id)} className='btn bg-red-800 text-white font-bold'>Cancel</button>
                                                </td>
                                            }






                                        </tr>)
                                    }
                                </tbody>





                            </table> : <p className='text-center my-8 font-bold text-xl text-[grey]'>No Available Data</p>
                            : <Loader></Loader>

                    }

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
        </div>
    );
};


export default AllDonation;