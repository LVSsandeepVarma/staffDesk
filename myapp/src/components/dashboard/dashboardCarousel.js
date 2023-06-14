"use client"
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useState } from 'react';
import { FaGreaterThan, FaLessThan } from "react-icons/fa"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBan, faCartPlus, faHeadphones, faPhone, faPhoneVolume, faUser, faWallet } from '@fortawesome/free-solid-svg-icons';
import Barchart from './ordersbarchart';
import Barcharts from './ordersbarchart';
import PaymentsBarcharts from './paymentsBarchart';


export default function DashboardData() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePrev = () => {
        setActiveIndex((prevIndex) => (prevIndex === 0 ? prevIndex : prevIndex - 1));
    };

    const handleNext = () => {
        setActiveIndex((prevIndex) => (prevIndex === 2 ? prevIndex : prevIndex + 1));
    };
    return (
        <>
            <div className='container mt-20 sm:mt-10'>
                <div className=' row row-6 relative flex justify-center '>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                    <div className='flex'>
                   
               
                        <Card.Body>

                            <Card.Title className='font-extrabold	'>Total Clients</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full !bg-green">
                  <FontAwesomeIcon className=' !h-[4rem]' icon={faUser}/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                        <div className='flex'>
                        <Card.Body>
                            <Card.Title className='font-extrabold	'>Total Enquiries</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl font-extrabold	'>8379</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl font-extrabold	'>8379</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full">
                  <FontAwesomeIcon className=' !h-[4rem]' color='#ffc107' icon={faPhone}/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                        <div className='flex'>
                        <Card.Body>
                            <Card.Title className='font-extrabold	'>Ringing Enquiries</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>8379</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full ">
                  <FontAwesomeIcon className=' !h-[4rem]' icon={faHeadphones} color='#28afd0'/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                        <div className='flex'>
                        <Card.Body>
                            <Card.Title className='font-extrabold	'>Postponed Enquiries</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl font-extrabold	'>285</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>285</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>285</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full ">
                  <FontAwesomeIcon className=' !h-[4rem]' icon={faPhoneVolume} color='#467fcf'/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                        <div className='flex'>
                        <Card.Body>
                            <Card.Title className='font-extrabold	'>Not Interested Enquiries</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>285</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>285</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl font-extrabold	'>285</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full">
                  <FontAwesomeIcon className=' !h-[4rem]' icon={faBan} color='#f66'/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                        <div className='flex'>
                        <Card.Body>
                            <Card.Title className='font-extrabold	'>Total Orders</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>6,895</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>6,895</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl font-extrabold	'>6,895</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full">
                  <FontAwesomeIcon className=' !h-[4rem]' icon={faCartPlus} color='#467fcf'/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <Card className='mr-3 mb-3' style={{ width: '18rem' }}>
                        <div className='flex'>
                        <Card.Body>
                            <Card.Title className='font-extrabold	'>Total Sales</Card.Title>
                            <Carousel className='' activeIndex={activeIndex} prevLabel="" nextLabel="">
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>2,456K</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>2,456K</p>
                                </Carousel.Item>
                                <Carousel.Item>
                                    <p className='text-3xl	font-extrabold'>2,456K</p>
                                </Carousel.Item>

                            </Carousel>
                        </Card.Body>
                        <div className="ml-auto w-[25%] flex items-center justify-center ">
                  <span className="bg-success-transparent icon-service text-success rounded-full !bg-green">
                  <FontAwesomeIcon className=' !h-[4rem]' icon={faWallet} color='#ffc107'/>
                  </span>
                  </div>
                        </div>
                        <Card.Footer className="text-end bg-white border-0 flex justify-end ">
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handlePrev}>
                                {'<'}
                            </Button>
                            <Button className="bg-white border-1px h-[30px] w-[30px] text-dark rounded-full  ml-1 rounded-full !flex items-center justify-center	" onClick={handleNext}>
                                {'>'}
                            </Button>
                        </Card.Footer>
                    </Card>
                    <div className='row  mt-5'>
                    <div className='col-6'>
                    <Barcharts className="ml-5"/>
                    </div>
                    <div className='col-6'>
                    <PaymentsBarcharts/>
                    </div>

                    </div>

                    
                </div>
            </div>
        </>
    )
}