import React from 'react';
import "../Pages/Pages.css";
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
    const navigate=useNavigate();
    
    return (
        <div>
            <div className='total'>
            <div className='mainpage'>
            <h1 className='welcome-main'>Welcome To AI Culinary Companion <i className="fa-solid fa-utensils"/></h1>
            <button className='btn btn-primary click' onClick={()=>navigate("/dashboard")}>Click Here </button>
            </div>
            </div>
        </div>
    );
};

export default MainPage;