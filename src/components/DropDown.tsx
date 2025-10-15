import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

const DropDown = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>Links</DropdownMenuTrigger>
      <DropdownMenuContent className="text-grey-700 flex flex-col gap-3 px-5 py-3">
        <Link href="#">Gift Finder</Link>
        <Link href="#">Product</Link>
        <Link href="#">FAQ</Link>
        <Link href="#">Sign in / Register</Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDown;
