import React, { useContext } from 'react';
import AuthContext from '../AuthProvider/AuthContext';

const Profile = () => {
    const { user,district,upazila } = useContext(AuthContext)
    console.log(user)
    return (
        <div>
            <div>
                <h1 className='text-center font-bold text-4xl text-slate-500 mt-[110px] mb-[50px]'>My Profile</h1>
                <div className='mx-auto bg-slate-100 p-5 md:p-15 lg:p-20 rounded-[14px] lg:w-fit mb-[50px]'>
                    <form className='flex flex-col lg:flex-row items-center justify-center gap-10'>
                        <div className=' w-[180px] h-[180px] lg:h-[250px] lg:w-[250px] bg-slate-300 shadow-2xl p-2 rounded-full'>
                            <img className='h-full w-full rounded-full' src={user?.photoURL} alt="" />

                        </div>

                        <fieldset className="fieldset shadow-2xl bg-white  py-8 w-full lg:w-[600px] rounded-box px-10 ">

                            <label className="label font-bold">Name</label>
                            <input defaultValue={user?.displayName} type="text" name='name' className="input w-full" placeholder="Name" />

                            <label className="label font-bold">Email</label>
                            <input value={user?.email} type="email" name='email' className="input w-full" placeholder="Email" />

                            <label className="label font-bold">Photo URL</label>
                            <input defaultValue={user?.photoURL} type="text" name='photo' className="input w-full" placeholder="URL" />
                            <button className="btn btn-neutral bg-slate-500 border-none hover:transition ease-in-out mt-4">Update Profile</button>
                        </fieldset>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profile;