
import Marquee from "react-fast-marquee";
import {FaTrophy, FaUsers, FaSignal, FaBriefcase,FaMoneyBillAlt,FaShoppingCart} from "react-icons/fa"
import {HiCheckCircle} from "react-icons/hi";
import {SlEnvolope} from "react-icons/sl";
import {RxCross2} from "react-icons/rx";
import {BiDollar} from "react-icons/bi";
export default function NavbarMarquee(){
    return(
        <main className=" relative top-[63px] sm:top-[0px] container topmarquee">
            <Marquee className="fixed container" autoFill={true} pauseOnHover={true} >
                {/* <ul>
                    <li>
                        <FaTrophy/>
                        Total Wins
                    </li>
                    <li>
                        <HiCheckCircle/>
                        Active Requests
                    </li>
                </ul> */}
                <p className=" mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(255,162,43,.1)]  rounded-full w-[2rem] h-[2rem]">
                        <FaTrophy className="h-auto text-[#ffc107] opacity-100"/>
                    </span>
                    Total Wins 
                </p>
                <p className="mr-5 flex items-center">
                    <span className=" flex justify-center mr-1 bg-[rgba(255,56,43,0.1)]  rounded-full w-[2rem] h-[2rem] ">
                    <HiCheckCircle className=" h-auto text-[#f66] opacity-100" />
                    </span>
                     Active Requests</p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(255,56,43,0.1)]  rounded-full w-[2rem] h-[2rem]">
                <FaUsers className="h-auto text-[#28afd0] opacity-100"/>
                </span>
                  Total Users
                  </p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(0,214,230,.1)]  rounded-full w-[2rem] h-[2rem]">
                     <FaSignal className="h-auto text-[#f66] opacity-100"/></span> Total Leads</p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(0,230,130,.1)]  rounded-full w-[2rem] h-[2rem]">
                         <FaBriefcase className="h-auto text-[#15c763] opacity-100"/>
                         </span> Total Trails
                         </p>
                <p className="mr-5  flex items-center">
                     <span className="flex justify-center mr-1 bg-[rgba(70,127,207,.1)]  rounded-full w-[2rem] h-[2rem]">
                        <SlEnvolope className="h-auto text-[#467fcf] opacity-100"/></span> Active Email Accounts </p> 
                 <p className="mr-5  flex items-center"> 
                 <span className="flex justify-center mr-1 bg-[rgba(70,127,207,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <SlEnvolope className="h-auto text-[#5eba00] opacity-100"/></span>Deactive Email Accounts</p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(0,214,230,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <RxCross2 className="h-auto text-[#28afd0] opacity-100"/></span>Deactive Requests</p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(0,230,130,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <BiDollar className="h-auto text-[#15c763] opacity-100"/></span> Total Balance</p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(255,56,43,.1)]  rounded-full w-[2rem] h-[2rem]">
                        <FaShoppingCart className="h-auto text-[#f66] opacity-100"/></span> Total Sales</p>
                <p className="mr-5  flex items-center"> 
                <span className="flex justify-center mr-1 bg-[rgba(255,162,43,.1)]  rounded-full w-[2rem] h-[2rem]">
                    <FaMoneyBillAlt className="h-auto text-[#ffc107!] opacity-100"/></span> Total Purchase</p>
                <p className="mr-5  flex items-center">
                <span className="flex justify-center mr-1 bg-[rgba(255,56,43,.1)]  rounded-full w-[2rem] h-[2rem]">
                     <BiDollar className="h-auto text-[#f66] opacity-100"/></span>Total Cost Production </p>
                <p className="mr-5  flex items-center">
                <span className="flex justify-center mr-1 bg-[rgba(70,127,207,.1)]  rounded-full w-[2rem] h-[2rem]">
                     <FaMoneyBillAlt className="h-auto text-[#467fcf] opacity-100"/></span>Total Cost Savings</p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(0,214,230,.1)]  rounded-full w-[2rem] h-[2rem]">
                     <FaBriefcase className="h-auto text-[#28afd0] opacity-100"/></span>Total Projects</p>
                <p className="mr-5  flex items-center">
                    <span className="flex justify-center mr-1 bg-[rgba(0,230,130,.1)]  rounded-full w-[2rem] h-[2rem]">
                     <FaUsers className="h-auto text-[#15c763] opacity-100"/></span>Total Employees
                     <span className="text-[#2fd8c6] font-bold ml-2">4738</span></p>
            </Marquee>
        </main>
    )
}