"use client"
import withAuth from "@/components/authRoutes";
import Postponed_Enquiry from "@/components/postponedEnquiry/postponedEnquiry";

const ProtectedFetchEnquiry = withAuth(Postponed_Enquiry)


export default function FetchEnquiry(){
    return(
        <ProtectedFetchEnquiry/>
    )
}