import { NavLink, useParams, useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filteredlo, filteredsg, nazar, products } from "../../core/constant";
import { toggleFavorite, selectIsFavorite } from "../../Redux/slices/favoritesSlice";

import { addComment, selectUserComments } from "../../Redux/slices/commentsSlice";
import { addToCart } from "../../Redux/slices/cartSlice";

import { selectCurrentUser } from "../../Redux/slices/authslice";
import AddedToCartModal from "./componenets/AddedToCartModal";

export default function Detail() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(selectCurrentUser);
    const product = products.find((item) => item.id === Number(id));
    const [quantity, setQuantity] = useState(1);
    const [size, setSize] = useState("");
    const [activeImage, setActiveImage] = useState(-1);
    const userComments = useSelector(selectUserComments) || [];
    const isFavorite = useSelector(selectIsFavorite(product?.id));
    const [showAddedModal, setShowAddedModal] = useState(false);
    const [addedProduct, setAddedProduct] = useState(null);

    if (!product) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-white">
                <p className="text-xl">محصول پیدا نشد!</p>
            </div>
        );
    }

    const images = product.images?.length ? product.images : [product.image];
    const [hidesizes, sethidesizes] = useState("close");

    const btnsizehandler = () => { if (hidesizes === "close") { sethidesizes("open"); } else { sethidesizes("close"); } };

    const [colorid, setcolorid] = useState();
    const btncolorhandler = (index) => { setcolorid(index); };

    const [activeTab, setActiveTab] = useState("features");
    const tabs = [ { id: "features", title: "ویژگی‌های محصول" }, { id: "description", title: "توضیحات" }, { id: "reviews", title: "نظرات" } ];

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [title, setTitle] = useState("");
    const [reviewUpdate, setReviewUpdate] = useState(0);
    const [er, seter] = useState("");
    const [rating, setrating] = useState(0);

    const btnratinghandler = (item) => { setrating(item); };

    const btnnazarhandler = () => {
        seter("");
        if (!name.trim()) { seter("لطفا نام خود را وارد کنید"); return; }
        if (!email.trim()) { seter("لطفا ایمیل خود را وارد کنید"); return; }
        if (!title.trim()) { seter("لطفا نظر خود را بنویسید"); return; }
        if (rating === 0) { seter("لطفا امتیاز خود را انتخاب کنید"); return; }
        if (!user) { seter("لطفا ابتدا وارد حساب کاربری خود شوید"); return; }
        dispatch(addComment({ userId: user.id, comment: { productId: product.id, productTitle: product.title, productImage: product.image, colorName: "مشکی", colorValue: product.colors?.[colorid] || "#000", rating: rating, text: title, name: name, email: email } }));
        setName(""); setEmail(""); setTitle(""); setrating(0); seter(""); setReviewUpdate((prev) => prev + 1); alert("دیدگاه شما با موفقیت ثبت شد.");
    };

    const [h, seth] = useState("150px");
    const [btnmore, setbtnmore] = useState("مشاهده بیشتر");
    const btnmorehandler = () => { if (h === "150px") { seth("auto"); setbtnmore("مشاهده کمتر"); } else { seth("150px"); setbtnmore("مشاهده بیشتر"); } };

    const handleToggleFavorite = () => { if (!user) { alert("لطفا ابتدا وارد حساب کاربری خود شوید."); return; } dispatch(toggleFavorite({ userId: user.id, product })); };

    const handleAddToCart = () => {
        if (!user) { alert("لطفا ابتدا وارد حساب کاربری خود شوید."); return; }
        if (!size) { alert("لطفاً سایز را انتخاب کنید"); return; }
        if (colorid === undefined) { alert("لطفاً رنگ را انتخاب کنید"); return; }
        const selectedColor = product.colors[colorid];
        const cartProduct = { id: product.id, title: product.title, category: "کفش بسکتبال", image: product.image, price: product.price, oldPrice: product.oldPrice, size: size, color: selectedColor, quantity: quantity };
        dispatch(addToCart({ userId: user.id, product: cartProduct }));
        setAddedProduct({ title: product.title, image: product.image, size: size, color: selectedColor });
        setShowAddedModal(true);
    };

    return (
        <div className="min-h-screen flex flex-col items-center w-full bg-white px-4 py-10" dir="rtl">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 lg:grid-cols-2">
                <div className="flex flex-col gap-5">
                    <div className="flex h-[350px] items-center justify-center overflow-hidden bg-gray-50 lg:h-[430px]">
                        <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                    </div>
                    <div className="flex relative gap-[14px]">
                        <button onClick={() => setActiveImage(-1)} className={`h-23 max-sm:size-21 w-23 max-sm:z-10 shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 p-1 transition ${activeImage === -1 ? "border-orange-500" : "border-gray-200"}`}>
                            <img src={product.image} className="h-full w-full object-contain" />
                        </button>
                        {images.map((image, index) => (
                            <button style={{ "--z-mobile": images.length - 1 - index }} key={index} onClick={() => setActiveImage(index)} className={`h-23 max-sm:size-21 relative w-23 maxsm:mr-[-30px] [z-index:var(--z-mobile)] md:[z-index:var(--z-desktop)] shrink-0 overflow-hidden rounded-lg border-2 bg-gray-50 p-1 transition ${activeImage === index ? "border-orange-500" : "border-gray-200"}`}>
                                <img src={image} alt={`تصویر ${index + 1}`} className="h-full w-full object-contain" />
                            </button>
                        ))}
                        <button className="h-23 max-sm:size-21 w-23 gap-2 flex justify-center items-center flex-col shrink-0 overflow-hidden rounded-lg border-[2px] border-[#CBCBCB] bg-gray-50 p-1 transition">
                            <svg width="23" height="23" viewBox="0 0 23 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M2.37442 17.4929L2.35602 17.5113C2.10756 16.9684 1.95113 16.3518 1.88672 15.6709C1.95113 16.3426 2.12597 16.95 2.37442 17.4929Z" fill="#021526" />
                                <path d="M8.2838 9.55101C9.49334 9.55101 10.4739 8.57049 10.4739 7.36095C10.4739 6.15142 9.49334 5.1709 8.2838 5.1709C7.07427 5.1709 6.09375 6.15142 6.09375 7.36095C6.09375 8.57049 7.07427 9.55101 8.2838 9.55101Z" fill="#021526" />
                                <path d="M14.8974 1.83984H7.18615C3.83666 1.83984 1.83984 3.83666 1.83984 7.18615V14.8974C1.83984 15.9004 2.01468 16.7745 2.35515 17.5107C3.14651 19.2591 4.83967 20.2437 7.18615 20.2437H14.8974C18.2468 20.2437 20.2437 18.2468 20.2437 14.8974V12.7901V7.18615C20.2437 3.83666 18.2468 1.83984 14.8974 1.83984ZM18.7438 11.5018C18.026 10.8853 16.8666 10.8853 16.1488 11.5018L12.3208 14.7869C11.6031 15.4035 10.4436 15.4035 9.72588 14.7869L9.41301 14.5293C8.75968 13.9588 7.71986 13.9035 6.98371 14.4004L3.5422 16.7101C3.33975 16.1948 3.22013 15.5967 3.22013 14.8974V7.18615C3.22013 4.59121 4.59121 3.22013 7.18615 3.22013H14.8974C17.4923 3.22013 18.8634 4.59121 18.8634 7.18615V11.6031L18.7438 11.5018Z" fill="#021526" />
                            </svg>
                            <p className="text-[10px] text-[#021526]">+۱ تصاویر بیشتر</p>
                        </button>
                    </div>
                </div>
                <div className="flex lg:w-106/100 max-sm:w-full flex-col gap-6">
                    <div className="flex justify-between">
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{product.title}</h1>
                        <div className="bg-[#FFF7F4] rounded-md flex gap-1 p-2 flex-row-reverse items-center">
                            <p>{product.rating.toLocaleString("fa-IR")}</p>
                            <svg width="18" height="17" viewBox="0 0 18 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.07303 0.398984C8.35359 -0.132772 9.11516 -0.132774 9.39572 0.398983L11.6193 4.61343C11.7275 4.8185 11.9247 4.96177 12.1531 5.0013L16.8484 5.81371C17.4409 5.91621 17.6762 6.64051 17.2572 7.07166L13.9361 10.4887C13.7745 10.655 13.6992 10.8868 13.7322 11.1163L14.4105 15.8329C14.4961 16.428 13.88 16.8756 13.3404 16.6103L9.06432 14.5077C8.85625 14.4054 8.6125 14.4054 8.40443 14.5077L4.12833 16.6103C3.5888 16.8756 2.97268 16.428 3.05826 15.8329L3.73655 11.1163C3.76955 10.8868 3.69422 10.655 3.53263 10.4887L0.211571 7.07166C-0.207462 6.64051 0.0278736 5.91621 0.620301 5.81371L5.3156 5.0013C5.54407 4.96177 5.74127 4.8185 5.84946 4.61343L8.07303 0.398984Z" fill="#FF991F" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-[14px] text-[#868686]">کفش بسکتبال</h1>
                    <div className="w-full flex flex-col-reverse gap-6">
                        <div className="flex flex-col items-start max-sm:items-end gap-6">
                            <span className="text-[32px] font-bold text-[#032340]">{product.price.toLocaleString("fa-IR")} تومان</span>
                            <div className="flex gap-13 flex-row-reverse">
                                <p className="text-white bg-[#FA541C] px-3 p-1 flex items-center justify-center rounded-md">{product.discount}%</p>
                                <p className="text-[24px] text-gray-400 line-through">{product.oldPrice?.toLocaleString("fa-IR")}</p>
                            </div>
                        </div>
                        <div className="flex w-full flex-col gap-6">
                            <div className="w-4/10 max-sm:w-8/10">
                                <div className="flex items-center justify-between w-full">
                                    <h3 className="mb-4 text-[24px] font-medium text-black">سایز</h3>
                                    <button className="items-center" onClick={btnsizehandler}>
                                        <svg className={`${hidesizes === "open" ? "rotate-0" : "rotate-180"}`} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0583 5.73C10.9317 5.73 10.805 5.68333 10.705 5.58333L6.35833 1.23667C6.03833 0.916667 5.51833 0.916667 5.19833 1.23667L0.851667 5.58333C0.658333 5.77667 0.338333 5.77667 0.145 5.58333C-0.0483333 5.39 -0.0483333 5.07 0.145 4.87667L4.49167 0.53C5.19833 -0.176667 6.35167 -0.176667 7.065 0.53L11.4117 4.87667C11.605 5.07 11.605 5.39 11.4117 5.58333C11.3117 5.67667 11.185 5.73 11.0583 5.73Z" fill="#ADADAD" />
                                        </svg>
                                    </button>
                                </div>
                                <div className={`${hidesizes === "open" ? "flex" : "hidden"} flex-wrap gap-3`}>
                                    {product.sizes.map((item) => (
                                        <button key={item} onClick={() => setSize(item)} className={`text-[12px] cursor-pointer px-8 w-122/1000 flex justify-center items-center p-1 rounded-md border transition ${size === item ? "border-orange-500 bg-orange-500 text-white" : "border-gray-200 bg-[#EDEDED] text-gray-800 hover:border-orange-400"}`}>{item}</button>
                                    ))}
                                </div>
                            </div>
                            <div className="max-sm:w-8/10">
                                <h3 className="mb-4 text-[24px] font-semibold text-gray-800">رنگ</h3>
                                <div className="flex gap-3 max-sm:gap-12">
                                    {product.colors.map((color, index) => (
                                        <div key={color}>
                                            <button className={`${colorid === index ? "bg-[#EDEDED]" : "bg-none"} rounded-md flex flex-row-reverse gap-1 cursor-pointer p-1 items-center`} onClick={() => btncolorhandler(index)}>
                                                <p className="text-[12px] max-sm:text-[14px]">خاکی</p>
                                                <div className="size-6 max-sm:size-8 rounded-full border border-gray-300" style={{ backgroundColor: color }}></div>
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex w-full flex-row max-sm:flex-col max-sm:items-start items-end gap-7">
                        <div className="w-full flex justify-between">
                            <div className="flex flex-row-reverse max-sm:w-4/10 justify-center items-center rounded-lg border-2 border-[#FA541C]">
                                <button onClick={() => setQuantity((prev) => Math.max(1, prev - 1))} className="pl-2 text-[30px] text-[#FA541C]">−</button>
                                <span className="min-w-8 text-center text-[#FA541C]">{quantity.toLocaleString("fa-IR")}</span>
                                <button onClick={() => setQuantity((prev) => prev + 1)} className="pr-2 text-[30px] text-[#FA541C]">+</button>
                            </div>
                            <div className="flex items-center gap-5">
                                <button className="mr-10 lg:hidden flex">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M20.6216 13.0703C20.2416 13.0703 19.9216 12.7803 19.8716 12.4003C19.6316 10.1403 18.4116 8.09035 16.5316 6.79035C16.1916 6.55035 16.1116 6.09035 16.3416 5.75035C16.5816 5.41035 17.0516 5.33035 17.3816 5.56035C19.6216 7.11035 21.0616 9.55035 21.3516 12.2403C21.3916 12.6503 21.1016 13.0203 20.6816 13.0703C20.6716 13.0703 20.6416 13.0703 20.6216 13.0703Z" fill="#000306" />
                                        <path d="M3.49186 13.1203C3.46186 13.1203 3.44186 13.1203 3.41186 13.1203C3.00186 13.0703 2.70186 12.7003 2.74186 12.2903C3.01186 9.60026 4.44186 7.17026 6.65186 5.60026C6.99186 5.36026 7.46186 5.44026 7.70186 5.78026C7.94186 6.12026 7.86186 6.59026 7.52186 6.83026C5.66186 8.14026 4.46186 10.1903 4.23186 12.4503C4.20186 12.8303 3.87186 13.1203 3.49186 13.1203Z" fill="#000306" />
                                        <path d="M12.06 22.61C10.58 22.61 9.16997 22.27 7.84997 21.61C7.47997 21.42 7.32997 20.97 7.51997 20.6C7.70997 20.23 8.15997 20.08 8.52997 20.27C10.69 21.36 13.29 21.38 15.47 20.33C15.84 20.15 16.29 20.31 16.47 20.68C16.65 21.05 16.49 21.5 16.12 21.68C14.84 22.3 13.48 22.61 12.06 22.61Z" fill="#000306" />
                                        <path d="M12.0613 8.43988C10.1113 8.43988 8.53125 6.85988 8.53125 4.90988C8.53125 2.95988 10.1113 1.37988 12.0613 1.37988C14.0113 1.37988 15.5913 2.95988 15.5913 4.90988C15.5913 6.85988 14.0013 8.43988 12.0613 8.43988ZM12.0613 2.88988C10.9413 2.88988 10.0312 3.79988 10.0312 4.91988C10.0312 6.03988 10.9413 6.94988 12.0613 6.94988C13.1813 6.94988 14.0913 6.03988 14.0913 4.91988C14.0913 3.79988 13.1713 2.88988 12.0613 2.88988Z" fill="#000306" />
                                        <path d="M4.83078 20.6704C2.88078 20.6704 1.30078 19.0904 1.30078 17.1404C1.30078 15.2004 2.88078 13.6104 4.83078 13.6104C6.78078 13.6104 8.36078 15.1904 8.36078 17.1404C8.36078 19.0804 6.78078 20.6704 4.83078 20.6704ZM4.83078 15.1104C3.71078 15.1104 2.80078 16.0204 2.80078 17.1404C2.80078 18.2604 3.71078 19.1704 4.83078 19.1704C5.95078 19.1704 6.86078 18.2604 6.86078 17.1404C6.86078 16.0204 5.95078 15.1104 4.83078 15.1104Z" fill="#000306" />
                                        <path d="M19.1706 20.6704C17.2206 20.6704 15.6406 19.0904 15.6406 17.1404C15.6406 15.2004 17.2206 13.6104 19.1706 13.6104C21.1206 13.6104 22.7006 15.1904 22.7006 17.1404C22.6906 19.0804 21.1106 20.6704 19.1706 20.6704ZM19.1706 15.1104C18.0506 15.1104 17.1406 16.0204 17.1406 17.1404C17.1406 18.2604 18.0506 19.1704 19.1706 19.1704C20.2906 19.1704 21.2006 18.2604 21.2006 17.1404C21.1906 16.0204 20.2906 15.1104 19.1706 15.1104Z" fill="#000306" />
                                    </svg>
                                </button>
                                <button className="lg:hidden">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 21.6496C11.69 21.6496 11.39 21.6096 11.14 21.5196C7.32 20.2096 1.25 15.5596 1.25 8.68961C1.25 5.18961 4.08 2.34961 7.56 2.34961C9.25 2.34961 10.83 3.00961 12 4.18961C13.17 3.00961 14.75 2.34961 16.44 2.34961C19.92 2.34961 22.75 5.19961 22.75 8.68961C22.75 15.5696 16.68 20.2096 12.86 21.5196C12.61 21.6096 12.31 21.6496 12 21.6496ZM7.56 3.84961C4.91 3.84961 2.75 6.01961 2.75 8.68961C2.75 15.5196 9.32 19.3196 11.63 20.1096C11.81 20.1696 12.2 20.1696 12.38 20.1096C14.68 19.3196 21.26 15.5296 21.26 8.68961C21.26 6.0196 19.1 3.84961 16.45 3.84961C14.93 3.84961 13.52 4.55961 12.61 5.78961C12.33 6.16961 11.69 6.16961 11.41 5.78961C10.48 4.54961 9.08 3.84961 7.56 3.84961Z" fill="#404040" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <button onClick={handleAddToCart} className="h-14 flex max-sm:w-full flex-row-reverse gap-2 w-30/10 rounded-lg bg-[#FA541C] px-6 items-center justify-center font-semibold text-white transition hover:bg-orange-600">
                            <p>افزودن به سبد خرید</p>
                            <svg width="22" height="18" viewBox="0 0 22 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M18 0H2C0.89 0 0.00999999 0.89 0.00999999 2L0 14C0 15.11 0.89 16 2 16H12V14H2V8H20V2C20 0.89 19.11 0 18 0ZM18 4H2V2H18V4ZM22 13V15H19V18H17V15H14V13H17V10H19V13H22Z" fill="white" />
                            </svg>
                        </button>
                        <button className="mr-10 max-sm:hidden flex" onClick={handleToggleFavorite}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M20.6216 13.0703C20.2416 13.0703 19.9216 12.7803 19.8716 12.4003C19.6316 10.1403 18.4116 8.09035 16.5316 6.79035C16.1916 6.55035 16.1116 6.09035 16.3416 5.75035C16.5816 5.41035 17.0516 5.33035 17.3816 5.56035C19.6216 7.11035 21.0616 9.55035 21.3516 12.2403C21.3916 12.6503 21.1016 13.0203 20.6816 13.0703C20.6716 13.0703 20.6416 13.0703 20.6216 13.0703Z" fill="#000306" />
                                <path d="M3.49186 13.1203C3.46186 13.1203 3.44186 13.1203 3.41186 13.1203C3.00186 13.0703 2.70186 12.7003 2.74186 12.2903C3.01186 9.60026 4.44186 7.17026 6.65186 5.60026C6.99186 5.36026 7.46186 5.44026 7.70186 5.78026C7.94186 6.12026 7.86186 6.59026 7.52186 6.83026C5.66186 8.14026 4.46186 10.1903 4.23186 12.4503C4.20186 12.8303 3.87186 13.1203 3.49186 13.1203Z" fill="#000306" />
                                <path d="M12.06 22.61C10.58 22.61 9.16997 22.27 7.84997 21.61C7.47997 21.42 7.32997 20.97 7.51997 20.6C7.70997 20.23 8.15997 20.08 8.52997 20.27C10.69 21.36 13.29 21.38 15.47 20.33C15.84 20.15 16.29 20.31 16.47 20.68C16.65 21.05 16.49 21.5 16.12 21.68C14.84 22.3 13.48 22.61 12.06 22.61Z" fill="#000306" />
                                <path d="M12.0613 8.43988C10.1113 8.43988 8.53125 6.85988 8.53125 4.90988C8.53125 2.95988 10.1113 1.37988 12.0613 1.37988C14.0113 1.37988 15.5913 2.95988 15.5913 4.90988C15.5913 6.85988 14.0013 8.43988 12.0613 8.43988ZM12.0613 2.88988C10.9413 2.88988 10.0312 3.79988 10.0312 4.91988C10.0312 6.03988 10.9413 6.94988 12.0613 6.94988C13.1813 6.94988 14.0913 6.03988 14.0913 4.91988C14.0913 3.79988 13.1713 2.88988 12.0613 2.88988Z" fill="#000306" />
                                <path d="M4.83078 20.6704C2.88078 20.6704 1.30078 19.0904 1.30078 17.1404C1.30078 15.2004 2.88078 13.6104 4.83078 13.6104C6.78078 13.6104 8.36078 15.1904 8.36078 17.1404C8.36078 19.0804 6.78078 20.6704 4.83078 20.6704ZM4.83078 15.1104C3.71078 15.1104 2.80078 16.0204 2.80078 17.1404C2.80078 18.2604 3.71078 19.1704 4.83078 19.1704C5.95078 19.1704 6.86078 18.2604 6.86078 17.1404C6.86078 16.0204 5.95078 15.1104 4.83078 15.1104Z" fill="#000306" />
                                <path d="M19.1706 20.6704C17.2206 20.6704 15.6406 19.0904 15.6406 17.1404C15.6406 15.2004 17.2206 13.6104 19.1706 13.6104C21.1206 13.6104 22.7006 15.1904 22.7006 17.1404C22.6906 19.0804 21.1106 20.6704 19.1706 20.6704ZM19.1706 15.1104C18.0506 15.1104 17.1406 16.0204 17.1406 17.1404C17.1406 18.2604 18.0506 19.1704 19.1706 19.1704C20.2906 19.1704 21.2006 18.2604 21.2006 17.1404C21.1906 16.0204 20.2906 15.1104 19.1706 15.1104Z" fill="#000306" />
                            </svg>
                        </button>
                        <button className="max-sm:hidden" onClick={handleToggleFavorite}>
                            <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill={isFavorite ? "#FF0000" : "none"} stroke={isFavorite ? "#FF0000" : "#404040"} strokeWidth="1.8" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-89/100 mr-5 mt-25 flex flex-col items-start" dir="rtl">
                <div className="flex items-center gap-2 max-sm:justify-around w-full">
                    {tabs.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`lg:px-5 px-3 py-3 rounded-lg text-[20px] md:text-[24px] transition-all duration-200 ${activeTab === tab.id ? "bg-blue-100 text-blue-900 font-semibold" : "text-gray-500 hover:bg-gray-100 hover:text-gray-900"}`}>{tab.title}</button>
                    ))}
                </div>
                <div className="mt-5 w-full">
                    {activeTab === "features" && (
                        <div className="border border-gray-200 rounded-xl p-6">
                            <div className="grid w-full gap-6">
                                <div className="flex justify-start items-start border-b border-gray-200 pb-4">
                                    <div className="flex gap-2 w-18/100 justify-start max-sm:w-35/100 items-center">
                                        <span className="w-1 h-1 bg-black rounded-full"></span>
                                        <span className="text-right max-sm:text-[14px] text-[20px] text-black">جنس</span>
                                    </div>
                                    <span className="text-right max-sm:text-[14px] max-sm:w-6/10 w-2/10 font-medium text-black">چرم مصنوعی</span>
                                </div>
                                <div className="flex justify-start items-start border-b border-gray-200 pb-4">
                                    <div className="flex gap-2 w-18/100 justify-start max-sm:w-35/100 items-center">
                                        <span className="w-1 h-1 bg-black rounded-full"></span>
                                        <span className="text-right max-sm:text-[14px] text-[20px] text-black">جنس زیره</span>
                                    </div>
                                    <span className="text-right w-2/10 max-sm:w-6/10 max-sm:text-[14px] font-medium text-black">ترموپلاستیک پلی اورتان (TPU)</span>
                                </div>
                                <div className="flex justify-start items-start border-b border-gray-200 pb-4">
                                    <div className="flex gap-2 w-18/100 justify-start max-sm:w-35/100 items-center">
                                        <span className="w-1 h-1 bg-black rounded-full"></span>
                                        <span className="text-right max-sm:text-[14px] text-[20px] text-black">ویژگی‌های زیره</span>
                                    </div>
                                    <div className="">
                                        <div className="flex items-center gap-3"><span className="w-1 h-1 bg-black rounded-full"></span><span className="text-[20px] max-sm:text-[14px]">انعطاف پذیر</span></div>
                                        <div className="flex items-center gap-3"><span className="w-1 h-1 bg-black rounded-full"></span><span className="text-[20px] max-sm:text-[14px]">قابلیت ارتجاعی</span></div>
                                        <div className="flex items-center gap-3"><span className="w-1 h-1 bg-black rounded-full"></span><span className="text-[20px] max-sm:text-[14px]">کاهش فشار وارده</span></div>
                                        <div className="flex items-center gap-3"><span className="w-1 h-1 bg-black rounded-full"></span><span className="text-[20px] max-sm:text-[14px]">مقاوم در برابر سایش</span></div>
                                    </div>
                                </div>
                                <div className="flex justify-start items-start pb-4">
                                    <div className="flex gap-2 w-18/100 justify-start max-sm:w-35/100 items-center">
                                        <span className="w-1 h-1 bg-black rounded-full"></span>
                                        <span className="text-right max-sm:text-[14px] text-[20px] text-black">مناسب برای</span>
                                    </div>
                                    <span className="text-right text-[20px] max-sm:text-[14px] max-sm:w-6/10 w-2/10 font-medium text-black">استفاده روزمره</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {activeTab === "description" && (
                        <div className="border max-sm:mb-90 border-gray-200 rounded-xl p-8">
                            <p style={{ height: h, overflow: "hidden" }} className="text-sm md:text-[20px] text-gray-600 leading-10 text-justify">
                                یکی از دلایلی که باعث شده نایک به انتخاب اول تمامی ورزشکار های دنیا تبدیل شود. تکنولوژی ها و ویژگی های پیشرفته ای است که نایکی در تولید کفش های خود از آن بهره میبرد. کفش های نایک علاوه بر داشتن تکنولوژی هایی مانند Nike Air, Zoomx, Nike React و … دارای برخی ویژگی ها مثل وزن سبک، انعطاف پذیری بالا، تنفس پذیری و قابلیت تهویه هوا، بازگشت انرژی و راحتی فوق العاده است که در ادامه به آنها میپردازیم.
                                اما توجه داشته باشید که تنها کفش های نایک اصل دارای چنین مشخصاتی هستند و کفش های کپی، های کپی، کوالی مستر و … فاقد هر گونه تکنولوژی و فناوری هستند و تنها ظاهر نمونه اورجینال کفش را تولید میکنند. اگر قصد خرید کفش نایک اصل را دارید یا میخواهید از اصل بودن کفش نایک خود مطمئن شوید توصیه میکنیم مقاله تشخیص کفش نایک اصل را مطالعه کنید.
                            </p>
                            <button onClick={btnmorehandler} className="mt-4 text-[#FA541C] hidden max-sm:flex font-medium cursor-pointer">{btnmore}</button>
                        </div>
                    )}
                    {activeTab === "reviews" && (
                        <div className="flex flex-row-reverse max-sm:flex-col-reverse w-full gap-5">
                            <div className="w-35/100 max-sm:w-full rounded-xl p-5 h-fit">
                                <h3 className="font-bold border-b-2 border-gray-200 pb-2 text-gray-800 text-[18px] mb-2">نظرت رو برامون بنویس</h3>
                                <p className="text-[14px] text-gray-500 mb-5">ایمیل شما نشان داده نمی‌شود.</p>
                                <form className="flex flex-col gap-5">
                                    <div className="flex flex-col">
                                        <label className="flex items-center text-sm text-gray-600 z-10 relative bg-white right-3 top-3 max-sm:w-15/100 max-sm:top-0 justify-start w-5/100">نام</label>
                                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="flex items-center text-sm text-gray-600 z-10 relative bg-white right-3 top-3 justify-start max-sm:w-15/100 max-sm:top-0 w-8/100">ایمیل</label>
                                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none focus:border-blue-500" />
                                    </div>
                                    <div className="flex flex-col">
                                        <label className="flex items-center text-sm text-gray-600 z-10 relative bg-white right-3 top-3 justify-start max-sm:w-15/100 max-sm:top-0 w-12/100">نظر شما</label>
                                        <textarea rows={5} value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border border-gray-300 rounded-lg p-3 outline-none resize-none focus:border-blue-500 max-sm:h-[42px]" />
                                    </div>
                                    <div className="flex flex-row-reverse">
                                        <button onClick={btnnazarhandler} type="button" className="w-5/10 text-[#FA541C] border-2 cursor-pointer hover:bg-orange-600 hover:text-white border-[#FA541C] rounded-lg py-3 transition">ثبت نظر و امتیاز</button>
                                        <div className="flex w-5/10 items-center gap-5 mt-3">
                                            {[1, 2, 3, 4, 5].map((t) => (
                                                <button key={t} type="button" className={`text-2xl transition ${t <= rating ? "text-orange-400" : "text-gray-200"}`} onClick={() => btnratinghandler(t)}>★</button>
                                            ))}
                                        </div>
                                    </div>
                                    <h1 className="text-red-500 text-[18px]">{er}</h1>
                                </form>
                            </div>
                            <div className="lg:col-span-2 w-65/100 max-sm:w-full flex flex-col gap-4">
                                {[...nazar, ...userComments].map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-xl p-5 bg-white">
                                        <div className="flex items-center justify-between mb-5">
                                            <div className="flex items-center gap-3">
                                                <img src={item.avatar || "/nike2.png"} alt={item.name} className="w-12 h-12 rounded-full object-cover" />
                                                <div><h4 className="font-semibold text-gray-800">{item.name}</h4></div>
                                            </div>
                                            <div className="text-lg" dir="ltr">
                                                {[1, 2, 3, 4, 5].map((t) => (<span key={t} className={t <= (item.rating || 0) ? "text-orange-400" : "text-gray-200"}>★</span>))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600 text-sm md:text-base leading-7">{item.text || item.title}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="flex flex-col mr-3 mt-10 lg:mt-40 w-89/100 gap-8 items-start">
                <h1 className="text-[#032340] max-sm:hidden text-[28px]">محصولات مرتبط</h1>
                <div className={`grid grid-cols-1 w-full max-sm:hidden sm:grid-cols-2 xl:flex xl:items-center gap-5`}>
                    {filteredsg.map((item) => (
                        <NavLink to={`/Detail/${item.id}`} key={item.id} className="flex w-12/10 lg:flex-col overflow-hidden bg-[#FAFAFA] rounded-2xl">
                            <div className="relative">
                                <img src={item.image} alt={item.title} loading="lazy" className="w-full max-sm:h-40 xl:h-72 object-cover" />
                                {item.discount > 0 && (<div className="absolute top-0 right-0 w-25/100 max-sm:w-4/10 max-sm:p-[1px] max-sm:text-[12px] p-1 px-4 flex items-center justify-center bg-[#FA541C] text-white text-sm font-medium rounded-bl-2xl">٪{item.discount.toLocaleString("fa-IR")}</div>)}
                            </div>
                            <div className="w-full flex flex-col items-end text-right gap-2 max-sm:gap-4 px-4 py-4">
                                <div className="flex w-full justify-between">
                                    <p className="w-full text-right text-sm font-medium truncate">{item.title}</p>
                                    {item.rating !== undefined && (<div className="w-full flex flex-row-reverse items-center justify-start gap-1">{[1, 2, 3, 4, 5].map((star) => (<span key={star} className={`text-sm ${star <= Math.round(item.rating) ? "text-[#FF991F]" : "text-gray-300"}`}>★</span>))}</div>)}
                                </div>
                                {item.sizes?.length > 0 && (<p className="w-full text-right text-xs text-gray-600">از سایز{" "}{item.sizes[0]}{" "}تا{" "}{item.sizes[item.sizes.length - 1]}</p>)}
                                <div className="w-full flex flex-col items-start gap-1">
                                    <div className="flex flex-row-reverse gap-1 items-center">
                                        {item.oldPrice > item.price && (<p className="text-[11px] text-gray-400 lg:line-through">{item.oldPrice.toLocaleString("fa-IR")}{" "}تومان</p>)}
                                        <p className="text-sm font-bold text-gray-800">{item.price.toLocaleString("fa-IR")}{" "}تومان</p>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-start mt-1">
                                    {item.colors?.map((color, index) => (<span key={index} className="size-4 rounded-full border border-gray-200" style={{ backgroundColor: color, marginRight: index === 0 ? "0" : "-5px" }} />))}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
                <div className={`grid-cols-2 w-full hidden max-sm:grid sm:grid-cols-2 xl:items-center gap-5`}>
                    {filteredlo.map((item) => (
                        <NavLink to={`/Detail/${item.id}`} key={item.id} className="flex w-12/10 max-sm:w-full max-sm:flex-col lg:flex-col overflow-hidden bg-[#FAFAFA] rounded-2xl">
                            <div className="relative">
                                <img src={item.image} alt={item.title} loading="lazy" className="w-full max-sm:h-40 xl:h-72 object-cover" />
                                {item.discount > 0 && (<div className="absolute top-0 right-0 w-25/100 max-sm:w-4/10 max-sm:p-[1px] max-sm:text-[12px] p-1 px-4 flex items-center justify-center bg-[#FA541C] text-white text-sm font-medium rounded-bl-2xl">٪{item.discount.toLocaleString("fa-IR")}</div>)}
                            </div>
                            <div className="w-full flex flex-col items-end text-right gap-2 max-sm:gap-4 px-4 py-4">
                                <div className="flex w-full justify-between">
                                    <p className="w-full text-right text-sm font-medium truncate">{item.title}</p>
                                    {item.rating !== undefined && (<div className="w-full flex flex-row-reverse items-center justify-start gap-1">{[1, 2, 3, 4, 5].map((star) => (<span key={star} className={`text-sm ${star <= Math.round(item.rating) ? "text-[#FF991F]" : "text-gray-300"}`}>★</span>))}</div>)}
                                </div>
                                {item.sizes?.length > 0 && (<p className="w-full text-right text-xs text-gray-600">از سایز{" "}{item.sizes[0]}{" "}تا{" "}{item.sizes[item.sizes.length - 1]}</p>)}
                                <div className="w-full flex flex-col items-start gap-1">
                                    <div className="flex flex-row-reverse gap-1 items-center">
                                        {item.oldPrice > item.price && (<p className="text-[11px] text-gray-400 lg:line-through">{item.oldPrice.toLocaleString("fa-IR")}{" "}تومان</p>)}
                                        <p className="text-sm font-bold text-gray-800">{item.price.toLocaleString("fa-IR")}{" "}تومان</p>
                                    </div>
                                </div>
                                <div className="w-full flex items-center justify-start mt-1">
                                    {item.colors?.map((color, index) => (<span key={index} className="size-4 rounded-full border border-gray-200" style={{ backgroundColor: color, marginRight: index === 0 ? "0" : "-5px" }} />))}
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
            <div dir="ltr" className="hidden lg:flex mt-30 mb-15 w-full flex-col-reverse p-10 items-center pt-15 bg-[#F9F9F9]">
                <div className="flex max-sm:flex-col-reverse items-center gap-5 lg:gap-0">
                    <p className="text-center lg:text-right font-medium lg:text-[28px] lg:w-4/10 lg:leading-12 w-8/10">با بیش از ده سال سابقه فروش لوازم ورزشی و لباس های ورزشی</p>
                    <div className="flex w-8/10 justify-around lg:justify-center gap-8">
                        <div className="w-25/100 lg:w-25/100 gap-4 max-sm:gap-1 lg:gap-10 flex bg-[#EBF5FF] lg:p-5 p-2 flex-col border border-[#CFE8FF] rounded-2xl items-center">
                            <svg className="flex lg:hidden" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.8632 6.18626L11.9332 0.646255C10.8632 -0.213745 9.13319 -0.213745 8.07319 0.636256L1.14319 6.18626C0.363195 6.80626 -0.136805 8.11625 0.0331948 9.09626L1.36319 17.0563C1.60319 18.4763 2.96319 19.6263 4.40319 19.6263H15.6032C17.0332 19.6263 18.4032 18.4663 18.6432 17.0563L19.9732 9.09626C20.1332 8.11625 19.6332 6.80626 18.8632 6.18626ZM10.0032 13.3163C8.62319 13.3163 7.50319 12.1963 7.50319 10.8163C7.50319 9.43626 8.62319 8.31626 10.0032 8.31626C11.3832 8.31626 12.5032 9.43626 12.5032 10.8163C12.5032 12.1963 11.3832 13.3163 10.0032 13.3163Z" fill="#2F5F8A" /></svg>
                            <svg className="hidden lg:flex" width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.7264 12.3725L23.8664 1.29251C21.7264 -0.427489 18.2664 -0.427489 16.1464 1.27251L2.28639 12.3725C0.72639 13.6125 -0.273611 16.2325 0.0663895 18.1925L2.72639 34.1125C3.20639 36.9525 5.92639 39.2525 8.80639 39.2525H31.2064C34.0664 39.2525 36.8064 36.9325 37.2864 34.1125L39.9464 18.1925C40.2664 16.2325 39.2664 13.6125 37.7264 12.3725ZM20.0064 26.6325C17.2464 26.6325 15.0064 24.3925 15.0064 21.6325C15.0064 18.8725 17.2464 16.6325 20.0064 16.6325C22.7664 16.6325 25.0064 18.8725 25.0064 21.6325C25.0064 24.3925 22.7664 26.6325 20.0064 26.6325Z" fill="#2F5F8A" /></svg>
                            <p className="flex w-8/10 text-[12px] lg:gap-1 lg:flex-row-reverse lg:pb-5 lg:text-[18px] lg:font-semibold text-[#032340] font-normal items-center max-sm:flex-col">پرداخت<span className="">در منزل</span></p>
                        </div>
                        <div className="w-25/100 lg:w-25/100 gap-4 max-sm:gap-1 lg:gap-10 flex bg-[#EBF5FF] lg:p-5 p-2 flex-col border border-[#CFE8FF] rounded-2xl items-center">
                            <svg className="flex lg:hidden" width="32" height="24" viewBox="0 0 32 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M23.0031 7C23.0031 7.18 22.9931 7.34999 22.9731 7.51999C22.8531 8.96999 22.2131 10.28 21.2431 11.24C20.1631 12.33 18.6631 13 17.0031 13H13.8731C13.3731 13 12.9531 13.37 12.8831 13.86L12.1231 19.14C12.0631 19.53 11.7831 19.85 11.4131 19.95C11.3231 19.99 11.2331 20 11.1331 20H9.18313C8.56313 20 8.09314 19.45 8.19314 18.84L10.5831 4.51001C10.8231 3.06001 12.0731 2 13.5431 2H18.0031C20.7631 2 23.0031 4.24 23.0031 7Z" fill="#2F5F8A" /><path d="M25.0027 10.9997C25.0027 12.3797 24.4427 13.6297 23.5427 14.5397C22.6327 15.4397 21.3827 15.9997 20.0027 15.9997H17.8527C17.3627 15.9997 16.9427 16.3497 16.8627 16.8397L16.1427 21.1597C16.0627 21.6497 15.6427 21.9997 15.1527 21.9997H12.2227C12.0427 21.9997 11.8827 21.9597 11.7427 21.8797C11.5227 21.7597 11.6627 21.4697 11.9027 21.3697C12.8027 21.0797 13.4627 20.3097 13.6027 19.3497L14.2427 14.9297C14.2827 14.6797 14.4927 14.4997 14.7327 14.4997H17.0027C19.0127 14.4997 20.9027 13.7197 22.3027 12.3097C23.1327 11.4897 23.7527 10.4797 24.1127 9.38967C24.1927 9.13967 24.5227 9.08967 24.6327 9.31967C24.8727 9.83967 25.0027 10.3997 25.0027 10.9997Z" fill="#2F5F8A" /></svg>
                            <svg className="hidden lg:flex" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M37.9985 14C37.9985 14.36 37.9785 14.7 37.9385 15.04C37.6985 17.94 36.4185 20.56 34.4785 22.48C32.3185 24.66 29.3185 26 25.9985 26H19.7385C18.7385 26 17.8985 26.74 17.7585 27.72L16.2385 38.28C16.1185 39.06 15.5585 39.7 14.8185 39.9C14.6385 39.98 14.4585 40 14.2585 40H10.3585C9.11846 40 8.17848 38.9 8.37848 37.68L13.1584 9.02002C13.6384 6.12002 16.1385 4 19.0785 4H27.9985C33.5185 4 37.9985 8.48 37.9985 14Z" fill="#2F5F8A" /><path d="M41.9975 21.9993C41.9975 24.7593 40.8775 27.2593 39.0775 29.0793C37.2575 30.8793 34.7575 31.9993 31.9975 31.9993H27.6975C26.7175 31.9993 25.8775 32.6993 25.7175 33.6793L24.2776 42.3193C24.1176 43.2993 23.2775 43.9993 22.2975 43.9993H16.4375C16.0775 43.9993 15.7575 43.9193 15.4775 43.7593C15.0375 43.5193 15.3175 42.9393 15.7975 42.7393C17.5975 42.1593 18.9175 40.6193 19.1975 38.6993L20.4775 29.8593C20.5575 29.3593 20.9775 28.9993 21.4575 28.9993H25.9975C30.0175 28.9993 33.7975 27.4393 36.5975 24.6193C38.2575 22.9793 39.4975 20.9593 40.2175 18.7793C40.3775 18.2793 41.0375 18.1793 41.2575 18.6393C41.7375 19.6793 41.9975 20.7993 41.9975 21.9993Z" fill="#2F5F8A" /></svg>
                            <p className="flex text-[12px] lg:gap-1 lg:flex-row-reverse lg:pb-5 lg:text-[18px] lg:font-semibold text-[#032340] font-normal max-sm:flex-col items-center">پرداخت<span>قسطی</span></p>
                        </div>
                        <div className="w-25/100 lg:w-25/100 gap-4 max-sm:gap-1 lg:gap-10 flex bg-[#EBF5FF] lg:p-5 p-2 flex-col border border-[#CFE8FF] rounded-2xl items-center">
                            <svg className="flex lg:hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M21.5 15.5C21.78 15.5 22 15.72 22 16V17C22 18.66 20.66 20 19 20C19 18.35 17.65 17 16 17C14.35 17 13 18.35 13 20H11C11 18.35 9.65 17 8 17C6.35 17 5 18.35 5 20C3.34 20 2 18.66 2 17V15C2 14.45 2.45 14 3 14H12.5C13.88 14 15 12.88 15 11.5V6C15 5.45 15.45 5 16 5H16.84C17.56 5 18.22 5.39 18.58 6.01L19.22 7.13C19.31 7.29 19.19 7.5 19 7.5C17.62 7.5 16.5 8.62 16.5 10V13C16.5 14.38 17.62 15.5 19 15.5H21.5Z" fill="#2F5F8A" /><path d="M8 22C9.10457 22 10 21.1046 10 20C10 18.8954 9.10457 18 8 18C6.89543 18 6 18.8954 6 20C6 21.1046 6.89543 22 8 22Z" fill="#2F5F8A" /><path d="M16 22C17.1046 22 18 21.1046 18 20C18 18.8954 17.1046 18 16 18C14.8954 18 14 18.8954 14 20C14 21.1046 14.8954 22 16 22Z" fill="#2F5F8A" /><path d="M22 12.53V14H19C18.45 14 18 13.55 18 13V10C18 9.45 18.45 9 19 9H20.29L21.74 11.54C21.91 11.84 22 12.18 22 12.53Z" fill="#2F5F8A" /><path d="M13.08 2H5.69C3.65 2 2 3.65 2 5.69V12.07C2 12.62 2.45 13.07 3 13.07H12.15C13.17 13.07 14 12.24 14 11.22V2.92C14 2.41 13.59 2 13.08 2ZM10.07 7.07L7.98 9.09C7.83 9.23 7.64 9.3 7.46 9.3C7.27 9.3 7.08 9.23 6.94 9.09L5.93 8.13C5.63 7.84 5.62 7.36 5.91 7.06C6.19 6.76 6.67 6.76 6.97 7.04L7.46 7.51L9.03 5.99C9.33 5.7 9.8 5.71 10.09 6.01C10.38 6.31 10.37 6.78 10.07 7.07Z" fill="#2F5F8A" /></svg>
                            <svg className="hidden lg:flex" width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M43 31C43.56 31 44 31.44 44 32V34C44 37.32 41.32 40 38 40C38 36.7 35.3 34 32 34C28.7 34 26 36.7 26 40H22C22 36.7 19.3 34 16 34C12.7 34 10 36.7 10 40C6.68 40 4 37.32 4 34V30C4 28.9 4.9 28 6 28H25C27.76 28 30 25.76 30 23V12C30 10.9 30.9 10 32 10H33.68C35.12 10 36.44 10.78 37.16 12.02L38.44 14.26C38.62 14.58 38.38 15 38 15C35.24 15 33 17.24 33 20V26C33 28.76 35.24 31 38 31H43Z" fill="#2F5F8A" /><path d="M16 44C18.2091 44 20 42.2091 20 40C20 37.7909 18.2091 36 16 36C13.7909 36 12 37.7909 12 40C12 42.2091 13.7909 44 16 44Z" fill="#2F5F8A" /><path d="M32 44C34.2091 44 36 42.2091 36 40C36 37.7909 34.2091 36 32 36C29.7909 36 28 37.7909 28 40C28 42.2091 29.7909 44 32 44Z" fill="#2F5F8A" /><path d="M44 25.06V28H38C36.9 28 36 27.1 36 26V20C36 18.9 36.9 18 38 18H40.58L43.48 23.08C43.82 23.68 44 24.36 44 25.06Z" fill="#2F5F8A" /><path d="M26.16 4H11.38C7.3 4 4 7.3 4 11.38V24.14C4 25.24 4.9 26.14 6 26.14H24.3C26.34 26.14 28 24.48 28 22.44V5.84C28 4.82 27.18 4 26.16 4ZM20.14 14.14L15.96 18.18C15.66 18.46 15.28 18.6 14.92 18.6C14.54 18.6 14.16 18.46 13.88 18.18L11.86 16.26C11.26 15.68 11.24 14.72 11.82 14.12C12.38 13.52 13.34 13.52 13.94 14.08L14.92 15.02L18.06 11.98C18.66 11.4 19.6 11.42 20.18 12.02C20.76 12.62 20.74 13.56 20.14 14.14Z" fill="#2F5F8A" /></svg>
                            <p className="flex text-[12px] lg:gap-1 lg:flex-row-reverse lg:pb-5 lg:text-[18px] lg:font-semibold text-[#032340] font-normal max-sm:flex-col items-center">ارسال<span>سریع</span></p>
                        </div>
                    </div>
                </div>
            </div>
            {showAddedModal && (<AddedToCartModal product={addedProduct} onClose={() => setShowAddedModal(false)} />)}
        </div>
    );
}