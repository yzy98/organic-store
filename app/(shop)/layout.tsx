import React from "react";

import ShopSideBar from "@/components/ShopSideBar";

const ShopLayout = ({ children }: React.ReactNode) => {
  return (
    <div className="w-full h-full flex flex-col-reverse lg:flex-row">
      <ShopSideBar />
      <main>{children}</main>
    </div>
  );
};

export default ShopLayout;
