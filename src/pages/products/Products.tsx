import { ProductCard } from "@/components/common/products/Product";
import { DataHandler } from "@/components/feedBack/DataHandler";
import { LoaderCustom } from "@/components/feedBack/Loading";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import { addToCart } from "@/redux/slices/add-to-cart/cartSlice";
import actGetAllProduct from "@/redux/slices/products/act/actGetAllProducts";
import { productsCleanUp } from "@/redux/slices/products/productsSlice";
import { useEffect } from "react";

const Products = () => {
  const { error, loading, products } = useAppSelector(
    (state) => state.products,
  );
  const dispatch = useAppDispatch();
  const handleAddToCart = (id) => {
    if (id) {
      dispatch(addToCart(id));
    }
  };

  useEffect(() => {
    dispatch(actGetAllProduct());
    return () => {
      dispatch(productsCleanUp());
    };
  }, [dispatch]);
  if (loading === "pending") {
    return <LoaderCustom />;
  }

  return (
    <DataHandler
      loading={loading}
      error={error}
      isEmpty={products.length === 0}
      emptyMessage="No products available in the store currently." // 👈 تخصيص الرسالة بالإنجليزية
    >
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {products.map((item) => (
          <ProductCard
            key={item.id}
            image={item.img}
            price={+item.price}
            title={item.title}
            maxium={item.maxium}
            onAddToCart={() => handleAddToCart(item.id)}
            category={item.cat_prefix}
          />
        ))}
      </div>
    </DataHandler>
  );
};

export default Products;
