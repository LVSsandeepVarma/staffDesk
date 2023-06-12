import React, { useState } from 'react';
import { Tab, Nav, Button, Table, Form } from 'react-bootstrap';
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { setLoaderFalse, setLoaderTrue } from "@/store/slice/loaderSlice"
import { BsCalendar, BsCalendar2Check } from 'react-icons/bs';
import { DateRangePicker } from 'rsuite';
import axios from 'axios';


const AttendancePage = () => {
    const router = useRouter() 
    const {combine, allowedMaxDays, before} = DateRangePicker
    const userData = useSelector((state) => state?.userInfoReducer)
    console.log(userData, "data")
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    const [tab2Content, setTab2Content] = useState("leaves");
    const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
    const [leaveType, setLeaveType] = useState("");
    const [leaveDesc, setLeaveDesc] = useState("")

    const dispatch = useDispatch()
    var today = new Date();
var dd = today.getDate()+2;

var mm = today.getMonth()+1; 
var yyyy = today.getFullYear();
if(dd<10) 
{
    dd='0'+dd+2;
} 

if(mm<10) 
{
    mm='0'+mm;
} 
today = yyyy+'/'+mm+'/'+dd;

console.log(today);
const handleDateRangeChange = (value) => {
  console.log(value)
  value.map((val,ind)=>{
    console.log(val)
    const date = new Date(val);

    // Get the year, month, and day from the Date object
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month starts from 0, so we add 1
    const day = String(date.getDate()).padStart(2, "0");
    
    // Format the date as "yyyy/mm/dd"
    const formattedDate = `${year}/${month}/${day}`;
    
    console.log(formattedDate); // Output: "2023/06/01"
    const timeRange = selectedDateRange
    timeRange[ind] = formattedDate
    setSelectedDateRange([...timeRange])
  }) 
};

const handleLeaveDesc = (event)=>{
  setLeaveDesc(event.target.value)
}

const handleLeaveTypeChange = (event)=>{
  setLeaveType(event.target.value)
}

const handleSubmit = async(event) => {
  event.preventDefault();
  try{
    const formData = new FormData
    formData.append("daterange" , `${selectedDateRange[0]}-${selectedDateRange[1]}`);
    formData.append("reason" , leaveType)
    formData.append("description", leaveDesc)
    formData.append("staff_id", userData?.data?.staff?.id)
  //   [{
  //     daterange : `${selectedDateRange[0]}-${selectedDateRange[1]}`,
  //     reason : leaveType,
  //     description: leaveDesc,
  //     staff_id: userData?.data?.staff?.id
  //  } ]
   const token = sessionStorage.getItem("tmToken")
   const response =await axios.post("https://admin.tradingmaterials.com/api/staff/leave-request", formData,{
    headers:{
      Authorization: `Bearer ${token}`
    }
   })
   console.log(response)
  }catch(err){
    console.log("err", err)
  }
  
  // Perform submit logic with selectedDateRange value
  console.log(selectedDateRange);
};
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

  const handleTabTwoContent =()=>{
    if(tab2Content === "leaves") setTab2Content("apply leave")
    else setTab2Content("leaves")
  }
  console.log(selectedDateRange, "selected date range")
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
                        <li className="breadcrumb-item">Dashboard</li>
                        <li className="breadcrumb-item active" aria-current="page">Attendance</li>
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
                {/* <div className=" page-header container " style={{display:"block"}}>
                    <button type="button" onClick={()=>router.push("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary  !text-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary textwhite  !bg-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary  !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>router.push("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
                </div> */}
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
                <Nav.Link eventKey="tab1">
                  <div className=' flex'>
                  <BsCalendar className='flex mr-2'/>
                   Attendance
                  </div>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2"><div className='flex'><BsCalendar2Check className='flex mr-2'/> Leave Request </div></Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab3"><div className='flex'><BsCalendar2Check className='flex mr-2'/>Break Time</div></Nav.Link>
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
            <div>
              <div className="flex justify-end items-center mb-4">
            <Button variant="primary" onClick={()=>handleTabTwoContent()}>{tab2Content}</Button>
            {/* <h3>June 2023</h3> */}
          </div>
            {tab2Content === "leaves" && (
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
            {tab2Content === "apply leave" && (
                          <div>

                            <Card>
                              <Card.Header>
                                Leave Request
                              </Card.Header>
                              <Card.Body>
                                <Form>
                                  <Form.Group >
                                    <Form.Label className='!block'>Date Range</Form.Label>
                                    <DateRangePicker 
                                      // format='yyyy/mm/dd'
                                      disabledDate={combine(allowedMaxDays(4), before(today))}
                                      // value={[selectedDateRange[0], selectedDateRange[1]]}
                                      onOk={handleDateRangeChange}
                                    />
                                    {/* <Form.Control type="text" placeholder="Select dates" /> */}
                                  </Form.Group>
                                  <Form.Group >
                                    <Form.Label className='!block'>Reason</Form.Label>
                                    <Form.Select  onChange={handleLeaveTypeChange}>
                                      <option value="">Select leave type</option>
                                      <option value="casual">Casual Leave</option>
                                      <option value="sick">Sick Leave</option>
                                      <option value="emergency">Emergency Leave</option>   
                                      <option value="emergency">Other</option>   
                                    </Form.Select>
                                    {/* <Form.Control type="text" placeholder="Select dates" /> */}
                                  </Form.Group>
                                  <Form.Group>
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} onChange={handleLeaveDesc} />
                                  </Form.Group>
                                </Form>
                              </Card.Body>
                              <Card.Footer>
                                <Button variant="primary" onClick={handleSubmit} block>Submit</Button>
                              </Card.Footer>
                            </Card>
                          </div>
            )}
            </div>
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
