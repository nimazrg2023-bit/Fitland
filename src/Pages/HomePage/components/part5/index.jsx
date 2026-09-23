import { Swiper, SwiperSlide } from "swiper/react";
import { filteredsh } from "../../../../core/constant";
import { Navigation } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import { useRef, useState } from "react";
import { NavLink } from "react-router";
export default function Part5() {

    const [prevEl, setPrevEl] = useState(null);
    const [nextEl, setNextEl] = useState(null);
    return (
        <div className="mt-20 gap-5  flex flex-col items-center w-full">
            <p className="lg:text-[32px] text-[14px]   bg-white p-3 rounded-b-2xl lg:rounded-b-4xl text-[#021526] font-semibold">جدید ترین کفش های ورزشی  </p>
            <div className="w-85/100  flex flex-col gap-5">
                <div className=" gap-2 lg:flex hidden ml-10">
                    <NavLink to={"/product"} className="">مشاهده همه</NavLink>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="#032340" />
                        <path d="M15.5 12.75H9.5C9.09 12.75 8.75 12.41 8.75 12C8.75 11.59 9.09 11.25 9.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z" fill="#032340" />
                        <path d="M11.4975 15.7504C11.3075 15.7504 11.1175 15.6804 10.9675 15.5304L7.9675 12.5304C7.6775 12.2404 7.6775 11.7604 7.9675 11.4704L10.9675 8.47043C11.2575 8.18043 11.7375 8.18043 12.0275 8.47043C12.3175 8.76043 12.3175 9.24043 12.0275 9.53043L9.5575 12.0004L12.0275 14.4704C12.3175 14.7604 12.3175 15.2404 12.0275 15.5304C11.8775 15.6804 11.6875 15.7504 11.4975 15.7504Z" fill="#032340" />
                    </svg>
                </div>
                <div className="w-full rounded-2xl justify-center items-center flex">
                    <button ref={(node) => setPrevEl(node)} className="w-10 h-10 rounded-full hidden   lg:flex items-center justify-center">
                        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.46 23.1167C10.2067 23.1167 9.95333 23.0233 9.75333 22.8233L1.06 14.13C-0.353333 12.7167 -0.353333 10.3967 1.06 8.98333L9.75333 0.29C10.14 -0.0966666 10.78 -0.0966666 11.1667 0.29C11.5533 0.676667 11.5533 1.31667 11.1667 1.70333L2.47333 10.3967C1.83333 11.0367 1.83333 12.0767 2.47333 12.7167L11.1667 21.41C11.5533 21.7967 11.5533 22.4367 11.1667 22.8233C10.9667 23.01 10.7133 23.1167 10.46 23.1167Z" fill="#021526" />
                        </svg>
                    </button>
                    <Swiper className="flex w-full mb-10" modules={[Navigation]} navigation={{ prevEl, nextEl }} breakpoints={{320: { slidesPerView: 2, spaceBetween: 10 }, 768: { slidesPerView: 3, spaceBetween: 20 }}}  spaceBetween={20} >
                        {filteredsh.map((item, index) => (
                            <SwiperSlide key={index} className="flex lg:w-full  bg-white rounded-2xl">
                                <div className="flex absolute gap-2 mt-2 ml-2">
                                    <div className="bg-[#032340] text-white text-[14px] font-normal rounded-full size-10 p-3 flex justify-center items-center"> {item.discount}% </div>
                                    <div className={` ${item.vip ? "flex" : "hidden"} text-white flex justify-center items-center bg-[#FA541C] text-[14px] font-normal rounded-full size-10  `}>VIP</div>
                                </div>
                                <img className="lg:h-80 h-70 mb-3 rounded-t-2xl w-full" src={item.image} alt="" />
                                <div className="flex flex-col items-end gap-3 ">
                                    <p className="text-right">{item.title}</p>
                                    <p><span>تومان</span> {item.price} </p>
                                    <div className="flex flex-col items-end">
                                        <div className="flex flex-wrap gap-1 mb-3 justify-end">
                                            <p className="text-[10px] flex   text-gray-600 px-1.5 py-0.5 rounded cursor-pointer hover:border hover:border-gray-800">
                                                {item.sizes[item.sizes.length - 1]}<span> تا </span>{item.sizes[0]} از سایز
                                            </p>
                                        </div>
                                        <div className="flex">
                                            {item.colors.map((color, index) => (
                                                <div key={index} className="size-4 rounded-full border border-gray-200 cursor-pointer hover:scale-110 transition-transform" style={{ backgroundColor: color, marginLeft: index === 0 ? '0' : '-6px', zIndex: index - item.colors.length }}></div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <button ref={(node) => setNextEl(node)} className="w-10 h-10 rounded-full hidden   lg:flex items-center justify-center">
                        <svg width="12" height="24" viewBox="0 0 12 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.15938 0.00023134C1.4127 0.00205034 1.66536 0.0971992 1.86392 0.298631L10.4946 9.05416C11.8978 10.4776 11.8811 12.7975 10.4577 14.2007L1.70212 22.8314C1.31269 23.2153 0.672708 23.2107 0.288828 22.8212C-0.0950522 22.4318 -0.0904568 21.7918 0.298976 21.4079L9.05451 12.7772C9.69908 12.1419 9.70655 11.1019 9.07116 10.4573L0.440474 1.70178C0.0565944 1.31235 0.0611897 0.672362 0.450622 0.288483C0.651957 0.103257 0.90605 -0.00158765 1.15938 0.00023134Z" fill="#021526" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}