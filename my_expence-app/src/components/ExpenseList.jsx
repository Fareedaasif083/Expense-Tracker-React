import React from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Key } from "lucide-react";

const ExpenseList = ({ expenses, onEdit, onDelete }) => {
  if (!expenses.length) {
    return <div>No Expenses Found</div>;
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-slate-900">
      {expenses.map((e) => {

        return (<div
          key={e.id}
          className="bg-white rounded-xl shadow-sm flex gap-1 flex-col p-4"
        >
          <div className="flex justify-between items-center">
            <h3 className="font-bold">{e.title}</h3>
            <div className="font-bold">Category<Badge>({e.category})</Badge></div>
           
          </div>
          <div className="text-sm">{e.date}</div>
          <div className="font-semibold">Amount   ${e.amount}</div>
          <div className="flex justify-end gap-0.5 ">
            <Button
              size="sm"
              className="bg-slate-900 text-gray-300 border rounded-4xl"
              onClick={() => onEdit(e)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              className="bg-slate-900 text-gray-300 border rounded-4xl ml-1.5"
              onClick={() => onDelete(e.id)}
            >
              Delete
            </Button>
          </div>
        </div>);
      })}
    </div>
  );
};

export default ExpenseList;
