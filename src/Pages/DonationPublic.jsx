import React from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useEffect } from 'react';
import { useContext } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import { useState } from 'react';
import Loader from '../Component/Loader';

const DonationPublic = () => {

    const axiosSecure = useAxiosSecure()
    const { user } = useContext(AuthContext)
    const [requestInfo, setRequestInfo] = useState(null)
    const [loading,setLoading] = useState(true)

    useEffect(() => {
        axiosSecure(`/request`)
            .then(res => {
                setRequestInfo(res.data || [])
            })
            .catch(err => console.log(err))
             .finally(()=>setLoading(false))
    }, [axiosSecure, user?.email])


      const handleView = (id) => {
        navigator(`/dashboard/donation-request-details/${id}`)

    }

    return (
        <div>
            <div>

            
         
                {
                    !loading ?
                        <div className="overflow-x-auto mt-10 mx-4 lg:mx-10">
                            {
                                requestInfo ?requestInfo.length > 0 ?
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
                                                requestInfo.map(request => request.status=='pending' && <tr key={request._id}>

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



              


            </div>
        </div>
    );
};

export default DonationPublic;