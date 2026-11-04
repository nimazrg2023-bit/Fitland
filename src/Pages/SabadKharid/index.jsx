import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { selectUserCart, selectCartTotals, removeFromCart, updateQuantity } from "../../Redux/slices/cartSlice";
import { useState } from "react";
import { selectCurrentUser } from "../../Redux/slices/authSlice";
import CheckoutStepper from "./components/step";

export default function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const cart = useSelector(selectUserCart);
  const totals = useSelector(selectCartTotals);
  const [discountCode, setDiscountCode] = useState("");

  const handleRemove = (item) => { dispatch(removeFromCart({ userId: user.id, itemId: item.id, size: item.size, color: item.color })); };
  const handleQuantity = (item, qty) => { dispatch(updateQuantity({ userId: user.id, itemId: item.id, size: item.size, color: item.color, quantity: qty })); };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="w-95/100  max-w-7xl mx-auto py-10">
        {cart.length === 0 ? (
          <div className="border border-gray-200 rounded-2xl p-20 text-center">
            <p className="text-gray-500">سبد خرید شما خالی است.</p>
          </div>
        ) : (
          <div className="flex max-sm:items-center lg:hidden gap-6 flex-col lg:flex-row">
            <div className="flex items-center justify-end mb-8">
              <CheckoutStepper activeStep={0} />
            </div>
            <div className="flex-1 flex flex-col gap-4">
              {cart.map((item, index) => (
                <div key={`${item.id}-${item.size}-${item.color}-${index}`} className="border max-sm:border-none border-gray-200 rounded-2xl flex items-center max-sm:items-start gap-4">
                  <div className="w-3/10 max-sm:w-25/100 gap-2 flex flex-col bg-gray-50 rounded-xl  items-start justify-center">
                    <img src={item.image || "/nike2.png"} alt={item.title} className="w-full max-sm:rounded-md rounded-r-xl object-contain" />
                    <div className="flex lg:hidden items-center gap-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7188 22.75H7.21875C3.06875 22.75 1.21875 20.9 1.21875 16.75V12.25C1.21875 8.1 3.06875 6.25 7.21875 6.25H11.7188C15.8687 6.25 17.7188 8.1 17.7188 12.25V16.75C17.7188 20.9 15.8687 22.75 11.7188 22.75ZM7.21875 7.75C3.89875 7.75 2.71875 8.93 2.71875 12.25V16.75C2.71875 20.07 3.89875 21.25 7.21875 21.25H11.7188C15.0387 21.25 16.2187 20.07 16.2187 16.75V12.25C16.2187 8.93 15.0387 7.75 11.7188 7.75H7.21875Z" fill="#404040" />
                        <path d="M18.1188 13.75H16.9687C16.5587 13.75 16.2187 13.41 16.2187 13V12.25C16.2187 8.93 15.0387 7.75 11.7188 7.75H10.9688C10.5588 7.75 10.2188 7.41 10.2188 7V5.85C10.2188 2.67 11.6387 1.25 14.8187 1.25H18.1188C21.2988 1.25 22.7187 2.67 22.7187 5.85V9.15C22.7187 12.33 21.2988 13.75 18.1188 13.75ZM17.7187 12.25H18.1188C20.4688 12.25 21.2187 11.5 21.2187 9.15V5.85C21.2187 3.5 20.4688 2.75 18.1188 2.75H14.8187C12.4687 2.75 11.7188 3.5 11.7188 5.85V6.25C15.8688 6.25 17.7187 8.1 17.7187 12.25Z" fill="#404040" />
                      </svg>
                      <span className="text-xs text-gray-500">سایز {item.size}</span>
                    </div>
                    <div className="flex text-[12px] text-[#404040] items-center gap-1">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8 22.7504C4.28 22.7504 1.25 19.7204 1.25 16.0004C1.25 12.9604 3.29 10.2804 6.22 9.49038C6.59 9.39038 6.97 9.58038 7.11 9.94038C7.72 11.4704 9.02 12.6404 10.61 13.0704C11.49 13.3104 12.51 13.3104 13.37 13.0704C13.74 12.9704 14.13 13.1604 14.27 13.5204C14.58 14.3104 14.74 15.1504 14.74 16.0104C14.74 17.9304 13.92 19.7604 12.49 21.0304C11.27 22.1304 9.67 22.7504 8 22.7504ZM6.02 11.1304C4.07 11.9304 2.75 13.8504 2.75 16.0004C2.75 18.8904 5.11 21.2504 8 21.2504C9.3 21.2504 10.54 20.7704 11.5 19.9004C12.62 18.9104 13.25 17.4904 13.25 16.0004C13.25 15.5404 13.19 15.1004 13.08 14.6704C12.14 14.8204 11.12 14.7704 10.22 14.5204C8.41 14.0204 6.89 12.7804 6.02 11.1304Z" fill="#404040" />
                        <path d="M12 14.75C11.38 14.75 10.78 14.67 10.22 14.51C8.19 13.95 6.5 12.45 5.72 10.48C5.41 9.7 5.25 8.86 5.25 8C5.25 4.28 8.28 1.25 12 1.25C15.72 1.25 18.75 4.28 18.75 8C18.75 8.86 18.59 9.7 18.28 10.49C17.5 12.45 15.82 13.96 13.78 14.52C13.22 14.67 12.62 14.75 12 14.75ZM12 2.75C9.11 2.75 6.75 5.11 6.75 8C6.75 8.67 6.87 9.32 7.12 9.93C7.73 11.46 9.03 12.63 10.62 13.06C11.5 13.3 12.52 13.3 13.38 13.06C14.97 12.63 16.28 11.45 16.88 9.93C17.12 9.32 17.25 8.67 17.25 8C17.25 5.11 14.89 2.75 12 2.75Z" fill="#404040" />
                        <path d="M16 22.7497C14.33 22.7497 12.73 22.1297 11.5 21.0197C11.34 20.8797 11.25 20.6697 11.25 20.4597C11.25 20.2497 11.34 20.0397 11.5 19.8997C12.61 18.9197 13.25 17.4997 13.25 15.9997C13.25 15.3297 13.13 14.6797 12.88 14.0697C12.8 13.8697 12.81 13.6497 12.91 13.4597C13.01 13.2697 13.18 13.1297 13.38 13.0697C14.97 12.6397 16.27 11.4697 16.88 9.93973C17.02 9.57973 17.41 9.39973 17.77 9.48973C20.7 10.2897 22.74 12.9597 22.74 15.9997C22.75 19.7197 19.72 22.7497 16 22.7497ZM13.12 20.3897C13.97 20.9497 14.96 21.2497 16 21.2497C18.89 21.2497 21.25 18.8897 21.25 15.9997C21.25 13.8497 19.93 11.9297 17.98 11.1297C17.24 12.5397 16 13.6597 14.52 14.2597C14.67 14.8197 14.75 15.4097 14.75 15.9997C14.75 17.6197 14.17 19.1797 13.12 20.3897Z" fill="#404040" />
                      </svg>
                      <div className="size-3 rounded-full border" style={{ backgroundColor: item.color }}></div>
                      مشکی
                    </div>

                  </div>
                  <div className="flex-1 px-5 flex flex-col gap-5">
                    <div className="flex  w-full justify-between">
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <button onClick={() => handleRemove(item)} className="size-4 text-[10px] flex items-start pt-[0.5px] justify-center rounded-md border-2 font-bold text-[#032340] hover:bg-red-50 hover:text-red-500">✕</button>
                    </div>
                    <p className="text-sm text-gray-500">{item.category}</p>
                    <div className="flex flex-col items-start max-sm:items-end gap-3">
                      <span className="font-bold text-lg">{item.price.toLocaleString("fa-IR")} تومان</span>
                      {item.oldPrice > item.price && (<span className="text-sm max-sm:hidden text-gray-400 line-through">{item.oldPrice.toLocaleString("fa-IR")}</span>)}
                    </div>
                    <div className="lg:flex hidden items-center gap-1">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M11.7188 22.75H7.21875C3.06875 22.75 1.21875 20.9 1.21875 16.75V12.25C1.21875 8.1 3.06875 6.25 7.21875 6.25H11.7188C15.8687 6.25 17.7188 8.1 17.7188 12.25V16.75C17.7188 20.9 15.8687 22.75 11.7188 22.75ZM7.21875 7.75C3.89875 7.75 2.71875 8.93 2.71875 12.25V16.75C2.71875 20.07 3.89875 21.25 7.21875 21.25H11.7188C15.0387 21.25 16.2187 20.07 16.2187 16.75V12.25C16.2187 8.93 15.0387 7.75 11.7188 7.75H7.21875Z" fill="#404040" />
                        <path d="M18.1188 13.75H16.9687C16.5587 13.75 16.2187 13.41 16.2187 13V12.25C16.2187 8.93 15.0387 7.75 11.7188 7.75H10.9688C10.5588 7.75 10.2188 7.41 10.2188 7V5.85C10.2188 2.67 11.6387 1.25 14.8187 1.25H18.1188C21.2988 1.25 22.7187 2.67 22.7187 5.85V9.15C22.7187 12.33 21.2988 13.75 18.1188 13.75ZM17.7187 12.25H18.1188C20.4688 12.25 21.2187 11.5 21.2187 9.15V5.85C21.2187 3.5 20.4688 2.75 18.1188 2.75H14.8187C12.4687 2.75 11.7188 3.5 11.7188 5.85V6.25C15.8688 6.25 17.7187 8.1 17.7187 12.25Z" fill="#404040" />
                      </svg>
                      <span className="text-xs text-gray-500">سایز {item.size}</span>
                    </div>
                    <div className="flex max-sm:justify-end  justify-between">
                      <div className=" lg:flex hidden text-[12px] text-[#404040] items-center gap-1">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 22.7504C4.28 22.7504 1.25 19.7204 1.25 16.0004C1.25 12.9604 3.29 10.2804 6.22 9.49038C6.59 9.39038 6.97 9.58038 7.11 9.94038C7.72 11.4704 9.02 12.6404 10.61 13.0704C11.49 13.3104 12.51 13.3104 13.37 13.0704C13.74 12.9704 14.13 13.1604 14.27 13.5204C14.58 14.3104 14.74 15.1504 14.74 16.0104C14.74 17.9304 13.92 19.7604 12.49 21.0304C11.27 22.1304 9.67 22.7504 8 22.7504ZM6.02 11.1304C4.07 11.9304 2.75 13.8504 2.75 16.0004C2.75 18.8904 5.11 21.2504 8 21.2504C9.3 21.2504 10.54 20.7704 11.5 19.9004C12.62 18.9104 13.25 17.4904 13.25 16.0004C13.25 15.5404 13.19 15.1004 13.08 14.6704C12.14 14.8204 11.12 14.7704 10.22 14.5204C8.41 14.0204 6.89 12.7804 6.02 11.1304Z" fill="#404040" />
                          <path d="M12 14.75C11.38 14.75 10.78 14.67 10.22 14.51C8.19 13.95 6.5 12.45 5.72 10.48C5.41 9.7 5.25 8.86 5.25 8C5.25 4.28 8.28 1.25 12 1.25C15.72 1.25 18.75 4.28 18.75 8C18.75 8.86 18.59 9.7 18.28 10.49C17.5 12.45 15.82 13.96 13.78 14.52C13.22 14.67 12.62 14.75 12 14.75ZM12 2.75C9.11 2.75 6.75 5.11 6.75 8C6.75 8.67 6.87 9.32 7.12 9.93C7.73 11.46 9.03 12.63 10.62 13.06C11.5 13.3 12.52 13.3 13.38 13.06C14.97 12.63 16.28 11.45 16.88 9.93C17.12 9.32 17.25 8.67 17.25 8C17.25 5.11 14.89 2.75 12 2.75Z" fill="#404040" />
                          <path d="M16 22.7497C14.33 22.7497 12.73 22.1297 11.5 21.0197C11.34 20.8797 11.25 20.6697 11.25 20.4597C11.25 20.2497 11.34 20.0397 11.5 19.8997C12.61 18.9197 13.25 17.4997 13.25 15.9997C13.25 15.3297 13.13 14.6797 12.88 14.0697C12.8 13.8697 12.81 13.6497 12.91 13.4597C13.01 13.2697 13.18 13.1297 13.38 13.0697C14.97 12.6397 16.27 11.4697 16.88 9.93973C17.02 9.57973 17.41 9.39973 17.77 9.48973C20.7 10.2897 22.74 12.9597 22.74 15.9997C22.75 19.7197 19.72 22.7497 16 22.7497ZM13.12 20.3897C13.97 20.9497 14.96 21.2497 16 21.2497C18.89 21.2497 21.25 18.8897 21.25 15.9997C21.25 13.8497 19.93 11.9297 17.98 11.1297C17.24 12.5397 16 13.6597 14.52 14.2597C14.67 14.8197 14.75 15.4097 14.75 15.9997C14.75 17.6197 14.17 19.1797 13.12 20.3897Z" fill="#404040" />
                        </svg>
                        <div className="size-3 rounded-full border" style={{ backgroundColor: item.color }}></div>
                        مشکی
                      </div>
                      <div className="flex flex-row-reverse  items-center gap-2 border-2 border-[#606060] rounded-md p-3">
                        <button onClick={() => handleQuantity(item, item.quantity - 1)} className="size-5 text-[26px] flex text-[#606060] items-center justify-center">−</button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button onClick={() => handleQuantity(item, item.quantity + 1)} className="size-5 text-[26px] flex text-[#606060] items-center justify-center">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex max-sm:w-full max-sm:items-center  flex-col w-3/10">
              <div className="lg:flex hidden items-center justify-end mb-8">
                <CheckoutStepper activeStep={0} />
              </div>
              <aside className="lg:w-full w-full rounded-xl border max-sm:border-none border-gray-200 flex flex-col gap-4">
                <div className="  flex  flex-col gap-2 max-sm:p-4">
                  <h1>کد تخفیف</h1>
                  <div className="flex w-full gap-4 justify-between">
                    <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="" className="flex-1 border w-6/10 border-gray-300 rounded-lg p-2 outline-none text-right" />
                    <button className="border w-45/100 justify-center border-[#032340] flex gap-2 text-[#032340] px-3 py-2 rounded-lg">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 22.75C6.07 22.75 1.25 17.93 1.25 12C1.25 6.07 6.07 1.25 12 1.25C17.93 1.25 22.75 6.07 22.75 12C22.75 17.93 17.93 22.75 12 22.75ZM12 2.75C6.9 2.75 2.75 6.9 2.75 12C2.75 17.1 6.9 21.25 12 21.25C17.1 21.25 21.25 17.1 21.25 12C21.25 6.9 17.1 2.75 12 2.75Z" fill="#032340" />
                        <path d="M10.5814 15.5796C10.3814 15.5796 10.1914 15.4996 10.0514 15.3596L7.22141 12.5296C6.93141 12.2396 6.93141 11.7596 7.22141 11.4696C7.51141 11.1796 7.99141 11.1796 8.28141 11.4696L10.5814 13.7696L15.7214 8.62961C16.0114 8.33961 16.4914 8.33961 16.7814 8.62961C17.0714 8.91961 17.0714 9.39961 16.7814 9.68961L11.1114 15.3596C10.9714 15.4996 10.7814 15.5796 10.5814 15.5796Z" fill="#032340" />
                      </svg>
                      ثبت
                    </button>
                  </div>
                </div>

                <div className="border-t lg:p-5 max-sm:mr-2 max-sm:pt-5 max-sm:w-95/100 border-gray-500 flex flex-col gap-4">
                  <div className="flex justify-between"><span className="text-gray-600">قیمت کالاها</span><span>{totals.totalPrice.toLocaleString("fa-IR")} تومان</span></div>
                  <div className="flex justify-between text-red-500"><span>سود شما از خرید</span><span>{totals.totalDiscount.toLocaleString("fa-IR")} تومان</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">هزینه ارسال</span><span>{totals.shippingCost.toLocaleString("fa-IR")} تومان</span></div>
                  <div className="border-t pt-4 flex justify-between font-bold"><span>مبلغ قابل پرداخت</span><span>{totals.payable.toLocaleString("fa-IR")} تومان</span></div>
                  <button onClick={() => navigate("/checkout/address")} className="bg-[#FA541C] text-white py-3 rounded-lg font-semibold flex flex-row-reverse items-center justify-center gap-2">
                    تکمیل فرایند خرید
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7" /></svg>
                  </button>
                </div>
              </aside>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}