import React, { useContext } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import { Loader } from 'lucide-react';
import { updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';

const Profile = () => {
    
    const { user,role,setUser} = useContext(AuthContext);
    console.log(user)
    const handleUpdate = (e)=>{
        e.preventDefault()
        const name = e.target.name.value
        const photo = e.target.photo.value

        updateProfile(auth.currentUser,{
            displayName:name,
            photoURL:photo
        }).then(()=>{
            setUser({...auth.currentUser,displayName:name,photoURL:photo})
            alert('Successfully Updated')
        }).catch(err => console.log(err))

    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-4xl mx-auto">
                <header className="text-center mb-10">
                    <h1 className="text-3xl font-extrabold text-gray-800 tracking-tight">{role.charAt(0).toUpperCase()+role.slice(1)} Profile</h1>
                    <p className="text-gray-500 mt-2">Manage your personal information and donation preferences</p>
                </header>

                <div className="bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
                    <div className="flex flex-col lg:flex-row">
                        
                        {/* Left Side: Avatar/Status */}
                        <div className="lg:w-1/3 bg-gray-50 p-8 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r border-gray-100">
                            <div className="relative">
                                <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full border-4 border-white shadow-lg overflow-hidden">
                                    <img 
                                        className="h-full w-full object-cover" 
                                        src={user?.photoURL || 'https://via.placeholder.com/150'} 
                                        alt="Profile" 
                                    />
                                </div>
                                <span className="absolute bottom-4 right-4 block h-5 w-5 rounded-full bg-green-500 border-2 border-white"></span>
                            </div>
                            <h2 className="mt-4 text-xl font-bold text-gray-700">{user?.displayName}</h2>
                            <p className="text-sm text-red-600 font-medium px-3 py-1 bg-red-50 rounded-full mt-2">
                                Blood Donor
                            </p>
                        </div>

                        {/* Right Side: Form Details */}
                        <div className="lg:w-2/3 p-8 lg:p-12">
                            <form onSubmit={handleUpdate} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">Full Name</label>
                                        <input 
                                            defaultValue={user?.displayName} 
                                            className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all" 
                                            placeholder="Enter your name"
                                            name='name'
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">Email Address</label>
                                        <input 
                                            value={user?.email} 
                                            readOnly 
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500 cursor-not-allowed"
                                        />
                                    </div>
                                    {/* <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">District</label>
                                        <input 
                                            value={district || "Not Set"} 
                                            readOnly 
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-600 mb-2">Upazila</label>
                                        <input 
                                            value={upazila || "Not Set"} 
                                            readOnly 
                                            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-gray-500"
                                        />
                                    </div> */}
                                </div>

                                <div>
                                    <label className="block text-sm font-semibold text-gray-600 mb-2">Photo URL</label>
                                    <input 
                                        defaultValue={user?.photoURL} 
                                        className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-red-400 focus:border-transparent outline-none transition-all" 
                                        placeholder="Image link"
                                        name='photo'
                                    />
                                </div>

                                <div className="pt-4 border-t border-gray-100 flex justify-end">
                                    <button  className="px-8 py-2.5 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors shadow-md active:transform active:scale-95">
                                        Update Profile
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;