import React, { useMemo, useState } from "react";
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

  const total = useMemo(() => {
    return expenses.reduce((d, e) => d + Number(e.amount || 0), 0);
  }, [expenses]);

  const months = useMemo(() => {
    const set = new Set();
    expenses.forEach((e) => {
      if (e.date) {
        const m = new Date(e.date).toLocaleString("default", { month: "long" });
        set.add(m);
      }
    });
    return ["all", ...Array.from(set)];
  }, [expenses]);

  const handleMonthChange = (value) => {
    setLocalMonth(value);
    onFilterChange?.({ month: value, category: localCategory });
  };

  const categories = useMemo(() => {
    const set = new Set();
    expenses.forEach((e) => {
      if (e.category) {
        set.add(e.category);
      }
    });
    return ["all", ...Array.from(set)];
  }, [expenses]);

  const handleCategoryChange = (value) => {
    setLocalCategory(value);
    onFilterChange?.({ month: localMonth, category: value });
  };

  return (
    <aside className=" w-64 h-screen top-0 left-0 fixed bg-slate-900 shadow-sm p-4 flex flex-col gap-6 ">
      <div className="bg-gray-100 p-4 rounded-md text-center">
        <div className="text-sm text-gray-500">Total Expense</div>
        <div className="text-2xl font-semibold">${total}</div>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500">
          Filter by Month
        </label>
        <Select value={localMonth} onValueChange={handleMonthChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent >
            {months.map((m) => (
              <SelectItem key={m} value={m}>
                {m === "all" ? "All Months" : m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500">
          Filter by Category
        </label>
        <Select value={localCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories.." />
          </SelectTrigger>
          <SelectContent>{categories.map((b) => (
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
