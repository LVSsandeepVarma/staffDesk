import { useEffect } from "react"
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
import AssignTable from "./assignedTable"
import Loading from "../loader/loading"
// import {  setLoaderFalse, setLoaderTrue } from "@/store/slice/loaderSlice"
// import Loading from "../loader/loading"
// import { usePathname, useSearchParams } from 'next/navigation'


export default function Asigned_enquiry() {
    
    const navigate = useNavigate();
    // const dispatch = useDispatch()
    const userData = useSelector((state) => state?.userInfoReducer)
    const loader = useSelector((state) => state?.loaderReducer)
    console.log(userData, "data")

    return (
        <>
            {loader?.value == true ? <Loading/>: ""}
            <div className="container-scroller  ">
                <TopNavbar />
                <div className="top-[63px] sm:top-[0px]">
                    <NavbarMarquee />
                </div>
                <div className="page-header container ">
                    <ol className="breadcrumb">
                        {/* <!-- breadcrumb --> */}
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active" aria-current="page">Assigned</li>
                    </ol>
                    {/* <!-- End breadcrumb --> */}
                    <div className="ml-auto">
                        <div className="input-group">
                            <a href="#" className="btn !bg-[#25378b] text-white mr-2 btn-sm" data-toggle="tooltip" title="" data-placement="bottom" data-original-title="lock">
                                <span>
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className=" page-header container 	"style={{display:"block"}}>
                    <button type="button" onClick={()=>navigate("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary text-white !bg-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary !text-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Today Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div>
                <div className="container">
                    <div className="col-md-12 col-lg-12">
                        <Card >
                            <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
                                Assigned Enquiries
                            </Card.Title>
                            <Card.Body>
                                <div className="table-responsive">
                                    <AssignTable/>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}