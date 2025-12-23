import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import axios from 'axios';


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const [role, setRole] = useState(null)
    const [district, setDistrict] = useState([])
    const [upazila, setUpazila] = useState([])


    useEffect(() => {
        axios('/District.json')
            .then(res => setDistrict(res.data))
    }, [])
    useEffect(() => {
        axios('/upazila.json')
            .then(res => setUpazila(res.data))
    }, [])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged((auth), (currentUser) => {
            setUser(currentUser)
            setLoading(false)
        })
        return () => unsubscribe()
    }, [])


    useEffect(() => {
        if (!user?.email) {
            setRole('donor'); 
            return;
        }

        axios(`https://blood-donation-rho-one.vercel.app/users/role/${user.email}`)
            .then(res => setRole(res?.data?.role || 'donor')) // fallback if missing
            .catch(() => setRole('donor')); // fallback if error
    }, [user?.email]);






    


    const authInfo = {
        user,
        loading,
        role,
        setLoading,
        setUser,
        district,
        upazila

    }
    return (
        <div>
            <AuthContext value={authInfo}>
                {children}
            </AuthContext>
        </div>
    );
};

export default AuthProvider;