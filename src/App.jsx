import { Route, Routes } from "react-router";
import Layout from "./components/partial";
import Home from "./Pages/HomePage";
import Detail from "./Pages/Detail";
import Login from "./Pages/LoginPages/Login";
import Register from "./Pages/LoginPages/Register";
import Verify from "./Pages/LoginPages/Verify";
import Product from "./Pages/Product";
import SabadKharid from "./Pages/SabadKharid";
import UsersProfile from "./Pages/usersProfile";

export default function App() {
  return (

    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detail" element={<Detail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/SabadKharid" element={<SabadKharid />} />
        <Route path="/usersProfile" element={<UsersProfile />} />
      </Routes>
    </Layout>

  )
}