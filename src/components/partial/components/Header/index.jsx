import { useState } from "react";
import { useLocation } from "react-router";

export default function Header() {
    const [Home , setHome] = useState("unHome")
    const location = useLocation();

    const isHome = location.pathname === "/";
    if (isHome) {
        setHome("Home")
    }else{
        setHome("unHome")
    }
    return (
        <div>
            <nav>

            </nav>
        </div>
    )
}