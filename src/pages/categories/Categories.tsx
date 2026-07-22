import CatSkelItem from "@/components/Libraries/CatSkel";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHook";
import {
  actGetCategories,
  categoriesCleanUp,
} from "@/redux/slices/categories/categoriesSlice";
import { useEffect } from "react";

const Categories = () => {
  const { categories, error, loading } = useAppSelector(
    (state) => state.categories,
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(categoriesCleanUp());
    };
  }, [dispatch]);

  return (
    <CatSkelItem loading={loading} categories={categories} erorr={error} />
  );
};

export default Categories;
