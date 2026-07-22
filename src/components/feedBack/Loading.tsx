import { Spinner } from "../ui/spinner";

export function LoaderCustom() {
  return (
    <div className="flex items-center gap-4 ">
      <Spinner className="size-6 text-white" />
    </div>
  );
}
