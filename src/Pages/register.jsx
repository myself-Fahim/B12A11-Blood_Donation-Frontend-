import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import { Link, useNavigate } from 'react-router';
import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import axios from 'axios';


const Register = () => {
    const navigator = useNavigate()
    const [error, setError] = useState('')
    const [showPass, setShowPass] = useState(false)

    const handleCreateUser = async (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        const name = e.target.name.value
        const photo = e.target.photo
        const file = photo.files[0]


        const res = await axios.post(`https://api.imgbb.com/1/upload?key=38b4eb287c57a9b82557d99bf3afdf9d`, { image: file }, {

            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        const photoUrl = res.data.data.url;
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
                    console.log(result.user)
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
            <div className='min-h-screen flex items-center justify-center'>
                <form onSubmit={handleCreateUser}>
                    <h1 className='text-center text-slate-500 text-3xl font-bold mb-4'>Register</h1>
                    <fieldset className="fieldset shadow-2xl py-8 border-base-300 rounded-box w-xs border p-4">

                        <label className="label font-bold">Name</label>
                        <input type="text" name='name' className="input " placeholder="Your Name" />

                        <label className="label font-bold">Email</label>
                        <input type="email" name='email' className="input " placeholder="Email" />


                        <label className="label font-bold">Photo </label>
                        <input type="file" name='photo' className="input " />

                        <label className="label font-bold">Password</label>
                        <div className='relative flex items-center'>
                            <input type={showPass ? 'text' : 'password'} name='password' className="input  " placeholder="Password" />

                            {
                                showPass ? <EyeOff onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2' />
                                    :
                                    <Eye onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2'></Eye>
                            }



                        </div>

                        {
                            error && <p className='text-red-800 font-bold mt-2'>{error}</p>
                        }

                        <button className="btn btn-neutral bg-slate-500 border-none hover:transition ease-in-out mt-4">Register</button>


                        <p className='text-center mt-[10px]'>Already have an account? <Link to='/login' className='font-bold underline'>Login</Link></p>

                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default Register;