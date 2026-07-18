import { createBrowserRouter, type RouteObject } from "react-router-dom";
import type React from "react";
import Home from "../pages/Home/Home";
import Categories from "@/pages/categories/Categories";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";
// 1. قمنا بإضافة الاستيراد المفقود هنا
// import Categories from "../pages/Categories/Categories";

// 2. يفضل استخدام React.ReactNode ليكون المكون مرناً ويقبل أي عنصر ريأكت
type CustomRouteType = {
  path: string;
  element: React.ReactNode;
  children?: CustomRouteType[];
  errorElement?: React.ReactNode;
};

const router: CustomRouteType[] = [
  {
    path: "/",
    element: <Home />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "categories/products",
        element: <div> Product </div>,
        children: [
          {
            path: ":catPrefix",
            element: <div>صفحة المنتجات حسب التصنيف</div>, // 3. تم إصلاح الفراغ هنا
          },
        ],
      },
    ],
  },
];

// قمنا بعمل casting بسيط إلى RouteObject[] لتتوافق تماماً مع مكتبة React Router
export default createBrowserRouter(router as RouteObject[]);
