import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectRoute(props) {
    if(!localStorage.getItem("userToken")) {
        return props.children;
    } else if (localStorage.getItem("userToken")) {
        return <Navigate to="/" />;
    }
}

export default ProtectRoute