import { SearchIcon } from "lucide-react";

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Link } from "react-router-dom";

function NoFoundPage() {
  return (
    <div className="w-full h-dvh flex justify-center align-center ">
      <Empty className="-mt-50">
        <EmptyHeader>
          <EmptyTitle className="text-4xl">404 - Not Found</EmptyTitle>
          <EmptyDescription className="text-xs">
            The page you&apos;re looking for doesn&apos;t exist. Try searching
            for what you need below.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <InputGroup className="sm:w-3/4 rounded-md">
            <InputGroupInput
              className="bg-white"
              placeholder="Try searching for pages..."
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <InputGroupAddon align="inline-end"></InputGroupAddon>
          </InputGroup>
          <EmptyDescription>
            Need help? <Link to={"/"}>Contact support</Link>
          </EmptyDescription>
        </EmptyContent>
      </Empty>
    </div>
  );
}

export default NoFoundPage;
