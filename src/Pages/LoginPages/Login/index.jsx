import { useFormik } from "formik";
import { NavLink, useNavigate } from "react-router";
import * as Yup from "yup";
import { startLogin, selectAuthError, selectPendingLogin, clearError } from "../../../Redux/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useRef } from "react";

export default function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const error = useSelector(selectAuthError);
    const pendingLogin = useSelector(selectPendingLogin);
    const [localError, setLocalError] = useState("");
    const justSubmitted = useRef(false);

    const validationSchema = Yup.object({
        value: Yup.string().required("شماره موبایل یا ایمیل الزامی است").test("phone-or-email", "شماره موبایل یا ایمیل معتبر نیست", (value) => {
            if (!value) return false;
            if (value.startsWith("09")) { return /^09\d{9}$/.test(value); }
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
        }),
    });

    const formik = useFormik({
        initialValues: { value: "" },
        validationSchema,
        onSubmit: (values) => { setLocalError(""); dispatch(clearError()); dispatch(startLogin(values.value)); },
    });

    useEffect(() => {
        if (pendingLogin) { navigate("/Verify"); }
    }, [pendingLogin, navigate]);

    useEffect(() => {
        if (error) { setLocalError(error); dispatch(clearError()); }
    }, [error, dispatch]);

    useEffect(() => {
        if (localError) { setLocalError(""); }
    }, [formik.values.value]);

    return (
        <div className="flex max-sm:gap-15 max-sm:pt-5 lg:flex-row flex-col items-center">
            <div className="hidden relative max-h-screen w-45/100 lg:flex flex-col">
                <img className="max-h-screen" src="/Login.png" alt="" />
                <div className="w-full h-full flex items-center justify-center absolute bg-[#000a13]/90">
                    <NavLink className="lg:flex hidden" to={"/"}></NavLink>
                </div>
            </div>

            <div className="w-9/10 lg:hidden flex justify-between">
                <button onClick={() => navigate("/")}></button>
                <button onClick={() => navigate(-1)}></button>
            </div>

            <NavLink className="lg:hidden flex" to={"/"}></NavLink>

            <div className="flex flex-col items-center w-full lg:w-5/10">
                <div className="flex flex-col gap-10 items-end lg:w-65/100 w-95/100 p-10 shadow-2xl rounded-2xl">
                    <p className="text-[#000000] text-[18px] font-semibold">ورود | ثبت‌نام</p>

                    <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-end">
                        <div className="mb-4 w-full">
                            <label className="block text-right mb-2">لطفا شماره موبایل یا ایمیل خود را وارد کنید</label>

                            <div className="relative">
                                <input
                                    type="text"
                                    name="value"
                                    placeholder="09123456789 یا Example@gmail.com"
                                    value={formik.values.value}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    className={`w-full outline-none h-12 rounded-lg px-4 text-right border-[2px] ${(formik.touched.value && formik.errors.value) || localError ? "border-red-500 bg-red-100 text-[#8A1513]" : formik.touched.value && formik.values.value ? "border-green-600 bg-green-100 text-[#257028]" : "border-gray-300"}`}
                                />
                                {((formik.touched.value && formik.errors.value) || localError) && (
                                    <button type="button" onClick={() => { formik.setFieldValue("value", ""); setLocalError(""); dispatch(clearError()); }} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">✕</button>
                                )}
                            </div>

                            {formik.touched.value && formik.errors.value && (
                                <p className="text-red-500 text-xs text-right mt-1">{formik.errors.value}</p>
                            )}

                            {localError && (
                                <div className="mt-2 p-3 bg-red-100 border border-red-500 rounded-lg text-red-600 text-sm text-right">
                                    {localError}
                                    <div className="mt-1">
                                        <NavLink to="/Register" className="text-orange-500 font-semibold text-xs">ثبت‌نام کنید</NavLink>
                                    </div>
                                </div>
                            )}
                        </div>

                        <button type="submit" className="w-full mb-6 h-12 rounded-lg bg-orange-500 text-white">تایید</button>

                        <div className="w-full flex justify-center gap-1 text-sm">
                            <span className="text-gray-600">حساب کاربری ندارید؟</span>
                            <NavLink to="/Register" className="text-orange-500 font-semibold">ثبت‌نام کنید</NavLink>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}