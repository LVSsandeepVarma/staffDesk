import { useEffect } from "react"
import TopNavbar from "../navbar/topNavbar"
import NavbarMarquee from "../navbar/marquee"
import { faLock } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "react-bootstrap"
import { useRouter } from "next/navigation"
import AssignTable from "./assignedTable"
import Loading from "../loader/loading"
// import {  setLoaderFalse, setLoaderTrue } from "@/store/slice/loaderSlice"
// import Loading from "../loader/loading"
// import { usePathname, useSearchParams } from 'next/navigation'


export default function Asigned_enquiry() {
    
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
                                <div className="table-responsive">
                                    {/* <div id="dataTable_wrapper" className="dataTables_wrapper no-footer">
                                        <div className="dataTables_length" id="dataTable_length">
                                            <label>Show
                                                <select name="dataTable_length" aria-controls="dataTable" className="">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                                </select>
                                                entries
                                            </label>
                                        </div>

                                        <div id="dataTable_filter" className="dataTables_filter">
                                            <label>Search:<input type="search" className="" placeholder="" aria-controls="dataTable" /></label>
                                        </div>
                                        
                                        <table id="dataTable" className="table table-bordered key-buttons text-nowrap data-list mb-0 dataTable no-footer" aria-describedby="dataTable_info">
                                            <thead>
                                                <tr>
                                                    <th className="text-gray font-weight-bold sorting sorting_asc" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-sort="ascending" aria-label="Enquiry: activate to sort column descending" style={{ width: "309.031px" }}>Enquiry</th>
                                                    <th className="text-gray font-weight-bold sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Email: activate to sort column ascending" style={{ width: "243.281px" }}>Email</th>
                                                    <th className="text-gray font-weight-bold sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Phone: activate to sort column ascending" style={{ width: "118.797px" }}>Phone</th>
                                                    <th className="text-gray font-weight-bold sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Added Date: activate to sort column ascending" style={{ width: "149.25px" }}>Added Date</th>
                                                    <th className="text-gray font-weight-bold sorting" tabindex="0" aria-controls="dataTable" rowspan="1" colspan="1" aria-label="Action: activate to sort column ascending" style={{ width: "143.641px" }}>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        <h5 className="text-primary mb-1">ALTHAFF test</h5>
                                                        <p className="mb-0">BANGALORE / India /ip</p>
                                                    </td>
                                                    <td><a className="cursor-pointer text-warning iconWrap Email_Varify" data-id="14024"><i className="fa fa-exclamation-circle  mr-1 text-warning" data-toggle="tooltip" title="" data-original-title="verify"></i>althaf123@gmail.com<span className="tooltip" data-toggle="tooltip" data-original-title="" title="">Verify Email</span></a></td>
                                                    <td>9632587410</td>
                                                    <td className="fs-14">07-06-23</td>
                                                    <td>
                                                    <ButtonGroup className="mt-2 mb-2">
      <Dropdown>
        <Dropdown.Toggle className="!flex items-center" variant="default" id="dropdown-basic">
          Action <AiOutlineCaretDown/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item className="!flex justify-center">
           <AiOutlineReload className="mr-2"/>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item className="!flex justify-center">
            <CgPhone className="mr-2"/> Ringing
          </Dropdown.Item>
          <Dropdown.Item className="!flex justify-center" >
           <BsCalendarPlus className="mr-2"/> Postponed
          </Dropdown.Item>
          <Dropdown.Item className="!flex justify-center">
           <TbPlugConnected className="mr-2"/> Not interested
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
                                                    </td>
                                                </tr>
                                                <tr className="even">
                                                    <td className="sorting_1">
                                                        <h5 className="text-primary mb-1">ramu test</h5>
                                                        <p className="mb-0">BANGALORE / India /ip</p>
                                                    </td>
                                                    <td><a className="cursor-pointer text-warning iconWrap Email_Varify" data-id="14024"><i className="fa fa-exclamation-circle  mr-1 text-warning" data-toggle="tooltip" title="" data-original-title="verify"></i>ramu123@gmail.com<span className="tooltip" data-toggle="tooltip" data-original-title="" title="">Verify Email</span></a></td>
                                                    <td>9874561230</td>
                                                    <td className="fs-14">07-06-23</td>
                                                    <td>
                                                        <div className="btn-group mt-2 mb-2">
                                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                Action <span className="caret"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" role="menu">
                                                                <li className="d-flex align-items-center justify-content-center">
                                                                    <a href="#"><i className="fa fa-repeat"></i> </a>
                                                                </li>
                                                                <li className="divider m-0"></li>
                                                                <li><button className="btn assign" data-type="toRing" value="164"><i className="fa fa-volume-control-phone"></i> Ringing</button></li>
                                                                <li><button className="btn assign" data-type="toPostponed" value="164"><i className="fa fa-calendar-plus-o"></i> Postponed</button></li>
                                                                <li><button className="btn assign" data-type="toNotinterested" value="164"><i className="fa fa-hard-of-hearing"></i> Not interested</button></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr><tr className="odd">
                                                    <td className="sorting_1">
                                                        <h5 className="text-primary mb-1">test firstname test lastname</h5>
                                                        <p className="mb-0">test city / India /ip</p>
                                                    </td>
                                                    <td><a className="cursor-pointer text-warning iconWrap Email_Varify" data-id="14024"><i className="fa fa-exclamation-circle  mr-1 text-warning" data-toggle="tooltip" title="" data-original-title="verify"></i>test@gmail.com<span className="tooltip" data-toggle="tooltip" data-original-title="" title="">Verify Email</span></a></td>
                                                    <td>1111111110</td>

                                                    <td className="fs-14">07-06-23</td>
                                                    <td>
                                                        <div className="btn-group mt-2 mb-2">
                                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                Action <span className="caret"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" role="menu">
                                                                <li className="d-flex align-items-center justify-content-center">
                                                                    <a href="#"><i className="fa fa-repeat"></i> </a>
                                                                </li>
                                                                <li className="divider m-0"></li>
                                                                <li><button className="btn assign" data-type="toRing" value="167"><i className="fa fa-volume-control-phone"></i> Ringing</button></li>
                                                                <li><button className="btn assign" data-type="toPostponed" value="167"><i className="fa fa-calendar-plus-o"></i> Postponed</button></li>
                                                                <li><button className="btn assign" data-type="toNotinterested" value="167"><i className="fa fa-hard-of-hearing"></i> Not interested</button></li>

                                                            </ul>
                                                        </div>

                                                    </td>
                                                </tr><tr className="even">
                                                    <td className="sorting_1">
                                                        <h5 className="text-primary mb-1">test test</h5>
                                                        <p className="mb-0">test / India /ip</p>
                                                    </td>
                                                    <td><a className="cursor-pointer text-warning iconWrap Email_Varify" data-id="14024"><i className="fa fa-exclamation-circle  mr-1 text-warning" data-toggle="tooltip" title="" data-original-title="verify"></i>test1@gmail.com<span className="tooltip" data-toggle="tooltip" data-original-title="" title="">Verify Email</span></a></td>
                                                    <td>1111111111</td>

                                                    <td className="fs-14">07-06-23</td>
                                                    <td>
                                                        <div className="btn-group mt-2 mb-2">
                                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                Action <span className="caret"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" role="menu">
                                                                <li className="d-flex align-items-center justify-content-center">
                                                                    <a href="#"><i className="fa fa-repeat"></i> </a>
                                                                </li>
                                                                <li className="divider m-0"></li>
                                                                <li><button className="btn assign" data-type="toRing" value="168"><i className="fa fa-volume-control-phone"></i> Ringing</button></li>
                                                                <li><button className="btn assign" data-type="toPostponed" value="168"><i className="fa fa-calendar-plus-o"></i> Postponed</button></li>
                                                                <li><button className="btn assign" data-type="toNotinterested" value="168"><i className="fa fa-hard-of-hearing"></i> Not interested</button></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                                <tr className="odd">
                                                    <td className="sorting_1">
                                                        <h5 className="text-primary mb-1">vishnu test</h5>
                                                        <p className="mb-0">BANGALORE / India /ip</p>
                                                    </td>
                                                    <td><a className="cursor-pointer text-warning iconWrap Email_Varify" data-id="14024"><i className="fa fa-exclamation-circle  mr-1 text-warning" data-toggle="tooltip" title="" data-original-title="verify"></i>vishnu123@gmail.com<span className="tooltip" data-toggle="tooltip" data-original-title="" title="">Verify Email</span></a></td>
                                                    <td>9632587410</td>

                                                    <td className="fs-14">07-06-23</td>
                                                    <td>
                                                        <div className="btn-group mt-2 mb-2">
                                                            <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown">
                                                                Action <span className="caret"></span>
                                                            </button>
                                                            <ul className="dropdown-menu" role="menu">
                                                                <li className="d-flex align-items-center justify-content-center">
                                                                    <a href="#"><i className="fa fa-repeat"></i> </a>
                                                                </li>
                                                                <li className="divider m-0"></li>
                                                                <li><button className="btn assign" data-type="toRing" value="163"><i className="fa fa-volume-control-phone"></i> Ringing</button></li>
                                                                <li><button className="btn assign" data-type="toPostponed" value="163"><i className="fa fa-calendar-plus-o"></i> Postponed</button></li>
                                                                <li><button className="btn assign" data-type="toNotinterested" value="163"><i className="fa fa-hard-of-hearing"></i> Not interested</button></li>
                                                            </ul>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className="dataTables_info" id="dataTable_info" role="status" aria-live="polite">Showing 1 to 5 of 5 entries</div>
                                        <div className="dataTables_paginate paging_simple_numbers" id="dataTable_paginate">
                                            <a className="paginate_button previous disabled" aria-controls="dataTable" aria-disabled="true" aria-role="link" data-dt-idx="previous" tabindex="-1" id="dataTable_previous">Previous</a><span><a className="paginate_button current" aria-controls="dataTable" aria-role="link" aria-current="page" data-dt-idx="0" tabindex="0">1</a></span>
                                            <a className="paginate_button next disabled" aria-controls="dataTable" aria-disabled="true" aria-role="link" data-dt-idx="next" tabindex="-1" id="dataTable_next">Next</a>
                                        </div>
                                    </div> */}
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