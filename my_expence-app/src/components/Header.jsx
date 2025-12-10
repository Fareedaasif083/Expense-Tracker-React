import React from "react";
import { Button } from "./ui/button";
// import AddExpenseForm from "./components/AddExpenseForm";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <div>
      <header className="w-full bg-white shadow-sm">
        <div className="max-w-5xl flex items-center justify-between mx-auto px-4 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
            <h1 className="text-xl font-semibold">Expence Tracker</h1>
            <div className="text-sm text-gray-500">Track money. Stay sane.</div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              size="lg"
              className="bg-slate-900 text-gray-300 border rounded-4xl"
              onClick={() => navigate("/add-expense")}
            >
              New Expense
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
