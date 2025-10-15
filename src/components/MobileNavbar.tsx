"use client";
import { useState, useRef, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X } from "lucide-react";

export default function MobileNavbar() {
  const [open, setOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const toggleDropdown = (key: string) => {
    if (activeDropdown === key) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(key);
    }
  };

  const NavItem = ({ title, items }: { title: string; items?: string[] }) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const [contentHeight, setContentHeight] = useState(0);

    useEffect(() => {
      if (contentRef.current) {
        setContentHeight(contentRef.current.scrollHeight);
      }
    }, [items]);

    return (
      <div className="py-2">
        <button
          className="flex items-center justify-between w-full text-left"
          onClick={() => items && toggleDropdown(title)}
        >
          {title}
          {items && (
            <ChevronDown
              className={`w-4 h-4 transition-transform duration-300 ${
                activeDropdown === title ? "rotate-180" : ""
              }`}
            />
          )}
        </button>
        {items && (
          <div
            ref={contentRef}
            className="overflow-hidden transition-all duration-300 ease-in-out"
            style={{
              maxHeight:
                activeDropdown === title ? `${contentHeight}px` : "0px",
              opacity: activeDropdown === title ? 1 : 0,
            }}
          >
            <div className="pl-4 mt-2 space-y-2">
              {items.map((item) => (
                <a key={item} href="#" className="block hover:text-primary">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="ml-5">
          <Menu className="h-4 w-4" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle className="text-left">Navigation</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-2">
          <NavItem title="Home" />
          <NavItem
            title="Products"
            items={["Electronics", "Clothing", "Books", "Home & Garden"]}
          />
          <NavItem title="About Us" />
          <NavItem
            title="Services"
            items={["Consulting", "Design", "Development", "Support"]}
          />
          <NavItem title="Contact" />
        </nav>
      </SheetContent>
    </Sheet>
  );
}
