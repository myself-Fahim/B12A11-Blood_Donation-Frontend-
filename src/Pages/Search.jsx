import React, { useContext, useEffect, useState } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';

const Search = () => {
    const axiosSecure = useAxiosSecure()
    const { upazila, district } = useContext(AuthContext)
    const [userData, setUserData] = useState(null)
    const [isSelected, setIsSelected] = useState(false)


    useEffect(() => {
        axiosSecure('/request')
            .then(res => {
                setUserData(res.data)
            })
            .catch(err => console.log(err))

    }, [axiosSecure])

    const handleSearch = (e) => {
        e.preventDefault()
        const bloodGrp = e.target.bloodGroup.value
        const upazila = e.target.recipientUpazila.value
        const district = e.target.recipientDistrict.value


        const searchData = userData.filter(user => user.bloodGrp == bloodGrp && user.recipientUpazila == upazila
            && user.recipientDistrict == district
        )
        setUserData(searchData)
        if (searchData) {
            setIsSelected(true)
        }


    }



    return (
        <div>
            <form onSubmit={handleSearch} className=' mt-15 w-fit mx-auto p-8 shadow-2xl'>
                <div className='flex flex-col lg:flex-row items-center  gap-4'>
                    <div>
                        <label className="label font-bold">Blood Group</label>
                        <select
                            required
                            name="bloodGroup"
                            defaultValue=""

                            className="select w-full"
                        >
                            <option value="" disabled={true}>Select Blood Group</option>
                            <option>A+</option>
                            <option>A-</option>
                            <option>B+</option>
                            <option>B-</option>
                            <option>AB+</option>
                            <option>AB-</option>
                            <option>O+</option>
                            <option>O-</option>
                        </select>

                    </div>


                    <div>
                        <label className="label font-bold">Recipient Upazila</label>
                        <select
                            required
                            name="recipientUpazila"
                            defaultValue=""
                            className="select w-full"
                        >
                            <option value="" disabled={true}>Select Upazila</option>
                            {
                                upazila.map(upazila => <option key={upazila.id}>{upazila.name} ({upazila.bn_name})</option>)
                            }
                        </select>

                    </div>

                    <div>
                        <label className="label font-bold">Recipient District</label>
                        <select
                            required
                            name="recipientDistrict"
                            defaultValue=""
                            className="select w-full"
                        >
                            <option value="" disabled={true}>Select District</option>
                            {
                                district.map(district => <option key={district.id}>{district.name} ({district.bn_name})</option>)
                            }
                        </select>
                    </div>
                </div>
                <button className='btn block mx-auto mt-10 bg-red-800 text-white font-bold'>Search</button>
            </form>




            {
                isSelected ?
                    <div className="overflow-x-auto  flex justify-center mt-20">
                        {
                            userData ? userData.length > 0 ?
                                <table className="table  shadow-2xl md:max-w-[1000px] pl-5 md:pl-20 mb-[50px] ">
                                    {/* head */}
                                    <thead >
                                        <tr className='text-xl font-bold'>

                                            <th>Requester</th>
                                            <th>RequesterEmail</th>
                                            <th>Recipient</th>
                                            <th>Blood Group</th>
                                            <th>Upazila</th>
                                            <th>District</th>
                                            <th>Donation Date</th>
                                            <th>Donation Time</th>
                                        </tr>
                                    </thead>


                                    <tbody>
                                        {
                                            userData.map(request => <tr key={request._id}>
                                                <td className=' font-semibold'>
                                                    {request.requester}
                                                </td>
                                                <td className=' font-semibold'>
                                                    {request.requesterEmail}
                                                </td>
                                                <td className=' font-semibold'>
                                                    {request.recipient}
                                                </td>
                                                <td className=' font-semibold'>
                                                    {request.bloodGrp}
                                                </td>
                                                <td className='font-semibold'>
                                                    {request.recipientUpazila}
                                                </td>
                                                <td className=' px-4 py-2 font-semibold'>{request.recipientDistrict}</td>

                                                <td className=' font-semibold'>
                                                    {request.donationDate}
                                                </td>
                                                <td className=' font-semibold'>
                                                    {request.donationTime}
                                                </td>
                                            </tr>)
                                        }
                                    </tbody>





                                </table> : <p className='text-center my-8 font-bold text-xl text-[grey]'>Not Selected</p>
                                : <Loader></Loader>

                        }

                    </div> : <p className='text-center mt-25 font-bold text-xl text-[grey]'>Not Selected</p>
            }





        </div>
    );
};

export default Search;