import { useState } from "react";
import { faqCategories } from "../../core/constant";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("shipping");
  const [searchQuery, setSearchQuery] = useState("");
  const [openQuestions, setOpenQuestions] = useState([]);
  const [openMobileCategory, setOpenMobileCategory] = useState(null);

  const currentCategory = faqCategories.find((c) => c.id === activeCategory);
  const filteredQuestions = currentCategory?.questions.filter((q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase())) || [];

  const toggleQuestion = (id) => { setOpenQuestions((prev) => prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]); };

  const toggleMobileCategory = (id) => { setOpenMobileCategory((prev) => (prev === id ? null : id)); };

  return (
    <div className="min-h-screen bg-white" dir="rtl">
      <div className="w-90/100 max-w-7xl mx-auto py-6 lg:py-10">
        <div className="flex w-full items-center justify-start gap-2 lg:gap-4 mb-4 lg:mb-8 overflow-x-auto">
          <button className="px-3 lg:px-4 py-2 rounded-xl bg-blue-50 text-blue-900 font-semibold text-sm lg:text-base whitespace-nowrap">سوالات متداول</button>
          <button className="px-3 lg:px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-sm lg:text-base whitespace-nowrap">تماس با ما</button>
          <button className="px-3 lg:px-4 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-sm lg:text-base whitespace-nowrap">نشانی ما</button>
        </div>

        <div className="relative mb-6 lg:mb-8">
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder="موضوع خود را جست و جو کنید..." className="w-full border border-gray-200 rounded-xl p-3 lg:pr-10 lg:p-4 pr-12 outline-none focus:border-[#FA541C] text-right text-sm lg:text-base" />
          <svg className="absolute right-2 top-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#868686" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        </div>

        <div className="hidden lg:flex gap-6 flex-row">
          <aside className="lg:w-3/10 flex flex-col gap-2" dir="rtl">
            {faqCategories.map((category) => (
              <button key={category.id} onClick={() => { setActiveCategory(category.id); setSearchQuery(""); setOpenQuestions([]); }} className={`flex text-[14px] flex-row-reverse items-center justify-end gap-3 px-6 py-6 rounded-xl transition ${activeCategory === category.id ? "bg-[#FFF7F4] font-semibold" : "hover:bg-gray-50"}`}>
                <span>{category.title}</span>
                <CategoryIcon name={category.icon} active={activeCategory === category.id} />
              </button>
            ))}
          </aside>

          <section className="flex-1 flex flex-col gap-4" dir="ltr">
            <div className="flex gap-2 justify-end items-center mb-4">
              <h1 className="text-2xl font-bold">{currentCategory?.title}</h1>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22.81C11.31 22.81 10.66 22.46 10.2 21.85L8.7 19.85C8.67 19.81 8.55 19.76 8.5 19.75H8C3.83 19.75 1.25 18.62 1.25 13V8C1.25 3.58 3.58 1.25 8 1.25H16C20.42 1.25 22.75 3.58 22.75 8V13C22.75 17.42 20.42 19.75 16 19.75H15.5C15.42 19.75 15.35 19.79 15.3 19.85L13.8 21.85C13.34 22.46 12.69 22.81 12 22.81ZM8 2.75C4.42 2.75 2.75 4.42 2.75 8V13C2.75 17.52 4.3 18.25 8 18.25H8.5C9.01 18.25 9.59 18.54 9.9 18.95L11.4 20.95C11.75 21.41 12.25 21.41 12.6 20.95L14.1 18.95C14.43 18.51 14.95 18.25 15.5 18.25H16C19.58 18.25 21.25 16.58 21.25 13V8C21.25 4.42 19.58 2.75 16 2.75H8Z" fill="#FA541C" />
                <path d="M12 12C11.44 12 11 11.55 11 11C11 10.45 11.45 10 12 10C12.55 10 13 10.45 13 11C13 11.55 12.56 12 12 12Z" fill="#FA541C" />
                <path d="M16 12C15.44 12 15 11.55 15 11C15 10.45 15.45 10 16 10C16.55 10 17 10.45 17 11C17 11.55 16.56 12 16 12Z" fill="#FA541C" />
                <path d="M8 12C7.44 12 7 11.55 7 11C7 10.45 7.45 10 8 10C8.55 10 9 10.45 9 11C9 11.55 8.56 12 8 12Z" fill="#FA541C" />
              </svg>
            </div>

            {filteredQuestions.length === 0 ? (
              <div className="border border-gray-200 rounded-xl p-10 text-center text-gray-500">سوالی با این عنوان یافت نشد.</div>
            ) : (
              filteredQuestions.map((item) => {
                const isOpen = openQuestions.includes(item.id);
                return (
                  <div key={item.id} className="rounded-xl overflow-hidden transition">
                    <button onClick={() => toggleQuestion(item.id)} className={`${isOpen ? "bg-[#F9F9F9]" : "bg-none"} w-full flex flex-row-reverse items-center justify-between px-5 py-4 text-right hover:bg-gray-50`}>
                      <span className="font-medium text-gray-800">{item.q}</span>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#868686" strokeWidth="2" className={`transition-transform ${isOpen ? "rotate-180" : ""}`}>
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </button>
                    {isOpen && (<div className="px-5 pb-5 bg-[#F9F9F9] text-gray-600 leading-7 pt-4 text-right">{item.a}</div>)}
                  </div>
                );
              })
            )}
          </section>
        </div>

        <div className="lg:hidden flex flex-col gap-3">
          {faqCategories.map((category) => {
            const isCategoryOpen = openMobileCategory === category.id;
            const categoryQuestions = category.questions.filter((q) => q.q.toLowerCase().includes(searchQuery.toLowerCase()) || q.a.toLowerCase().includes(searchQuery.toLowerCase()));

            return (
              <div key={category.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button onClick={() => toggleMobileCategory(category.id)} className={`w-full flex lg:flex-row-reverse  max-sm:flex-row items-center justify-between px-4 py-4 transition ${isCategoryOpen ? "bg-[#FFF7F4]" : "bg-white"}`}>
                  <div className="flex flex-row-reverse items-center gap-3">
                    <span className={`font-semibold text-[14px] ${isCategoryOpen ? "text-[#FA541C]" : "text-gray-800"}`}>{category.title}</span>
                    <CategoryIcon name={category.icon} active={isCategoryOpen} />
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={isCategoryOpen ? "#FA541C" : "#868686"} strokeWidth="2" className={`transition-transform ${isCategoryOpen ? "rotate-180" : ""}`}>
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {isCategoryOpen && (
                  <div className="flex flex-col bg-white border-t border-gray-100">
                    {categoryQuestions.length === 0 ? (
                      <div className="p-4 text-center text-gray-500 text-sm">سوالی با این عنوان یافت نشد.</div>
                    ) : (
                      categoryQuestions.map((item) => {
                        const isOpen = openQuestions.includes(item.id);
                        return (
                          <div key={item.id} className="border-b border-gray-100 last:border-b-0">
                            <button onClick={() => toggleQuestion(item.id)} className={`w-full flex flex-row-reverse items-center justify-between px-4 py-3 text-right transition ${isOpen ? "bg-[#F9F9F9]" : "bg-white"}`}>
                              <span className="text-[13px] font-medium text-gray-800 pr-2">{item.q}</span>
                              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#868686" strokeWidth="2" className={`transition-transform shrink-0 ${isOpen ? "rotate-180" : ""}`}>
                                <path d="m6 9 6 6 6-6" />
                              </svg>
                            </button>
                            {isOpen && (<div className="px-4 pb-4 bg-[#F9F9F9] text-gray-600 text-[13px] leading-7 pt-2 text-right">{item.a}</div>)}
                          </div>
                        );
                      })
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function CategoryIcon({ name, active }) {
  const color = active ? "#FA541C" : "#868686";
  if (name === "truck") return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.8348 12.292H10.0014C9.65978 12.292 9.37644 12.0087 9.37644 11.667C9.37644 11.3253 9.65978 11.042 10.0014 11.042H10.8348C11.4098 11.042 11.8764 10.5753 11.8764 10.0003V2.29199H5.00144C4.01811 2.29199 3.11809 2.82531 2.63475 3.68364C2.46809 3.98364 2.08479 4.09201 1.78479 3.92534C1.48479 3.75868 1.37642 3.37533 1.54309 3.07533C2.24309 1.82533 3.56811 1.04199 5.00144 1.04199H12.5014C12.8431 1.04199 13.1264 1.32533 13.1264 1.66699V10.0003C13.1264 11.267 12.1014 12.292 10.8348 12.292Z" fill={color} /><path d="M15.8346 17.292H15.0013C14.6596 17.292 14.3763 17.0087 14.3763 16.667C14.3763 16.092 13.9096 15.6253 13.3346 15.6253C12.7596 15.6253 12.293 16.092 12.293 16.667C12.293 17.0087 12.0096 17.292 11.668 17.292H8.33464C7.99297 17.292 7.70964 17.0087 7.70964 16.667C7.70964 16.092 7.24297 15.6253 6.66797 15.6253C6.09297 15.6253 5.6263 16.092 5.6263 16.667C5.6263 17.0087 5.34297 17.292 5.0013 17.292H4.16797C2.44297 17.292 1.04297 15.892 1.04297 14.167C1.04297 13.8253 1.3263 13.542 1.66797 13.542C2.00964 13.542 2.29297 13.8253 2.29297 14.167C2.29297 15.2003 3.13464 16.042 4.16797 16.042H4.45962C4.73462 15.0837 5.61797 14.3753 6.66797 14.3753C7.71797 14.3753 8.60132 15.0837 8.87632 16.042H11.1346C11.4096 15.0837 12.293 14.3753 13.343 14.3753C14.393 14.3753 15.2763 15.0837 15.5513 16.042H15.8346C16.868 16.042 17.7096 15.2003 17.7096 14.167V12.292H15.8346C15.0346 12.292 14.3763 11.6337 14.3763 10.8337V8.33366C14.3763 7.53366 15.0263 6.87533 15.8346 6.87533L14.943 5.317C14.7596 4.992 14.4097 4.79199 14.0347 4.79199H13.1263V10.0003C13.1263 11.267 12.1013 12.292 10.8346 12.292H10.0013C9.65964 12.292 9.3763 12.0087 9.3763 11.667C9.3763 11.3253 9.65964 11.042 10.0013 11.042H10.8346C11.4096 11.042 11.8763 10.5753 11.8763 10.0003V4.16699C11.8763 3.82533 12.1596 3.54199 12.5013 3.54199H14.0347C14.8597 3.54199 15.618 3.98367 16.0263 4.70034L17.4513 7.192C17.5596 7.38366 17.5596 7.62533 17.4513 7.817C17.343 8.00866 17.1346 8.12533 16.9096 8.12533H15.8346C15.718 8.12533 15.6263 8.21699 15.6263 8.33366V10.8337C15.6263 10.9503 15.718 11.042 15.8346 11.042H18.3346C18.6763 11.042 18.9596 11.3253 18.9596 11.667V14.167C18.9596 15.892 17.5596 17.292 15.8346 17.292Z" fill={color} /><path d="M6.66667 18.9583C5.4 18.9583 4.375 17.9333 4.375 16.6667C4.375 15.4 5.4 14.375 6.66667 14.375C7.93333 14.375 8.95833 15.4 8.95833 16.6667C8.95833 17.9333 7.93333 18.9583 6.66667 18.9583ZM6.66667 15.625C6.09167 15.625 5.625 16.0917 5.625 16.6667C5.625 17.2417 6.09167 17.7083 6.66667 17.7083C7.24167 17.7083 7.70833 17.2417 7.70833 16.6667C7.70833 16.0917 7.24167 15.625 6.66667 15.625Z" fill={color} /><path d="M13.3346 18.9583C12.068 18.9583 11.043 17.9333 11.043 16.6667C11.043 15.4 12.068 14.375 13.3346 14.375C14.6013 14.375 15.6263 15.4 15.6263 16.6667C15.6263 17.9333 14.6013 18.9583 13.3346 18.9583ZM13.3346 15.625C12.7596 15.625 12.293 16.0917 12.293 16.6667C12.293 17.2417 12.7596 17.7083 13.3346 17.7083C13.9096 17.7083 14.3763 17.2417 14.3763 16.6667C14.3763 16.0917 13.9096 15.625 13.3346 15.625Z" fill={color} /><path d="M18.3333 12.2917H15.8333C15.0333 12.2917 14.375 11.6333 14.375 10.8333V8.33333C14.375 7.53333 15.0333 6.875 15.8333 6.875H16.9083C17.1333 6.875 17.3417 6.99167 17.45 7.19167L18.875 9.69167C18.925 9.78334 18.9583 9.89167 18.9583 10V11.6667C18.9583 12.0083 18.675 12.2917 18.3333 12.2917ZM15.8333 8.125C15.7167 8.125 15.625 8.21667 15.625 8.33333V10.8333C15.625 10.95 15.7167 11.0417 15.8333 11.0417H17.7083V10.1667L16.5416 8.125H15.8333Z" fill={color} /><path d="M6.66797 7.29199H1.66797C1.3263 7.29199 1.04297 7.00866 1.04297 6.66699C1.04297 6.32533 1.3263 6.04199 1.66797 6.04199H6.66797C7.00964 6.04199 7.29297 6.32533 7.29297 6.66699C7.29297 7.00866 7.00964 7.29199 6.66797 7.29199Z" fill={color} /><path d="M5.0013 9.79199H1.66797C1.3263 9.79199 1.04297 9.50866 1.04297 9.16699C1.04297 8.82533 1.3263 8.54199 1.66797 8.54199H5.0013C5.34297 8.54199 5.6263 8.82533 5.6263 9.16699C5.6263 9.50866 5.34297 9.79199 5.0013 9.79199Z" fill={color} /><path d="M3.33464 12.292H1.66797C1.3263 12.292 1.04297 12.0087 1.04297 11.667C1.04297 11.3253 1.3263 11.042 1.66797 11.042H3.33464C3.6763 11.042 3.95964 11.3253 3.95964 11.667C3.95964 12.0087 3.6763 12.292 3.33464 12.292Z" fill={color} /></svg>);
  if (name === "cart") return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.1596 14.792H6.28463C5.45963 14.792 4.66796 14.442 4.10963 13.8337C3.5513 13.2253 3.26797 12.4087 3.33464 11.5837L4.0263 3.28366C4.0513 3.02533 3.95963 2.77533 3.78463 2.58366C3.60963 2.392 3.36797 2.29199 3.10963 2.29199H1.66797C1.3263 2.29199 1.04297 2.00866 1.04297 1.66699C1.04297 1.32533 1.3263 1.04199 1.66797 1.04199H3.11797C3.72631 1.04199 4.3013 1.30032 4.70963 1.74199C4.93463 1.99199 5.1013 2.28366 5.19297 2.60866H15.6013C16.443 2.60866 17.218 2.94199 17.7846 3.54199C18.343 4.15033 18.6263 4.94199 18.5596 5.78366L18.1096 12.0337C18.018 13.5587 16.6846 14.792 15.1596 14.792ZM5.23463 3.85032L4.58464 11.6836C4.54297 12.167 4.7013 12.6253 5.0263 12.9836C5.3513 13.342 5.8013 13.5337 6.28463 13.5337H15.1596C16.0263 13.5337 16.8096 12.8003 16.8763 11.9337L17.3263 5.68366C17.3596 5.192 17.2013 4.72533 16.8763 4.38367C16.5513 4.03367 16.1013 3.84198 15.6096 3.84198H5.23463V3.85032Z" fill={color} /><path d="M13.5417 18.9583C12.625 18.9583 11.875 18.2083 11.875 17.2917C11.875 16.375 12.625 15.625 13.5417 15.625C14.4583 15.625 15.2083 16.375 15.2083 17.2917C15.2083 18.2083 14.4583 18.9583 13.5417 18.9583ZM13.5417 16.875C13.3083 16.875 13.125 17.0583 13.125 17.2917C13.125 17.525 13.3083 17.7083 13.5417 17.7083C13.775 17.7083 13.9583 17.525 13.9583 17.2917C13.9583 17.0583 13.775 16.875 13.5417 16.875Z" fill={color} /><path d="M6.8737 18.9583C5.95703 18.9583 5.20703 18.2083 5.20703 17.2917C5.20703 16.375 5.95703 15.625 6.8737 15.625C7.79036 15.625 8.54036 16.375 8.54036 17.2917C8.54036 18.2083 7.79036 18.9583 6.8737 18.9583ZM6.8737 16.875C6.64036 16.875 6.45703 17.0583 6.45703 17.2917C6.45703 17.525 6.64036 17.7083 6.8737 17.7083C7.10703 17.7083 7.29036 17.525 7.29036 17.2917C7.29036 17.0583 7.10703 16.875 6.8737 16.875Z" fill={color} /><path d="M17.5 7.29199H7.5C7.15833 7.29199 6.875 7.00866 6.875 6.66699C6.875 6.32533 7.15833 6.04199 7.5 6.04199H17.5C17.8417 6.04199 18.125 6.32533 18.125 6.66699C18.125 7.00866 17.8417 7.29199 17.5 7.29199Z" fill={color} /></svg>);
  if (name === "user") return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.73229 12.8085C9.57396 12.8085 9.41562 12.7502 9.29062 12.6252C9.04896 12.3835 9.04896 11.9835 9.29062 11.7419L10.9823 10.0502L9.29062 8.35853C9.04896 8.11686 9.04896 7.71686 9.29062 7.4752C9.53229 7.23353 9.93229 7.23353 10.174 7.4752L12.3073 9.60853C12.549 9.85019 12.549 10.2502 12.3073 10.4919L10.174 12.6252C10.0573 12.7502 9.89063 12.8085 9.73229 12.8085Z" fill={color} /><path d="M11.807 10.6748H3.33203C2.99036 10.6748 2.70703 10.3915 2.70703 10.0498C2.70703 9.70814 2.99036 9.4248 3.33203 9.4248H11.807C12.1487 9.4248 12.432 9.70814 12.432 10.0498C12.432 10.3915 12.1487 10.6748 11.807 10.6748Z" fill={color} /><path d="M10 17.2913C9.65833 17.2913 9.375 17.008 9.375 16.6663C9.375 16.3247 9.65833 16.0413 10 16.0413C13.5583 16.0413 16.0417 13.558 16.0417 9.99967C16.0417 6.44134 13.5583 3.95801 10 3.95801C9.65833 3.95801 9.375 3.67467 9.375 3.33301C9.375 2.99134 9.65833 2.70801 10 2.70801C14.2917 2.70801 17.2917 5.70801 17.2917 9.99967C17.2917 14.2913 14.2917 17.2913 10 17.2913Z" fill={color} /></svg>);
  if (name === "return") return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.99844 18.9583C5.6651 18.9583 2.14844 15.4333 2.14844 11.1083C2.14844 6.78333 5.6651 3.25 9.99844 3.25C10.8901 3.25 11.7568 3.375 12.5901 3.63333C12.9234 3.73333 13.1068 4.08333 13.0068 4.41667C12.9068 4.75 12.5568 4.93333 12.2234 4.83333C11.5151 4.61667 10.7651 4.5 9.99844 4.5C6.35677 4.5 3.39844 7.45833 3.39844 11.1C3.39844 14.7417 6.35677 17.7 9.99844 17.7C13.6401 17.7 16.5984 14.7417 16.5984 11.1C16.5984 9.78333 16.2151 8.51667 15.4901 7.43333C15.2984 7.15 15.3734 6.75833 15.6651 6.56667C15.9484 6.375 16.3401 6.45 16.5318 6.74167C17.3984 8.03333 17.8568 9.54167 17.8568 11.1083C17.8484 15.4333 14.3318 18.9583 9.99844 18.9583Z" fill={color} /><path d="M13.443 5.05818C13.268 5.05818 13.093 4.98318 12.968 4.84151L10.5597 2.07485C10.3347 1.81652 10.3597 1.41651 10.618 1.19151C10.8763 0.966515 11.2763 0.991515 11.5013 1.24985L13.9097 4.01652C14.1347 4.27485 14.1097 4.67485 13.8513 4.89985C13.743 5.00818 13.593 5.05818 13.443 5.05818Z" fill={color} /><path d="M10.6348 7.10834C10.4431 7.10834 10.2515 7.01667 10.1265 6.85C9.92648 6.575 9.98481 6.18334 10.2598 5.975L13.0681 3.925C13.3431 3.71667 13.7348 3.78334 13.9431 4.05834C14.1515 4.33334 14.0848 4.725 13.8098 4.93334L11.0015 6.99167C10.8931 7.075 10.7681 7.10834 10.6348 7.10834Z" fill={color} /></svg>);
  if (name === "discount") return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10.0589 18.3161C8.8839 18.3161 7.70056 17.8661 6.8089 16.9744L3.0339 13.1994C2.11723 12.2827 1.6339 11.0161 1.69223 9.72441L1.89223 5.55775C1.9839 3.56608 3.5589 1.99108 5.5589 1.89108L9.72556 1.69108C11.0172 1.64108 12.2839 2.11608 13.2006 3.03275L16.9756 6.80775C18.7672 8.59941 18.7672 11.5244 16.9756 13.3161L13.3172 16.9744C12.4172 17.8661 11.2422 18.3161 10.0589 18.3161ZM3.91723 12.3077L7.69223 16.0827C8.32556 16.7161 9.16723 17.0661 10.0589 17.0661C10.9506 17.0661 11.7922 16.7161 12.4256 16.0827L16.0839 12.4244C16.7172 11.7911 17.0672 10.9494 17.0672 10.0577C17.0672 9.16608 16.7172 8.32441 16.0839 7.69108L12.3089 3.91608C11.6422 3.24941 10.7172 2.89108 9.7839 2.94108L5.61723 3.14108C4.25889 3.19941 3.20056 4.25775 3.1339 5.60775L2.9339 9.77441C2.89223 10.7161 3.25056 11.6411 3.91723 12.3077Z" fill={color} /><path d="M7.91536 10.6247C6.4237 10.6247 5.20703 9.40801 5.20703 7.91634C5.20703 6.42467 6.4237 5.20801 7.91536 5.20801C9.40703 5.20801 10.6237 6.42467 10.6237 7.91634C10.6237 9.40801 9.40703 10.6247 7.91536 10.6247ZM7.91536 6.45801C7.11536 6.45801 6.45703 7.11634 6.45703 7.91634C6.45703 8.71634 7.11536 9.37467 7.91536 9.37467C8.71536 9.37467 9.3737 8.71634 9.3737 7.91634C9.3737 7.11634 8.71536 6.45801 7.91536 6.45801Z" fill={color} /></svg>);
  return (<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M17.5 6.45801H2.5C2.15833 6.45801 1.875 6.17467 1.875 5.83301C1.875 5.49134 2.15833 5.20801 2.5 5.20801H17.5C17.8417 5.20801 18.125 5.49134 18.125 5.83301C18.125 6.17467 17.8417 6.45801 17.5 6.45801Z" fill={color} /><path d="M17.5 10.625H2.5C2.15833 10.625 1.875 10.3417 1.875 10C1.875 9.65833 2.15833 9.375 2.5 9.375H17.5C17.8417 9.375 18.125 9.65833 18.125 10C18.125 10.3417 17.8417 10.625 17.5 10.625Z" fill={color} /><path d="M17.5 14.792H2.5C2.15833 14.792 1.875 14.5087 1.875 14.167C1.875 13.8253 2.15833 13.542 2.5 13.542H17.5C17.8417 13.542 18.125 13.8253 18.125 14.167C18.125 14.5087 17.8417 14.792 17.5 14.792Z" fill={color} /></svg>);
}