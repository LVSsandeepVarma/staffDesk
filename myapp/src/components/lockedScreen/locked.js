"use client"
import axios from 'axios';
import Image from "next/image";
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import loaderSlice, { setLoaderFalse, setLoaderTrue } from '@/store/slice/loaderSlice';
import Loading from '../loader/loading';
import { setUserInfo } from '@/store/slice/userInfoSlice';
// login component
export default function Locked() {
    const dispatch = useDispatch();
    const loaderState = useSelector((state)=>state.loaderReducer.value);
    const userInfo = useSelector((state) => state?.userInfoReducer);
    console.log(userInfo)
    const router = useRouter();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [saveCredentials, setSaveCredentials] = useState(false)
    const [responseError, setResponseError] = useState("")

    useEffect(()=>{
        const fetchUserInfo = async () =>{
            try{
              const token = sessionStorage.getItem("tmToken")
              const response = await axios.get("https://admin.tradingmaterials.com/api/staff/get-user-info", {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              console.log(response?.data)
              dispatch(setUserInfo(response?.data))
            }catch(error){
              console.error(error)
            }
          }
      
          fetchUserInfo().then(()=>{
            dispatch(setLoaderFalse())
          })
          const lockUser = async()=>{
            try{
                const token = sessionStorage.getItem("tmToken");
                const response = await axios.post("https://admin.tradingmaterials.com/api/staff/lockout", {}, {
                    headers:{
                        Authorization: `Bearer ${token}`
                    }
                })
                console.log(response?.data?.message)
            }catch(err){
                console.log(err)
            }
          }
          lockUser()
    },[])
    const initialValues=
    {
        password: password,
    };
    // form validation  
    const validationSchema = Yup.object({
        password: Yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 10 characters long')
            .max(10, 'Password maximum length should be 15 charecters long')

    });
    // form submit handler
    const handleSubmit = async(values) => {
        // Handle form submission
        console.log(values)
        dispatch(setLoaderTrue())
        try{
            sessionStorage.setItem("tmToken",response.data?.token);
            const response= await axios.post("https://admin.tradingmaterials.com/api/staff/unlock",{"password":values.password},{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response)
            router.push("/dashboard")
            dispatch(setLoaderTrue())
            setResponseError("")

        }catch(error){
            console.log(error?.response?.data?.message)
            setResponseError(error?.response?.data?.message)
            dispatch(setLoaderTrue())
        }
        dispatch(setLoaderFalse())
        console.log(values);
    };
    return (
        <main>
            {loaderState && <Loading/>}
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper !p-0">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0 h-[100vh] bg-[#edeef2]">
                            <div className="col-lg-4 mx-auto flex items-center w-[100%] flex justify-center !p-0">
                                <div className="auth-form-light text-start py-5 px-4 px-sm-5 bg-[#fff]">
                                    <div className="brand-logo mb-[2rem]">
                                        <img src="/images/logo.png" alt="logo" />
                                    </div>
                                    <div className=' mb-[2rem] flex flex-col items-center'>
                                    <Image src="/images/emptyProfile.png" width={150} height={150} alt="" className="justify-center profile-pic w-8 h-8 rounded-full bg-zinc-400	ml-2" style={{width:"5rem", height: "5rem"}} />
                                    <h4 className='block text-bold-500'>{userInfo?.value?.data?.staff?.username}</h4>
                                    </div>

                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => {handleSubmit(values)}}>
                                        <Form className="pt-3" >
                                            <div className="form-group mb-[1.5rem]">
                                                <Field className="form-control form-control-lg text-base bg-transparent" type="password" id="password" name="password" placeholder="Password" />
                                                <ErrorMessage className='text-red-900' name="password" component="div" />

                                            </div>
                                            {responseError.length ? <p className='text-red-900'>{responseError}</p> : ""}
                                            <div className="mt-3">
                                                <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" >UNLOCK</button >
                                            </div>
                                        </Form>
                                    </Formik>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}