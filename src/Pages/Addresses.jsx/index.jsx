import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { removeAddress, selectUserAddresses } from "../../Redux/slices/addressesSlice";
import { logout, selectCurrentUser } from "../../Redux/slices/authSlice";
import AddressFormModal from "./components/AddressFormModal";

export default function Addresses() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const addresses = useSelector(selectUserAddresses) || [];
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  const handleLogout = () => { dispatch(logout()); setShowLogoutModal(false); navigate("/"); };

  const handleRemove = (addressId) => { if (!user) return; dispatch(removeAddress({ userId: user.id, addressId })); };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white px-4 py-10" dir="rtl">
      <div className="w-95/100 flex gap-6 mt-10">
        <aside className="lg:col-span-1 w-4/10 rounded-2xl p-6 flex flex-col items-center gap-4">
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
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl flex flex-row-reverse items-center gap-2 font-bold">آدرس ها <div className="h-2 w-2 bg-black rounded-full"></div></h2>
            <button onClick={() => setShowAddressModal(true)} className="flex items-center flex-row-reverse gap-2 border border-[#032340] text-[#032340] px-4 py-2 rounded-lg hover:bg-[#032340] hover:text-white transition">
              <span>ثبت آدرس جدید</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" />
                <circle cx="12" cy="9" r="2.5" />
              </svg>
            </button>
          </div>

          {addresses.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-gray-100 rounded-2xl p-20 bg-white">
              <p className="text-gray-500 text-lg">هنوز آدرسی ثبت نکرده‌اید.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {addresses.map((address, index) => (
                <div key={address.id} className="border border-gray-200 rounded-2xl p-6 flex flex-row-reverse gap-6 relative">
                  <button onClick={() => handleRemove(address.id)} className="size-7 flex items-center justify-center rounded-md border text-gray-500 hover:bg-red-50 hover:text-red-500">✕</button>

                  <div className="flex-1 flex flex-col gap-5">
                    <h3 className="text-xl w- font-bold text-right">آدرس {index + 1}</h3>

                    <div className="flex w-full flex-col gap-6">
                      <div className="flex items-start gap-2 justify-start">
                        <p className="text-right text-gray-700">{address.fullAddress}</p>
                        <PinIcon className="w-5 h-5 text-[#FA541C] mt-1" />
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <p className="text-gray-700">{address.province} - {address.city}</p>
                        <PinIcon className="w-5 h-5 text-[#FA541C]" />
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <p className="text-gray-700">{address.postalCode}</p>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FA541C" strokeWidth="1.8">
                          <rect x="2" y="4" width="20" height="16" rx="2" />
                          <path d="m2 7 10 6 10-6" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <p className="text-gray-700">{address.receiverPhone}</p>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FA541C" strokeWidth="1.8">
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-2 justify-start">
                        <p className="text-gray-700">{address.receiverName}</p>
                        <UserIcon className="w-5 h-5 text-[#FA541C]" />
                      </div>
                    </div>
                  </div>

                  <div className="w-90 h-65 rounded-xl overflow-hidden bg-gray-100">
                    {address.coords ? (
                      <iframe
                        title="map"
                        width="100%"
                        height="100%"
                        frameBorder="0"
                        src={`https://www.openstreetmap.org/export/embed.html?bbox=${address.coords.lng - 0.01}%2C${address.coords.lat - 0.01}%2C${address.coords.lng + 0.01}%2C${address.coords.lat + 0.01}&layer=mapnik&marker=${address.coords.lat}%2C${address.coords.lng}`}
                      ></iframe>
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400 text-sm">موقعیت ثبت نشده</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {showAddressModal && <AddressFormModal onClose={() => setShowAddressModal(false)} />}

      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} onConfirm={handleLogout} />
      )}
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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl p-6 w-80 flex flex-col items-center gap-4">
        <p className="text-lg font-semibold">از حساب خود خارج می‌شوید؟</p>
        <div className="flex gap-4 w-full">
          <button onClick={onConfirm} className="flex-1 bg-[#FA541C] text-white py-2 rounded-lg">خروج</button>
          <button onClick={onCancel} className="flex-1 bg-gray-200 py-2 rounded-lg">انصراف</button>
        </div>
      </div>
    </div>
  );
}

const UserIcon = ({ className = "h-[21px] w-[21px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);

const OrderIcon = ({ className = "h-[21px] w-[21px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

const HeartIcon = ({ className = "h-[21px] w-[21px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21c-4.5-3-8-6.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-3.5 8-8 11z" />
  </svg>
);

const PinIcon = ({ className = "h-[21px] w-[21px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const CommentIcon = ({ className = "h-[21px] w-[21px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 5h16v11H8l-4 4V5z" />
  </svg>
);

const LogoutIcon = ({ className = "h-[21px] w-[21px]" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M15 12H4M9 7l-5 5 5 5M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
  </svg>
);