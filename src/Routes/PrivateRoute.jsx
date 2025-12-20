import React, { Children, useContext } from 'react';
import AuthContext from '../AuthProvider/AuthContext';
import Loader from '../Component/Loader';
import { Navigate } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user,loading} = useContext(AuthContext)

    if(loading )
        return <Loader></Loader>

    if(user){
        return children
    }

    return <Navigate to='/login'></Navigate>
       
    
};

export default PrivateRoute;