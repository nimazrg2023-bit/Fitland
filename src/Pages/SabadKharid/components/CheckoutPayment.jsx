import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router";
import { useState } from "react";

import { selectUserAddresses } from "../../../Redux/slices/addressesSlice";
import { selectUserCart, selectCartTotals, clearCart } from "../../../Redux/slices/cartSlice";
import { createOrder } from "../../../Redux/slices/ordersSlice";

import { selectCurrentUser } from "../../../Redux/slices/authSlice";
import CheckoutStepper from "./step";

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector(selectCurrentUser);
  const addresses = useSelector(selectUserAddresses);
  const cart = useSelector(selectUserCart);
  const totals = useSelector(selectCartTotals);
  const [paymentMethod, setPaymentMethod] = useState("blubank");

  const { addressId, deliveryDay } = location.state || {};
  const selectedAddress = addresses.find((a) => a.id === addressId);

  const handlePay = () => {
    if (!selectedAddress || !deliveryDay) return;
    const orderId = "۴۵۱۶۲۵۱۶";
    dispatch(createOrder({ userId: user.id, items: cart, address: selectedAddress, deliveryDay, paymentMethod, totalPrice: totals.totalPrice, totalDiscount: totals.totalDiscount, shippingCost: totals.shippingCost, finalPrice: totals.payable, status: "pending", orderCode: orderId }));
    dispatch(clearCart(user.id));
    navigate("/checkout/success", { state: { orderId } });
  };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="w-90/100 flex flex-col items-end mx-auto py-10">
        <div className="flex flex-col w-68/100 gap-2 items-end justify-end mb-8">
          <h1 className="text-[16px] text-[#404040]">انتخاب نحوه پرداخت</h1>
          <hr className="bg-gray-200 border-gray-200 text-gray-200 w-full" />
          <p className="text-[#404040]">لطفا از درست بودن اطلاعات خود اطمینان حاصل فرمایید</p>
        </div>

        <div className="flex gap-6 w-full flex-col lg:flex-row">
          <aside className="w-3/10 relative lg:bottom-28 flex flex-col gap-4" dir="rtl">
            <CheckoutStepper activeStep={2} />
            <div className="border border-gray-200 w-full rounded-2xl p-4 flex flex-col gap-6">
              <h3 className="font-bold text-right">نحوه پرداخت</h3>

              <label className="flex w-full flex-row-reverse border-b pb-1 border-gray-400 items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <img src="/paymaskan.png" className="size-12 rounded-md" alt="" />
                </div>
                <div className="flex gap-2 flex-row-reverse items-center">
                  <span>بانک مسکن</span>
                  <input className="size-4 appearance-none border-2 border-gray-400 rounded-sm checked:bg-orange-500 checked:border-orange-500 cursor-pointer transition-colors" type="radio" name="payment" value="maskan" checked={paymentMethod === "maskan"} onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
              </label>

              <label className="flex flex-row-reverse items-center justify-between cursor-pointer">
                <div className="flex items-center gap-2">
                  <img src="/payblue.png" className="size-12 rounded-md" alt="" />
                </div>
                <div className="flex gap-2 flex-row-reverse items-center">
                  <span>بلوبانک</span>
                  <input className="size-4 appearance-none border-2 border-gray-400 rounded-sm checked:bg-blue-500 checked:border-blue-500 cursor-pointer transition-colors" type="radio" name="payment" value="blubank" checked={paymentMethod === "blubank"} onChange={(e) => setPaymentMethod(e.target.value)} />
                </div>
              </label>

              <button onClick={handlePay} className="bg-[#FA541C] text-white py-3 rounded-lg font-semibold">انتقال به صفحه پرداخت</button>
            </div>
          </aside>

          <section className="flex-1 w-7/10 flex flex-col gap-6">
            <h2 className="text-[16px] text-[#404040] text-right">خلاصه محصولات</h2>
            <div className="border-t border-gray-200 w-full p-4 flex flex-col gap-4">
              {cart.map((item, index) => (
                <div key={index} className="flex w-full items-center gap-4" dir="rtl">
                  <div className="w-1/10 scale-y-90 border-2 border-gray-400 rounded-lg flex items-center justify-center">
                    <img src={item.image || "/nike2.png"} alt={item.title} className="w-full h-full rounded-md object-contain" />
                  </div>
                  <div className="flex-1 flex flex-col gap-8 text-right">
                    <p className="font-bold">{item.title}</p>
                    <div className="flex items-center gap-10 text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className="size-4 rounded-full" style={{ backgroundColor: item.color }}></div>
                        <span>مشکی</span>
                      </div>
                      <span>سایز {item.size}</span>
                      <span className="text-sm text-gray-600">{item.quantity} عدد</span>
                    </div>
                  </div>
                  <span className="font-bold text-[#032340] text-[12px] mt-10">{(item.price * item.quantity).toLocaleString("fa-IR")} تومان</span>
                </div>
              ))}
            </div>

            {selectedAddress && (
              <div className="flex flex-col gap-4">
                <h2 className="text-[16px] text-[#404040] font-bold text-right">آدرس انتخابی شما</h2>
                <hr className="w-full bg-gray-200 border-gray-200" />
                <div className="border-2 border-gray-200 rounded-2xl p-10 flex gap-4">
                  <div className="flex-1 flex flex-col gap-7 text-right">
                    <p className="font-bold">{selectedAddress.fullAddress}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.province} - {selectedAddress.city}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.postalCode}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.receiverPhone}</p>
                    <p className="text-sm text-gray-600">{selectedAddress.receiverName}</p>
                  </div>
                  <div className="w-45/100 h-58 rounded-xl overflow-hidden bg-gray-100">
                    {selectedAddress.coords && (<iframe title="map" width="100%" height="100%" frameBorder="0" src={`https://www.openstreetmap.org/export/embed.html?bbox=${selectedAddress.coords.lng - 0.01}%2C${selectedAddress.coords.lat - 0.01}%2C${selectedAddress.coords.lng + 0.01}%2C${selectedAddress.coords.lat + 0.01}&layer=mapnik&marker=${selectedAddress.coords.lat}%2C${selectedAddress.coords.lng}`}></iframe>)}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-right">زمان ارسال انتخابی شما</h2>
              <div className="border-t border-gray-200 pt-6 text-right">
                <span className="text-[#FA541C] bg-[#fce5dd] border rounded-md p-2 px-4 font-bold">{deliveryDay}</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}