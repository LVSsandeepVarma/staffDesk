import { Table, Pagination } from 'react-bootstrap';
import {useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import CommentsModal from '../modals/commentsModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
const FetchTable = () => {
    const data = useSelector((state)=>state?.userInfoReducer)
    console.log(data?.value?.data?.assigned_new, "data")
  // Sample data for the table
  const [tableData, setTableData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCommetnsModal, setShowCommentsModal] = useState(false)
  const [filteredTable, setFilteredTable] = useState([]);
  useEffect(()=>{
    // convert timestamp to time format
const tabledata = data?.value?.data?.assigned_new;
const updatedTableData = tabledata.map( row=>{
  const timestamp = row.created_at;
  const date = new Date(timestamp)
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  console.log(formattedTime)
  return {
      ...row, created_at: formattedTime
  }
})
setTableData(updatedTableData)
  // setTableData(data?.value?.data?.assigned_new)
},[data])

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
  return (
    <div>
      <CommentsModal show = {showCommetnsModal} setShowCommentsModal={setShowCommentsModal}/>
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
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((row) => (
            <tr key={row.id}>
              <td>{row.first_name}</td>
              {!row.email_verified == 1 ?
              (<td className={!row?.email_verified && 'cursor-pointer text-warning iconWrap Email_Varify'} onClick={()=>setShowCommentsModal(true)}>

              {!row.email_verified == 1 && <FontAwesomeIcon color="#ffc107" icon={faExclamationCircle} data-id="148" style={{cursor:"pointer"}}></FontAwesomeIcon>}
              {row.email}
              </td>) : (<td>{row?.email}</td>)
              }
              <td>{row.phone}</td>
              <td>{row.created_at}</td>
              <td><a href="/enquiry/assigned-enquiry#">click here</a></td>
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

export default FetchTable;