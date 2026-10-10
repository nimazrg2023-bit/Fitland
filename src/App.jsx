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
import Orders from "./Pages/Orders";
import Favorites from "./Pages/Favorites.jsx";
import Addresses from "./Pages/Addresses.jsx/index.jsx";
import Comments from "./Pages/Comments.jsx/index.jsx";

export default function App() {
  return (

    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Detail/:id" element={<Detail />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Verify" element={<Verify />} />
        <Route path="/Product" element={<Product />} />
        <Route path="/SabadKharid" element={<SabadKharid />} />
        <Route path="/usersProfile" element={<UsersProfile />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/addresses" element={<Addresses />} />
        <Route path="/comments" element={<Comments/>} />

      </Routes>
    </Layout>

  )
}



// این فایل رو تمام اتریبیوت هاش رو بیار تو یک خط و تمام کامنت ها رو پاک کن