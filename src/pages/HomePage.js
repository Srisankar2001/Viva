import React from "react";
import NavBar from "../components/NavBar";
import { isAuthenticated, logout } from "../services/Auth"
import { Navigate, useNavigate } from "react-router-dom"

function HomePage(){
    ////T/////////
    const navigate= useNavigate()
     ///////////Tharsi//////////////
     const logoutUser=()=>{
        logout();
        navigate('/login')
    }
    //////////////////////
    return(
        <div>
            <NavBar logoutUser={logoutUser}/>
            <h1>HomePage</h1>
        </div>
    )
}

export default HomePage;