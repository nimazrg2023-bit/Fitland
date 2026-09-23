import { NavLink } from "react-router";

export default function Part9() {
    return(
        <NavLink to={"/product"} className="w-full flex justify-center items-center mt-20">
            <img className="w-full" src="/banner3.png" alt="" />
        </NavLink>
    )
}