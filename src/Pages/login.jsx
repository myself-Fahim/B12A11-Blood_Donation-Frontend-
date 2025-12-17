import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import auth from '../Firebase/Firebase.init';
import { Eye, EyeOff } from 'lucide-react';
import AuthContext from '../AuthProvider/AuthContext';



const provider = new GoogleAuthProvider()
const Login = () => {

    const [showPass, setShowPass] = useState(false)
    const location = useLocation()
    const navigator = useNavigate()
    const [cngEmail, setCngEmail] = useState('')
    const { role } = useContext(AuthContext)
    console.log(role);


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

   


    const handleShowPass = () => {
        setShowPass(!showPass)
    }


    return (
        <div className='min-h-screen flex items-center justify-center'>

            <form onSubmit={handleEmailPass} >
                <h1 className='text-center text-red-800 text-3xl font-bold mb-4'>Login</h1>
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

                    <button className="btn btn-neutral bg-red-800 border-none hover:transition ease-in-out mt-4">Login</button>
                    <p className='mt-[10px] text-center'>Don't have an account? <Link to='/register' className='underline font-bold '>Register here</Link>
                    </p>
                </fieldset>

            </form>
        </div>
    );
};

export default Login;