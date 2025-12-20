import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div>
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-5xl flex items-center justify-between mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <h1 className="text-xl font-semibold">Expence Tracker</h1>
            <div className="text-sm text-gray-500">Track money. Stay sane.</div>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
