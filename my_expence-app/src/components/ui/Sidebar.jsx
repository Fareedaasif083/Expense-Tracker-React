import React, { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

const Sidebar = ({ expenses = [], filters = {}, onFilterChange }) => {
  const [localMonth, setLocalMonth] = useState(filters.month || "all");
  const [localCategory, setLocalCategory] = useState(filters.category || "all");

 const total = expenses.reduce((n, e) => n + Number(e.amount), 0);

  const setMonths = new Set();
    expenses.forEach((e) => {
      if (e.date) {
        const m = new Date(e.date).toLocaleString("default", { month: "long" });
        setMonths.add(m);
      }
    });
    const months= ["all", ...Array.from(setMonths)];


  const handleMonthChange = (value) => {
    setLocalMonth(value);
    onFilterChange?.({ month: value, category: localCategory });
  };

  const setCategories = new Set();
    expenses.forEach((e) => {
      if (e.category) {
        setCategories.add(e.category);
      }
    });
    const categories= ["all", ...Array.from(setCategories)];

  const handleCategoryChange = (value) => {
    setLocalCategory(value);
    onFilterChange?.({ month: localMonth, category: value });
    onFilterChange?.({ month: localMonth, catogory: value });
    onFilterChange?.({ month: localMonth, category: value });
  };

  return (
    <aside className=" w-64 h-screen top-0 left-0 fixed bg-slate-900 shadow-sm p-4 flex flex-col gap-6 ">
      <div className="bg-gray-100 p-4 rounded-md text-center">
        <div className="text-sm text-gray-500">Total Expense</div>
        <div className="text-2xl font-semibold">${total}</div>
      </div>
      <div className="flex flex-col gap-1  text-white">
        <label className="text-sm font-medium text-gray-500">
          Filter by Month
        </label>
        <Select value={localMonth} onValueChange={handleMonthChange}>
          <SelectTrigger >
            <SelectValue placeholder="All Months" />
          
          </SelectTrigger>
          <SelectContent className='bg-slate-900 text-white z-50'>
            {months.map((m) => (
              <SelectItem key={m} value={m}>
              <SelectItem key={m} value={m} className='text-white'
              <SelectItem key={m} value={m}>
                {m === "all" ? "All Months" : m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1  text-white">
        <label className="text-sm font-medium text-gray-500">
          Filter by Category
        </label>
        <Select value={localCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger >
            <SelectValue placeholder="All Categories.." />
          </SelectTrigger>
          <SelectContent className='bg-slate-900 text-white z-50'>{categories.map((b) => (
              <SelectItem key={b} value={b}>
                {b === "all" ? "All Categories" : b}
              </SelectItem>
            ))}</SelectContent>
        </Select>
      </div>
    </aside>
  );
};

export default Sidebar;
