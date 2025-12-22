import React from 'react';
import { useEffect } from 'react';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useState } from 'react';
import Loader from '../Component/Loader';

const AllUser = () => {
    const axiosSecure = useAxiosSecure()
    const [totalUser, setTotalUser] = useState(null)




    useEffect(() => {
        axiosSecure('/users')
            .then(res => {
        
                setTotalUser(res.data)
            })
            .catch(err => console.log(err))
    }, [axiosSecure])



    const handleBlock = (id) => {
        const singleUser = totalUser.find(user => user._id == id)
        const updatedData = { ...singleUser, status: 'block' }
        setTotalUser((prev) =>
            prev?.map((u) => (u._id === id ? { ...u, status: "block" } : u))
        );

        axiosSecure.put(`/user/id/${id}`, updatedData)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)

                setTotalUser((prev) =>
                    prev?.map((u) => (u._id === id ? { ...u, status: "active" } : u))
                );
            })

    }

    const handleUnblock = (id) => {
        const singleUser = totalUser.find(user => user._id == id)
        const updatedData = { ...singleUser, status: 'active' }

        setTotalUser((prev) =>
            prev?.map((u) => (u._id === id ? { ...u, status: "active" } : u))
        );

        axiosSecure.put(`/user/id/${id}`, updatedData)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)

                setTotalUser((prev) =>
                    prev?.map((u) => (u._id === id ? { ...u, status: "block" } : u))
                );
            })

    }

    const makeVolunteer = (id) =>{

        const singleUser = totalUser.find(user => user._id == id)
        const prevRole = singleUser.role
        const updatedData = { ...singleUser, role: 'volunteer' }

        setTotalUser((prev) =>
            prev?.map((u) => (u._id === id ? { ...u, role: 'volunteer' } : u))
        );

        axiosSecure.put(`/user/id/${id}`, updatedData)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)

                setTotalUser((prev) =>
                    prev?.map((u) => (u._id === id ? { ...u, role: prevRole } : u))
                );
            })
    }
    const makeAdmin = (id) =>{

        const singleUser = totalUser.find(user => user._id == id)
        const prevRole = singleUser.role
        const updatedData = { ...singleUser, role: 'admin' }

        setTotalUser((prev) =>
            prev?.map((u) => (u._id === id ? { ...u, role: 'admin' } : u))
        );

        axiosSecure.put(`/user/id/${id}`, updatedData)
            .then(res => console.log(res.data))
            .catch(err => {
                console.log(err)

                setTotalUser((prev) =>
                    prev?.map((u) => (u._id === id ? { ...u, role: prevRole } : u))
                );
            })
    }





    return (
        <div>
            <div className="overflow-x-auto mt-12 px-10">

                {
                    totalUser ? totalUser.length > 0 ?
                        <table className="table  mx-auto shadow-2xl  pl-8 py-3 mb-[50px]">
                            {/* head */}
                            <thead >
                                <tr className='text-xl font-bold'>
                                    <th>Avatar</th>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Status</th>
                                </tr>
                            </thead>


                            <tbody>
                                {
                                    totalUser.map(userr => <tr key={userr._id}>

                                        <td className=' font-semibold'>
                                            <div className="avatar">
                                                <div className="mask mask-squircle h-12 w-12">
                                                    <img
                                                        src={userr.photoUrl}
                                                        alt="Avatar Tailwind CSS Component" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className=' font-semibold'>{userr.name}</td>
                                        <td className=' font-semibold'>
                                            {userr.email}
                                        </td>
                                        <td className='   font-semibold'>{userr.role}</td>
                                        <td className=' font-semibold'>{userr.status}</td>


                                        <td>
                                            <button onClick={() => handleBlock(userr._id)} className='btn btn-error'>Block</button>
                                        </td>
                                        <td>
                                            <button onClick={() => handleUnblock(userr._id)} className='btn btn-success'>Unblock</button>
                                        </td>
                                        <td>
                                            <button onClick={()=>makeVolunteer(userr._id)} className='btn btn-primary'>Make Volunteer</button>
                                        </td>
                                        <td>
                                            <button onClick={()=>makeAdmin(userr._id)} className='btn btn-active'>Make Admin</button>
                                        </td>


                                    </tr>)
                                }
                            </tbody>





                        </table> : <p className='text-center my-8 font-bold text-xl text-[grey]'>No Available Data</p>
                        : <Loader></Loader>

                }

            </div>
        </div>
    );
};

export default AllUser;