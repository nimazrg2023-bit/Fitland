import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { selectCurrentUser, logout } from "../../Redux/slices/authSlice";
import { selectUserFavorites } from "../../Redux/slices/favoritesSlice";

export default function Favorites() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const favorites = useSelector(selectUserFavorites) || [];
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => { dispatch(logout()); setShowLogoutModal(false); navigate("/"); };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white px-4 py-10" dir="rtl">
      <div className="w-95/100 flex gap-6 mt-10 flex-col lg:flex-row">

        <aside className="hidden lg:flex lg:col-span-1 w-4/10 rounded-2xl p-6 flex-col items-center gap-4">
          <div className="w-full bg-gradient-to-t from-white to-[#FEEEE8] flex flex-col items-center rounded-2xl p-10 gap-4">
            <div className="relative">
              <img src={user?.avatar || "/nike2.png"} alt={user?.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
              <button className="absolute bottom-0 right-0 bg-white size-8 rounded-full shadow flex items-center justify-center text-black text-[28px]">+</button>
            </div>
            <p className="font-semibold text-gray-800">{user?.name || "کاربر"}</p>
            <p className="text-xs text-gray-500">{user?.email || user?.phone}</p>
          </div>

          <nav className="w-85/100 mt-6 flex flex-col gap-3">
            <ProfileLink to="/usersProfile" label="حساب کاربری" icon={<UserIcon />} />
            <ProfileLink to="/orders" label="تاریخچه سفارشات" icon={<OrderIcon />} />
            <ProfileLink to="/favorites" label="علاقه‌مندی‌ها" icon={<HeartIcon />} />
            <ProfileLink to="/addresses" label="آدرس‌ها" icon={<PinIcon />} />
            <ProfileLink to="/comments" label="دیدگاه‌ها و نظرات" icon={<CommentIcon />} />
            <button onClick={() => setShowLogoutModal(true)} className="flex flex-row-reverse items-center justify-end gap-3 px-4 py-3 text-gray-700 hover:bg-white rounded-lg transition">
              <span>خروج</span>
              <LogoutIcon />
            </button>
          </nav>
        </aside>

        <section className="lg:col-span-3 rounded-2xl pt-5 w-full">
          <div className="lg:hidden flex items-center justify-between mb-6 pb-4 border-b border-gray-200">
            <h2 className="text-xl font-bold">علاقه‌مندی‌ها</h2>
            <button onClick={() => navigate(-1)} className="text-[#032340]">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
            </button>
          </div>

          <div className="hidden lg:flex items-center justify-between">
            <h2 className="text-2xl flex flex-row-reverse items-center justify-between w-15/100 font-bold">علاقه‌مندی‌ها <div className="h-2 w-2 bg-black rounded-full"></div></h2>
          </div>

          {favorites.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-gray-100 rounded-2xl p-20 bg-white mt-6">
              <p className="text-gray-500 text-lg">هنوز محصولی به علاقه‌مندی‌ها اضافه نکرده‌اید.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mt-6">
              {favorites.map((item) => (
                <NavLink to={`/Detail/${item.id}`} key={item.id} className="flex flex-col overflow-hidden bg-[#FAFAFA] rounded-2xl">
                  <div className="relative">
                    <img src={item.image} alt={item.title} loading="lazy" className="w-full h-40 lg:h-72 object-cover" />
                  </div>
                  <div className="w-full flex flex-col items-end text-right gap-2 lg:gap-4 px-3 lg:px-4 py-3 lg:py-4">
                    <p className="w-full text-right text-xs lg:text-sm font-medium truncate">{item.title}</p>
                    {item.sizes?.length > 0 && (<p className="w-full text-right text-[10px] lg:text-xs text-gray-600">از سایز {item.sizes[0]} تا {item.sizes[item.sizes.length - 1]}</p>)}
                    <div className="w-full flex flex-col items-start gap-1">
                      <div className="flex flex-row-reverse gap-1 items-center">
                        {item.oldPrice > item.price && (<p className="text-[10px] lg:text-[11px] text-gray-400 line-through">{item.oldPrice.toLocaleString("fa-IR")} تومان</p>)}
                        <p className="text-xs lg:text-sm font-bold text-gray-800">{item.price.toLocaleString("fa-IR")} تومان</p>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start mt-1">
                      {item.colors?.map((color, index) => (<span key={index} className="size-3 lg:size-4 rounded-full border border-gray-200" style={{ backgroundColor: color, marginRight: index === 0 ? "0" : "-5px" }} />))}
                    </div>
                  </div>
                </NavLink>
              ))}
            </div>
          )}
        </section>
      </div>

      {showLogoutModal && (<LogoutModal onCancel={() => setShowLogoutModal(false)} onConfirm={handleLogout} />)}
    </div>
  );
}

function ProfileLink({ to, label, icon }) {
  return (
    <NavLink to={to} className={({ isActive }) => `flex flex-row-reverse items-center text-[16px] justify-end gap-3 py-3 transition ${isActive ? "bg-white text-[#194165] font-semibold border-b-2 border-[#194165]" : "text-gray-700 border-b border-[#EDEDED] hover:bg-white"}`}>
      <span>{label}</span>
      {icon}
    </NavLink>
  );
}

function LogoutModal({ onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full p-8 relative" dir="rtl">
        <button onClick={onCancel} className="absolute top-4 left-4 size-8 rounded-lg border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-100">✕</button>
        <h3 className="text-center text-xl font-bold text-gray-800 mb-6">می‌خواهید از حساب کاربری خود خارج شوید؟</h3>
        <p className="text-center text-sm text-gray-600 leading-7 mb-8">با خروج از حساب کاربری، به اطلاعات و سبد خرید فعالیتی نخواهید داشت و برای دسترسی دوباره می‌توانید دوباره وارد حسابیتان شوید.</p>
        <div className="flex flex-row-reverse items-center justify-center gap-4">
          <button onClick={onConfirm} className="bg-[#032340] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#0a3a63] transition">خروج از حساب</button>
          <button onClick={onCancel} className="border border-[#032340] text-[#032340] px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition">انصراف</button>
        </div>
      </div>
    </div>
  );
}

const UserIcon = ({ className = "h-[21px] w-[21px]" }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" /></svg>);
const OrderIcon = ({ className = "h-[21px] w-[21px]" }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="3" width="16" height="18" rx="2" /><path d="M8 8h8M8 12h8M8 16h5" /></svg>);
const HeartIcon = ({ className = "h-[21px] w-[21px]" }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21c-4.5-3-8-6.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-3.5 8-8 11z" /></svg>);
const PinIcon = ({ className = "h-[21px] w-[21px]" }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" /><circle cx="12" cy="9" r="2.5" /></svg>);
const CommentIcon = ({ className = "h-[21px] w-[21px]" }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M4 5h16v11H8l-4 4V5z" /></svg>);
const LogoutIcon = ({ className = "h-[21px] w-[21px]" }) => (<svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M15 12H4M9 7l-5 5 5 5M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" /></svg>);