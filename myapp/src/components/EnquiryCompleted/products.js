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
import { DateRangePicker } from 'rsuite';
import axios from 'axios';
import "rsuite/dist/rsuite.css";
import { useNavigate } from 'react-router-dom';
import Multiselect from 'multiselect-react-dropdown';




const Products = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch() 
    const {combine, allowedMaxDays, before} = DateRangePicker
    const userData = useSelector((state) => state?.userInfoReducer)
    console.log(userData, "data")
    const loaderState = useSelector((state)=>state.loaderReducer.value)
    const [error, setError] = useState([]);
    const [success, setSuccess] = useState("");
    const [productsCart, setProductsCart] = useState([])
    const [relativeQty, setRelativeQty] = useState([]);
    const [relativeTax, setRelativeTax] = useState([]);
  const [options, setOptions] = useState([
    { name: 'option1', label: 'Option 1' },
    { name: 'option2', label: 'Option 2' },
    { name: 'option3', label: 'Option 3' },
    { name: 'option4', label: 'Option 4' },
    { name: 'option5', label: 'Option 5' },
  ]);

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

  const handleSelectedOptions = (products)=>{
    let selectedProductsArr = []
    products?.map((val,ind)=>{
      selectedProductsArr.push(val?.name)
    })
    setProductsCart([...selectedProductsArr])
  }

  const handleRemoveProduct = (products)=>{
    let removedProductsArr = []
    products?.map((val,ind)=>{
      removedProductsArr = productsCart?.filter(item => item !== val?.name)
    })
    setProductsCart([...removedProductsArr])
    }

  const handleQtyChange=(val)=>{
    console.log(val)

  }
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
                        <li className="breadcrumb-item active" aria-current="page">Invoice</li>
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
                        <Card.Title className="card-header border-bottom py-3 !bg-[#25378b] text-white">Unpaid Invoices</Card.Title>
                        <Card.Body>
                        <div className="container mx-auto">
      <div className="flex">
        {/* <div className="w-1/4">
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
              {/* </tbody> */}
            {/* </Table> */}
          {/* )} */}
          {/* {activeTab === 'tab2' && (
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
                onSelect={(e)=>{handleSelectedOptions(e)}} // Function will trigger on select event
                onRemove={(e)=>{handleRemoveProduct(e)}} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
            />
            </Form.Group>
            </div>
            
          </div>
          {productsCart?.length>0 && 
          <Table responsive striped bordered>
              <thead>
                <tr>
                  <th>id</th>
                  <th> product</th>
                  <th>quantity</th>
                  <th>tax</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {productsCart?.map((val,ind)=>(
                  <tr key={ind}>
                  <td>#00{ind}</td>
                  <td>{val}</td>
                  <td>
                    <input onChange={(e)=>handleQtyChange([e?.target?.value,ind])} type='number' min={1}></input>
                  </td>
                  <td>
                  <select>
                    <option>0%</option>
                    <option>5%</option>
                    <option>10%</option>
                  </select>
                  </td>
                  <td>$00.00</td>
                </tr>
                ))}
                
                {/* Add more rows as needed */}
              {/* </tbody> */}
            {/* </Table>} */}
          {/* </> */}

          {/* )} */}


        {/* </div> */}
        <>
            <div className='flex justify-around	'>
            <div className='w-[70%] mr-10'>
            <Form.Group controlId="dropdown">
              <Form.Label>Select Currency:</Form.Label>
              <Form.Control as="select">
                <option>USD</option>
                <option>IND</option>
              </Form.Control>
            </Form.Group>
            </div>
            <div className='w-[70%] justify-end'>
            <Form.Group controlId="multiSelect">
            <Form.Label>select Products:</Form.Label>
            <Multiselect
                // className='!relative'
                options={options} // Options to display in the dropdown
                selectedValues={""} // Preselected value to persist in dropdown
                onSelect={(e)=>{handleSelectedOptions(e)}} // Function will trigger on select event
                onRemove={(e)=>{handleRemoveProduct(e)}} // Function will trigger on remove event
                displayValue="name" // Property name to display in the dropdown options
            />
            </Form.Group>
            </div>
            
          </div>
          </>
          </div>
          <div className='!block mt-3'>
          {productsCart?.length>0 && 
          <Table  responsive striped bordered>
              <thead>
                <tr>
                  <th>id</th>
                  <th> product</th>
                  <th>quantity</th>
                  <th>tax</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {productsCart?.map((val,ind)=>(
                  <tr key={ind}>
                  <td>#00{ind}</td>
                  <td>{val}</td>
                  <td>
                    <input onChange={(e)=>handleQtyChange([e?.target?.value,ind])} type='number' min={1}></input>
                  </td>
                  <td>
                  <select>
                    <option>0%</option>
                    <option>5%</option>
                    <option>10%</option>
                  </select>
                  </td>
                  <td>$00.00</td>
                </tr>
                ))}
                
                {/* Add more rows as needed */}
              </tbody>
            </Table>}
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
