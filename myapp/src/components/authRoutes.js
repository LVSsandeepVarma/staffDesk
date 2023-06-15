"use client"
import { setLoaderFalse, setLoaderTrue } from '../slice/loaderSlice';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const withAuth = (WrappedComponent) => {


    const WithProtection = (props)=>{

        const navigate = useNavigate();
        const checkAuthentication = async()=>{
            const token = sessionStorage.getItem("tmToken")
            if(token == null){
                navigate("/login")
            }
        }
        useEffect(()=>{
            checkAuthentication()
           
        },[checkAuthentication])
        return <>
        <WrappedComponent  />
        </> 
    }
    return WithProtection
    
  };


export default withAuth;