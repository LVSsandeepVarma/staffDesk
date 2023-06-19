import { Table } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import CommentsModal from '../modals/commentsModal';

const NotIntrestedTable = () => {
    const [tableData, setTableData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredTable, setFilteredTable] = useState([]);
    const [showCommetnsModal, setShowCommentsModal] = useState(false);
    const [clientID, setClientID] = useState();
    const [commentsArr, setCommentsArr] = useState([])

    useEffect(()=>{
        const fetchUserInfo = async () =>{
            try{
              const token = sessionStorage.getItem("tmToken")?.length ? sessionStorage.getItem("tmToken") : localStorage.getItem("tmToken")
              const response = await axios.get("https://admin.tradingmaterials.com/api/staff/enq-by-type?", {
                params: {
                    type: 'NOT-INTERESTED'
                  },
                headers: {
                  Authorization: `Bearer ${token}`
                }
              })
              // console.log(response?.data.data.enquiries, "nitable")
              setTableData(response?.data?.data?.enquiries)
              // setFilteredTable(response?.data?.data?.enquiries)
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

  const handleCommentModalDispaly =(id)=>{
    setShowCommentsModal(true)
    setClientID(id)
    const fetchEnquiryComments=async()=>{
      try{
        const token = localStorage.getItem("tmToken");
        const response = await axios.get(`https://admin.tradingmaterials.com/api/staff/get-comments?client_id=${id}`,{
          headers:{Authorization: `Bearer ${token}`}
        })
        console.log(response?.data?.data?.notin_comments)
        let comments =[[],[],[]];
        comments[0].push(...response?.data?.data?.notin_comments)
        comments[1].push(...response?.data?.data?.post_comments)
        comments[2].push(...response?.data?.data?.ring_comments)
        setCommentsArr([...comments])

      }catch(err){
        console.log(err)
      }
    }
    
    fetchEnquiryComments()
  }

  return (
    <div>
      <CommentsModal show = {showCommetnsModal} data={commentsArr} setShowCommentsModal={setShowCommentsModal}/>
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
            <th>EMAIL</th>
            <th>PHONE</th>
            <th>ADDED DATE</th>
            <th></th>
          </tr>
        </thead>
        {currentData.length>0 ? (<tbody>
          {currentData.map((row) => (
            <tr key={row?.id}>
                <td className="">
                           <h5 className="text-[#25378b] mb-1">{row.first_name}</h5>
                           <p className="mb-0">{row.city} / {row.country} /ip</p>
                        </td>
              {/* <td>{row.first_name}</td> */}
              {!row.email_verified == 1 ?
              (<td className={!row?.email_verified && 'cursor-pointer text-warning iconWrap Email_Varify'} >

              {!row.email_verified == 1 && <FontAwesomeIcon color="#ffc107" icon={faExclamationCircle} data-id="148" style={{cursor:"pointer"}}></FontAwesomeIcon>}
              {row.email}
              </td>) : (<td>{row?.email}</td>)
              }
              <td>{row.phone}</td>
              <td>{row.created_at?.substring(0, 10)}</td>
              <td > 
                <div className='!flex items-center justify-center' onClick={()=>handleCommentModalDispaly(row?.id)}>
                    <FontAwesomeIcon className='mr-2' color="grey" icon={faComment} data-id="148" style={{cursor:"pointer"}}></FontAwesomeIcon>
                    <FontAwesomeIcon color="#25378b" icon={faExclamationCircle} data-id="148" style={{cursor:"pointer"}}></FontAwesomeIcon>
                </div>
                
            </td>
            </tr>
          ))}
        </tbody>):
          <tr>
          <td colSpan="6" className="text-center">
            <p className="text-muted">No data available in table</p>
          </td>
        </tr>
        }
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

export default NotIntrestedTable;