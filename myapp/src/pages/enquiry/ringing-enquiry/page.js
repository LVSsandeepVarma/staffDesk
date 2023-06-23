"use client"
import withAuth from "../../../components/authRoutes";
import Ringing_Enquiry from "../../../components/ringingEnquiry/ringingEnquiry";

const ProtectedFetchEnquiry = withAuth(Ringing_Enquiry)


export default function FetchEnquiry(){
    return(
        <ProtectedFetchEnquiry/>
    )
}