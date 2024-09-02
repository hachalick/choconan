import Navbar from "@/components/Navbar";
import React from "react";

function Header() {
  return (
    <header className="print:hidden sticky z-50 top-0">
      <Navbar />
    </header>
  );
}

export default Header;
