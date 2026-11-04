import { useState } from "react";
import { products } from "../../core/constant";
import { NavLink } from "react-router";

export default function Product() {
    const [sort, setSort] = useState("default");
    const [hidefilterprice, sethidefilterprice] = useState("hidden");
    const [hidefiltercolor, sethidefiltercolor] = useState("hidden");
    const [hidefiltersize, sethidefiltersize] = useState("hidden");
    const [hidefilterbrand, sethidefilterbrand] = useState("hidden");

    const minLimit = 0;
    const maxLimit = 3000000;

    const [minPrice, setMinPrice] = useState(minLimit);
    const [maxPrice, setMaxPrice] = useState(maxLimit);

    const [selectedBrands, setSelectedBrands] = useState([]);
    const [brandSearch, setBrandSearch] = useState("");
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [onlyAvailable, setOnlyAvailable] = useState(false);
    const [onlyDiscount, setOnlyDiscount] = useState(false);

    const [currentPage, setCurrentPage] = useState(1);
    const productPerPage = 9;

    const handleBrand = (brand) => {
        setSelectedBrands((prev) => prev.includes(brand) ? prev.filter((item) => item !== brand) : [...prev, brand]);
        setCurrentPage(1);
    };

    const handleColor = (color) => {
        setSelectedColors((prev) => prev.includes(color) ? prev.filter((item) => item !== color) : [...prev, color]);
        setCurrentPage(1);
    };

    const handleSize = (size) => {
        setSelectedSizes((prev) => prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]);
        setCurrentPage(1);
    };

    const filteredProducts = products.filter((item) => {
        const priceCondition = item.price >= minPrice && item.price <= maxPrice;
        const brandCondition = selectedBrands.length === 0 || selectedBrands.includes(item.brand);
        const colorCondition = selectedColors.length === 0 || item.colors?.some((color) => selectedColors.includes(color));
        const sizeCondition = selectedSizes.length === 0 || item.sizes?.some((size) => selectedSizes.includes(size));
        const availabilityCondition = !onlyAvailable || item.inStock;
        const discountCondition = !onlyDiscount || item.discount > 0;

        return priceCondition && brandCondition && colorCondition && sizeCondition && availabilityCondition && discountCondition;
    });

    const sortedProducts = [...filteredProducts].sort((a, b) => {
        if (sort === "expensive") return b.price - a.price;
        if (sort === "cheap") return a.price - b.price;
        if (sort === "newest") return b.id - a.id;
        return 0;
    });

    const totalPages = Math.ceil(sortedProducts.length / productPerPage);
    const safePage = Math.min(currentPage, Math.max(totalPages, 1));
    const startIndex = (safePage - 1) * productPerPage;
    const currentProducts = sortedProducts.slice(startIndex, startIndex + productPerPage);

    const changePage = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const clearFilters = () => {
        setMinPrice(minLimit);
        setMaxPrice(maxLimit);
        setSelectedBrands([]);
        setSelectedColors([]);
        setSelectedSizes([]);
        setOnlyAvailable(false);
        setOnlyDiscount(false);
        setBrandSearch("");
        setSort("default");
        setCurrentPage(1);
    };

    const minPercent = (minPrice / maxLimit) * 100;
    const maxPercent = (maxPrice / maxLimit) * 100;

    const brands = [...new Set(products.map((item) => item.brand).filter(Boolean))];

    const filteredBrands = brands.filter((brand) => brand.toLowerCase().includes(brandSearch.toLowerCase()));

    const colors = [...new Set(products.flatMap((item) => item.colors || []))];
    const sizes = [...new Set(products.flatMap((item) => item.sizes || []))];

    const Toggle = ({ checked, onChange }) => {
        return (
            <button type="button" onClick={() => onChange(!checked)} className={`relative w-12 h-6 rounded-full transition-all duration-200 shrink-0 ${checked ? "bg-[#021526]" : "bg-gray-300"}`}>
                <span className={`absolute top-1/2 -translate-y-1/2 size-5 rounded-full bg-white shadow-sm transition-all duration-200 ${checked ? "right-0.5" : "left-0.5"}`} />
            </button>
        );
    };

    const btnpricehandler = () => {
        if (hidefilterprice === "hidden") {
            sethidefilterprice("open");
        } else {
            sethidefilterprice("hidden");
        }
    };

    const btncolorhandler = () => {
        if (hidefiltercolor === "hidden") {
            sethidefiltercolor("open");
        } else {
            sethidefiltercolor("hidden");
        }
    };

    const btnsizehandler = () => {
        if (hidefiltersize === "hidden") {
            sethidefiltersize("open");
        } else {
            sethidefiltersize("hidden");
        }
    };

    const btnbrandhandler = () => {
        if (hidefilterbrand === "hidden") {
            sethidefilterbrand("open");
        } else {
            sethidefilterbrand("hidden");
        }
    };

    const [hidefilters, sethidefilters] = useState("hidden");
    const [hidesorts, sethidesorts] = useState("hidden");

    const hidesortshandler = () => {
        if (hidesorts === "hidden") {
            sethidesorts("open");
        } else {
            sethidesorts("hidden");
        }
    };

    const hidefiltershandler = () => {
        if (hidefilters === "hidden") {
            sethidefilters("open");
        } else {
            sethidefilters("hidden");
        }
    };

    return (
        <div dir="rtl" className="w-full mt-10 mb-10">
            <div className="w-[85%] max-sm:hidden flex mx-auto mb-8">
                <div className="flex items-center justify-end gap-3 text-sm text-gray-400">
                    <span>زنانه</span>
                    <span>←</span>
                    <span>لباس زنانه</span>
                    <span>←</span>
                    <span className="text-gray-700">تیشرت زنانه</span>
                </div>
            </div>

            <div className="w-full flex justify-center">
                <div className="w-[85%]">
                    <div className="flex flex-col lg:flex-row gap-6">
                        <div className="flex justify-between flex-row-reverse lg:hidden">
                            <button className="flex gap-2 flex-row-reverse" onClick={hidesortshandler}>
                                مرتب سازی بر اساس
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 7.75H3C2.59 7.75 2.25 7.41 2.25 7C2.25 6.59 2.59 6.25 3 6.25H21C21.41 6.25 21.75 6.59 21.75 7C21.75 7.41 21.41 7.75 21 7.75Z" fill="#000306" />
                                    <path d="M18 12.75H6C5.59 12.75 5.25 12.41 5.25 12C5.25 11.59 5.59 11.25 6 11.25H18C18.41 11.25 18.75 11.59 18.75 12C18.75 12.41 18.41 12.75 18 12.75Z" fill="#000306" />
                                    <path d="M14 17.75H10C9.59 17.75 9.25 17.41 9.25 17C9.25 16.59 9.59 16.25 10 16.25H14C14.41 16.25 14.75 16.59 14.75 17C14.75 17.41 14.41 17.75 14 17.75Z" fill="#000306" />
                                </svg>
                            </button>

                            <button className="flex gap-2 flex-row-reverse" onClick={hidefiltershandler}>
                                فیلتر
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M22 7.25H16C15.59 7.25 15.25 6.91 15.25 6.5C15.25 6.09 15.59 5.75 16 5.75H22C22.41 5.75 22.75 6.09 22.75 6.5C22.75 6.91 22.41 7.25 22 7.25Z" fill="#000306" />
                                    <path d="M6 7.25H2C1.59 7.25 1.25 6.91 1.25 6.5C1.25 6.09 1.59 5.75 2 5.75H6C6.41 5.75 6.75 6.09 6.75 6.5C6.75 6.91 6.41 7.25 6 7.25Z" fill="#000306" />
                                    <path d="M10 10.75C7.66 10.75 5.75 8.84 5.75 6.5C5.75 4.16 7.66 2.25 10 2.25C12.34 2.25 14.25 4.16 14.25 6.5C14.25 8.84 12.34 10.75 10 10.75ZM10 3.75C8.48 3.75 7.25 4.98 7.25 6.5C7.25 8.02 8.48 9.25 10 9.25C11.52 9.25 12.75 8.02 12.75 6.5C12.75 4.98 11.52 3.75 10 3.75Z" fill="#000306" />
                                    <path d="M22 18.25H18C17.59 18.25 17.25 17.91 17.25 17.5C17.25 17.09 17.59 16.75 18 16.75H22C22.41 16.75 22.75 17.09 22.75 17.5C22.75 17.91 22.41 18.25 22 18.25Z" fill="#000306" />
                                    <path d="M8 18.25H2C1.59 18.25 1.25 17.91 1.25 17.5C1.25 17.09 1.59 16.75 2 16.75H8C8.41 16.75 8.75 17.09 8.75 17.5C8.75 17.91 8.41 18.25 8 18.25Z" fill="#000306" />
                                    <path d="M14 21.75C11.66 21.75 9.75 19.84 9.75 17.5C9.75 15.16 11.66 13.25 14 13.25C16.34 13.25 18.25 15.16 18.25 17.5C18.25 19.84 16.34 21.75 14 21.75ZM14 14.75C12.48 14.75 11.25 15.98 11.25 17.5C11.25 19.02 12.48 20.25 14 20.25C15.52 20.25 16.75 19.02 16.75 17.5C16.75 15.98 15.52 14.75 14 14.75Z" fill="#000306" />
                                </svg>
                            </button>
                        </div>

                        <aside className={`${hidefilters === "open" ? "" : "hidden"} lg:!block w-full lg:w-1/4 border border-gray-200 rounded-2xl p-5 h-fit bg-white`}>
                            <div className="flex flex-row-reverse items-center justify-between mb-7">
                                <button onClick={clearFilters} className="text-[14px] font-medium text-gray-700 hover:text-[#FA541C] transition">حذف فیلترها</button>
                                <h2 className="font-bold text-sm">فیلترها</h2>
                            </div>

                            <div className="border-b border-gray-200 pb-5 mb-5">
                                <div className="flex flex-col gap-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">محصولات موجود</span>
                                        <Toggle checked={onlyAvailable} onChange={(value) => { setOnlyAvailable(value); setCurrentPage(1); }} />
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <span className="text-sm">محصولات تخفیف دار</span>
                                        <Toggle checked={onlyDiscount} onChange={(value) => { setOnlyDiscount(value); setCurrentPage(1); }} />
                                    </div>
                                </div>
                            </div>

                            <div className="py-6 border-b border-gray-100">
                                <div className="flex w-full justify-between flex-row-reverse">
                                    <button onClick={btnpricehandler}>
                                        <svg className={`${hidefilterprice === "open" ? "rotate-0" : "rotate-180"}`} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0583 5.73C10.9317 5.73 10.805 5.68333 10.705 5.58333L6.35833 1.23667C6.03833 0.916667 5.51833 0.916667 5.19833 1.23667L0.851667 5.58333C0.658333 5.77667 0.338333 5.77667 0.145 5.58333C-0.0483333 5.39 -0.0483333 5.07 0.145 4.87667L4.49167 0.53C5.19833 -0.176667 6.35167 -0.176667 7.065 0.53L11.4117 4.87667C11.605 5.07 11.605 5.39 11.4117 5.58333C11.3117 5.67667 11.185 5.73 11.0583 5.73Z" fill="#ADADAD" />
                                        </svg>
                                    </button>
                                    <h3 className="text-sm font-bold text-[#021526] text-right mb-5">قیمت</h3>
                                </div>

                                <div className={`${hidefilterprice === "open" ? "flex flex-col" : "hidden"}`}>
                                    <div className="flex flex-col gap-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 w-14 text-right">بیشترین</span>
                                            <input type="number" value={maxPrice === maxLimit ? "" : maxPrice} placeholder="وارد کنید" onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === "") {
                                                    setMaxPrice(maxLimit);
                                                    return;
                                                }
                                                const number = Math.min(Number(value), maxLimit);
                                                setMaxPrice(Math.max(number, minPrice));
                                            }} className="flex-1 h-10 bg-[#F5F5F5] rounded-xl px-3 text-xs text-right outline-none border border-transparent focus:border-[#021526]" />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-xs text-gray-500 w-14 text-right">کمترین</span>
                                            <input type="number" value={minPrice === minLimit ? "" : minPrice} placeholder="وارد کنید" onChange={(e) => {
                                                const value = e.target.value;
                                                if (value === "") {
                                                    setMinPrice(minLimit);
                                                    return;
                                                }
                                                const number = Math.max(Number(value), minLimit);
                                                setMinPrice(Math.min(number, maxPrice));
                                            }} className="flex-1 h-10 bg-[#F5F5F5] rounded-xl px-3 text-xs text-right outline-none border border-transparent focus:border-[#021526]" />
                                        </div>
                                    </div>

                                    <div className="relative w-full h-8 mt-6" dir="ltr">
                                        <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full" />
                                        <div className="absolute top-1/2 -translate-y-1/2 h-1 bg-[#021526] rounded-full" style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }} />

                                        <input type="range" min={minLimit} max={maxLimit} step={10000} value={minPrice} onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value <= maxPrice) setMinPrice(value);
                                        }} className="price-range absolute inset-0 w-full appearance-none bg-transparent pointer-events-none" aria-label="حداقل قیمت" />

                                        <input type="range" min={minLimit} max={maxLimit} step={10000} value={maxPrice} onChange={(e) => {
                                            const value = Number(e.target.value);
                                            if (value >= minPrice) setMaxPrice(value);
                                        }} className="price-range absolute inset-0 w-full appearance-none bg-transparent pointer-events-none" aria-label="حداکثر قیمت" />
                                    </div>

                                    <div className="flex justify-between text-[10px] text-gray-400 mt-1" dir="ltr">
                                        <span>Min</span>
                                        <span>Max</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-b border-gray-200 pb-5 mb-5">
                                <div className="flex mt-3 items-center justify-between mb-5">
                                    <h3 className="font-bold text-sm">رنگ</h3>
                                    <button onClick={btncolorhandler}>
                                        <svg className={`${hidefiltercolor === "open" ? "rotate-0" : "rotate-180"}`} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0583 5.73C10.9317 5.73 10.805 5.68333 10.705 5.58333L6.35833 1.23667C6.03833 0.916667 5.51833 0.916667 5.19833 1.23667L0.851667 5.58333C0.658333 5.77667 0.338333 5.77667 0.145 5.58333C-0.0483333 5.39 -0.0483333 5.07 0.145 4.87667L4.49167 0.53C5.19833 -0.176667 6.35167 -0.176667 7.065 0.53L11.4117 4.87667C11.605 5.07 11.605 5.39 11.4117 5.58333C11.3117 5.67667 11.185 5.73 11.0583 5.73Z" fill="#ADADAD" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`${hidefiltercolor === "open" ? "flex" : "hidden"} flex-wrap gap-3`}>
                                    {colors.map((color) => (
                                        <button key={color} type="button" title={color} onClick={() => handleColor(color)} className={`size-7 rounded-full transition duration-200 ${selectedColors.includes(color) ? "ring-2 ring-[#021526] ring-offset-2 scale-110" : ""}`} style={{ backgroundColor: color }} />
                                    ))}
                                </div>
                            </div>

                            <div className="border-b border-gray-200 pb-5 mb-5">
                                <div className="flex items-center justify-between mb-5">
                                    <h3 className="font-bold text-sm">سایز</h3>
                                    <button onClick={btnsizehandler}>
                                        <svg className={`${hidefiltersize === "open" ? "rotate-0" : "rotate-180"}`} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0583 5.73C10.9317 5.73 10.805 5.68333 10.705 5.58333L6.35833 1.23667C6.03833 0.916667 5.51833 0.916667 5.19833 1.23667L0.851667 5.58333C0.658333 5.77667 0.338333 5.77667 0.145 5.58333C-0.0483333 5.39 -0.0483333 5.07 0.145 4.87667L4.49167 0.53C5.19833 -0.176667 6.35167 -0.176667 7.065 0.53L11.4117 4.87667C11.605 5.07 11.605 5.39 11.4117 5.58333C11.3117 5.67667 11.185 5.73 11.0583 5.73Z" fill="#ADADAD" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`${hidefiltersize === "open" ? "flex" : "hidden"} grid grid-cols-3 gap-2`}>
                                    {sizes.map((size) => (
                                        <button key={size} type="button" onClick={() => handleSize(size)} className={`h-8 rounded text-xs transition ${selectedSizes.includes(size) ? "bg-[#021526] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{size}</button>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <div className="flex mt-1 items-center justify-between mb-4">
                                    <h3 className="font-bold text-sm">برند</h3>
                                    <button onClick={btnbrandhandler}>
                                        <svg className={`${hidefilterbrand === "open" ? "rotate-0" : "rotate-180"}`} width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M11.0583 5.73C10.9317 5.73 10.805 5.68333 10.705 5.58333L6.35833 1.23667C6.03833 0.916667 5.51833 0.916667 5.19833 1.23667L0.851667 5.58333C0.658333 5.77667 0.338333 5.77667 0.145 5.58333C-0.0483333 5.39 -0.0483333 5.07 0.145 4.87667L4.49167 0.53C5.19833 -0.176667 6.35167 -0.176667 7.065 0.53L11.4117 4.87667C11.605 5.07 11.605 5.39 11.4117 5.58333C11.3117 5.67667 11.185 5.73 11.0583 5.73Z" fill="#ADADAD" />
                                        </svg>
                                    </button>
                                </div>

                                <div className={`${hidefilterbrand === "open" ? "flex flex-col" : "hidden"}`}>
                                    <div className="relative mb-3">
                                        <input type="text" value={brandSearch} onChange={(e) => setBrandSearch(e.target.value)} placeholder="جستجو" className="w-full h-10 rounded-full bg-gray-100 border-none outline-none text-xs text-right px-4 pl-10 placeholder:text-gray-400" />
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-lg">⌕</span>
                                    </div>

                                    <div className="grid grid-cols-3 gap-2">
                                        {filteredBrands.map((brand) => (
                                            <button key={brand} type="button" onClick={() => handleBrand(brand)} className={`min-h-8 px-1 rounded text-[10px] transition truncate ${selectedBrands.includes(brand) ? "bg-[#021526] text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}>{brand}</button>
                                        ))}

                                        {filteredBrands.length === 0 && <p className="col-span-3 text-center text-xs text-gray-400 py-3">برندی پیدا نشد</p>}
                                    </div>
                                </div>
                            </div>
                        </aside>

                        <main className="w-full lg:w-3/4">
                            <div className={`${hidesorts === "open" ? "flex" : "hidden"} lg:!flex flex-wrap items-center justify-start gap-6 mb-6`}>
                                <button onClick={() => { setSort("default"); setCurrentPage(1); }} className={`text-[16px] pb-2 border-b-2 transition ${sort === "default" ? "text-[#FA541C] border-[#FA541C] font-bold" : "text-gray-600 border-transparent"}`}>پربازدیدترین</button>
                                <button onClick={() => { setSort("newest"); setCurrentPage(1); }} className={`text-[16px] pb-2 border-b-2 transition ${sort === "newest" ? "text-[#FA541C] border-[#FA541C] font-bold" : "text-gray-600 border-transparent"}`}>جدیدترین</button>
                                <button onClick={() => { setSort("expensive"); setCurrentPage(1); }} className={`text-[16px] pb-2 border-b-2 transition ${sort === "expensive" ? "text-[#FA541C] border-[#FA541C] font-bold" : "text-gray-600 border-transparent"}`}>گران ترین</button>
                                <button onClick={() => { setSort("cheap"); setCurrentPage(1); }} className={`text-[16px] pb-2 border-b-2 transition ${sort === "cheap" ? "text-[#FA541C] border-[#FA541C] font-bold" : "text-gray-600 border-transparent"}`}>ارزان ترین</button>
                            </div>

                            <div className={`grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5`}>
                                {currentProducts.map((item) => (
                                    <NavLink to={`/Detail/${item.id}`} key={item.id} className="flex lg:flex-col overflow-hidden bg-[#FAFAFA] rounded-2xl">
                                        <div className="relative">
                                            <img src={item.image} alt={item.title} loading="lazy" className="w-full h-64 max-sm:h-40 xl:h-72 object-cover" />

                                            {item.discount > 0 && (
                                                <div className="absolute top-0 right-0 w-25/100 max-sm:w-4/10 max-sm:p-[1px] max-sm:text-[12px] p-1 px-4 flex items-center justify-center bg-[#FA541C] text-white text-sm font-medium rounded-bl-2xl">
                                                    ٪{item.discount.toLocaleString("fa-IR")}
                                                </div>
                                            )}
                                        </div>

                                        <div className="w-full flex flex-col items-end text-right gap-2 max-sm:gap-4 px-4 py-4">
                                            <div className="flex w-full justify-between">
                                                <p className="w-full text-right text-sm font-medium truncate">{item.title}</p>

                                                {item.rating !== undefined && (
                                                    <div className="w-full flex flex-row-reverse items-center justify-start gap-1">
                                                        {[1, 2, 3, 4, 5].map((star) => (
                                                            <span key={star} className={`text-sm ${star <= Math.round(item.rating) ? "text-[#FF991F]" : "text-gray-300"}`}>★</span>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>

                                            {item.sizes?.length > 0 && (
                                                <p className="w-full text-right text-xs text-gray-600">
                                                    از سایز{" "}{item.sizes[0]}{" "}تا{" "}{item.sizes[item.sizes.length - 1]}
                                                </p>
                                            )}

                                            <div className="w-full flex flex-col items-start gap-1">
                                                <div className="flex flex-row-reverse gap-1 items-center">
                                                    {item.oldPrice > item.price && (
                                                        <p className="text-[11px] text-gray-400 lg:line-through">
                                                            {item.oldPrice.toLocaleString("fa-IR")}{" "}تومان
                                                        </p>
                                                    )}

                                                    <p className="text-sm font-bold text-gray-800">
                                                        {item.price.toLocaleString("fa-IR")}{" "}تومان
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="w-full flex items-center justify-start mt-1">
                                                {item.colors?.map((color, index) => (
                                                    <span key={index} className="size-4 rounded-full border border-gray-200" style={{ backgroundColor: color, marginRight: index === 0 ? "0" : "-5px" }} />
                                                ))}
                                            </div>
                                        </div>
                                    </NavLink>
                                ))}
                            </div>

                            {currentProducts.length === 0 && (
                                <div className="flex flex-col items-center justify-center py-20 gap-5">
                                    <p className="text-gray-500">محصولی با این مشخصات پیدا نشد.</p>
                                    <button onClick={clearFilters} className="bg-[#021526] text-white px-5 py-3 rounded-lg">حذف فیلترها</button>
                                </div>
                            )}

                            {totalPages > 1 && (
                                <div className="flex flex-wrap justify-center items-center gap-2 mt-10">
                                    <button disabled={safePage === 1} onClick={() => changePage(safePage - 1)} className="size-9 rounded-lg bg-gray-100 disabled:opacity-40 text-sm">‹</button>

                                    {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
                                        <button key={page} onClick={() => changePage(page)} className={`size-9 rounded-lg text-sm transition ${safePage === page ? "bg-[#021526] text-white" : "bg-white hover:bg-gray-100"}`}>
                                            {page.toLocaleString("fa-IR")}
                                        </button>
                                    ))}

                                    <button disabled={safePage === totalPages} onClick={() => changePage(safePage + 1)} className="size-9 rounded-lg bg-gray-100 disabled:opacity-40 text-sm">›</button>
                                </div>
                            )}
                        </main>
                    </div>
                </div>
            </div>
        </div>
    );
}