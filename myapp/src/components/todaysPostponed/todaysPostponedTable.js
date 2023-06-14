import { Table, Pagination } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
// import { FaRepeat, FaPhoneVolume, FaCalendarPlus, FaHeadset } from 'react-icons/fa';
import {AiOutlineReload, AiOutlineCaretDown} from "react-icons/ai"
import {CgPhone} from "react-icons/cg";
import {BsCalendarPlus} from "react-icons/bs";
import {TbPlugConnected} from "react-icons/tb"

import PostponedModal from '../modals/postponedModal';
import RingingModal from '../modals/ringingModal';
import NotIntrestedModal from '../modals/notIntrestedModal';
import CommentsModal from '../modals/commentsModal';
import EmailVerificationModal from '../modals/emailVerifiedModal';
import emailVerification from '../verification/emailVerification';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TodaysPostponedTable = () => {
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredTable, setFilteredTable] = useState([]);    const [show, setShow] = useState(false);
    const [ringingEnquiryModalShow, setRingingEnquiryShowModal] = useState(false);
    const [notIntrestedModalShow, setNotIntrestedModalShow] = useState(false);
    const [id, setId] = useState("");
    const [showCommetnsModal, setShowCommentsModal] = useState(false);
    const [verifyEmail, setVerifyEmail] = useState()
    const [showEmailVerifyModal,setShowEmailVerifyModal] = useState(false)

    useEffect(()=>{
        const fetchUserInfo = async () =>{
            try{
              const token = sessionStorage.getItem("tmToken")
              const response = await axios.get("https://admin.tradingmaterials.com/api/staff/enq-by-type?", {
                params: {
                    type: 'POSTPONED'
                  },
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              console.log(response?.data.data.enquiries, "nitable")
              const currentDate = new Date();
              const options = { month: '2-digit', day: '2-digit', year: 'numeric' };
              const formattedDate = currentDate.toLocaleDateString('en-US', options);
              console.log(formattedDate)
              const filteredData = response?.data?.data?.enquiries?.filter(entry => entry.modified_date == formattedDate);


              setTableData(filteredData)
            //   dispatch(setUserInfo(response?.data))
            }catch(error){
              console.error(error)
            }
          }
      
          fetchUserInfo()
    },[])


    const handleSearchChange = (event) => {
      setSearchQuery(event.target.value);
      // Filter the table data based on the search query
      const filteredData = tableData.filter((item) =>
      // console.log(item)
        item?.first_name?.toLowerCase().startsWith(event.target.value.toLowerCase())
      );
      // Update the table data with the filtered results
      setFilteredTable(filteredData);
    };


  // Number of items to display per page
  const itemsPerPage = 10;

  // Calculate the total number of pages
  const totalPages = Math.ceil(tableData.length / itemsPerPage);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  // Get the current page's data
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  let currentData = tableData.slice(startIndex, endIndex)
  if(searchQuery != ""){
    currentData = filteredTable.slice(startIndex, endIndex);
  }

  async function handleEmailverification(id){
    setId(id)
    const emailVerifyResponse  =await emailVerification(id)
    setShowEmailVerifyModal(true)
    console.log(emailVerifyResponse )
    setVerifyEmail(emailVerifyResponse)
  }

  return (
    <div>
      <CommentsModal show = {showCommetnsModal} setShowCommentsModal={setShowCommentsModal}/>
      <PostponedModal show={show} setShow={setShow} id={id} source={"TODAYS-POST"}/>
      <RingingModal show={ringingEnquiryModalShow} setShow={setRingingEnquiryShowModal} id={id} source={"TODAYS-POST"}/>
      <NotIntrestedModal show={notIntrestedModalShow} setShow={setNotIntrestedModalShow} id={id} source={"TODAYS-POST"}/>
      <EmailVerificationModal show={showEmailVerifyModal}  setShowEmailVerifyModal={setShowEmailVerifyModal} response={verifyEmail}  />

      <div className='!flex justify-end !w-[100%] mb-1'>
       <div className="input-group !w-[15vw] ">
      <input
        type="text"
        className="form-control flex w-[100%] justify-end"
        placeholder="Search"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      
    </div>
       </div>
      <Table responsive striped bordered hover>
        <thead>
          <tr>
            <th>ENQUIRY</th>
            <th>Email</th>
            <th>Phone</th>
            <th>MODIFIED DATE</th>
            <th>ACTION</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
                <td className="">
                           <h5 className="text-[#25378b] mb-1">{row.first_name}</h5>
                           <p className="mb-0">{row.city} / {row.country} /ip</p>
                        </td>
              {/* <td>{row.first_name}</td> */}
              {!row.email_verified == 1 ?
              (<td className={!row?.email_verified && 'cursor-pointer text-warning iconWrap Email_Varify'} onClick={()=>setShowCommentsModal(true)}>

              {!row.email_verified == 1 && <FontAwesomeIcon color="#ffc107" icon={faExclamationCircle} data-id="148" style={{cursor:"pointer"}}></FontAwesomeIcon>}
              {row.email}
              </td>) : (<td>{row?.email}</td>)
              }
                            <td>{row.phone}</td>
              <td>{row.modified_date}</td>
              <td > 
              <ButtonGroup className="mt-2 mb-2">
      <Dropdown>
        <Dropdown.Toggle className="!flex items-center" variant="default" id="dropdown-basic">
          Action <AiOutlineCaretDown/>
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {/* <Dropdown.Item className="!flex justify-center" onClick={()=>{handleEmailverification(row.id)}}>
           <AiOutlineReload className="mr-2"/>
          </Dropdown.Item> */}
          <Dropdown.Divider />
          <Dropdown.Item className="!flex justify-center" onClick={()=>{setRingingEnquiryShowModal(true), setId(row.id)}}>
            <CgPhone className="mr-2"/> Ringing
          </Dropdown.Item>
          <Dropdown.Item className="!flex justify-center" key={row.id} onClick={()=>{setShow(true), setId(row.id)}}>
           <BsCalendarPlus  className="mr-2"/> Postponed
          </Dropdown.Item>
          <Dropdown.Item className="!flex justify-center" onClick={()=>{setNotIntrestedModalShow(true), setId(row.id)}}>
           <TbPlugConnected className="mr-2"/> Not interested
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </ButtonGroup>
            </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <div className='!flex  justify-end'>
            <ul className="pagination">
          <li class={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handlePrevPage}>
              Prev
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, index) => (
            <li
              key={index}
              class={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
            >
              <button
                className="page-link"
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
          <li class={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={handleNextPage}>
              Next
            </button>
          </li>
        </ul>
            </div>

    </div>
  );
};

export default TodaysPostponedTable;