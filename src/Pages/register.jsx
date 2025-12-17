import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import { Link, useNavigate } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../AuthProvider/AuthContext';


const Register = () => {
    const { user, setUser } = useContext(AuthContext)
    const navigator = useNavigate()
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)
    const [district, setDistrict] = useState(null)
    const [upazila, setUpazila] = useState(null)

    useEffect(() => {
        fetch('./District.json')
            .then(res => res.json())
            .then(data => setDistrict(data))
    }, [])

    useEffect(() => {
        fetch('./upazila.json')
            .then(res => res.json())
            .then(data => setUpazila(data))
    }, [])




    const handleCreateUser = async (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const confirmPassword = e.target.confirm_password.value
        const name = e.target.name.value
        const photo = e.target.photo
        const file = photo.files[0]
        const upazila = e.target.upazila.value
        const district = e.target.district.value
        const role = e.target.role.value

        const res = await axios.post(`https://api.imgbb.com/1/upload?key=38b4eb287c57a9b82557d99bf3afdf9d`, { image: file }, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const photoUrl = res.data.data.url;
        const formData = {
            name,
            email,
            password,
            photoUrl,
            upazila,
            district,
            status: "active",
            role
        }

        if (password !== confirmPassword) {
            return setError('Password didn\'t matched')
        }

        setError('')
        const validPassword = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/
        if (!validPassword.test(password)) {
            return setError('Passoword must contain uppercase and lowercase letter with length of 6')

        }

        if (res.data.success) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((result) => {
                    updateProfile(result.user, {
                        displayName: name,
                        photoURL: photoUrl
                    })
                    // console.log(result.user)
                    setUser(result.user)
                    axios.post('http://localhost:5000/users', formData)
                        .then(res => console.log(res.data))
                    // e.target.reset()
                    // navigator('/')
                })
                .catch(error => console.log(error.message))
        }

    }



    const handleShowPass = () => {
        setShowPass(!showPass)
    }

    return (
        <div>
            <div className='min-h-screen flex items-center justify-center mb-10 mt-8'>
                <form onSubmit={handleCreateUser}>
                    <h1 className='text-center text-red-800 text-3xl font-bold mb-4'>Register</h1>
                    <fieldset className="fieldset shadow-2xl py-8 border-base-300 rounded-box w-[400px] border p-4">

                        <label className="label font-bold">Name</label>
                        <input type="text" name='name' className="input w-full" placeholder="Your Name" />

                        <label className="label font-bold">Email</label>
                        <input type="email" name='email' className="input w-full" placeholder="Email" />


                        <label className="label font-bold">Photo </label>
                        <input type="file" name='photo' className="input w-full" />

                        <label className="label font-bold">Role </label>
                        <select name='role' defaultValue="Select Role" className="select w-full">
                            <option disabled={true}>Select Role</option>
                            <option>Donor</option>
                            <option>Volunteer</option>
                        </select>

                        <label className="label font-bold"> District</label>
                        <select name='district' defaultValue="Select District" className="select w-full">
                            <option disabled={true}>Select District </option>
                            {
                                district ? district.map(district => <option key={district.id}>{district.name} ({district.bn_name})</option>) : <p>Loading....</p>
                            }

                        </select>


                        <label className="label font-bold">Upazila</label>
                        <select name='upazila' defaultValue="Select Upazila" className="select w-full">
                            <option disabled={true}>Select Upazila</option>
                            {
                                upazila ? upazila.map(upazila => <option key={upazila.id}>{upazila.name} ({upazila.bn_name})</option>) : <p>Loading....</p>
                            }

                        </select>



                        <label className="label font-bold">Password</label>
                        <div className='relative flex items-center'>
                            <input type={showPass ? 'text' : 'password'} name='password' className="input  w-full" placeholder="Password" />

                            {
                                showPass ? <EyeOff onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2' />
                                    :
                                    <Eye onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2'></Eye>
                            }
                        </div>

                        <label className="label font-bold">Confirm Password</label>
                        <div className='relative flex items-center'>
                            <input type={showPass ? 'text' : 'password'} name='confirm_password' className="input  w-full" placeholder="Confirm Password" />

                            {
                                showPass ? <EyeOff onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2' />
                                    :
                                    <Eye onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2'></Eye>
                            }
                        </div>

                        {
                            error && <p className='text-red-800 font-bold mt-2'>{error}</p>
                        }
                        <button className="btn btn-neutral  border-none hover:transition ease-in-out mt-4 bg-red-800 text-white">Register</button>


                        <p className='text-center mt-[10px] '>Already have an account? <Link to='/login' className='font-bold underline text-red-950'>Login</Link></p>

                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;