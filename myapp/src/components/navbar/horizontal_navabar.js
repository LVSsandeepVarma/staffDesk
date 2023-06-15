"use client"
// import Image from "next/image";
// import { AiOutlineBell } from "react-icons/ai";
// import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
// import { FaUser, FaCog, FaEnvelope } from 'react-icons/fa';
// import { GrClose } from "react-icons/gr"
// import { BsThreeDots } from "react-icons/bs"
import { useState, useEffect, useRef } from "react";
// import Head from "next/head";
// import '@mdi/font/css/materialdesignicons.min.css';

import NavbarMarquee from "./marquee";
import axios from "axios";
import DashboardData from "../dashboard/dashboardCarousel";
import TopNavbar from "./topNavbar";


export default function Top_navbar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState("Profile");
  const sidebarRef = useRef(null);



  return (
    <>
      {/* <Head>
      <link rel="stylesheet" href="/css/navbar.css" />
      </Head> */}
      <main>
        <div className="container-scroller  	">
          <TopNavbar/>
          <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee/>
          {/* <DashboardData/> */}
                        <div className="container-fluid page-body-wrapper">
      <div className="main-panel">
          <div className="content-wrapper">
              <div className="row">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-sm-6 mb-4 mb-xl-0">
                      <h3>Congrats Edwin!</h3>
                      <h6 className="fw-normal mb-0 text-muted">You have done 57.6% more sales today.</h6>
                    </div>
                    <div className="col-sm-6">
                      <div className="d-flex align-items-center justify-content-end">
                        <div className="border-right-dark pe-4 mb-3 mb-xl-0 d-xl-block d-none">
                          <p className="text-muted">Today</p>
                          <h6 className="font-weight-medium text-muted mb-0">23 Aug 2019</h6>
                        </div>
                        <div className="pe-4 ps-4 mb-3 mb-xl-0 d-xl-block d-none">
                          <p className="text-muted">Category</p>
                          <h6 className="font-weight-medium text-muted mb-0">All Categories</h6>
                        </div>
                        <div className="pe-1 mb-3 mb-xl-0">
                          <button type="button" className="btn btn-success btn-icon me-2"><i className="mdi mdi-filter-variant"></i></button>
                        </div>
                        <div className="pe-1 mb-3 mb-xl-0">
                          <button type="button" className="btn btn-success btn-icon me-2"><i className="mdi mdi-refresh"></i></button>
                        </div>
                        <div className="mb-3 mb-xl-0">
                          <div className="btn-group dropdown">
                            <button type="button" className="btn btn-success">14 Aug 2019</button>
                            <button type="button" className="btn btn-success dropdown-toggle dropdown-toggle-split" id="dropdownMenuDate" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            
                            </button>
                            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuDate" data-x-placement="bottom-end">
                              <a className="dropdown-item" href="#">2015</a>
                              <a className="dropdown-item" href="#">2016</a>
                              <a className="dropdown-item" href="#">2017</a>
                              <a className="dropdown-item" href="#">2018</a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="page-header-tab mt-xl-4">
                    <div className="col-12 ps-0 pe-0">
                      <div className="row ">
                        <div className="col-12 col-sm-6 mb-xs-4  pt-2 pb-2 mb-xl-0">
                        </div>
                        <div className="col-12 col-sm-6 mb-xs-4 mb-xl-0 pt-2 pb-2 text-md-right d-none d-md-block">
                          <div className="d-flex justify-content-end">
                            <button className="btn d-flex align-items-center">
                            <i className="mdi mdi-download me-1"></i>
                            <span className="text-start font-weight-medium">
                            Download report
                            </span>
                            </button>
                            <button className="btn d-flex align-items-center">
                            <i className="mdi mdi-file-pdf  me-1"></i>
                            <span className="font-weight-medium text-start">
                            Export
                            </span>
                            </button>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DashboardData/>
                  </div>
                  
                  </div></div></div></div>
          </div>
        </div>

        {/* side nav bar */}

  
      </main>

    </>
  )
}