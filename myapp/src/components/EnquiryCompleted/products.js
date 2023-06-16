import React, { useState } from 'react';
import { Tab, Nav, Button, Table, Form } from 'react-bootstrap';
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
// import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { setLoaderFalse, setLoaderTrue } from "../../slice/loaderSlice"
import { BsCalendar, BsCalendar2Check } from 'react-icons/bs';
import { DateRangePicker } from 'rsuite';
import axios from 'axios';
import "rsuite/dist/rsuite.css";
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';




const Products = () => {
    const navigate = useNavigate() 
    const {combine, allowedMaxDays, before} = DateRangePicker
    const userData = useSelector((state) => state?.userInfoReducer)
    console.log(userData, "data")
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    const [tab2Content, setTab2Content] = useState("leaves");
    const [selectedDateRange, setSelectedDateRange] = useState(["", ""]);
    const [leaveType, setLeaveType] = useState("");
    const [leaveDesc, setLeaveDesc] = useState("");
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");
    const [attendanceData , setAttendanceData] = useState([]);
    const [leaveReqData, setLeaveReqData] = useState([]);
    const [breakTimeData, setBreakTimeData] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState("");
    const [successStatus, setSuccessStatus] = useState("");
    const [selectedOptions, setSelectedOptions] = useState([]);
  const [options, setOptions] = useState([
    { name: 'option1', label: 'Option 1' },
    { name: 'option2', label: 'Option 2' },
    { name: 'option3', label: 'Option 3' },
    { name: 'option4', label: 'Option 4' },
    { name: 'option5', label: 'Option 5' },
  ]);

  const handleDropdownChange = (event) => {
    setSelectedOptions(Array.from(event.target.selectedOptions, (option) => option.value));
  };

  const removeSelected = () => {
    setSelectedOptions([]);
  }; 

    const dispatch = useDispatch();
    useEffect(()=>{
      const fetchAttendanceData = async()=>{
        try{
          const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
          const response = await axios.get(" https://admin.tradingmaterials.com/api/staff/attendance", {
            headers: { 
              Authorization: `Bearer ${token}`
            }
          })
          console.log(response, response?.data?.data["break-logs"])
          const attendanceinfo = response?.data?.data?.attendance
          const updatedInfo = attendanceinfo.map((val,ind)=>{
            const dateTime = new Date(val.date);
            const month =  dateTime.toLocaleString('default', { month: 'long' });
            const day = dateTime.getDate();
            const weekday = dateTime.toLocaleDateString('default', { weekday: 'long' });
            return {...attendanceinfo[ind], "monthDay":  `${month} ${day}`,"weekday": `${weekday}`}
          })
          console.log("attendanceinfo",updatedInfo)
          setAttendanceData(updatedInfo)
          setLeaveReqData(response?.data?.data["leave-reqs"])
          const breaklogs = response?.data?.data["break-logs"]
          breaklogs.map((val,ind)=>{
            const totalSeconds = val.break_time; // Example: 3665 seconds

            const hours = Math.floor(totalSeconds / 3600);
            const minutes = Math.floor((totalSeconds % 3600) / 60);
            const seconds = totalSeconds % 60;

            const formattedTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

            console.log(formattedTime);
            breaklogs[ind].break_time = formattedTime
          })
          setBreakTimeData(response?.data?.data["break-logs"])

        }catch(err)
        {
          console.log(err)

        }
      }
      fetchAttendanceData();
    },[])
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
  console.log(userData?.value?.data?.staff?.id, "id")
  try{
    const formData = new FormData
    formData.append("daterange" , `${selectedDateRange[0]}-${selectedDateRange[1]}`);
    formData.append("reason" , leaveType)
    formData.append("description", leaveDesc)
    formData.append("staff_id", userData?.value?.data?.staff?.id)
  const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
   const response =await axios.post("https://admin.tradingmaterials.com/api/staff/leave-request", formData,{
    headers:{
      Authorization: `Bearer ${token}`
    }
   })
   setError([])
   setSuccess(response?.data?.message)
   console.log(response)
  }catch(err){
    console.log("err", err?.response?.data?.errors)
    const errorsArray = []
    errorsArray[0] = err?.response?.data?.errors?.reason
    errorsArray[1] = err?.response?.data?.errors?.description
    errorsArray[2] = err?.response?.data?.errors?.daterange

    setError(...errorsArray)
    setSuccess("")

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
    },[navigate])
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
                    <button type="button" onClick={()=>navigate("/enquiry/assigned-enquiry")} className="btn btn-outline-secondary  !text-[#467fcf]  position-relative mr-2 py-2 fs-14"> Assigned | {userData?.value?.data?.enq_counts?.remaining_count} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/ringing-enquiry")} className="btn btn-outline-secondary textwhite  !bg-[#28afd0] position-relative mr-2 py-2 fs-14"> Ringing | {userData?.value?.data?.enq_counts?.ringing} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/postponed-enquiry")} className="btn btn-outline-secondary !text-[#5eba00] position-relative mr-2 py-2 fs-14"> Postponed | {userData?.value?.data?.enq_counts?.postponed} </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-intersted-enquiry")} className="btn btn-outline-secondary  !text-[#f66] position-relative mr-2 py-2 fs-14"> Not Intrested | {userData?.value?.data?.enq_counts?.notin}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-ringing-enquiry")} className="btn btn-outline-secondary !text-[#467fcf] position-relative mr-2 py-2 fs-14"> Total Ringing | {userData?.value?.data?.enq_counts?.t_ring}  </button>
                    <button type="button" onClick={()=>navigate("/enquiry/not-todays-postponed-enquiry")} className="btn btn-outline-secondary  !text-[#ffc107] position-relative mr-2 py-2 fs-14"> Today Postponed | {userData?.value?.data?.enq_counts?.t_post} </button>
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
                <Nav.Link eventKey="tab1">Tab 1</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="tab2">Tab 2</Nav.Link>
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
            <>
            <div className='flex justify-around	'>
            <div className='w-[30%] mr-10'>
            <Form.Group controlId="dropdown">
              <Form.Label>Select Currency:</Form.Label>
              <Form.Control as="select">
                <option>USD</option>
                <option>IND</option>
              </Form.Control>
            </Form.Group>
            </div>
            <div className='w-[30%] justify-end'>
            <Form.Group controlId="multiSelect">
            <Form.Label>select Products:</Form.Label>
            <Multiselect
                // className='!relative'
                options={options} // Options to display in the dropdown
                selectedValues={""} // Preselected value to persist in dropdown
                onSelect={(e)=>{console.log(e)}} // Function will trigger on select event
                onRemove={(e)=>{console.log("removed", e)}} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
            />
            </Form.Group>
            </div>
            
          </div>
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
          </>

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

export default Products;
