import { useLocation } from "react-router";
import Footer from "./components/footer";
import Header from "./components/Header";

export default function Layout({ children }) {
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    const isRegister = location.pathname === "/Register"
    const isVerify = location.pathname === "/Verify"
    if (isLogin || isRegister || isVerify) {
        return children
    }
    return (
        <>
            <Header />

            <main>

                {children}

            </main>

            <Footer />
        </>
    )
}