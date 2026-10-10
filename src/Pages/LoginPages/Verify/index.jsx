import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router";
import { clearError, selectAuthError, selectPendingLogin, verifyCode } from "../../../Redux/slices/authSlice";

export default function VerifyCode() {
  const [code, setCode] = useState(["", "", "", "", ""]);
  const [time, setTime] = useState(120);
  const [localError, setLocalError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inputsRef = useRef([]);

  const error = useSelector(selectAuthError);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const pendingLogin = useSelector(selectPendingLogin);

  useEffect(() => {
    if (!pendingLogin && !isLoggedIn) { navigate("/Login"); }
  }, [pendingLogin, isLoggedIn, navigate]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
    if (value && index < 4) { inputsRef.current[index + 1]?.focus(); }
    if (value && index === 4) {
      const fullCode = newCode.join("");
      if (fullCode.length === 5) { dispatch(verifyCode(fullCode)); }
    }
  };

  useEffect(() => {
    if (error) { setLocalError(error); dispatch(clearError()); }
  }, [error, dispatch]);

  useEffect(() => {
    if (isLoggedIn) { navigate("/"); }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    if (time <= 0) return;
    const timer = setInterval(() => { setTime((prev) => prev - 1); }, 1000);
    return () => clearInterval(timer);
  }, [time]);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  const resetTimer = () => { setTime(120); setLocalError(""); };

  useEffect(() => {
    if (localError) setLocalError("");
  }, [code]);

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
          <p className="text-[#000000] text-[18px] font-semibold">کد تایید را وارد کنید</p>

          <div className="flex w-full justify-center">
            <div className="w-8/10 flex justify-center gap-2">
              {code.map((item, index) => (
                <div key={index} className="border-2 border-[#CBCBCB] rounded-2xl p-3">
                  <input
                    ref={(el) => (inputsRef.current[index] = el)}
                    value={item}
                    onChange={(e) => handleChange(e.target.value, index)}
                    maxLength={1}
                    className="w-10 h-10 outline-none border-b-2 border-[#CBCBCB] text-center text-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          {localError && (
            <div className="w-full p-3 bg-red-100 border border-red-500 rounded-lg text-red-600 text-sm text-right">{localError}</div>
          )}

          <div className="w-full flex justify-between flex-row-reverse">
            <p className="text-[14px] font-medium text-[#606060]">کد برای شما ارسال شد</p>
            <div className="flex gap-2 items-center">
              <p className="text-[14px] text-[#606060]">{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}</p>
              <button className="text-[#CBCBCB] disabled:opacity-50" onClick={resetTimer} disabled={time > 0}>ارسال مجدد</button>
            </div>
          </div>

          <div className="w-full flex justify-center gap-1 text-sm">
            <span className="text-gray-600">شماره/ایمیل رو اشتباه زدید؟</span>
            <NavLink to="/Login" className="text-orange-500 font-semibold">بازگشت به ورود</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}