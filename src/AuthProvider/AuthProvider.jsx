import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { onAuthStateChanged } from 'firebase/auth';
import auth from '../Firebase/Firebase.init';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loader, setLoader] = useState(true)
    const [role,setRole] = useState(null)
    const [district,setDistrict] = useState([])
    const [upazila,setUpazila] = useState([])

    useEffect(()=>{
        axios('/District.json')
        .then(res => setDistrict(res.data))
    },[])
    useEffect(()=>{
        axios('/upazila.json')
        .then(res => setUpazila(res.data))
    },[])


    useEffect(() => {
        const unsubscribe = onAuthStateChanged((auth), (currentUser) => {
            setUser(currentUser)
            setLoader(false)
        })
        return () => unsubscribe()
    }, [])

    
    useEffect(() => {
        if (!user)
            return 
        axios(`http://localhost:5000/users/role/${user.email}`)
        .then(res => setRole(res.data.role))
           
            
    }, [user])



    const authInfo = {
        user,
        loader,
        role,
        setLoader,
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