import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../Firebase/Firebase.init';
import { Eye, EyeOff } from 'lucide-react';



const provider = new GoogleAuthProvider()
const Login = () => {

    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigator = useNavigate()
    const [cngEmail, setCngEmail] = useState('')


    const handleEmailPass = (e) => {
        e.preventDefault();
        const email = e.target.email.value
        const password = e.target.password.value
        signInWithEmailAndPassword(auth, email, password)
            .then(() => {
                navigator(location.state || '/')
            })
            .catch(error => console.log(error.message))

    }

    const handleGoogle = (e) => {
        e.preventDefault()
        signInWithPopup(auth, provider)
            .then(() => {
                navigator(location.state || '/')
            })
            .catch(error => console.log(error.message))
    }



    const handleShowPass = () => {
        setShowPass(!showPass)
    }


    return (
       <div className='min-h-screen flex items-center justify-center'>
          
            <form onSubmit={handleEmailPass} >
                <h1 className='text-center text-slate-500 text-3xl font-bold mb-4'>Login</h1>
                <fieldset className="fieldset shadow-2xl py-8 border-base-300 rounded-box w-xs border p-4">
                    <label className="label font-bold">Email</label>
                    <input onChange={(e) => setCngEmail(e.target.value)} type="email" name='email' className="input " placeholder="Email" />

                    < label className="label font-bold">Password</label>
                    <div className='relative flex items-center'>
                        <input type={showPass ? 'text' : 'password'} name='password' className="input  " placeholder="Password" />

                        {
                            showPass ? <EyeOff onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2' />
                                :
                                <Eye onClick={handleShowPass} className='w-[20px] h-[20px] cursor-pointer absolute top-3 right-2'></Eye>
                        }

                    </div>

                    <button className="btn btn-neutral bg-slate-500 border-none hover:transition ease-in-out mt-4">Login</button>


                    <button onClick={handleGoogle} className="btn bg-white mt-[5px] border border-slate-400 text-black border-[#e5e5e5]">
                        <svg aria-label="Google logo" width="16" height="16" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><g><path d="m0 0H512V512H0" fill="#fff"></path><path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path><path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path><path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path><path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path></g></svg>
                        Login with Google
                    </button>


                    <p className='mt-[10px] text-center'>Don't have an account? <Link to='/register' className='underline font-bold '>Register here</Link>
                    </p>
                </fieldset>

            </form>
        </div>
    );
};

export default Login;