import { createBrowserRouter, type RouteObject } from "react-router-dom";
import type React from "react";
import Home from "../pages/Home/Home";
import NoFoundPage from "../pages/404-page/NoFound";
import Categories from "@/pages/categories/Categories";
// 1. قمنا بإضافة الاستيراد المفقود هنا
// import Categories from "../pages/Categories/Categories";

// 2. يفضل استخدام React.ReactNode ليكون المكون مرناً ويقبل أي عنصر ريأكت
type CustomRouteType = {
  path: string;
  element: React.ReactNode;
  children?: CustomRouteType[];
};

const router: CustomRouteType[] = [
  {
    path: "/",
    element: <Home />,
    children: [
      {
        path: "categories",
        element: <Categories />,
        children: [
          {
            path: "products",
            element: <div> After </div>,
            children: [
              {
                path: ":catPrefix",
                element: <div>صفحة المنتجات حسب التصنيف</div>, // 3. تم إصلاح الفراغ هنا
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <NoFoundPage />,
  },
];

// قمنا بعمل casting بسيط إلى RouteObject[] لتتوافق تماماً مع مكتبة React Router
export default createBrowserRouter(router as RouteObject[]);
