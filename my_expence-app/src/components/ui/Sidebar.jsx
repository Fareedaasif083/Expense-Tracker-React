<<<<<<< HEAD
import React, { useState } from "react";
=======
import React, { useMemo, useState } from "react";
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986
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

<<<<<<< HEAD
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
=======
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
    onFilterChange?.({ month: value, catogory: localCategory });
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
    onFilterChange?.({ month: localMonth, catogory: value });
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986
  };

  return (
    <aside className=" w-64 h-screen top-0 left-0 fixed bg-slate-900 shadow-sm p-4 flex flex-col gap-6 ">
      <div className="bg-gray-100 p-4 rounded-md text-center">
        <div className="text-sm text-gray-500">Total Expense</div>
        <div className="text-2xl font-semibold">${total}</div>
      </div>
<<<<<<< HEAD
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
=======
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500">
          Filter by Month
        </label>
        <Select value={localMonth} onValueChnage={handleMonthChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Months" />
          </SelectTrigger>
          <SelectContent >
            {months.map((m) => (
              <SelectItem key={m} value={m} className='text-white'>
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986
                {m === "all" ? "All Months" : m}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
<<<<<<< HEAD
      <div className="flex flex-col gap-1  text-white">
        <label className="text-sm font-medium text-gray-500">
          Filter by Category
        </label>
        <Select value={localCategory} onValueChange={handleCategoryChange}>
          <SelectTrigger >
            <SelectValue placeholder="All Categories.." />
          </SelectTrigger>
          <SelectContent className='bg-slate-900 text-white z-50'>{categories.map((b) => (
=======
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-500">
          Filter by Category
        </label>
        <Select value={localCategory} onValueChnage={handleCategoryChange}>
          <SelectTrigger>
            <SelectValue placeholder="All Categories.." />
          </SelectTrigger>
          <SelectContent>{categories.map((b) => (
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986
              <SelectItem key={b} value={b}>
                {b === "all" ? "All Categories" : b}
              </SelectItem>
            ))}</SelectContent>
        </Select>
      </div>
    </aside>
  );
};

<<<<<<< HEAD
export default Sidebar;
=======
export default Sidebar;
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986
