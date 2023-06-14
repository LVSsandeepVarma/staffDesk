"use client"
import PasswordHash from '@/components/forgotPassword/otpPage'
import React, { useEffect } from 'react'

export default function OTP() {
  useEffect(()=>{
    alert("DOM rendering")
  },[])
 
  return (
    <PasswordHash/>
  )
}
