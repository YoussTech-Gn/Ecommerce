// components/common/cart/ConfirmModal.tsx
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type ConfirmModalProps = {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onClose: () => void; // 💡 إعادة تفعيل خاصية الإغلاق
};

export const ConfirmModal = ({
  isOpen,
  title = "Are you absolutely sure?",
  message = "This action cannot be undone. This will permanently delete this item from your cart.",
  onConfirm,
  onClose,
}: ConfirmModalProps) => {
  return (
    // 💡 ربط حالة الفتح وإعادة ضبطها عند الضغط خارج النافذة أو زر ESC
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2 sm:gap-0">
          {/* 💡 استخدام asChild لتغليف زر الملغاة بـ DialogClose */}
          <DialogClose
            render={
              <Button
                variant="outline"
                onClick={onClose}
                className={"rounded-lg mx-1"}
              >
                Cancel
              </Button>
            }
          />
          <Button
            variant="destructive"
            onClick={() => {
              onConfirm();
              onClose(); // إغلاق النافذة تلقائياً بعد تنفيذ الحذف
            }}
            className="rounded-lg "
          >
            Yes, Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
