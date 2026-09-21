import { useLocation } from "react-router";
import Footer from "./components/footer";
import Header from "./components/Header";

export default function Layout({ children }) {
    const location = useLocation();

    const isLogin = location.pathname === "/login";
    if (isLogin) {
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