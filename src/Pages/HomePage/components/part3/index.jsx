import { NavLink } from "react-router";

export default function Part3() {
    return (
        <div className="flex flex-row-reverse  mt-15 w-full">
            <img className="absolute w-full" src="/banner.jpg" alt="" />
            <div className="relative mr-30 mt-45 max-sm:mt-10 max-sm:mr-5 w-4/10 max-sm:w-5/10 gap-2 flex flex-col items-end">

                <p className="text-[18px] max-sm:text-[10px] max-sm:font-medium font-medium">برای حل خوب</p>
                <p className="text-[24px] max-sm:text-[10px] max-sm:font-medium font-bold ">لوازم ایروبیک و تناسب اندام بگیر</p>
                <button className="flex mt-5 max-sm:hidden text-[12px] w-full font-normal lg:text-[16px] lg:font-semibold lg:p-4 text-white bg-[#032340] gap-2 rounded-2xl p-2 justify-center items-center lg:w-4/10 w-65/100">
                    <NavLink to={"/product"} > مشاهده  محصولات</NavLink>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="white" />
                        <path d="M15.5 12.75H9.5C9.09 12.75 8.75 12.41 8.75 12C8.75 11.59 9.09 11.25 9.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z" fill="white" />
                        <path d="M11.4975 15.7504C11.3075 15.7504 11.1175 15.6804 10.9675 15.5304L7.9675 12.5304C7.6775 12.2404 7.6775 11.7604 7.9675 11.4704L10.9675 8.47043C11.2575 8.18043 11.7375 8.18043 12.0275 8.47043C12.3175 8.76043 12.3175 9.24043 12.0275 9.53043L9.5575 12.0004L12.0275 14.4704C12.3175 14.7604 12.3175 15.2404 12.0275 15.5304C11.8775 15.6804 11.6875 15.7504 11.4975 15.7504Z" fill="white" />
                    </svg>
                </button>
            </div>
        </div>
    )
}