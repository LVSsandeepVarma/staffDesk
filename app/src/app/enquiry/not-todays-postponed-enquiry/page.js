"use client"
import withAuth from "@/components/authRoutes";
import Not_Intrested_Enquiry from "@/components/notIntrestedEnquiry/notIntrestedEnquiry";
import Todays_Postponed_Enquiry from "@/components/todaysPostponed/todaysPostponed";

const ProtectedFetchEnquiry = withAuth(Todays_Postponed_Enquiry)


export default function FetchEnquiry(){
    return(
        <ProtectedFetchEnquiry/>
    )
}