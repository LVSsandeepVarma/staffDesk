"use client"

import DashboardContent from "@/components/dashboard/dashboardComponent"
import withAuth from "@/components/authRoutes";

const ProtectedDashboard = withAuth(DashboardContent)


export default function Home() {
  return (
    <main className="">
      <ProtectedDashboard/>
    </main>
  )
}
