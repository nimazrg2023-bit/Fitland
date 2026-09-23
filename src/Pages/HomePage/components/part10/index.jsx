import { NavLink } from "react-router";
import { news } from "../../../../core/constant";

export default function Part10() {
    return (
        <div className="flex w-full justify-center items-center mt-10 gap-10 flex-col">
            <p className="text-[30px] font-semibold text-[#021526]">جدیدترین ها در اخبار ورزش</p>
            <div className="flex justify-center gap-10 items-center  w-90/100">
                {news.map((item, index) => (
                    <div key={index} className={` max-sm:${index === 0 ? "flex" : "hidden"} lg:w-6/10 w-9/10 flex flex-col rounded-2xl lg:shadow-2xl items-end gap-3`}>
                        <img className="h-85 rounded-t-2xl w-full" src={item.image} alt="" />
                        <div className="flex flex-col items-end gap-5 p-5">
                            <p className="lg:text-[22px] text-[16px] font-bold text-[#01070D] text-right">{item.title}</p>
                            <p className="lg:text-[16px] text-[12px] font-bold text-[#01070D] text-right">{item.name}</p>
                            <button className="text-white bg-[#FA541C] p-3 rounded-md flex gap-1 justify-center items-center">
                                <NavLink className="text-[14px] font-bold">مشاهده خبر</NavLink>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="white" />
                                    <path d="M15.5 12.75H9.5C9.09 12.75 8.75 12.41 8.75 12C8.75 11.59 9.09 11.25 9.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z" fill="white" />
                                    <path d="M11.4975 15.7514C11.3075 15.7514 11.1175 15.6814 10.9675 15.5314L7.9675 12.5314C7.6775 12.2414 7.6775 11.7614 7.9675 11.4714L10.9675 8.47141C11.2575 8.18141 11.7375 8.18141 12.0275 8.47141C12.3175 8.76141 12.3175 9.24141 12.0275 9.53141L9.5575 12.0014L12.0275 14.4714C12.3175 14.7614 12.3175 15.2414 12.0275 15.5314C11.8775 15.6814 11.6875 15.7514 11.4975 15.7514Z" fill="white" />
                                </svg>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}