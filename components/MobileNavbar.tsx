"use client";

import Link from "next/link";
import { X } from "lucide-react";

import Overlay from "./Overlay";

interface MobileNavItemProps {
  text: string;
  url: string;
  onClick: () => void;
}

const MobileNavItem = ({ text, url, onClick }: MobileNavItemProps) => {
  return (
    <Link href={url} onClick={onClick}>
      <div className="w-full border-b-[1px] border-gray-400 flex items-center justify-start px-4 py-4">
        <p className="text-black text-sm">{text}</p>
      </div>
    </Link>
  );
};

const mobileNavLinks = [
  { text: "Everything", url: "/shop/everything" },
  { text: "Groceries", url: "/shop/groceries" },
  { text: "Juice", url: "/shop/juice" },
  { text: "About", url: "/about" },
  { text: "Contact", url: "/contact" },
  { text: "Create", url: "/create" },
];

interface MobileNavbarProps {
  visible: boolean;
  onClose: () => void;
}

const MobileNavbar = ({ visible, onClose }: MobileNavbarProps) => {
  if (!visible) return null;

  return (
    <>
      <div
        className="
        absolute 
        z-50
        flex
        flex-col
        h-full
        w-[90%]
        bg-white
        top-0
        right-0
      "
      >
        <div className="flex justify-end items-center h-10">
          <X
            className="cursor-pointer mr-2"
            color="black"
            size={20}
            onClick={onClose}
          />
        </div>
        {mobileNavLinks.map((obj, index) => (
          <MobileNavItem
            key={index}
            text={obj.text}
            url={obj.url}
            onClick={onClose}
          />
        ))}
      </div>
      <Overlay visible={visible} />
    </>
  );
};

export default MobileNavbar;
