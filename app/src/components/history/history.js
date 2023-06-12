import { useEffect } from "react"
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import { useRouter } from "next/navigation"
import Loading from "../loader/loading"
import { MDBContainer } from "mdbreact";
import { Container, Row, Col } from 'react-bootstrap';
import { BsClock, BsCalendar, BsCheck } from 'react-icons/bs';


export default function Staff_History() {
    
    const router = useRouter();
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
                    <button type="button" onClick={()=>router.push("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary text-white !bg-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary !text-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div>
                <div className="container">
                    <div className="col-md-12 col-lg-12">
                        <Card >
                            <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">
                                Assigned Enquiries
                            </Card.Title>
                            <Card.Body>
                              <div className="row overglow-scroll w-[full] ">
                                <div className="col-4 !overflow-y-scroll">
                              <Card>
                                <Card.Title></Card.Title>
                                <Card.Body>
                                <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-icon">
          <BsClock />
        </div>
        <div className="timeline-content">
          <h4>Event 1</h4>
          <p>Some description of Event 1</p>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-icon">
          <BsCalendar />
        </div>
        <div className="timeline-content">
          <h4>Event 2</h4>
          <p>Some description of Event 2</p>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-icon">
          <BsCheck />
        </div>
        <div className="timeline-content">
          <h4>Event 3</h4>
          <p>Some description of Event 3</p>
        </div>
      </div>
    </div>
                                </Card.Body>
                              </Card>
                              </div>
                              <div className=" col-4 !overflow-y-scroll">
                              <Card>
                                <Card.Title></Card.Title>
                                <Card.Body>
                                <div className="timeline">
      <div className="timeline-item">
        <div className="timeline-icon">
          <BsClock />
        </div>
        <div className="timeline-content">
          <h4>Event 1</h4>
          <p>Some description of Event 1</p>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-icon">
          <BsCalendar />
        </div>
        <div className="timeline-content">
          <h4>Event 2</h4>
          <p>Some description of Event 2</p>
        </div>
      </div>
      <div className="timeline-item">
        <div className="timeline-icon">
          <BsCheck />
        </div>
        <div className="timeline-content">
          <h4>Event 3</h4>
          <p>Some description of Event 3</p>
        </div>
      </div>
    </div>
                                </Card.Body>
                              </Card>
                              </div>
                              </div>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}