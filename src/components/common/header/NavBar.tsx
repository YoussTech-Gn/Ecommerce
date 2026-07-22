import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { useAppSelector } from "@/hooks/storeHook";
import { getCartTotalQuantitySelector } from "@/redux/selectors";

interface LinkType {
  link: "Home" | "Categories" | "Products";
  path:
    | "/"
    | "/categories"
    | "/categories/products"
    | "categories/products:catPrefix";
}
const NavBar = () => {
  const link: LinkType[] = [
    { link: "Home", path: "/" },
    { link: "Categories", path: "/categories" },
    { link: "Products", path: "/categories/products" },
  ];
  const getCartTotalQuantity = useAppSelector(getCartTotalQuantitySelector);
  return (
    <header>
      <h2>
        <Link to={"/"}>KeTompa</Link>
      </h2>
      <nav>
        {link.map((lk, idx) => (
          <Button
            nativeButton={false}
            render={<Link to={lk.path}></Link>}
            variant={"secondary"}
            className={"rounded-sm bg-inherit tracking-wide"}
            onClick={() => toast.info("I love you!")}
            key={idx}
          >
            {lk.link}
          </Button>
        ))}
      </nav>
      <div className="iconSide">
        <Button
          nativeButton={false}
          variant={"secondary"}
          className={"relative rounded-3xl"}
          render={<Link to={"/carts"}></Link>}
        >
          <ShoppingCart className="shopCart icon" />
          {/* شارة العدد (Badge) */}
          <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-sm">
            {getCartTotalQuantity}
          </span>
        </Button>
        <Button variant={"secondary"} className={"rounded-3xl "}>
          <Heart className="heart icon" />
        </Button>
        <Avatar>
          <AvatarImage
            src="https://github.com/shadcn.png"
            alt="@avatar"
            className={"grayscale"}
          />
          {/* <AvatarBadge className="bg-green-600 dark:bg-green-800" /> */}
        </Avatar>
      </div>
    </header>
  );
};

export default NavBar;
