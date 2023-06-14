"use client"
import { setLoaderFalse, setLoaderTrue } from '@/store/slice/loaderSlice';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
const withAuth = (WrappedComponent) => {


    const WithProtection = (props)=>{

        const router = useRouter();
        const checkAuthentication = async()=>{
            const token = sessionStorage.getItem("tmToken")
            if(token == null){
                router.push("/login")
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