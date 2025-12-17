import React, { useState, useEffect } from "react";
import AddExpenseForm from "@/components/AddExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "./ui/button";

const Dashboard = ( {expenses,setExpenses,filters}) => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(null);

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const total = expenses.reduce((n, e) => n + Number(e.amount), 0);

  const highest = Math.max(0, ...expenses.map((e) => Number(e.amount)));

  const monthly = expenses.filter(
    e =>
      new Date(e.date).getMonth() ===
      new Date().getMonth()).reduce((n, e) => n + Number(e.amount), 0)

  function openNew() {
    setEdit(null);
    setOpen(true);
  }

  function openEdit(item) {
    setEdit(item);
    setOpen(true);
  }

  function deleteExpense(id) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function saveExpense(item) {
    if (edit) {
      setExpenses((prev) => prev.map((e) => (e.id === item.id ? item : e)));
    } else {
      setExpenses((prev) => [...prev, item]);
    }
    setOpen(false);
  }

  function filterApply(expenseList) {
    return expenseList.filter((e) => {
      const matchMonths =
        filters.month === "all" ||
        new Date(e.date).toLocaleString("default", { month: "long" }) ===
          filters.month;
      const matchCategory =
        filters.category === "all" || e.category === filters.category;
      return matchMonths && matchCategory
    });
  }

  const filtered = filterApply(expenses);
  return (
    <div className="flex bg-gray-50">
      <main className="flex-1 p-6 ml-64">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">Expenses</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button
                onClick={openNew}
                className="bg-slate-900 text-gray-300 border rounded-4xl"
              >
                New Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <AddExpenseForm  onAddExpense={saveExpense} />
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className=" bg-white text-center p-4 shadow rounded-xl ">
            <div className="text-sm">Total Expenses</div>
            <div className="text-2xl font-semibold">${total}</div>
          </div>
          <div className=" bg-white text-center p-4 shadow rounded-xl ">
            <div className="text-sm">Highest Expense</div>
            <div className="text-2xl font-semibold">${highest}</div>
          </div>
          <div className=" bg-white text-center p-4 shadow rounded-xl ">
            <div className="text-sm">This Month</div>
            <div className="text-2xl font-semibold">${monthly}</div>
          </div>
        </div>
        <ExpenseList
          expenses={filtered}
          onEdit={openEdit}
          onDelete={deleteExpense}
        />
      </main>
    </div>
  );
};

export default Dashboard;
