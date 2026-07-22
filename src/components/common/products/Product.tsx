import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, ShoppingCart, Bookmark } from "lucide-react";

interface ProductCardProps {
  title?: string;
  price?: number;
  image?: string;
  category?: string;
  isLiked?: boolean;
  onLikeToggle?: () => void;
  onAddToCart?: () => void;
  maxium: number;
}

export const ProductCard = ({
  title = "قميص قطني كاجوال",
  price = 29.99,
  image = "https://avatar.vercel.sh/shadcn1",
  category = "رجالي",
  isLiked = false,
  onLikeToggle,
  onAddToCart,
}: ProductCardProps) => {
  return (
    <Card className="group relative w-full overflow-hidden rounded-xl border border-border bg-card shadow-none transition-all duration-200 hover:shadow-md">
      {/* 💡 التعديل هنا: استبدلنا aspect-square بـ aspect-[4/3] لتقليل الارتفاع */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* شارة صغيرة للتصنيف */}
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 z-10 px-1.5 py-0.5 text-[10px] font-medium backdrop-blur-md"
        >
          {category}
        </Badge>

        {/* زر المفضلة المصغر */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onLikeToggle}
          className="absolute top-2 right-2 z-10 h-7 w-7 rounded-full bg-background/80 p-0 backdrop-blur-md hover:bg-background"
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isLiked ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </Button>
      </div>

      {/* تفاصيل المنتج المصغرة */}
      <div className="p-2.5">
        <h3 className="line-clamp-1 text-xs font-medium text-foreground sm:text-sm">
          {title}
        </h3>

        <p className="mt-1 text-sm font-bold text-primary sm:text-base">
          ${price.toFixed(2)}
        </p>

        {/* زر الإضافة للسلة المصغر */}
        <div className="mt-2 flex items-center gap-2">
          <Button
            onClick={onAddToCart}
            size="sm"
            className="h-8 flex-1 gap-1.5 rounded-lg text-xs font-normal"
          >
            <ShoppingCart className="h-3.5 w-3.5" />
            <span>Add to Cart</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 shrink-0 rounded-lg text-muted-foreground hover:text-foreground"
          >
            <Bookmark className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
