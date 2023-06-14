"use client"
import axios from 'axios';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { useEffect, useState } from 'react';
import * as Yup from 'yup';
// import { useRouter } from 'next/navigation';
import { useSelector, useDispatch } from 'react-redux';
import loaderSlice, { setLoaderFalse, setLoaderTrue } from '../../slice/loaderSlice';
import Loading from '../loader/loading';
// login component
export default function Login() {
    const dispatch = useDispatch()
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    // const router = useRouter();
    const [email,setEmail] = useState("");
    const [password, setPassword] = useState("")
    const [saveCredentials, setSaveCredentials] = useState(false)
    const [responseError, setResponseError] = useState("")

    useEffect(()=>{
        const credentials= localStorage?.getItem("saveCredentials")
        console.log(credentials, "useEffect")
    },[])
    const initialValues=
    {
        email: email,
        password: password,
    };
    // form validation  
    const validationSchema = Yup.object({
        email: Yup.string().matches(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/, 'Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('Password is required')
            .min(5, 'Password must be at least 10 characters long')
            .max(10, 'Password maximum length should be 15 charecters long')

    });
    // form submit handler
    const handleSubmit = async(values) => {
        // Handle form submission
        dispatch(setLoaderTrue())
        try{
            const response= await axios.post("https://admin.tradingmaterials.com/api/staff/auth/login",{"email":values.email,"password":values.password})
            console.log(response.data?.token)
            sessionStorage.setItem("tmToken",response.data?.token);
            // router.push("/dashboard")
            dispatch(setLoaderTrue())
            setResponseError("")

        }catch(error){
            console.log(error?.response?.data?.message)
            setResponseError(error?.response?.data?.message)
            dispatch(setLoaderTrue())
        }
        if(saveCredentials){
            console.log("saved") // need to add tw token from api respomse
        }
        dispatch(setLoaderFalse())
        console.log(values);
    };
    return (
        <main>
            {/* {loaderState && <Loading/>} */}
            <div className="container-scroller">
                <div className="container-fluid page-body-wrapper full-page-wrapper !p-0">
                    <div className="content-wrapper d-flex align-items-center auth px-0">
                        <div className="row w-100 mx-0 h-[100vh] bg-[#edeef2]">
                            <div className="col-lg-4 mx-auto flex items-center w-[100%] flex justify-center !p-0">
                                <div className="auth-form-light text-start py-5 px-4 px-sm-5 bg-[#fff]">
                                    <div className="brand-logo mb-[2rem]">
                                        <img src="/images/logo.png" alt="logo" />
                                    </div>
                                    <h4 className="text-base	text-blue-950 font-extrabold	">Hello! lets get started</h4>
                                    <h6 className="fw-light text-sm">Sign in to continue.</h6>
                                    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={(values) => handleSubmit(values)}>
                                        <Form className="pt-3" >
                                            <div className="form-group mb-[1.5rem]">
                                                <Field className="form-control form-control-lg text-base bg-transparent" type="text" id="email" name="email" placeholder="Email" />
                                                <ErrorMessage className='text-red-900' name="email" component="div" />
                                            </div>
                                            <div className="form-group mb-[1.5rem]">
                                                <Field className="form-control form-control-lg text-base bg-transparent" type="password" id="password" name="password" placeholder="Password" />
                                                <ErrorMessage className='text-red-900' name="password" component="div" />

                                            </div>
                                            {responseError.length ? <p className='text-red-900'>{responseError}</p> : ""}
                                            <div className="mt-3">
                                                <button type="submit" className="btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn" href="../../index.html">SIGN IN</button >
                                            </div>
                                            <div className="my-2 d-flex justify-content-between align-items-center">
                                                <div className="form-check">
                                                    <label className="form-check-label text-muted">
                                                        <input type="checkbox" className="form-check-input" onClick={()=>setSaveCredentials(!saveCredentials)} />
                                                        Keep me signed in
                                                    </label>
                                                </div>
                                                <a href="/reset-password" className="auth-link text-black">Forgot password?</a>
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