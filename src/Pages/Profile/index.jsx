import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { selectCurrentUser, logout } from "../../Redux/slices/authSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => { dispatch(logout()); setShowLogoutModal(false); navigate("/"); };

  const links = [
    { to: "/usersProfile", label: "حساب کاربری", icon: <UserIcon /> },
    { to: "/orders", label: "تاریخچه سفارشات", icon: <OrderIcon /> },
    { to: "/favorites", label: "علاقه‌مندی‌ها", icon: <HeartIcon /> },
    { to: "/addresses", label: "آدرس‌ها", icon: <PinIcon /> },
    { to: "/comments", label: "دیدگاه‌ها و نظرات", icon: <CommentIcon /> },
  ];

  return (
    <>
      <div className="lg:hidden  bg-white" dir="ltr">
        <div className="w-full px-4 py-6">
          <div className="flex flex-row-reverse items-center justify-between pb-4 border-b border-gray-200">
            <div className="flex flex-row-reverse items-center gap-3">
              <img src={user?.avatar || "/nike2.png"} alt={user?.name} className="w-14 h-14 rounded-full object-cover" />
              <div className="flex flex-col items-end gap-1">
                <p className="font-semibold text-gray-800 text-sm">{user?.name || "کاربر"}</p>
                <p className="text-xs text-gray-500">{user?.email || user?.phone}</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-2">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => `flex flex-row items-center justify-end gap-2 py-5 border-b border-gray-100 ${isActive ? "text-[#FA541C]" : "text-gray-800"}`}>
                <span className="text-[15px]">{link.label}</span>
                <span className="text-gray-500">{link.icon}</span>
              </NavLink>
            ))}

            <button onClick={() => setShowLogoutModal(true)} className="flex flex-row items-center justify-end gap-2 py-5 border-b border-gray-100 text-gray-800">
              <span className="text-[15px]">خروج</span>
              <span className="text-gray-500"><LogoutIcon /></span>
            </button>
          </div>
        </div>

        {showLogoutModal && (<LogoutModal onCancel={() => setShowLogoutModal(false)} onConfirm={handleLogout} />)}
      </div>
    </>
  );
}

function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-6 relative" dir="rtl">
        <button onClick={onCancel} className="absolute top-4 left-4 size-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100">✕</button>
        <h3 className="text-center text-lg font-bold text-gray-800 mb-4">می‌خواهید از حساب کاربری خود خارج شوید؟</h3>
        <div className="flex flex-row-reverse items-center justify-center gap-3">
          <button onClick={onConfirm} className="bg-[#032340] text-white px-6 py-2 rounded-lg font-semibold">خروج از حساب</button>
          <button onClick={onCancel} className="border border-[#032340] text-[#032340] px-6 py-2 rounded-lg font-semibold">انصراف</button>
        </div>
      </div>
    </div>
  );
}

const UserIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></svg>);
const OrderIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>);
const HeartIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21c-4.5-3-8-6.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-3.5 8-8 11z" /></svg>);
const PinIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>);
const CommentIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v11H8l-4 4V5z" /></svg>);
const LogoutIcon = () => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 12H4M9 7l-5 5 5 5M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" /></svg>);