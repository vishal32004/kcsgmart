import React from "react";
import { NavigationMenuLink } from "./ui/navigation-menu";
import { cn } from "@/lib/utils";

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, children, ...props }, ref) => {
  return (
    <li className="list-none">
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "hover:text-red-700 block select-none space-y-1 rounded-md no-underline outline-none transition-all",
            className
          )}
          {...props}
        >
          <p className="">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});

// Set the display name for the component
ListItem.displayName = "ListItem";

export default ListItem;
