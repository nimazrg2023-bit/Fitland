import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import * as Yup from "yup";
import { register, selectAuthError, clearError } from "../../../Redux/slices/authSlice.js";
import { useEffect } from "react";

export default function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  const formik = useFormik({
    initialValues: { name: "", phone: "", email: "", terms: false },
    validationSchema: Yup.object({
      name: Yup.string().required("نام و نام خانوادگی الزامی است"),
      phone: Yup.string().required("شماره تلفن همراه الزامی است").matches(/^09\d{9}$/, "شماره موبایل باید ۱۱ رقم و با 09 شروع شود"),
      email: Yup.string().email("ایمیل وارد شده معتبر نیست"),
      terms: Yup.boolean().oneOf([true], "قبول قوانین و مقررات الزامی است"),
    }),
    onSubmit: (values) => {
      dispatch(register({ name: values.name, phone: values.phone, email: values.email }));
    },
  });

  useEffect(() => {
    if (error) { dispatch(clearError()); }
  }, [formik.values, dispatch]);

  useEffect(() => {
    if (isLoggedIn) navigate("/");
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex max-sm:gap-15 max-sm:pt-5 lg:flex-row flex-col items-center">
      <div className="hidden relative max-h-screen w-5/10 lg:flex flex-col">
        <img className="max-h-screen" src="/register.jpg" alt="" />
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
          <p className="text-[#000000] text-[18px] font-semibold">ثبت نام</p>

          <form onSubmit={formik.handleSubmit} className="w-full flex flex-col items-end">
            {error && (
              <div className="w-full mb-4 p-3 bg-red-100 border border-red-500 rounded-lg text-red-600 text-sm text-right">{error}</div>
            )}

            <div className="mb-8 w-full">
              <label className="block text-right mb-2">*نام و نام خانوادگی</label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="نام خود را به فارسی وارد کنید"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className={`w-full h-12 rounded-lg border px-4 text-right ${formik.touched.name && formik.errors.name ? "border-red-500 bg-red-100" : "border-gray-300"}`}
                />
                {formik.touched.name && formik.errors.name && (
                  <button type="button" onClick={() => formik.setFieldValue("name", "")} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">✕</button>
                )}
              </div>
              {formik.touched.name && formik.errors.name && (
                <p className="text-red-500 text-xs text-right mt-1">{formik.errors.name}</p>
              )}
            </div>

            <div className="mb-8 w-full">
              <label className="block text-right mb-2">*شماره تلفن همراه</label>
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  placeholder="09123456789"
                  value={formik.values.phone}
                  onChange={(e) => { const value = e.target.value.replace(/\D/g, ""); formik.setFieldValue("phone", value); }}
                  onBlur={formik.handleBlur}
                  maxLength={11}
                  className={`w-full outline-none h-12 rounded-lg px-4 text-right border-[2px] ${formik.touched.phone && formik.errors.phone ? "border-red-500 bg-red-100 text-[#8A1513]" : formik.touched.phone && formik.values.phone ? "border-green-600 bg-green-100 text-[#257028]" : "border-gray-300"}`}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <button type="button" onClick={() => formik.setFieldValue("phone", "")} className="absolute left-3 top-1/2 -translate-y-1/2 text-red-500">✕</button>
                )}
              </div>
              {formik.touched.phone && formik.errors.phone && (
                <p className="text-red-500 text-xs text-right mt-1">{formik.errors.phone}</p>
              )}
            </div>

            <div className="mb-8 w-full">
              <label className="block text-right mb-2">ایمیل (اختیاری)</label>
              <input
                type="email"
                name="email"
                placeholder="Example@gmail.com"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className="w-full h-12 rounded-lg border px-4 text-right"
              />
              {formik.touched.email && formik.errors.email && (
                <p className="text-red-500 text-xs text-right mt-1">{formik.errors.email}</p>
              )}
            </div>

            <div className="flex flex-row-reverse items-center justify-end gap-2 mb-4 w-full">
              <input type="checkbox" name="terms" checked={formik.values.terms} onChange={formik.handleChange} onBlur={formik.handleBlur} className="w-4 h-4" />
              <p className="text-sm">قوانین و مقررات را خوانده و قبول دارم</p>
            </div>
            {formik.touched.terms && formik.errors.terms && (
              <p className="text-red-500 text-xs text-right mb-4">{formik.errors.terms}</p>
            )}

            <button type="submit" className="w-full mb-6 h-12 rounded-lg bg-orange-500 text-white">تایید</button>

            <div className="w-full flex justify-center gap-1 text-sm">
              <span className="text-gray-600">حساب کاربری دارید؟</span>
              <NavLink to="/Login" className="text-orange-500 font-semibold">وارد شوید</NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}