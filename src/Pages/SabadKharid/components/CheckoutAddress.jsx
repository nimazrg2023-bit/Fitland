import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

import { selectUserAddresses } from "../../../Redux/slices/addressesSlice";
import { selectCurrentUser } from "../../../Redux/slices/authSlice";
import CheckoutStepper from "./step";
import AddressFormModal from "../../Addresses.jsx/components/AddressFormModal";

export default function CheckoutAddress() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);
  const addresses = useSelector(selectUserAddresses);
  const [selectedAddressId, setSelectedAddressId] = useState(addresses[0]?.id || null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingAddress, setEditingAddress] = useState(null);

  const days = ["۱۵ مهر", "۱۶ مهر", "۱۷ مهر", "۱۸ مهر"];

  const handleNext = () => { if (!selectedAddressId || !selectedDay) return; navigate("/checkout/payment", { state: { addressId: selectedAddressId, deliveryDay: selectedDay } }); };

  const handleEditClick = (e, address) => { e.stopPropagation(); setEditingAddress(address); setShowForm(true); };

  const handleCloseForm = () => { setShowForm(false); setEditingAddress(null); };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="w-90/100 mx-auto py-10">
        <div className="flex gap-6 flex-col lg:flex-row">
          <aside className="lg:w-3/10 flex flex-col gap-4" dir="rtl">
            <CheckoutStepper activeStep={1} />
            <div className="border border-gray-200 rounded-2xl p-4 flex flex-col gap-10">
              <p className="text-sm text-gray-600">در انتخاب آدرس و همچنین انتخاب روز ارسال دقت فرمایید</p>
              <button onClick={handleNext} disabled={!selectedAddressId || !selectedDay} className="flex items-center justify-center gap-2 bg-[#FA541C] text-white py-3 rounded-lg font-semibold disabled:opacity-50">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.57141 18.8201C9.38141 18.8201 9.19141 18.7501 9.04141 18.6001L2.97141 12.5301C2.68141 12.2401 2.68141 11.7601 2.97141 11.4701L9.04141 5.40012C9.33141 5.11012 9.81141 5.11012 10.1014 5.40012C10.3914 5.69012 10.3914 6.17012 10.1014 6.46012L4.56141 12.0001L10.1014 17.5401C10.3914 17.8301 10.3914 18.3101 10.1014 18.6001C9.96141 18.7501 9.76141 18.8201 9.57141 18.8201Z" fill="white" />
                  <path d="M20.5019 12.75H3.67188C3.26188 12.75 2.92188 12.41 2.92188 12C2.92188 11.59 3.26188 11.25 3.67188 11.25H20.5019C20.9119 11.25 21.2519 11.59 21.2519 12C21.2519 12.41 20.9119 12.75 20.5019 12.75Z" fill="white" />
                </svg>
                تکمیل فرایند خرید
              </button>
            </div>
          </aside>

          <section className="flex-1 flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg text-[#404040] font-bold">آدرس ارسال</h2>
            </div>

            {addresses.length === 0 ? (
              <div className="border border-gray-200 rounded-2xl p-10 text-center text-gray-500">هنوز آدرسی ثبت نکرده‌اید</div>
            ) : (
              addresses.map((address) => {
                const isSelected = selectedAddressId === address.id;
                return (
                  <div key={address.id} onClick={() => setSelectedAddressId(address.id)} className={`border rounded-2xl p-10 cursor-pointer flex gap-4 transition ${isSelected ? "border-[#FA541C]" : "border-gray-200"}`}>
                    <div className="flex-1 flex flex-col gap-5 text-right">
                      <p className="font-bold">{address.fullAddress}</p>
                      <p className="text-sm text-gray-600">{address.province} - {address.city}</p>
                      <p className="text-sm text-gray-600">{address.postalCode}</p>
                      <p className="text-sm text-gray-600">{address.receiverPhone}</p>
                      <p className="text-sm text-gray-600">{address.receiverName}</p>

                      {isSelected && (
                        <button onClick={(e) => handleEditClick(e, address)} className="text-[#FA541C] font-semibold text-sm flex items-center gap-1 w-fit">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M16 3l5 5-11 11H5v-5L16 3z" />
                          </svg>
                          ویرایش آدرس
                        </button>
                      )}
                    </div>

                    <div className="w-4/10 h-55 rounded-xl overflow-hidden bg-gray-100">
                      {address.coords && (<iframe title="map" width="100%" height="100%" frameBorder="0" src={`https://www.openstreetmap.org/export/embed.html?bbox=${address.coords.lng - 0.01}%2C${address.coords.lat - 0.01}%2C${address.coords.lng + 0.01}%2C${address.coords.lat + 0.01}&layer=mapnik&marker=${address.coords.lat}%2C${address.coords.lng}`}></iframe>)}
                    </div>
                  </div>
                );
              })
            )}

            <button onClick={() => { setEditingAddress(null); setShowForm(true); }} className="border-2 w-2/10 border-[#FA541C] text-[#FA541C] px-4 py-2 rounded-lg flex items-center gap-2">
              افزودن آدرس جدید
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M14.75 11.75H9.25C8.84 11.75 8.5 11.41 8.5 11C8.5 10.59 8.84 10.25 9.25 10.25H14.75C15.16 10.25 15.5 10.59 15.5 11C15.5 11.41 15.16 11.75 14.75 11.75Z" fill="#FA541C" />
                <path d="M12 14.5C11.59 14.5 11.25 14.16 11.25 13.75V8.25C11.25 7.84 11.59 7.5 12 7.5C12.41 7.5 12.75 7.84 12.75 8.25V13.75C12.75 14.16 12.41 14.5 12 14.5Z" fill="#FA541C" />
                <path d="M12.0016 22.76C10.5216 22.76 9.03164 22.2 7.87164 21.09C4.92164 18.25 1.66164 13.72 2.89164 8.33C4.00164 3.44 8.27164 1.25 12.0016 1.25C12.0016 1.25 12.0016 1.25 12.0116 1.25C15.7416 1.25 20.0116 3.44 21.1216 8.34C22.3416 13.73 19.0816 18.25 16.1316 21.09C14.9716 22.2 13.4816 22.76 12.0016 22.76ZM12.0016 2.75C9.09164 2.75 5.35164 4.3 4.36164 8.66C3.28164 13.37 6.24164 17.43 8.92164 20C10.6516 21.67 13.3616 21.67 15.0916 20C17.7616 17.43 20.7216 13.37 19.6616 8.66C18.6616 4.3 14.9116 2.75 12.0016 2.75Z" fill="#FA541C" />
              </svg>
            </button>

            <div className="flex flex-col gap-4">
              <h2 className="text-lg font-bold text-right">انتخاب روز ارسال</h2>
              <hr className="text-[#D9D9D9] border-[#D9D9D9] bg-[#D9D9D9]" />
              <div className="flex gap-3 justify-end">
                {days.map((day) => (
                  <button key={day} onClick={() => setSelectedDay(day)} className={`px-6 py-3 rounded-lg border ${selectedDay === day ? "border-[#FA541C] bg-[#FA541C]/10 text-[#FA541C]" : "border-gray-200"}`}>{day}</button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>

      {showForm && <AddressFormModal onClose={handleCloseForm} initialData={editingAddress} />}
    </div>
  );
}