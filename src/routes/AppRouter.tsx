import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Home from "../pages/Home/Home";
import Categories from "@/pages/categories/Categories";
import GlobalErrorBoundary from "@/components/GlobalErrorBoundary";
import MainLayout from "@/components/layout/MainLayout";
import Products from "@/pages/products/Products";
import Cart from "@/pages/cart/Cart";
// 1. قمنا بإضافة الاستيراد المفقود هنا
// import Categories from "../pages/Categories/Categories";

const router: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    // index: <Home />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        index: true, // 💡 صفحة Home هي الصفحة الافتراضية للرابط الرئيسي "/"
        element: <Home />,
      },
      {
        path: "categories",
        element: <Categories />,
      },
      {
        path: "carts",
        element: <Cart />,
      },
      {
        path: "categories/products",
        element: <Products />,
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
