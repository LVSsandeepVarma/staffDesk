"use client"
// import Fetch_Enquiry from "@/components/fetchEnquiry/fetch";
import withAuth from "@/components/authRoutes";
import Asigned_enquiry from "@/components/asignedEnquiry/asignedEnquiry";
// import { usePathname, useSearchParams } from 'next/navigation'
// import { useDispatch, useSelector } from "react-redux";
// import { setLoaderTrue, setLoaderFalse } from "@/store/slice/loaderSlice";
// import Loading from "@/components/loader/loading";
// import { useEffect } from "react";

const ProtectedFetchEnquiry = withAuth(Asigned_enquiry)


export default function FetchEnquiry(){
    // const dispatch = useDispatch()
    // const loaderState = useSelector((state) => state?.loaderReducer.value)

    // const pathname = usePathname()
    // const searchParams = useSearchParams()
    // useEffect(() => {
    //    // do something because url changed.
    //    if(loaderState){
    //     dispatch(setLoaderTrue())
    //    }
    //    else{
    //     // dispatch(setLoaderFalse())

    //    }
    // }, [pathname, searchParams])

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedFetchEnquiry/>
       </>
        
    )
}