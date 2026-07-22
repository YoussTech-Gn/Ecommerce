import { LoaderCustom } from "@/components/feedBack/Loading";

type DataHandlerProps = {
  loading: "idle" | "pending" | "succeeded" | "failed";
  error: string | null;
  isEmpty: boolean;
  loader?: React.ReactNode;
  emptyMessage?: string;
  children: React.ReactNode;
};

export const DataHandler = ({
  loading,
  error,
  isEmpty,
  loader = <LoaderCustom />,
  emptyMessage = "No data available at the moment.", // 👈 نص إنجليزي افتراضي
  children,
}: DataHandlerProps) => {
  // 1. حالة التحميل
  if (loading === "pending") {
    return loader;
  }

  // 2. حالة الخطأ
  if (loading === "failed" || error) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center text-red-500">
        <p className="text-lg font-semibold">
          {error || "An error occurred while fetching data."}{" "}
          {/* 👈 نص إنجليزي للخطأ */}
        </p>
      </div>
    );
  }

  // 3. إذا كانت البيانات فارغة
  if (isEmpty) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center p-8 text-center text-muted-foreground">
        <p className="text-base">{emptyMessage}</p>
      </div>
    );
  }

  // 4. عرض المحتوى الحقيقي
  return <>{children}</>;
};
