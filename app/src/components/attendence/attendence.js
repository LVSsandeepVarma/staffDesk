import React, { useState } from 'react';
import { Tab, Nav, Button, Table } from 'react-bootstrap';
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { setLoaderFalse, setLoaderTrue } from "@/store/slice/loaderSlice"


const AttendancePage = () => {
    const router = useRouter() 
    const userData = useSelector((state) => state?.userInfoReducer)
    console.log(userData, "data")
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    const dispatch = useDispatch()
    useEffect(()=>{
        if(loaderState){
            dispatch(setLoaderFalse())
        }
        else{
            dispatch(setLoaderTrue())
        }
    },[router])
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <>
    <div className="container-scroller  ">
                <TopNavbar />
                <div className="top-[63px] sm:top-[0px]">
                    <NavbarMarquee />
                </div>
                <div className="page-header container ">
                    <ol className="breadcrumb">
                        {/* <!-- breadcrumb --> */}
                        <li className="breadcrumb-item">Home</li>
                        <li className="breadcrumb-item active" aria-current="page">Ringing</li>
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
                <div className=" page-header container " style={{display:"block"}}>
                    <button type="button" onClick={()=>router.push("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary  !text-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary textwhite  !bg-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary  !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div>
                <div className="container">
                    <Card>
                        <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">Ringing Enquiries</Card.Title>
                        <Card.Body>
                        <div className="container mx-auto">
      <div className="flex">
        <div className="w-1/4">
          <Tab.Container activeKey={activeTab} onSelect={handleTabChange}>
            <Nav variant="pills" className="flex-column">
              <Nav.Item>
                <Nav.Link eventKey="tab1">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2">Tab 2</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab3">Tab 3</Nav.Link>
              </Nav.Item>
            </Nav>
          </Tab.Container>
        </div>
        <div className="w-3/4">
          <div className="flex justify-between items-center mb-4">
            <Button variant="primary">Previous</Button>
            <h3>June 2023</h3>
          </div>
          {activeTab === 'tab1' && (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Attendance Log</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Monday</td>
                  <td>John Doe</td>
                  <td>9:00 AM - 5:00 PM</td>
                </tr>
                <tr>
                  <td>Tuesday</td>
                  <td>Jane Smith</td>
                  <td>8:30 AM - 4:30 PM</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </Table>
          )}
          {activeTab === 'tab2' && (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Attendance Log</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Wednesday</td>
                  <td>Mark Johnson</td>
                  <td>10:00 AM - 6:00 PM</td>
                </tr>
                <tr>
                  <td>Thursday</td>
                  <td>Emily Brown</td>
                  <td>9:30 AM - 5:30 PM</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </Table>
          )}
          {activeTab === 'tab3' && (
            <Table striped bordered>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Attendance Log</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Friday</td>
                  <td>Michael Davis</td>
                  <td>8:00 AM - 4:00 PM</td>
                </tr>
                <tr>
                  <td>Saturday</td>
                  <td>Sarah Wilson</td>
                  <td>9:00 AM - 1:00 PM</td>
                </tr>
                {/* Add more rows as needed */}
              </tbody>
            </Table>
          )}

        </div>
      </div>
    </div>
                        </Card.Body>
                    </Card>
                </div>
                </div>

    </>
  );
};

export default AttendancePage;
