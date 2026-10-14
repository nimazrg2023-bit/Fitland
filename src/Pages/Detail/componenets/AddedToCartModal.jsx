import { useNavigate } from "react-router";

export default function AddedToCartModal({ product, onClose }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-md p-6 flex flex-col gap-4" dir="rtl" onClick={(e) => e.stopPropagation()}>
        <div className="flex flex-row-reverse items-center justify-between">
          <button onClick={onClose} className="size-5 flex items-center justify-center rounded-md border text-gray-500 hover:bg-gray-100">✕</button>
          <p className="text-green-600 font-semibold">این کالا به سبد خریدت اضافه شد!</p>
        </div>

        <div className="flex items-center gap-3 border-t border-gray-400 p-3">
          <div className="w-20 h-20 rounded-lg flex items-center justify-center">
            <img src={product.image || "/nike2.png"} alt={product.title} className="w-full h-full rounded-lg object-contain" />
          </div>
          <div className="flex-1 flex flex-col gap-1 text-right">
            <p className="font-semibold text-sm">{product.title}</p>
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <div className="size-3 rounded-full border" style={{ backgroundColor: product.color }}></div>
              <span>مشکی</span>
            </div>
          </div>
        </div>

        <button onClick={() => navigate("/cart")} className="bg-[#FA541C] text-white py-2 rounded-lg font-semibold flex flex-row-reverse items-center justify-center gap-2">
          مشاهده سبد خرید
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12.0019 16.3299C9.61187 16.3299 7.67188 14.3899 7.67188 11.9999C7.67188 9.60992 9.61187 7.66992 12.0019 7.66992C14.3919 7.66992 16.3319 9.60992 16.3319 11.9999C16.3319 14.3899 14.3919 16.3299 12.0019 16.3299ZM12.0019 9.16992C10.4419 9.16992 9.17188 10.4399 9.17188 11.9999C9.17188 13.5599 10.4419 14.8299 12.0019 14.8299C13.5619 14.8299 14.8319 13.5599 14.8319 11.9999C14.8319 10.4399 13.5619 9.16992 12.0019 9.16992Z" fill="white" />
            <path d="M11.9981 21.0205C8.23812 21.0205 4.68813 18.8205 2.24812 15.0005C1.18813 13.3505 1.18813 10.6605 2.24812 9.00047C4.69812 5.18047 8.24813 2.98047 11.9981 2.98047C15.7481 2.98047 19.2981 5.18047 21.7381 9.00047C22.7981 10.6505 22.7981 13.3405 21.7381 15.0005C19.2981 18.8205 15.7481 21.0205 11.9981 21.0205ZM11.9981 4.48047C8.76813 4.48047 5.67813 6.42047 3.51813 9.81047C2.76813 10.9805 2.76813 13.0205 3.51813 14.1905C5.67813 17.5805 8.76813 19.5205 11.9981 19.5205C15.2281 19.5205 18.3181 17.5805 20.4781 14.1905C21.2281 13.0205 21.2281 10.9805 20.4781 9.81047C18.3181 6.42047 15.2281 4.48047 11.9981 4.48047Z" fill="white" />
          </svg>
        </button>
      </div>
    </div>
  );
}