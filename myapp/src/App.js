import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/login/page"
// import Dashboard from './components/pages/dashboard/page';
// import AssignedFetchEnquiry from './components/pages/enquiry/assigned-enquiry/page';
// import FetchEnquiry from './components/pages/enquiry/fetch/page';
// import NotIntrested from './components/pages/enquiry/not-intersted-enquiry/page';
// import tPostponed from './components/pages/enquiry/not-todays-postponed-enquiry/page';
// import TRinging from './components/pages/enquiry/not-todays-ringing-enquiry/page';
// import CompletePostponed from './components/pages/enquiry/postponed-enquiry/page';
// import CompleteRinging from './components/pages/enquiry/ringing-enquiry/page';
// import LockedScreen from './components/pages/locked/page';
// import ResetPassword from './components/pages/reset-password/page';
// import NewPassword from './components/pages/reset-password/new-password/page';
// import OTP from './components/pages/reset-password/[hash]/page';
// import StaffAttendance from './components/pages/staff/attendance/page';
// import StaffHistory from './components/pages/staff/history/page';




function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SignIn/>}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
