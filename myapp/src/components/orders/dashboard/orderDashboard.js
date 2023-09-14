/* eslint-disable jsx-a11y/aria-proptypes */
/* eslint-disable eqeqeq */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from 'react-router-dom';
import Loading from "../../loader/loading";
import TopNavbar from "../../navbar/topNavbar";
import NavbarMarquee from "../../navbar/marquee";
import { Divider } from "rsuite";
import { HiOutlineDotsVertical } from "react-icons/hi";
import axios from "axios";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ActionModel from "../../modals/orderCommetns";

export default function OrderDashboard() {
  // const navigate = useNavigate();
  // const dispatch = useDispatch()
  const userData = useSelector((state) => state?.userInfoReducer);
  const loader = useSelector((state) => state?.loaderReducer);
  const [orderData, setOrderData] = useState([]);
  const [activeTab, setActiveTab] = useState("products");
  const [show, setShow] = useState(false)
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("")
  const params = useParams();
  const [call, setCall] = useState("")

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `https://admin.tradingmaterials.com/api/staff/view-order?id=${params?.order_id}`,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("tmToken"),
            },
          }
        );
        if (response?.data?.status) {
          console.log(response?.data?.data?.order?.items, "nitable");
          setOrderData(response?.data?.data?.order);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchOrder();
  }, [call]);

  function downloadFile() {
    // const html = document.getElementById("invoice")
    // const pdf = new PDFViewer({
    //   html
    // })
    // pdf.save("invoice.pdf")
  }

  const shareContent = {
    title: "Your share title",
    text: "Your share text",
    url: "https://example.com", // URL you want to share
  };
  const handleShare = async () => {
    try {
      await navigator.share(shareContent);
      console.log("Shared successfully");
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  console.log(userData, "data");

  const handleCloseModal=() =>{
    setShow(false)
}

const handleStatusUpdate =(id, title, status)=>{
  setTitle(title)
  setStatus(status)
  setShow(true)
}

  return (
    <>
      {loader?.value === true ? <Loading /> : ""}
      <ActionModel close={show} setClose={handleCloseModal} id={params.order_id} destination={""} tit={title} status={status} setCall={setCall} call={call}/>
      <div className="container-scroller  sm:relative top-[0px] sm:top-[60px] md:top-[100px] lg:top-[0px] marqueePosition">
        <TopNavbar />
        <div className="top-[63px] sm:top-[0px]">
          <NavbarMarquee />
        </div>
        <div className=" ">
          <div className="container-fluid page-body-wrapper">
            <div className="main-panel">
              <div className="content-wrapper">
                <div className="row">
                  <div className="col-12">
                    <div className="card">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-lg-4">
                            <div className="border-bottom text-center pb-4">
                              <div className="flex justify-center w-full ">
                                <img
                                  src="https://via.placeholder.com/92x92"
                                  alt="profile"
                                  className="img-lg rounded-circle mb-3"
                                />
                              </div>
                              <div className="mb-3">
                                <h3>{orderData?.customer?.first_name}{" "}{orderData?.customer?.last_name}</h3>
                                {/* <div className="d-flex align-items-center">
                            <h5 className="mb-0 me-2 text-muted">Canada</h5>
                            <select id="profile-rating" name="rating" autocomplete="off">
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                            </select>
                          </div> */}
                              </div>
                              {/* <p className="w-75 mx-auto mb-3">Bureau Oberhaeuser is a design bureau focused on Information- and Interface Design. </p> */}
                              <div className="d-flex justify-content-center gap-3">
                                <label className="badge !text-green-700 badge-outline-success truncate ">
                                  Order no : <p>{orderData?.order_number}</p>{" "}
                                </label>
                                <label className="badge !text-blue-700 badge-outline-primary">
                                  Ordered Date :{" "}
                                  <p>
                                    {new Date(
                                      orderData?.created_at
                                    ).toLocaleDateString()}
                                  </p>
                                </label>
                                {/* <button className="btn btn-success me-1">Hire Me</button>
                          <button className="btn btn-success">Follow</button> */}
                              </div>
                            </div>
                            {/* <div className="border-bottom py-4">
                        <p>Skills</p>
                        <div>
                          <label className="badge text-black badge-outline-warning">Chalk</label>
                          <label className="badge badge-outline-primary">Hand lettering</label>
                          <label className="badge badge-outline-dark">Information Design</label>
                          <label className="badge badge-outline-dark">Graphic Design</label>
                          <label className="badge badge-outline-dark">Web Design</label>  
                        </div>                                                               
                      </div> */}
                      
                            <div className="border-bottom py-4">
                            <div className="flex items-center justify-between mt-2 mb-2">
                                  <span>Status:&nbsp;
                                    {orderData?.orderstatus?.staff_status ==
                                      "0" && (
                                      <span className="subpixel-antialiased font-semibold text-primary">Order placed (Pending)</span>
                                    )}
                                    {orderData?.orderstatus?.staff_status ==
                                      "1" && <span className="subpixel-antialiased font-semibold text-warning">OnHold</span>}
                                    {orderData?.orderstatus?.staff_status ==
                                      "2" && <span className="subpixel-antialiased font-semibold text-success">Confirmed</span>}
                                    {orderData?.orderstatus?.staff_status ==
                                      "3" && <span className="subpixel-antialiased font-semibold text-danger">Rejected</span>}
                                  </span>
                                  <span>
                                    {orderData?.orderstatus?.staff_update !==
                                    null
                                      ? new Date(
                                          orderData?.orderstatus?.staff_update
                                        ).toLocaleDateString()
                                      : ""}
                                  </span>
                                </div>
                              <div className="d-flex mb-3">
                                <div className="progress progress-md flex-grow">
                                  <div
                                    className={`progress-bar bg-${orderData?.orderstatus?.delv_status == "0" ? "primary" : orderData?.orderstatus?.delv_status == "1" ? "warning" : orderData?.orderstatus?.delv_status == "2" ? "success" : orderData?.orderstatus?.delv_status == "3" ? "danger" : "primary"}`}
                                    role="progressbar"
                                    aria-valuenow="55"
                                    style={{
                                      width: `${
                                        orderData?.orderstatus?.staff_status ==
                                        "0"
                                          ? "25%"
                                          : orderData?.orderstatus
                                              ?.staff_status == "1"
                                          ? "50%"
                                          : orderData?.orderstatus
                                              ?.staff_status == "2"
                                          ? "100%"
                                          : orderData?.orderstatus
                                              ?.staff_status == "3"
                                          ? "75%"
                                          : ""
                                      }`,
                                    }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                              <div className="flex items-center justify-between mt-2 mb-2">
                                  <span>Status:&nbsp;
                                    {orderData?.payments?.paid_amount > 0 && (
                                      <span className="subpixel-antialiased font-semibold text-success">{orderData?.payments?.paid_amount}</span>
                                    )}
                                    
                                  </span>
                                  <span>
                                    {orderData?.orderstatus?.staff_update !==
                                    null
                                      ? new Date(
                                          orderData?.orderstatus?.staff_update
                                        ).toLocaleDateString()
                                      : ""}
                                  </span>
                                </div>
                              <div className="d-flex">
                                <div className="progress progress-md flex-grow">
                                  <div
                                    className="progress-bar bg-success"
                                    role="progressbar"
                                    aria-valuenow="75"
                                    style={{ width: "75%" }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>
                            <div className="py-4">
                              <p className="clearfix flex">
                                <span className="float-left font-semibold">
                                  Status :
                                </span>
                                <span className="float-right text-muted">
                                  &nbsp;Active
                                </span>
                              </p>
                              <p className="clearfix flex">
                                <span className="float-left font-semibold">
                                  Phone :
                                </span>
                                <span className="float-right text-muted">
                                  &nbsp;{orderData?.phone}
                                </span>
                              </p>
                              <p className="clearfix flex">
                                <span className="float-left font-semibold">
                                  Mail :
                                </span>
                                <span className="float-right text-muted">
                                  &nbsp;{orderData?.email}
                                </span>
                              </p>
                              <Divider />
                            </div>
                            <div>
                              <div className="border-1 p-3 mb-3">
                                <div className="flex items-center justify-between">
                                  <p className="font-bold float-left text-smooth text-lg">
                                    Your Status
                                  </p>
                                  {orderData?.orderstatus?.delv_status !=
                                    "0" && (
                                    <div className="dropdown">
                                      <Dropdown>
                                        <Dropdown.Toggle
                                          className="!flex items-center !border-0"
                                          variant="default"
                                          id="dropdown-basic"
                                        >
                                          <HiOutlineDotsVertical />
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                          <Dropdown.Item className="!flex justify-center !no-underline" onClick={()=>{handleStatusUpdate(orderData?.id, "confirm Order", orderData?.orderstatus?.delv_status, )}}>
                                            <span>Confirm Order</span>
                                          </Dropdown.Item>
                                          <Dropdown.Item className="!flex justify-center !no-underline" onClick={()=>{handleStatusUpdate(orderData?.id, "Onhold Order", orderData?.orderstatus?.delv_status, )}}>
                                            <span>Onhold Order</span>
                                          </Dropdown.Item>
                                          <Dropdown.Item className="!flex justify-center !no-underline" onClick={()=>{handleStatusUpdate(orderData?.id, "Reject Order", orderData?.orderstatus?.delv_status, )}}>
                                            <span>Reject Order</span>
                                          </Dropdown.Item>
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </div>
                                  )}
                                </div>
                                <div className="flex items-center justify-between mt-2 mb-2">
                                  <span>
                                    {orderData?.orderstatus?.staff_status ==
                                      "0" && (
                                      <span className="subpixel-antialiased font-semibold">Order placed (Pending)</span>
                                    )}
                                    {orderData?.orderstatus?.staff_status ==
                                      "1" && <span className="subpixel-antialiased font-semibold">OnHold</span>}
                                    {orderData?.orderstatus?.staff_status ==
                                      "2" && <span className="subpixel-antialiased font-semibold">Confirmed</span>}
                                    {orderData?.orderstatus?.staff_status ==
                                      "3" && <span className="subpixel-antialiased font-semibold">Rejected</span>}
                                  </span>
                                  <span>
                                    {orderData?.orderstatus?.staff_update !==
                                    null
                                      ? new Date(
                                          orderData?.orderstatus?.staff_update
                                        ).toLocaleDateString()
                                      : ""}
                                  </span>
                                </div>
                                <div className="progress progress-md flex-grow">
                                  <div
                                    className={`progress-bar bg-${orderData?.orderstatus?.staff_status == "0" ? "primary" : orderData?.orderstatus?.staff_status == "1" ? "warning" : orderData?.orderstatus?.staff_status == "2" ? "success" : orderData?.orderstatus?.staff_status == "3" ? "danger" : "primary"}`}
                                    role="progressbar"
                                    aria-valuenow={`${
                                      orderData?.orderstatus?.staff_status ==
                                      "0"
                                        ? 25
                                        : orderData?.orderstatus
                                            ?.staff_status == "1"
                                        ? 50
                                        : orderData?.orderstatus
                                            ?.staff_status == "2"
                                        ? 100
                                        : orderData?.orderstatus
                                            ?.staff_status == "3"
                                        ? 75
                                        : 25
                                    }`}
                                    style={{
                                      width: `${
                                        orderData?.orderstatus?.staff_status ==
                                        "0"
                                          ? "25%"
                                          : orderData?.orderstatus
                                              ?.staff_status == "1"
                                          ? "50%"
                                          : orderData?.orderstatus
                                              ?.staff_status == "2"
                                          ? "100%"
                                          : orderData?.orderstatus
                                              ?.staff_status == "3"
                                          ? "75%"
                                          : ""
                                      }`,
                                    }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                              <div className="border-1 p-3 mb-3">
                                <div className="flex items-center justify-between !mb-2">
                                  <p className="font-bold float-left text-smooth text-lg">
                                    Delivery Status
                                  </p>

                                  {/* <HiOutlineDotsVertical className='float-right hover:cursor-pointer' /> */}
                                </div>
                                <div className="flex items-center justify-between mt-2 mb-2">
                                  {orderData?.orderstatus?.delv_status ==
                                    "0" && <span>Order placed (Pending)</span>}
                                  {orderData?.orderstatus?.delv_status ==
                                    "1" && <span>OnHold</span>}
                                  {orderData?.orderstatus?.delv_status ==
                                    "2" && <span>Confirmed</span>}
                                  {orderData?.orderstatus?.delv_status ==
                                    "3" && <span>Rejected</span>}
                                  <span>
                                    {orderData?.orderstatus?.delv_update !==
                                    null
                                      ? new Date(
                                          orderData?.orderstatus?.delv_update
                                        ).toLocaleDateString()
                                      : ""}
                                  </span>
                                </div>
                                <div className="progress progress-md flex-grow mb-2">
                                <div
                                    className={`progress-bar bg-${orderData?.orderstatus?.delv_status == "0" ? "primary" : orderData?.orderstatus?.delv_status == "1" ? "warning" : orderData?.orderstatus?.delv_status == "2" ? "success" : orderData?.orderstatus?.delv_status == "3" ? "danger" : "primary"}`}
                                    role="progressbar"
                                    aria-valuenow={`${
                                      orderData?.orderstatus?.delv_status ==
                                      "0"
                                        ? 25
                                        : orderData?.orderstatus
                                            ?.delv_status == "1"
                                        ? 50
                                        : orderData?.orderstatus
                                            ?.delv_status == "2"
                                        ? 100
                                        : orderData?.orderstatus
                                            ?.delv_status == "3"
                                        ? 75
                                        : 25
                                    }`}
                                    style={{
                                      width: `${
                                        orderData?.orderstatus?.delv_status ==
                                        "0"
                                          ? "25%"
                                          : orderData?.orderstatus
                                              ?.delv_status == "1"
                                          ? "50%"
                                          : orderData?.orderstatus
                                              ?.delv_status == "2"
                                          ? "100%"
                                          : orderData?.orderstatus
                                              ?.delv_status == "3"
                                          ? "75%"
                                          : ""
                                      }`,
                                    }}
                                    aria-valuemin="0"
                                    aria-valuemax="100"
                                  ></div>
                                </div>
                              </div>
                            </div>

                            <button
                              className="btn btn-primary btn-block mb-2"
                              onClick={downloadFile}
                            >
                              Preview
                            </button>
                          </div>
                          <div className="col-lg-8">
                            <div className="d-flex justify-content-between">
                              <div>
                                <button className="btn btn-outline-primary">
                                  Download
                                </button>
                                {/* <button className="btn btn-primary">Request</button> */}
                              </div>
                            </div>
                            <div className="mt-4 py-2 border-top border-bottom">
                              <ul className="nav profile-navbar text-lg">
                                <li
                                  className="nav-item"
                                  onClick={() => setActiveTab("products")}
                                >
                                  <a
                                    className={`nav-link  ${
                                      activeTab === "products" ? "active" : ""
                                    }`}
                                    href="#"
                                  >
                                    <i className="mdi mdi-cart-outline"></i>
                                    Products
                                  </a>
                                </li>
                                <li
                                  className="nav-item"
                                  onClick={() => setActiveTab("payments")}
                                >
                                  <a
                                    class={`nav-link ${
                                      activeTab === "payments" ? "active" : ""
                                    }`}
                                    href="#"
                                  >
                                    <i className="mdi mdi-newspaper"></i>
                                    Payments
                                  </a>
                                </li>
                                <li
                                  className="nav-item"
                                  onClick={() => setActiveTab("invoice")}
                                >
                                  <a
                                    className={`nav-link ${
                                      activeTab === "invoice" ? "active" : ""
                                    }`}
                                    href="#"
                                  >
                                    <i className="mdi mdi-receipt-text"></i>
                                    Invoice
                                  </a>
                                </li>
                              </ul>
                            </div>
                            {activeTab === "products" && (
                              <div className="profile-feed ">
                                <div className="w-full d-flex align-items-start profile-feed-item">
                                  <div className="nk-section-content row px-lg-5 w-full ">
                                    <div className="max-h-[625px] overflow-y-auto">
                                      <div className="nk-entry pe-lg-5 w-full">
                                        <div className="mb-5">
                                          {orderData?.items?.length > 0 ? (
                                            <table className="table">
                                              <tbody>
                                                {orderData?.items?.length > 0 &&
                                                  orderData?.items?.map(
                                                    (product, ind) => {
                                                      return (
                                                        <tr key={ind}>
                                                          <td className="">
                                                            <div className="d-flex align-items-start">
                                                              <img
                                                                src={
                                                                  product
                                                                    ?.product_details
                                                                    ?.img_1
                                                                }
                                                                alt="product"
                                                                className="mb-0 mr-2 !w-[30%] !h-[30%]"
                                                                // width="150px"
                                                              />
                                                              <div className="w-75">
                                                                <p
                                                                  className="prod-title text-lg mb-0"
                                                                  style={{
                                                                    textOverflow:
                                                                      "ellipsis",
                                                                    whiteSpace:
                                                                      "nowrap",
                                                                    overflow:
                                                                      "hidden",
                                                                    width:
                                                                      "90%",
                                                                  }}
                                                                >
                                                                  {
                                                                    product
                                                                      ?.product_details
                                                                      ?.name
                                                                  }
                                                                </p>

                                                                <p className="prod-desc mb-1 text-success">
                                                                  In Stock
                                                                </p>
                                                                <div className=" ">
                                                                  <div
                                                                    id="counter"
                                                                    className=""
                                                                  >
                                                                    Qty:
                                                                    <span className="fs-18 m-0 text-gray-1200 !text-xs !font-bold !ml-1 !mr-2r">
                                                                      {
                                                                        product?.qty
                                                                      }
                                                                    </span>
                                                                  </div>
                                                                  <div
                                                                    className="!mt-3"
                                                                    // style={{ marginLeft: "1rem" }}
                                                                  >
                                                                    <span className="total font-semibold">
                                                                      ₹ {product?.total}
                                                                    </span>{" "}
                                                                  </div>
                                                                </div>
                                                              </div>
                                                            </div>
                                                          </td>
                                                        </tr>
                                                      );
                                                    }
                                                  )}
                                              </tbody>
                                            </table>
                                          ) : (
                                            <div className="text-center font-bold text-gray-700 ">
                                              <p>
                                                No products found in the order
                                              </p>
                                            </div>
                                          )}
                                        </div>
                                      </div>
                                      <hr className="mt-2" />
                                      <div className="mt-5"></div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeTab === "payments" && (
                              <div className="profile-feed">
                                <div className="stretch-card">
                                  <div className="card">
                                    <div className="card-body">
                                      <h4 className="card-title">
                                        Payment History
                                      </h4>

                                      <div className="table-responsive">
                                        <table className="table table-hover">
                                          <thead>
                                            <tr>
                                              <th>Order ID</th>
                                              <th>Total Amount </th>
                                              <th>Paid Amount</th>
                                              <th>Transaction Id</th>
                                              <th>Payment Status</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {orderData?.payments?.map(
                                              (data, i) => (
                                                <tr>
                                                  <td>{data?.order_id}</td>
                                                  <td>{data?.total_amount}</td>
                                                  <td className="text-danger">
                                                    {data?.paid_amount}
                                                  </td>
                                                  <td className="text-danger">
                                                    {data?.transaction_id}
                                                  </td>
                                                  {data?.status === 1 && (
                                                    <td>
                                                      <label className="badge badge-success">
                                                        success
                                                      </label>
                                                    </td>
                                                  )}
                                                  {data?.status === 0 && (
                                                    <td>
                                                      <label className="badge badge-info">
                                                        Initiated
                                                      </label>
                                                    </td>
                                                  )}
                                                  {data?.status === 2 && (
                                                    <td>
                                                      <label className="badge badge-danger">
                                                        Failed
                                                      </label>
                                                    </td>
                                                  )}
                                                </tr>
                                              )
                                            )}
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                            {activeTab === "invoice" && (
                              <div className="profile-feed " id="invoice">
                                <div className="card px-2">
                                  <div className="card-body">
                                    <div
                                      className="d-flex  align-items-center container-fluid"
                                      style={{ width: "100%" }}
                                    >
                                      <img
                                        src={"/images/logo.png"}
                                        alt="product-image"
                                        className="mb-0 mr-2 cursor-pointer m-2 rounded "
                                        style={{
                                          width: "150px",
                                          height: "50px",
                                        }}
                                      />
                                      <h3
                                        className="text-end my-5"
                                        style={{ marginLeft: "auto" }}
                                      >
                                        Invoice&nbsp;&nbsp;
                                        {orderData?.invoice?.prefix}
                                        {orderData?.invoice?.number}
                                      </h3>
                                    </div>
                                    <hr />
                                    <div className="container-fluid d-flex justify-content-between">
                                      <div className="col-lg-3 ps-0">
                                        <p className="mt-5 mb-2">
                                          <b> Trading Materials</b>
                                        </p>
                                        <p>
                                          No.3 FC, 401, level-4 RAGHAVA
                                          <br />
                                          BUILDING, 4Th Floor, Ramamurthy Nagar,
                                          <br />
                                          Bengaluru, Karnataka - 560016.
                                          <br />
                                          Phone : 971 568030111
                                        </p>
                                      </div>
                                      <div className="col-lg-3 pe-0">
                                        <p className="mt-5 mb-2 text-end">
                                          <b>Invoice to</b>
                                        </p>
                                        <p className="text-end">
                                          {orderData?.invoice?.address_1}
                                          <br /> {orderData?.invoice?.address_2}
                                          <br />{" "}
                                          {
                                            orderData?.invoice?.billing_city
                                          } ,{" "}
                                          {orderData?.invoice?.billing_state}
                                          <br />
                                          {
                                            orderData?.invoice?.billing_country
                                          }{" "}
                                          - {orderData?.invoice?.billing_zip}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="container-fluid d-flex justify-content-between">
                                      <div className="col-lg-3 ps-0">
                                        <p className="mb-0 mt-5">
                                          Invoice Date :{" "}
                                          {orderData?.invoice?.date}
                                        </p>
                                        <p>Due Date : 25th Jan 2017</p>
                                      </div>
                                    </div>
                                    <div className="container-fluid mt-5 d-flex justify-content-center w-100">
                                      <div className="table-responsive w-100">
                                        <table className="table">
                                          <thead>
                                            <tr className="bg-dark text-white">
                                              <th>#</th>
                                              <th>Description</th>
                                              <th className="text-end">
                                                Quantity
                                              </th>
                                              <th className="text-end">
                                                Unit cost
                                              </th>
                                              <th className="text-end">
                                                Total
                                              </th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            <tr className="text-end">
                                              <td className="text-start">1</td>
                                              <td className="text-start">
                                                Brochure Design
                                              </td>
                                              <td>2</td>
                                              <td>$20</td>
                                              <td>$40</td>
                                            </tr>
                                            <tr className="text-end">
                                              <td className="text-start">2</td>
                                              <td className="text-start">
                                                Web Design Packages(Template) -
                                                Basic
                                              </td>
                                              <td>05</td>
                                              <td>$25</td>
                                              <td>$125</td>
                                            </tr>
                                            <tr className="text-end">
                                              <td className="text-start">3</td>
                                              <td className="text-start">
                                                Print Ad - Basic - Color
                                              </td>
                                              <td>08</td>
                                              <td>$500</td>
                                              <td>$4000</td>
                                            </tr>
                                            <tr className="text-end">
                                              <td className="text-start">4</td>
                                              <td className="text-start">
                                                Down Coat
                                              </td>
                                              <td>1</td>
                                              <td>$5</td>
                                              <td>$5</td>
                                            </tr>
                                          </tbody>
                                        </table>
                                      </div>
                                    </div>
                                    <div className="container-fluid mt-5 w-100">
                                      <p className="text-end mb-2">
                                        Sub - Total amount: $12,348
                                      </p>
                                      <p className="text-end">
                                        vat (10%) : $138
                                      </p>
                                      <h4 className="text-end mb-5">
                                        Total : $13,986
                                      </h4>
                                      <hr />
                                    </div>
                                    <div className="container-fluid w-100">
                                      <a
                                        href="#"
                                        className="btn btn-primary float-right mt-4 ms-2 me-1"
                                      >
                                        <i className="mdi mdi-printer me-1"></i>
                                        Print
                                      </a>
                                      <a
                                        onClick={handleShare}
                                        className="btn btn-success float-right mt-4 "
                                      >
                                        <i className="mdi mdi-telegram me-1"></i>
                                        Send Invoice
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="footer-wrapper">
          <footer className="footer">
            <div className="d-sm-flex justify-content-center justify-content-sm-between">
              <span className="text-center text-sm-left d-block d-sm-inline-block">Copyright &copy; 2021 All rights reserved. </span>
            </div>
          </footer>
        </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
