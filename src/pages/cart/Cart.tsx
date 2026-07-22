import { CartItemRow } from "@/components/common/cart/Cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import actGetProductsByItems from "@/redux/slices/add-to-cart/act/actGetProductsyItems";
import {
  cleanUpCart,
  getCartTotalPriceSelector,
  getCartTotalQuantitySelector,
} from "@/redux/slices/add-to-cart/cartSlice";
import { useEffect } from "react";

const Cart = () => {
  const { productsFullInfo } = useAppSelector((state) => state.cart);
  const getCartTotalPrice = useAppSelector(getCartTotalPriceSelector);
  const getCartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  const dispatch = useAppDispatch();

  useEffect(() => {
    // 💡 تم إضافة مصفوفة الاعتماديات لمنع التكرار اللانهائي
    dispatch(actGetProductsByItems());
    return () => {
      dispatch(cleanUpCart());
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto p-4 max-w-2xl">
      <h2 className="text-xl font-bold mb-4 titleHead">
        Shopping Cart ({getCartTotalQuantity})
      </h2>
      <Separator />

      {/* 💡 المرور على جميع المنتجات في السلة وعرضها */}
      <div className="flex flex-col gap-2 my-5">
        {productsFullInfo.map((item) => (
          <CartItemRow
            key={item.id}
            id={item.id}
            quantity={item.quantity}
            title={item.title}
            price={+item.price}
            image={item.img}
            maxium={item.maxium}
          />
        ))}
      </div>

      {/* total */}
      {/* قسم الإجمالي وزر إتمام الشراء (Checkout Section) */}
      {productsFullInfo.length > 0 && (
        <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <span className="text-base font-medium text-muted-foreground">
              Total Amount:
            </span>
            <span className="text-2xl font-bold text-primary">
              ${getCartTotalPrice.toFixed(2)}
            </span>
          </div>

          <Button className="w-full rounded-xl py-6 text-base font-semibold shadow-md transition-all hover:opacity-95">
            Proceed to Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Cart;
