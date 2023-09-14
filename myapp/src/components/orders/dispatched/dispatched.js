import { useEffect } from "react"
import TopNavbar from "../../navbar/topNavbar"
import NavbarMarquee from "../../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import { useNavigate } from "react-router-dom"
// import AssignTable from "./assignedTable"
import Loading from "../../loader/loading"
import DispatchedTable from "./dispatchedTable"
// import {  setLoaderFalse, setLoaderTrue } from "@/store/slice/loaderSlice"
// import Loading from "../loader/loading"
// import { usePathname, useSearchParams } from 'next/navigation'


export default function OrderDispatched() {
    
    const navigate = useNavigate();
    // const dispatch = useDispatch()
    const userData = useSelector((state) => state?.userInfoReducer)
    const loader = useSelector((state) => state?.loaderReducer)
    console.log(userData, "data")

    return (
        <>
            {loader?.value == true ? <Loading/>: ""}
            <div className="container-scroller  sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition">
                <TopNavbar />
                <div className="top-[63px] sm:top-[0px]">
                    <NavbarMarquee />
                </div>
                
                <div className="page-header container">
                
                    <ol className="breadcrumb">
                        {/* <!-- breadcrumb --> */}
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item" >Orders</li>
                        <li className="breadcrumb-item active"aria-current="page" >Dispatched</li>
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
                    <button type="button" onClick={()=>navigate("/enquiry/orders/placed")} className="btn btn-outline-secondary !text-[#467fcf]   position-relative mr-2 py-2 fs-14"> Placed | {userData?.value?.data?.enq_counts?.new} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/orders/dispatched")} className="btn btn-outline-secondary text-white !bg-[#467fcf] position-relative mr-2 py-2 fs-14"> Dispatched | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/orders/delivered")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Delivered | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/orders/returned")} className="btn btn-outline-secondary !text-[#f66] position-relative mr-2 py-2 fs-14"> Returned | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/orders/cancelled")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Cancelled | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                </div>
                <div className="container">
                    <div className="col-md-12 col-lg-12">
                        <Card >
                            <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
                               Orders Dispatched
                            </Card.Title>
                            <Card.Body>
                                <div className="table-responsive">
                                    <DispatchedTable/>
                                </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}