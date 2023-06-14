"use client"
import withAuth from "@/components/authRoutes";
import Asigned_enquiry from "@/components/asignedEnquiry/asignedEnquiry";
import Not_Intrested_Enquiry from "@/components/notIntrestedEnquiry/notIntrestedEnquiry";

const ProtectedFetchEnquiry = withAuth(Not_Intrested_Enquiry)


export default function FetchEnquiry(){
    return(
        <ProtectedFetchEnquiry/>
    )
}