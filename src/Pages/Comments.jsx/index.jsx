import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";

import { logout, selectCurrentUser } from "../../Redux/slices/authSlice";
import { selectUserComments } from "../../Redux/slices/commentsSlice";

export default function Comments() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const comments = useSelector(selectUserComments) || [];
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    setShowLogoutModal(false);
    navigate("/");
  };

 

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white px-4 py-10" dir="rtl">
      <div className="w-95/100 flex gap-6 mt-10">
        {/* ─── سایدبار پروفایل (سمت راست) ─── */}
        <aside className="lg:col-span-1 w-4/10 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="w-full bg-gradient-to-t from-white to-[#FEEEE8] flex flex-col items-center rounded-2xl p-10 gap-4">
            <div className="relative">
              <img
                src={user?.avatar || "/nike2.png"}
                alt={user?.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md"
              />
              <button className="absolute bottom-0 right-0 bg-white size-8 rounded-full shadow flex items-center justify-center text-black text-[28px]">
                +
              </button>
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
            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex flex-row-reverse items-center justify-end gap-3 px-4 py-3 text-gray-700 hover:bg-white rounded-lg transition"
            >
              <span>خروج</span>
              <LogoutIcon />
            </button>
          </nav>
        </aside>

        {/* ─── بخش اصلی (سمت چپ) ─── */}
        <section className="lg:col-span-3 rounded-2xl pt-5 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl flex flex-row-reverse items-center gap-2 font-bold">
              دیدگاه‌ها و نظرات <div className="h-2 w-2 bg-black rounded-full"></div>
            </h2>
          </div>

          {comments.length === 0 ? (
            <div className="flex flex-col items-center justify-center border border-gray-100 rounded-2xl p-20 bg-white">
              <p className="text-gray-500 text-lg">هنوز دیدگاهی ثبت نکرده‌اید.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-5">
              {comments.map((comment) => (
                <CommentCard
                  key={comment.id}
                  comment={comment}
                  onRemove={() => handleRemove(comment.id)}
                />
              ))}
            </div>
          )}
        </section>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      )}
    </div>
  );
}

/* ─── کارت دیدگاه ─── */
function CommentCard({ comment, onRemove }) {
  const rating = Number(comment.rating || 0);

  return (
    <div className="border border-gray-200 rounded-2xl p-5 bg-white flex gap-5 relative">

      {/* تصویر محصول */}
      <div className="w-40 h-40 shrink-0 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center">
        <img
          src={comment.productImage || "/nike2.png"}
          alt={comment.productTitle || "محصول"}
          className="w-full h-full object-contain"
        />
      </div>

      {/* اطلاعات دیدگاه */}
      <div className="flex-1 flex flex-col gap-3 text-right">
        {/* عنوان محصول */}
        <h3 className="text-[18px] font-bold text-gray-800">
          {comment.productTitle || "محصول بدون نام"}
        </h3>

        {/* رنگ */}
        <div className="flex flex-row-reverse items-center justify-end gap-2">
          <span className="text-[14px] text-gray-700">
            {comment.colorName || "مشکی"}
          </span>
          <span
            className="size-3 rounded-full border border-gray-300"
            style={{ backgroundColor: comment.colorValue || "#000" }}
          ></span>
        </div>

        {/* متن نظر */}
        <p className="text-[14px] text-gray-600 leading-7">
          {comment.text || "—"}
        </p>

        {/* دکمه دیدن محصول */}
        <div className="mt-auto w-full flex flex-row-reverse justify-start mr-25">
          <NavLink
            to={`/Detail/${comment.productId}`}
            className="flex items-center gap-2 text-[#FA541C] text-[14px] border-b border-[#FA541C] pb-1 hover:text-[#d94312] transition"
          >
            
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <rect x="4" y="3" width="16" height="18" rx="2" />
              <path d="M8 8h8M8 12h8M8 16h5" />
            </svg>
            <span className="text-black">دیدن محصول</span>
          </NavLink>
        </div>
      </div>

      {/* ستاره‌های امتیاز (سمت چپ) */}
      <div className="flex flex-col items-start gap-2 pt-1">
        <div className="flex items-center gap-[2px]" dir="ltr">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`text-[18px] leading-none ${
                star <= Math.floor(rating) ? "text-orange-400" : "text-gray-300"
              }`}
            >
              ★
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── کامپوننت‌های کمکی ─── */
function ProfileLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-row-reverse items-center text-[16px] justify-end gap-3 py-3 transition ${
          isActive
            ? "bg-white text-[#194165] font-semibold border-b-2 border-[#194165]"
            : "text-gray-700 border-b border-[#EDEDED] hover:bg-white"
        }`
      }
    >
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
          <button
            onClick={onConfirm}
            className="flex-1 bg-[#FA541C] text-white py-2 rounded-lg"
          >
            خروج
          </button>
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 py-2 rounded-lg"
          >
            انصراف
          </button>
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