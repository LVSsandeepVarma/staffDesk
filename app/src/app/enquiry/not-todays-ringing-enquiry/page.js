"use client"
import withAuth from "@/components/authRoutes";
import Todays_Ringing_Enquiry from "@/components/todaysRinging/todaysRinging";

const ProtectedFetchEnquiry = withAuth(Todays_Ringing_Enquiry)


export default function FetchEnquiry(){
    return(
        <ProtectedFetchEnquiry/>
    )
}