import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/hooks/storeHook";
import {
  addToCart,
  removeCart,
  removeToCart,
} from "@/redux/slices/add-to-cart/cartSlice";
import type { ActionType, CartItemRowProps } from "@/types/cartItem.types";
import { Trash2, Plus, Minus } from "lucide-react";
import { useReducer, useState } from "react";
import { createReducer } from "./cartItem.reducer";
import { ConfirmModal } from "./ConfirmModal";

export const CartItemRow = ({
  image = "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=300&q=80",
  maxium = 10,
  price,
  id,
  title,
  quantity,
}: CartItemRowProps) => {
  const [state, dispatch] = useReducer(createReducer(maxium), quantity);
  const dispatchApp = useAppDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlerQuant = (type: ActionType["type"]) => {
    if (type === "INCRE" && state < maxium) {
      dispatch({ type, payload: 1 });
      dispatchApp(addToCart(id));
    } else if (type === "DECRE" && state > 1) {
      dispatch({ type, payload: 1 });
      dispatchApp(removeToCart(id));
    }
  };

  // 💡 الدالة التي يتم تنفيذها حصرياً عند تأكيد الحذف من داخل النافذة
  const handleConfirmDelete = () => {
    dispatchApp(removeCart(id));
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between gap-3 py-3 px-2 cart">
        {/* 1. الجانب الأيسر: صورة المنتج */}
        <div className="h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-muted">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>

        {/* 2. المنتصف: التفاصيل (العنوان والسعر) */}
        <div className="flex-1 min-w-0">
          <h4 className="truncate text-xs font-medium text-foreground sm:text-sm titleHead">
            {title}
          </h4>
          <p className="mt-1 text-xs font-bold text-primary sm:text-sm">
            {price.toFixed(2)}
          </p>
        </div>

        {/* 3. اليمين البعيد: أزرار العداد وزر الحذف */}
        <div className="flex items-center gap-2 shrink-0">
          {/* العداد (زر ناقص، الرقم، زر زائد) */}
          <div className="flex items-center rounded-md border border-border bg-background">
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 rounded-none rounded-s-md p-0 text-muted-foreground hover:text-foreground"
              onClick={() => handlerQuant("DECRE")}
            >
              <Minus className="h-3 w-3" />
            </Button>

            <span className="w-7 text-center text-xs font-medium accent">
              {state}
            </span>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => handlerQuant("INCRE")}
              className="h-7 w-7 rounded-none rounded-e-md p-0 text-muted-foreground hover:text-foreground"
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          {/* 💡 زر الحذف يفتح النافذة فقط ولا يحذف مباشرة */}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsModalOpen(true)}
            className="h-7 w-7 text-red-500 hover:bg-red-500/10 hover:text-red-600"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* 💡 استدعاء النافذة مع تمرير دوال التأكيد والإغلاق بشكل صحيح */}
      <ConfirmModal
        isOpen={isModalOpen}
        title="Remove Item"
        message={`Are you sure you want to remove "${title}" from your cart?`}
        onConfirm={handleConfirmDelete}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

CartItemRow.whyDidYouRender = true;
