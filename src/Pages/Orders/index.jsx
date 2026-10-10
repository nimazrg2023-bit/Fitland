import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { selectCurrentUser, logout } from "../../Redux/slices/authSlice";
import { selectUserOrders } from "../../Redux/slices/ordersSlice";

export default function Orders() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const allOrders = useSelector(selectUserOrders) || [];
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [activeTab, setActiveTab] = useState("current");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = allOrders.filter((order) => {
    if (activeTab === "current") return order.status === "pending" || !order.status;
    if (activeTab === "delivered") return order.status === "delivered";
    if (activeTab === "returned") return order.status === "returned";
    if (activeTab === "canceled") return order.status === "canceled";
    return true;
  });

  const counts = { current: allOrders.filter(o => o.status === "pending" || !o.status).length, delivered: allOrders.filter(o => o.status === "delivered").length, returned: allOrders.filter(o => o.status === "returned").length, canceled: allOrders.filter(o => o.status === "canceled").length };

  const handleLogout = () => { dispatch(logout()); setShowLogoutModal(false); navigate("/"); };
  const handleBackToList = () => { setSelectedOrder(null); };

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

        <section className={`lg:col-span-3 rounded-2xl pt-5 w-full ${selectedOrder ? "border border-gray-500" : ""}`}>
          <div className="flex items-center justify-between">
            {!selectedOrder ?
              <h2 className="text-2xl flex flex-row-reverse items-center justify-between w-19/100 font-bold">تاریخچه سفارشات <div className="h-2 w-2 bg-black rounded-full"></div></h2>
              :
              <h2 className="text-2xl border-b border-gray-500 flex flex-row-reverse items-center justify-end gap-2 mb-2 pb-4 w-full font-bold">
                اطلاعات سفارش
                <button onClick={handleBackToList} className="flex items-center cursor-pointer gap-2 text-gray-500 hover:text-black transition w-fit"><ArrowRightIcon /></button>
              </h2>
            }
          </div>

          {!selectedOrder ? (
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-gray-100">
                <TabButton label="جاری" count={counts.current} isActive={activeTab === "current"} onClick={() => setActiveTab("current")} />
                <TabButton label="تحویل شده" count={counts.delivered} isActive={activeTab === "delivered"} onClick={() => setActiveTab("delivered")} />
                <TabButton label="مرجوع شده" count={counts.returned} isActive={activeTab === "returned"} onClick={() => setActiveTab("returned")} />
                <TabButton label="لغو شده" count={counts.canceled} isActive={activeTab === "canceled"} onClick={() => setActiveTab("canceled")} />
              </div>

              {filteredOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-gray-100 rounded-2xl p-20 bg-white">
                  <p className="text-gray-500 text-lg">در حال حاضر شما سفارشی ندارید.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {filteredOrders.map((order) => (
                    <OrderSummaryCard key={order.id} order={order} onViewDetails={() => setSelectedOrder(order)} />
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              <OrderDetailView order={selectedOrder} />
            </div>
          )}
        </section>
      </div>

      {showLogoutModal && (
        <LogoutModal onCancel={() => setShowLogoutModal(false)} onConfirm={handleLogout} />
      )}
    </div>
  );
}

function TabButton({ label, count, isActive, onClick }) {
  return (
    <button onClick={onClick} className={`flex items-center px-4 py-1 gap-1 rounded-lg text-[18px] font-medium transition ${isActive ? "bg-[#E6F0FF] text-[#194165]" : "text-gray-500 hover:bg-gray-100"}`}>
      <span>{label}</span>
      <span className={`text-[18px] rounded-full ${isActive ? "text-[#194165]" : "text-gray-600"}`}>{count}</span>
    </button>
  );
}

function OrderSummaryCard({ order, onViewDetails }) {
  return (
    <div className="border border-gray-200 rounded-xl flex flex-col gap-4 hover:shadow-sm transition bg-white">
      <div className="flex items-center justify-between bg-[#F1F8F9] p-8 rounded-t-lg text-sm">
        <div className="flex items-center gap-6 text-gray-600">
          <span className="text-gray-800 gap-1 flex font-bold">
            {order.createdAt ? new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(order.createdAt)) : "—"}
          </span>
          <span className="font-bold text-gray-600">کد سفارش: <span className="text-gray-800">{order.id?.toString().slice(0, 6) || "131313170"}</span></span>
          <span className="flex gap-1">مبلغ پرداخت شده: <span className="text-gray-800 gap-1 flex font-bold">{order.total?.toLocaleString() || "1,800,000"}تومان</span></span>
          <span className="flex gap-1">تخفیف: <span className="text-gray-800 gap-1 flex font-bold">{order.discount?.toLocaleString() || "240,000"}تومان</span></span>
        </div>
        <button onClick={onViewDetails} className="text-[#194165] font-semibold hover:underline">مشاهده سفارش</button>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-2 pr-5 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {order.items && order.items.map((item, index) => (
          <div key={index} className="min-w-[120px] h-[120px] bg-gray-50 rounded-lg border border-gray-100 flex items-center justify-center p-2">
            <img src={item.image || "/nike2.png"} className="w-full h-full rounded-xl object-contain" />
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderDetailView({ order }) {
  const user = useSelector(selectCurrentUser);
  const orders = useSelector(selectUserOrders);
  const order2 = orders[0];
  return (
    <div className="p-5 flex flex-col gap-5 bg-white">
      <div className="flex flex-col gap-5 border-gray-200">
        <div className="flex justify-between bg-white items-center">
          <div className="flex w-318/1000 lg:h-50 flex-col p-5 g bg-[#F9F9F9] gap-5 rounded-2xl">
            <div className="flex rounded-2xl items-center gap-5 text-gray-700">
              <div className="flex gap-5 flex-col">
                <div className="flex gap-1">
                  <span className="font-semibold text-[#868686] text-[14px]">کد پیگیری:</span>
                  <span className="text-[14px] font-mono">{order.id?.toString().slice(0, 6) || "۱۳۸۱۱۰۲۲۳۱۳"}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-500 text-xs">
                  <span className="text-[14px]">تاریخ ثبت سفارش:</span>
                  <span className="text-gray-800 gap-1 text-[14px] flex font-bold">
                    {order.createdAt ? new Intl.DateTimeFormat("fa-IR", { year: "numeric", month: "long", day: "numeric" }).format(new Date(order.createdAt)) : "—"}
                  </span>
                </div>
                <div className="flex gap-3">
                  <span className="text-[#868686] text-[14px]">استان / شهر</span>
                  <span className="text-[14px] text-black">خراسان شمالی / بجنورد</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex rounded-2xl lg:h-50 w-318/1000 p-5 g bg-[#F9F9F9] flex-col gap-5">
            <div className="flex items-center gap-2">
              <span className="text-[#868686] text-[14px]">تحویل گیرنده</span>
              <span className="text-[14px]">{user.name}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-[#868686] text-[14px]">شماره تماس</span>
              <span className="text-[14px]">۰۹۹۲۸۳۴۸۸۲۰</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="flex items-center gap-2 text-gray-700">
                <span className="font-semibold text-[14px] text-[#868686]">آدرس:</span>
              </div>
              <p className="text-[14px] text-black leading-5">خراسان شمالی / بجنورد، میدان شهید، بین شهید و شهریور، کوچه عزیز مصر، پلاک ۱۳</p>
            </div>
          </div>

          <div className="flex rounded-2xl lg:h-50 w-318/1000 p-5 g bg-[#F9F9F9] flex-col gap-5">
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span>مبلغ</span>
              <span className="font-bold text-gray-800">{order2.totalPrice?.toLocaleString('fa-IR')} تومان</span>
            </div>
            <div className="flex gap-1">
              <span className="text-[#868686] text-[14px]">سود شما از این خرید</span>
              <span className="text-[14px]">{order2.totalDiscount?.toLocaleString('fa-IR') || "۲۵۰,۰۰۰"}</span>
            </div>
            <div className="flex gap-1">
              <span className="text-[#868686] text-[14px]">هزینه ارسال</span>
              <span className="text-[14px]">۴۵,۰۰۰</span>
            </div>
            <div className="flex gap-1">
              <span className="text-[14px]">پرداخت درب منزل</span>
            </div>
          </div>
        </div>

        <div className="flex rounded-2xl p-5 bg-[#F9F9F9] gap-2">
          <div className="flex w-5/10 flex-col gap-5">
            <div className="flex gap-1 items-center">
              <TruckIcon className="w-5 h-5 text-green-700" />
              <p className="text-[14px] text-green-700">تحویل داده شده</p>
            </div>
            <div className="flex items-center gap-2 text-gray-700">
              <span className="font-semibold text-[#868686] text-[14px]">زمان تحویل:</span>
              <span className="text-[14px] font-semibold">جمعه ۲۳ دی بازه زمانی ۱۰-۲۳</span>
            </div>
          </div>
          <div className="flex flex-col gap-5">
            <div className="">
              <p className="text-[14px] text-black">ارسال عادی</p>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span className="font-semibold text-black text-[14px]">هزینه ارسال:</span>
              <span className="font-bold text-black text-[14px]">۴۰,۰۰۰ تومان</span>
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs">
              <span className="font-bold text-black text-[14px]">کد پیگیری</span>
              <span className="font-bold text-black text-[14px]">{order.id?.toString().slice(0, 6) || "131313170"}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {order.items && order.items.map((item, index) => (
          <OrderProductCard key={item.id || index} item={item} />
        ))}
      </div>
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
    order?.orderCode ||
    order?.id?.toString().slice(0, 8) ||
    "—"
  );
}

function getTrackingCode(order) {
  return (
    order?.trackingCode ||
    order?.trackingNumber ||
    order?.id?.toString().slice(-10) ||
    "—"
  );
}

function userPhoneFallback(order) {
  return order?.phone || order?.userPhone || "—";
}

function getStatusText(status) {
  switch (status) {
    case "delivered":
      return "تحویل داده شده";
    case "returned":
      return "مرجوع شده";
    case "canceled":
      return "لغو شده";
    case "pending":
    default:
      return "در حال ارسال";
  }
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

const TruckIcon = ({ className = "h-5 w-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <rect x="1" y="3" width="15" height="13" />
    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
    <circle cx="5.5" cy="18.5" r="2.5" />
    <circle cx="18.5" cy="18.5" r="2.5" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
    <path d="M19 12H5M12 19l-7-7 7-7" />
  </svg>
);



function OrderProductCard({ item }) {
  const rating = Number(item?.rating || 0);
  const discountAmount = item?.oldPrice && item?.price ? Number(item.oldPrice) - Number(item.price) : 0;

  return (
    <article className="relative min-h-[135px] overflow-hidden rounded-xl border border-gray-200 bg-white p-5">
      <div className="flex items-start gap-4">
        <div className="h-35 w-34 shrink-0 overflow-hidden rounded-lg">
          <img src={item?.image || "/nike2.png"} alt={item?.title || "محصول"} className="h-full w-full" />
        </div>

        <div className="flex min-w-0 flex-1 flex-col items-end gap-2 text-right">
          <div className="flex w-full justify-between">
            <h3 className="text-[18px] text-balck">{item?.title || "محصول بدون نام"}</h3>
            <div className="flex items-center gap-[2px]" dir="ltr">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star} className={`text-[15px] leading-none ${star <= Math.floor(rating) ? "text-orange-400" : "text-gray-300"}`}>★</span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-1 w-full">
            <div className="size-3 rounded-full" style={{ backgroundColor: item.colors[0] }}></div>
            <p className="text-[#404040] text-[16px]">مشکی</p>
          </div>

          {discountAmount > 0 && (
            <div className="flex items-center w-full gap-1 text-xs text-[#E53935]">
              <span>{discountAmount.toLocaleString("fa-IR")}</span>
              <span>تومان تخفیف</span>
            </div>
          )}

          <div className="flex w-full items-center gap-2">
            <span className="text-[16px] text-[#404040]">{Number(item.price).toLocaleString("fa-IR")} تومان</span>
          </div>

          <div className="w-full flex">
            <p className="flex flex-row-reverse"><span>*</span>۱</p>
          </div>
        </div>
      </div>

      <button type="button" className="absolute flex-row-reverse bottom-4 left-5 flex items-center gap-2 text-xs text-[#FA541C] transition hover:text-[#d94312]">
        <span>ثبت دیدگاه</span>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16 22.75H3C2.04 22.75 1.25 21.96 1.25 21V8C1.25 3.58 3.58 1.25 8 1.25H16C20.42 1.25 22.75 3.58 22.75 8V16C22.75 20.42 20.42 22.75 16 22.75ZM8 2.75C4.42 2.75 2.75 4.42 2.75 8V21C2.75 21.14 2.86 21.25 3 21.25H16C19.58 21.25 21.25 19.58 21.25 16V8C21.25 4.42 19.58 2.75 16 2.75H8Z" fill="#FA541C" />
          <path d="M15.5 12.75H8.5C8.09 12.75 7.75 12.41 7.75 12C7.75 11.59 8.09 11.25 8.5 11.25H15.5C15.91 11.25 16.25 11.59 16.25 12C16.25 12.41 15.91 12.75 15.5 12.75Z" fill="#FA541C" />
        </svg>
      </button>
    </article>
  );
}