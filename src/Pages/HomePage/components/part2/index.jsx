import { NavLink } from "react-router";

export default function Part2() {
    return (
        <div className="w-8/10 lg:w-92/100 lg:items-end flex flex-row-reverse gap-5 mt-5 justify-around items-center ">
            <div className="w-48/100 lg:w-40/100 relative rounded-2xl overflow-hidden">


                <img className="w-full rounded-2xl lg:blur-none blur-sm" src="/Part2home2.png" alt="" />


                <div className="absolute z-20 inset-0 rounded-2xl lg:bg-black/0 bg-black/60">


                    <div className="flex lg:hidden flex-col gap-5 w-full justify-center items-center h-full   p-5 text-white">
                        <p className="text-[14px] text-center">فقط با یک کلیک وارد دنیای محصولات جدید شوید</p>

                        <button className="border-2 relative top-5 justify-center items-center p-2 border-white flex gap-2 rounded-2xl">
                            <NavLink to={"/product"} className="text-[10px] font-medium">جدیدترین محصولات</NavLink>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.37 22.75H4.62C2.32 22.75 1.25 21.68 1.25 19.38V14.63C1.25 12.32 2.32 11.25 4.62 11.25H7C7.41 11.25 7.75 11.59 7.75 12V14.37C7.75 15.83 8.17 16.25 9.62 16.25H12C12.41 16.25 12.75 16.59 12.75 17V19.38C12.75 21.68 11.68 22.75 9.37 22.75ZM4.62 12.75C3.17 12.75 2.75 13.17 2.75 14.63V19.38C2.75 20.83 3.17 21.25 4.62 21.25H9.37C10.83 21.25 11.25 20.83 11.25 19.38V17.75H9.62C7.32 17.75 6.25 16.68 6.25 14.37V12.75H4.62Z" fill="white" />
                                <path d="M14.37 17.75H9.62C7.32 17.75 6.25 16.68 6.25 14.37V9.62C6.25 7.32 7.32 6.25 9.62 6.25H12C12.41 6.25 12.75 6.59 12.75 7V9.37C12.75 10.83 13.17 11.25 14.62 11.25H17C17.41 11.25 17.75 11.59 17.75 12V14.37C17.75 16.68 16.68 17.75 14.37 17.75ZM9.62 7.75C8.17 7.75 7.75 8.17 7.75 9.62V14.37C7.75 15.83 8.17 16.25 9.62 16.25H14.37C15.83 16.25 16.25 15.83 16.25 14.37V12.75H14.62C12.32 12.75 11.25 11.68 11.25 9.37V7.75H9.62Z" fill="white" />
                                <path d="M19.37 12.75H14.62C12.32 12.75 11.25 11.68 11.25 9.37V4.62C11.25 2.32 12.32 1.25 14.62 1.25H19.37C21.68 1.25 22.75 2.32 22.75 4.62V9.37C22.75 11.68 21.68 12.75 19.37 12.75ZM14.62 2.75C13.17 2.75 12.75 3.17 12.75 4.62V9.37C12.75 10.83 13.17 11.25 14.62 11.25H19.37C20.83 11.25 21.25 10.83 21.25 9.37V4.62C21.25 3.17 20.83 2.75 19.37 2.75H14.62Z" fill="white" />
                            </svg>

                        </button>
                    </div>

                </div>


                <div className="z-10 w-full h-4/10 gap-2 flex lg:justify-center lg:pt-10  flex-col justify-end p-3 items-end absolute bottom-0 text-white bg-[#021526] rounded-2xl lg:blur-none blur-sm" style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)" }}>
                    <p className="text-[10px] font-medium lg:font-semibold lg:text-[18px]">
                        جدید ترین تخفیفات فصل برند نایک
                    </p>

                    <p className="text-[10px] font-medium   lg:font-semibold lg:text-[18px] flex gap-2">
                        تخفیف روی تمام محصولات
                        <span className="text-[#FC9877]">٪ ۵۰</span>
                    </p>
                </div>

            </div>
            <div className="w-48/100  lg:w-40/100 relative rounded-2xl">
                <img className="rounded-2xl" src="/Part2Home1.png" alt="" />
                <div className="z-10 w-full  h-4/10 gap-2 flex lg:pt-10 flex-col lg:justify-center justify-end p-3 items-end absolute bottom-0 text-white bg-[#021526] rounded-2xl" style={{ clipPath: "polygon(0 40%, 100% 0, 100% 100%, 0 100%)" }}>
                    <p className="text-[10px] lg:font-semibold lg:text-[18px]  font-medium">جدید ترین تخفیفات فصل برند پوما</p>
                    <p className="text-[10px] lg:font-semibold lg:text-[18px]  font-medium flex gap-2">تخفیف روی تمام محصولات <span className="text-[#FC9877]">٪ ۵۰ </span></p>
                </div>
            </div>

            <div className="flex-col w-38/100 gap-10 hidden lg:flex justify-end">
                <p className="text-[#032340] text-[24px] font-semibold text-right">جدید ترین محصولات</p>
                <p className="text-[#606060] text-right text-[16px] font-semibold">جدید ترین محصولات با ارسال رایگان تهیه
                    کنید و در سریع ترین زمان درب منزل تحویل بگیرید
                </p>
                <button className="bg-[#FA541C] rounded-md flex justify-center items-center gap-2 p-3 ">
                    <NavLink to={"/product"} className="text-[16px] font-bold text-white">مشاهده همه محصولات</NavLink>
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