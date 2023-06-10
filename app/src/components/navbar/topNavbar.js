import Image from "next/image";
import { useRouter } from "next/navigation";
import '@mdi/font/css/materialdesignicons.min.css';
import { Accordion } from "react-bootstrap";
// import { MDBBadge } from 'mdb-react-ui-kit';
import { MDBBadge } from "mdbreact";
import { AiOutlineBell } from "react-icons/ai";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { useState, useEffect, useRef } from "react";
import { BsDisplay, BsThreeDots } from "react-icons/bs"
import { GrClose } from "react-icons/gr"
import { FaUser, FaCog, FaEnvelope } from 'react-icons/fa';
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { setUserInfo } from "@/store/slice/userInfoSlice";
import { setLoaderFalse, setLoaderTrue } from "@/store/slice/loaderSlice";
import Loading from "../loader/loading";
export default function TopNavbar(){
  const router = useRouter()
  const dispatch = useDispatch()
    const [isExpanded, setIsExpanded] = useState(false);
  const [isLeftBarExpanded, setIsLeftBarExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const [toggleBottomNavbar, setToggleBottomNavbar] = useState("Dashboard")
  const sidebarRef = useRef(null);
  const leftSideBarRef = useRef(null)
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
    setActiveTab("Profile")
  };
  const loaderState = useSelector((state) => state?.loaderReducer)

  const userData = useSelector((state) => state?.userInfoReducer)
      // logout functionality
      function handleSignOut(){
        sessionStorage.removeItem("tmToken");
        router.push("/login")
      }
  useEffect(() => {
    dispatch(setLoaderTrue())
    const handleOutsideClick = (event) => {
      if ((sidebarRef.current && !sidebarRef.current.contains(event.target)) || (leftSideBarRef.current && !leftSideBarRef.current.contains(event.target))) {
        setIsExpanded(false);
      }
    };

    // document.addEventListener('mousedown', handleOutsideClick);


    
     
    // for updateing userinfo
    const fetchUserInfo = async () =>{
      try{
        const token = sessionStorage.getItem("tmToken")
        const response = await axios.get("https://admin.tradingmaterials.com/api/staff/get-user-info", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
        console.log(response?.data)
        dispatch(setUserInfo(response?.data))
      }catch(error){
        console.error(error)
      }
    }

    fetchUserInfo().then(()=>{
      dispatch(setLoaderFalse())
    })

    return () => {
      // document.removeEventListener('mousedown', handleOutsideClick);

    };
  }, []);

      return(
        <>
        {loaderState.value == true ? <Loading/> : ""}
        <div className="horizontal-menu">
            <nav className="navbar top-navbar col-lg-12 col-12 p-0 bg-[#25378b] h-[auto] ">
              <div className="container">
                <div className="text-start navbar-brand-wrapper d-flex align-items-center content-start !col-lg-6">
                  <a className="navbar-brand brand-logo" href="/"><img src="/images/logo.png" alt="logo" /></a>
                  <a className="navbar-brand navbar-brand-logo brand-logo-mini" href="/"><img src="/images/logo.png" alt="brand logo" /></a>
                </div>
                <div className="navbar-menu-wrapper d-flex align-items-center justify-end !grow-0	">
                  <AiOutlineBell className="text-white text-xl mr-2	" />
                  <p className="align-center text-white  m-0">Praveen</p>
                  <Image src="/images/emptyProfile.png" width={50} height={50} alt="" className="profile-pic w-8 h-8 rounded-full bg-zinc-400	ml-2" />
                  <div className=" flex ">
                    <div className="hidden lg:flex md:flex">
                      <div className="relative ml-2">
                        <div className="absolute flex h-full justify-end	 items-center	">
                          < HiOutlineMagnifyingGlass className="mr-[10px]" />
                        </div>
                        <input type="text" className="form-control" placeholder="Search" aria-label="search" aria-describedby="search" />
                      </div>
                    </div>
                    <div className="flex items-center !ml-[1rem]">
                      <button className="text-white	"><BsThreeDots onClick={toggleSidebar} /></button>
                    </div>
                  </div>
                  <button className="navbar-toggler navbar-toggler-right d-lg-none align-self-center" type="button" data-bs-toggle="horizontal-menu-toggle" onClick={() => setToggleBottomNavbar(!toggleBottomNavbar)}>
                    <span className="mdi mdi-menu"></span>
                  </button>
                </div>
              </div>
            </nav>
            <nav className={` ${toggleBottomNavbar == true ? "bottom-navbar header-toggled" : "!hidden sm:!block"} bottom-navbar header-toggled`}>
              <div className="container">
                <ul className="nav page-navigation !justify-start	">
                  <li className="nav-item">
                    <a className="nav-link nav_active" href="/dashboard" >
                      <i className="mdi mdi-shield-check menu-icon nav_active"></i>
                      <span className="menu-title nav_active">Dashboard</span>
                    </a>
                  </li>
                  <li className="lg:hidden md:hidden" >
                    <div className="">
                      <Accordion className="bg-white border-0">
                        <Accordion.Item className="border-0" eventKey="0">
                          <Accordion.Header className="menu-title !text-xs/[1rem] pl-[5px]	"><i className="mdi mdi-view-headline menu-icon"></i>
                            <span className="menu-title !pl-[5px]"  >Enquiry</span> </Accordion.Header>
                          <Accordion.Body>
                            <ul className="submenu-item">
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/fetch")}>Fetch</li>
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/assigned-enquiry")}>Assigned</li>
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/ringing-enquiry")}>Ringing</li>
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/postponed-enquiry")}>Postponed</li>
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/not-intersted-enquiry")}>Not Intrested</li>
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/not-todays-postponed-enquiry")}>Todays postponed</li>
                              <li className="nav-item !text-[#686868] cursor-pointer" onClick={()=>router.push("/enquiry/not-todays-ringing-enquiry")}>Todays ringing</li>
                            </ul>
                          </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>
                    </div>
                  </li>
                  <li className="!hidden lg:!block md:!block nav-item mega-menu" >

                    <a href="#" className="nav-link " >
                      <i className="mdi mdi-view-headline menu-icon"></i>
                      <span className="menu-title" >Enquiry</span>
                      <i className="menu-arrow"></i>
                    </a>

                    <div className={`submenu `} >
                      <ul className="submenu-item">
                        <li className="nav-item"><a className="nav-link" href="/enquiry/fetch">Fetch </a></li>
                        <li className="nav-item"><a className="nav-link" href="/enquiry/assigned-enquiry">Assigned 		 
                        <span className=" badge rounded-pill bg-[#25378b] fs-10" id="count">{userData?.value?.data?.new_enqs?.length} </span> 
</a></li>
                        <li className="nav-item"><a className="nav-link" href="/enquiry/ringing-enquiry">Ringing
                        <span className=" badge rounded-pill bg-[#25378b] fs-10" id="count">{userData?.value?.data?.enq_counts?.ringing}</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/enquiry/postponed-enquiry">Postponed
                        <span className=" badge rounded-pill bg-[#25378b] fs-10" id="count">{userData?.value?.data?.enq_counts?.postponed}</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/enquiry/not-intersted-enquiry">Not Intrested
                        <span className=" badge rounded-pill bg-[#25378b] fs-10" id="count">{userData?.value?.data?.enq_counts?.notin}</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/enquiry/not-todays-postponed-enquiry">Todays postponed
                        <span className=" badge rounded-pill bg-[#25378b] fs-10" id="count">{userData?.value?.data?.enq_counts?.t_post}</span></a></li>
                        <li className="nav-item"><a className="nav-link" href="/enquiry/not-todays-ringing-enquiry">Todays ringing
                        <span className=" badge rounded-pill bg-[#25378b] fs-10" id="count">{userData?.value?.data?.enq_counts?.t_ring}</span></a></li>
                      </ul>
                    </div>

                  </li>
                </ul>
              </div>
            </nav>
          </div>
                  {/* side nav bar */}
        <div>
          <div
            ref={sidebarRef}
            className={ ` z-[9999] fixed inset-y-0 right-0 bg-white w-[20rem]  p-4 transform duration-300 ease-in-out ${isExpanded ? 'translate-x-0' : 'translate-x-full'}`}
          // {` top-0 right-0 h-screen w-64 bg-gray-900 text-white flex flex-col items-center transition-transform duration-300 ease-in-out transform ${
          //   isExpanded ? 'translate-x-full' : 'translate-x-0'
          // }`}
          >
            <div className="flex w-full justify-end mr-1">
              <button onClick={() => setIsExpanded(false)}><GrClose /></button>
            </div>
            <div> {/* tabs in sidebar */}
              <ul className="nav nav-tabs" id="myTab" role="tablist">
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "Profile" ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="true" onClick={() => setActiveTab("Profile")}>Profile</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "Chat" ? "active" : ""}`} id="profile-tab" data-bs-toggle="tab" data-bs-target="#chat" type="button" role="tab" aria-controls="chat" aria-selected="false" onClick={() => setActiveTab("Chat")}>Chat</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "Activity" ? "active" : ""}`} id="activity-tab" data-bs-toggle="tab" data-bs-target="#activity" type="button" role="tab" aria-controls="activity" aria-selected="false" onClick={() => setActiveTab("Activity")}>Activity</button>
                </li>
                <li className="nav-item" role="presentation">
                  <button className={`nav-link ${activeTab === "Todo" ? "active" : ""}`} id="todo-tab" data-bs-toggle="tab" data-bs-target="#todo" type="button" role="tab" aria-controls="todo" aria-selected="false" onClick={() => setActiveTab("Todo")}>Todo</button>
                </li>
              </ul>
              <div className="tab-content" id="myTabContent">
                <div className={`tab-pane fade ${activeTab === "Profile" ? "show active" : ""}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                  <div className="flex items-center justify-center py-4">

                    <img
                      className="w-12 h-12 rounded-full"
                      src="/images/emptyProfile.png" // Replace with the URL or path to your profile picture
                      alt="Profile"
                    />
                  </div>
                  <div className="flex justify-center">
                    <p>test</p>
                  </div>
                  <div className="flex justify-center">
                    <p>test@gmail.com</p>
                  </div>
                  <div className="grid ">
                    <label className="mt-2" htmlFor="changePassword">Current Pasword</label>
                    <input className="mt-2 border form-control" id="changePassword" placeholder="Enter Password" />
                    <div className="grid place-items-center mt-3 mb-3">
                      <button className=" w-1/2 btn btn-block btn-primary btn-sm font-weight-medium auth-form-btn	">Submit</button>
                    </div>
                  </div>

                  <div className="flex-1">
                    <nav className="flex">
                      <ul className="space-y-2 text-black flex justify-between 	 items-baseline w-[100%]">
                        <li className=" items-center py-2 cursor-pointer">
                          <FaUser className="mr-2" />
                          <span>Inbox</span>
                        </li>
                        <li className=" items-centerpy-2 cursor-pointer">
                          <FaCog className="mr-2" />
                          <span>Settings</span>
                        </li>
                        <li className=" items-center py-2 cursor-pointer" onClick={()=>handleSignOut()} >
                          <FaEnvelope className="mr-2" />
                          <span>Sign out</span>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div className={`tab-pane fade ${activeTab === "Chat" ? "show active" : ""}`} id="chat" role="tabpanel" aria-labelledby="chat-tab">chat</div>
                <div className={`tab-pane fade ${activeTab === "Activity" ? "show active" : ""}`} id="activity" role="tabpanel" aria-labelledby="activity-tab">activity</div>
                <div className={`tab-pane fade ${activeTab === "Todo" ? "show active" : ""}`} id="todo" role="tabpanel" aria-labelledby="todo-tab">todo</div>

              </div>
            </div>
          </div>
        </div>
          
        </>
    )

}