import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { selectCurrentUser, logout, updateProfile } from "../../Redux/slices/authSlice";

export default function UserProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);

  const handleLogout = () => { dispatch(logout()); setShowLogoutModal(false); navigate("/"); };

  const resizeImage = (file, maxSize = 300) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement("canvas");
          let { width, height } = img;
          if (width > height) { if (width > maxSize) { height = (height * maxSize) / width; width = maxSize; } } else { if (height > maxSize) { width = (width * maxSize) / height; height = maxSize; } }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, width, height);
          resolve(canvas.toDataURL("image/jpeg", 0.8));
        };
        img.src = e.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handleAvatarClick = () => { fileInputRef.current?.click(); };

  const handleAvatarChange = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) { alert("لطفاً یک فایل تصویری انتخاب کنید"); event.target.value = ""; return; }
    if (file.size > 5 * 1024 * 1024) { alert("حجم تصویر نباید بیشتر از ۵ مگابایت باشد"); event.target.value = ""; return; }
    const resized = await resizeImage(file, 300);
    dispatch(updateProfile({ avatar: resized }));
    event.target.value = "";
  };

  const formik = useFormik({
    initialValues: { name: user?.name || "", phone: user?.phone || "", email: user?.email || "", nationalCode: user?.nationalCode || "", gender: user?.gender || "" },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("نام و نام خانوادگی الزامی است"),
      phone: Yup.string().required("شماره موبایل الزامی است").test("phone", "شماره موبایل معتبر نیست", (value) => { if (!value) return false; return /^09\d{9}$/.test(value); }),
      email: Yup.string().required("ایمیل الزامی است").email("فرمت ایمیل معتبر نیست"),
      nationalCode: Yup.string().required("کد ملی الزامی است").matches(/^\d{10}$/, "کد ملی باید ۱۰ رقم باشد"),
      gender: Yup.string().required("جنسیت الزامی است"),
    }),
    onSubmit: (values) => { dispatch(updateProfile(values)); setIsEditing(false); },
  });

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-white px-4 py-10" dir="rtl">
      <div className="w-95/100 flex gap-6 mt-10">

        <aside className="lg:col-span-1 w-4/10 rounded-2xl p-6 flex flex-col items-center gap-4">
          <div className="w-full bg-gradient-to-t from-white to-[#FEEEE8] flex flex-col items-center rounded-2xl p-10 gap-4">
            <div className="relative">
              <img src={user?.avatar || "/nike2.png"} alt={user?.name} className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
              <button onClick={handleAvatarClick} className="absolute bottom-0 right-0 bg-white size-8 rounded-full shadow flex items-center justify-center text-black text-[28px]">+</button>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
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

        <section className="lg:col-span-3 w-full">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl flex flex-row-reverse items-center justify-between w-15/100 font-bold">حساب کاربری <div className="h-2 w-2 bg-black rounded-full"></div></h2>
          </div>

          {!isEditing ? (
            <div className="gap-6 flex flex-row-reverse w-full justify-between items-start border border-gray-100 rounded-2xl p-8">
              {!isEditing && (
                <button onClick={() => setIsEditing(true)} className="text-[#FA541C] hover:bg-orange-50 p-2 rounded-full transition" title="ویرایش اطلاعات"><EditIcon /></button>
              )}
              <div className="flex justify-between w-6/10">
                <div className="flex gap-8 flex-col">
                  <InfoRow className="w-full text-right" label="نام و نام خانوادگی" value={user?.name || "—"} />
                  <InfoRow className="w-full text-right" label="کد ملی" value={user?.nationalCode || "—"} />
                  <InfoRow className="w-full text-right" label="ایمیل" value={user?.email || "—"} />
                </div>
                <div className="flex gap-8 flex-col">
                  <InfoRow className="w-full text-right" label="شماره تماس" value={user?.phone || "—"} />
                  <InfoRow className="w-full text-right" label="جنسیت" value={user?.gender || "—"} />
                </div>
              </div>
            </div>
          ) : (
            <form onSubmit={formik.handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6 border border-gray-100 rounded-2xl p-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">نام و نام خانوادگی</label>
                <input type="text" name="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`border p-2 rounded-lg outline-none ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300 focus:border-[#FA541C]'}`} />
                {formik.touched.name && formik.errors.name && (<span className="text-red-500 text-xs">{formik.errors.name}</span>)}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">شماره تماس</label>
                <input type="text" name="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`border p-2 rounded-lg outline-none ${formik.touched.phone && formik.errors.phone ? 'border-red-500' : 'border-gray-300 focus:border-[#FA541C]'}`} />
                {formik.touched.phone && formik.errors.phone && (<span className="text-red-500 text-xs">{formik.errors.phone}</span>)}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">کد ملی</label>
                <input type="text" name="nationalCode" value={formik.values.nationalCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`border p-2 rounded-lg outline-none ${formik.touched.nationalCode && formik.errors.nationalCode ? 'border-red-500' : 'border-gray-300 focus:border-[#FA541C]'}`} />
                {formik.touched.nationalCode && formik.errors.nationalCode && (<span className="text-red-500 text-xs">{formik.errors.nationalCode}</span>)}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm text-gray-500">جنسیت</label>
                <select name="gender" value={formik.values.gender} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`border p-2 rounded-lg outline-none bg-white ${formik.touched.gender && formik.errors.gender ? 'border-red-500' : 'border-gray-300 focus:border-[#FA541C]'}`}>
                  <option value="">انتخاب کنید</option>
                  <option value="مرد">مرد</option>
                  <option value="زن">زن</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (<span className="text-red-500 text-xs">{formik.errors.gender}</span>)}
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm text-gray-500">ایمیل</label>
                <input type="email" name="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`border p-2 rounded-lg outline-none ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300 focus:border-[#FA541C]'}`} dir="ltr" />
                {formik.touched.email && formik.errors.email && (<span className="text-red-500 text-xs">{formik.errors.email}</span>)}
              </div>

              <div className="md:col-span-2 flex gap-4 mt-4">
                <button type="submit" className="bg-[#FA541C] text-white px-6 py-2 rounded-lg font-semibold hover:bg-orange-600 transition">ثبت تغییرات</button>
                <button type="button" onClick={() => setIsEditing(false)} className="border border-gray-300 text-gray-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-50 transition">انصراف</button>
              </div>
            </form>
          )}
        </section>
      </div>

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

function InfoRow({ label, value }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[22px] text-gray-500">{label}</span>
      <span className="text-[16px] font-medium text-gray-800">{value}</span>
    </div>
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

const UserIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" />
  </svg>
);

const OrderIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="4" y="3" width="16" height="18" rx="2" />
    <path d="M8 8h8M8 12h8M8 16h5" />
  </svg>
);

const HeartIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21c-4.5-3-8-6.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 4.5-3.5 8-8 11z" />
  </svg>
);

const PinIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M12 21s-7-6-7-12a7 7 0 0 1 14 0c0 6-7 12-7 12z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);

const CommentIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M4 5h16v11H8l-4 4V5z" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M15 12H4M9 7l-5 5 5 5M14 4h5a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-5" />
  </svg>
);

const EditIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M16 3l5 5-11 11H5v-5L16 3z" />
  </svg>
);