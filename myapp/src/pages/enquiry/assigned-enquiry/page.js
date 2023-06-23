"use client"
import withAuth from "../../../components/authRoutes";
import Asigned_enquiry from "../../../components/asignedEnquiry/asignedEnquiry";


const ProtectedFetchEnquiry = withAuth(Asigned_enquiry)


export default function FetchEnquiry(){

    return(
        <>
       {/* {loaderState && <Loading/>} */}
       <ProtectedFetchEnquiry/>
       </>
        
    )
}