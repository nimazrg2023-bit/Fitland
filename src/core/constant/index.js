export const menueopen = [
    {id:1, name: "مردانه" },
    {id:2, name: "زنانه" },
    {id:3, name: "بچگانه" },
    {id:4, name: "لوازم ورزشی" },
    {id:5, name: "شیکر و جاگ" },
    {id:6, name: "جدیدترین محصولات" },
    {id:7, name: "تخفیفات ویژه" },
    {id:8, name: "پرفروش ترین" },

]
export const filtered1 = menueopen.filter(item => item.id<6)
export const filtered2 = menueopen.filter(item => item.id>=6)

