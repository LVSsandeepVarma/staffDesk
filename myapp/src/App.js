import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignIn from "./pages/login/page"
import Dashboard from './pages/dashboard/page';
import AssignedFetchEnquiry from './pages/enquiry/assigned-enquiry/page';
import FetchEnquiry from './pages/enquiry/fetch/page';
import NotIntrested from './pages/enquiry/not-intersted-enquiry/page';
import TPostponed from './pages/enquiry/not-todays-postponed-enquiry/page';
import TRinging from './pages/enquiry/not-todays-ringing-enquiry/page';
import CompletePostponed from './pages/enquiry/postponed-enquiry/page';
import CompleteRinging from './pages/enquiry/ringing-enquiry/page';
import LockedScreen from './pages/locked/page';
import ResetPassword from './pages/reset-password/page';
import NewPassword from './pages/reset-password/new-password/page';
import OTP from './pages/reset-password/hash/page';
import StaffAttendance from './pages/staff/attendance/page';
import StaffHistory from './pages/staff/history/page';
import Products from './components/EnquiryCompleted/products';




function App() {
  return (
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Dashboard/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
            <Route path="/login" element={<SignIn/>}></Route>
            <Route path="/new/password" element={<NewPassword/>}></Route>
            <Route path="/reset-password" element={<ResetPassword/>}></Route>
            <Route path='/reset-password/:hash' element={<OTP/>}></Route>
            <Route path='/enquiry/fetch' element={<FetchEnquiry/>}></Route>
            <Route path="/enquiry/assigned-enquiry" element={<AssignedFetchEnquiry/>}></Route>
            <Route path="/enquiry/postponed-enquiry" element={<CompletePostponed/>}></Route>
            <Route path="/enquiry/ringing-enquiry" element={<CompleteRinging/>}></Route>
            <Route path="/enquiry/not-intersted-enquiry" element={<NotIntrested/>}></Route>
            <Route path="/enquiry/not-todays-postponed-enquiry" element={<TPostponed/>}></Route>
            <Route path="/enquiry/not-todays-ringing-enquiry" element={<TRinging/>}></Route>
            <Route path="/locked" element={<LockedScreen/>}></Route>
            <Route path="/staff/attendance" element={<StaffAttendance/>}></Route>
            <Route path="staff/history" element={<StaffHistory/>}></Route>
            {/* not protected route */}
            <Route path='/staff/enquiry-completed' element={<Products/>}></Route>
          </Routes>
        </BrowserRouter>
  );
}

export default App;
