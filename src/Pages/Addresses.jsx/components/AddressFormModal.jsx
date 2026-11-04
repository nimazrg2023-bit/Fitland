import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import MapPicker from "./MapPicker";
import { selectCurrentUser } from "../../../Redux/slices/authSlice";
import { addAddress } from "../../../Redux/slices/addressesSlice";
import { provinces } from "../../../core/constant";

export default function AddressFormModal({ onClose }) {
    const dispatch = useDispatch();
    const user = useSelector(selectCurrentUser);
    const [showMap, setShowMap] = useState(false);
    const [coords, setCoords] = useState(null);
    const [selectedProvince, setSelectedProvince] = useState(null);

    const formik = useFormik({
        initialValues: { fullAddress: "", province: "", city: "", plate: "", unit: "", postalCode: "", receiverName: "", receiverPhone: "" },
        validationSchema: Yup.object({
            fullAddress: Yup.string().required("نشانی کامل الزامی است"),
            province: Yup.string().required("استان الزامی است"),
            city: Yup.string().required("شهر الزامی است"),
            plate: Yup.string().required("پلاک الزامی است"),
            unit: Yup.string().required("واحد الزامی است"),
            postalCode: Yup.string().matches(/^\d{10}$/, "کد پستی باید ۱۰ رقم باشد").required("کد پستی الزامی است"),
            receiverName: Yup.string().required("نام تحویل‌گیرنده الزامی است"),
            receiverPhone: Yup.string().matches(/^09\d{9}$/, "شماره تماس معتبر نیست").required("شماره تماس الزامی است"),
        }),
        onSubmit: (values) => {
            if (!user) return;
            dispatch(addAddress({ userId: user.id, address: { ...values, coords } }));
            onClose();
        },
    });

    const citiesOfProvince = provinces.find((p) => p.name === formik.values.province)?.cities || [];

    const handleProvinceChange = (e) => { formik.handleChange(e); formik.setFieldValue("city", ""); };

    return (
        <>
            <div className="fixed pt-90 inset-0 bg-black/50 flex items-center justify-center z-40 overflow-y-auto py-10">
                <div className="bg-white rounded-2xl w-[90%] max-w-3xl p-6 relative">
                    <button onClick={onClose} className="absolute top-4 left-4 size-4 text-[9px] flex items-center justify-center rounded-md border hover:bg-gray-100">✕</button>
                    <h2 className="text-xl font-bold mb-6 text-right">جزئیات آدرس شما</h2>

                    <form onSubmit={formik.handleSubmit} className="flex flex-col items-end w-full gap-6">
                        <div className="flex flex-col w-full gap-2">
                            <label className="text-right text-gray-700">نشانی شما</label>
                            <textarea name="fullAddress" value={formik.values.fullAddress} onChange={formik.handleChange} onBlur={formik.handleBlur} rows={3} className="border rounded-lg p-3 outline-none focus:border-blue-500 resize-none" />
                            {formik.touched.fullAddress && formik.errors.fullAddress && (<p className="text-red-500 text-sm text-right">{formik.errors.fullAddress}</p>)}
                        </div>

                        <button type="button" onClick={() => setShowMap(true)} className="text-[#FA541C] w-full text-right font-medium hover:underline">تغییر موقعیت مکانی روی نقشه</button>

                        <p className="text-right w-full text-gray-700">آدرس خود را تکمیل کنید:</p>

                        <div className="border w-full p-5 rounded-2xl border-[#ADADAD]">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-right text-sm text-gray-600">استان</label>
                                    <select name="province" value={formik.values.province} onChange={handleProvinceChange} onBlur={formik.handleBlur} className="border rounded-lg p-3 outline-none focus:border-blue-500 text-right">
                                        <option value="">انتخاب کنید</option>
                                        {provinces.map((p) => (<option key={p.id} value={p.name}>{p.name}</option>))}
                                    </select>
                                    {formik.touched.province && formik.errors.province && (<p className="text-red-500 text-xs text-right">{formik.errors.province}</p>)}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-right text-sm text-gray-600">شهر</label>
                                    <select name="city" value={formik.values.city} onChange={formik.handleChange} onBlur={formik.handleBlur} disabled={!formik.values.province} className="border rounded-lg p-3 outline-none focus:border-blue-500 text-right disabled:bg-gray-100">
                                        <option value="">انتخاب کنید</option>
                                        {citiesOfProvince.map((c) => (<option key={c} value={c}>{c}</option>))}
                                    </select>
                                    {formik.touched.city && formik.errors.city && (<p className="text-red-500 text-xs text-right">{formik.errors.city}</p>)}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex flex-col gap-1">
                                    <label className="text-right text-sm text-gray-600">پلاک</label>
                                    <input name="plate" value={formik.values.plate} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-lg p-3 outline-none focus:border-blue-500" />
                                    {formik.touched.plate && formik.errors.plate && (<p className="text-red-500 text-xs text-right">{formik.errors.plate}</p>)}
                                </div>

                                <div className="flex flex-col gap-1">
                                    <label className="text-right text-sm text-gray-600">واحد</label>
                                    <input name="unit" value={formik.values.unit} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-lg p-3 outline-none focus:border-blue-500" />
                                    {formik.touched.unit && formik.errors.unit && (<p className="text-red-500 text-xs text-right">{formik.errors.unit}</p>)}
                                </div>
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-right text-sm text-gray-600">کد پستی</label>
                                <input name="postalCode" value={formik.values.postalCode} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-lg p-3 outline-none focus:border-blue-500" />
                                {formik.touched.postalCode && formik.errors.postalCode && (<p className="text-red-500 text-xs text-right">{formik.errors.postalCode}</p>)}
                            </div>
                        </div>

                        <p className="text-right w-full text-gray-700">به چه کسی تحویل داده شود:</p>
                        <div className="grid max-sm:items-center border w-full border-[#ADADAD] rounded-2xl p-5 grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                                <label className="text-right max-sm:text-[10px] text-sm text-gray-600">نام و نام خانوادگی گیرنده</label>
                                <input name="receiverName" value={formik.values.receiverName} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-lg p-3 outline-none focus:border-blue-500" />
                                {formik.touched.receiverName && formik.errors.receiverName && (<p className="text-red-500 text-xs text-right">{formik.errors.receiverName}</p>)}
                            </div>

                            <div className="flex flex-col gap-1">
                                <label className="text-right text-sm text-gray-600">شماره تماس</label>
                                <input name="receiverPhone" value={formik.values.receiverPhone} onChange={formik.handleChange} onBlur={formik.handleBlur} className="border rounded-lg p-3 outline-none focus:border-blue-500" />
                                {formik.touched.receiverPhone && formik.errors.receiverPhone && (<p className="text-red-500 text-xs text-right">{formik.errors.receiverPhone}</p>)}
                            </div>
                        </div>

                        <button type="submit" className="bg-[#032340] text-white py-3 px-8 rounded-lg w-2/10 hover:bg-[#194165] transition">ثبت</button>
                    </form>
                </div>
            </div>

            {showMap && (
                <MapPicker
                    initialPosition={coords}
                    onClose={() => setShowMap(false)}
                    onConfirm={(pos) => { setCoords(pos); setShowMap(false); }}
                />
            )}
        </>
    );
}