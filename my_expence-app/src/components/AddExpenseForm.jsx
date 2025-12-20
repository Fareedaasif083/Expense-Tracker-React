import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

const categories = [
  "Food",
  "Travel",
  "Grocery",
  "Shopping",
  "Bills",
  "Entertainment",
  "Family",
  "Others",
];
const AddExpenseForm = ({onAddExpense}) => {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [category, setCategory] = useState("Others");
  const [notes, setNotes] = useState("");

  const onSaveExpense = (e) => {
    e.preventDefault();

    if (!title || !amount) {
      alert("Provide title and amount");
      return;
    }

    const expense = {
      title,
      amount: Number(amount),
      category,
      notes,
      date,
      id: Date.now().toString(),
    };
    onAddExpense(expense);

    setTitle(""),
      setAmount(""),
      setDate(new Date().toISOString().slice(0, 10)),
      setCategory("Others"),
      setNotes("");
  };
  return (
    <div className="flex items-center justify-center text-slate-900">
      <form
        onSubmit={onSaveExpense}
        className="w-2xl bg-white rounded-xl shadow-sm p-6 "
      >
        <div className="mb-2">
          <h1 className="text-2xl font-bold text-slate-900 text-center">
            Add Expense's Details
          </h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-4">
          <div>
            <Label>Title</Label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              type="title"
              placeholder=" e.g. Travel"
              className="border rounded shadow-sm border-slate-900 mt-1.5"
            />
          </div>
          <div>
            <Label>Amount</Label>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              type="amount"
              placeholder=" 0.00 "
              className="border rounded shadow-sm  border-slate-900 mt-1.5"
            />
          </div>
          <div>
            <Label>Date</Label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="border rounded shadow-sm  border-slate-900 mt-1.5"
            />
          </div>
          <div>
            <Label className="mb-1.5">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select Category"></SelectValue>
              </SelectTrigger>
              <SelectContent>
                {categories.map((e) => (
                  <SelectItem value={e} key={e}>
                    {e}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Label>Notes</Label>
          <Textarea
            className="mt-1.5"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Optional Notes"
          ></Textarea>
        </div>
        <div className="flex gap-2 justify-end mt-4">
          <Button
            variant="outline"
            className="bg-slate-900 text-gray-300 border rounded-4xl"
          >
            {" "}
            Cancel
          </Button>
          <Button className="bg-slate-900 text-gray-300 border rounded-4xl">
            Save Expense
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddExpenseForm;
