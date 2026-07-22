import { useEffect } from "react";
import type {
  CategoriesType,
  InitialCategoriesType,
} from "@/types/categoriesTypes";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { DataHandler } from "../feedBack/DataHandler";

type Props = {
  categories: CategoriesType[];
  loading: InitialCategoriesType["loading"];
  erorr: string | null;
};

const CatSkelItem = ({ categories, loading, erorr }: Props) => {
  console.log("hello Im CatSkelItem");
  // 1️⃣ إطلاق التنبيه عند الفشل بشكل آمن داخل useEffect
  useEffect(() => {
    if (loading === "failed") {
      toast.error("Event has not been created");
    }
  }, [loading]);

  return (
    <DataHandler
      loading={loading}
      error={erorr}
      isEmpty={categories.length === 0}
      emptyMessage="No categories available in the store currently." // 👈 تخصيص الرسالة بالإنجليزية
    >
      <div className="wrapperCateg flex flex-wrap gap-2">
        {categories.map((catItem) => (
          <Button key={catItem.id} variant="outline" className="categoriesItem">
            <img src={catItem.img} alt={catItem.title} />
          </Button>
        ))}
      </div>
    </DataHandler>
  );
};

export default CatSkelItem;
