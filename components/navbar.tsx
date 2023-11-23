"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu } from "lucide-react";
import { useCallback, useState } from "react";

import MobileNavbar from "./MobileNavbar";

interface NavTextLinkProps {
  text: string;
  url: string;
  isSelect?: boolean;
}

const NavTextLink = ({ text, url, isSelect = false }: NavTextLinkProps) => {
  return (
    <Link href={url}>
      <p
        className={`${
          isSelect ? "text-green-700" : "text-black"
        } hover:text-green-700 hidden lg:block`}
      >
        {text}
      </p>
    </Link>
  );
};

const Navbar = () => {
  const pathName = usePathname();
  const [showMobileNavbar, setShowMobileNavbar] = useState(false);

  const leftTextLinks = [
    { text: "Everything", url: "/shop/everything" },
    { text: "Groceries", url: "/shop/groceries" },
    { text: "Juice", url: "/shop/juice" },
  ];
  const rightTextLinks = [
    { text: "About", url: "/about" },
    { text: "Contact", url: "/contact" },
    { text: "Create", url: "/create" },
  ];

  const toggleMobileNavbar = useCallback(() => {
    setShowMobileNavbar((current) => !current);
  }, []);

  return (
    <>
      <div className="fixed w-full z-20 flex justify-between items-center bg-white py-2 px-4">
        <div className="flex items-center gap-x-10">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={120} height={80} />
          </Link>
          {leftTextLinks.map((obj) => (
            <NavTextLink
              key={obj.url}
              text={obj.text}
              url={obj.url}
              isSelect={pathName === obj.url}
            />
          ))}
        </div>
        <div className="flex items-center gap-x-10">
          {rightTextLinks.map((obj) => (
            <NavTextLink
              key={obj.url}
              text={obj.text}
              url={obj.url}
              isSelect={pathName === obj.url}
            />
          ))}
          <div className="text-black">Cart</div>
          <div className="text-black">Avatar</div>
          <Menu
            className="
              text-black
              hover:text-green-700
              cursor-pointer
              lg:hidden
              block
            "
            size={20}
            onClick={toggleMobileNavbar}
          />
        </div>
      </div>
      <MobileNavbar visible={showMobileNavbar} onClose={toggleMobileNavbar} />
    </>
  );
};

export default Navbar;
