
import React, { useState, useEffect } from "react"; // adjust the path according to your folder structure
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Sidebar  from "./components/ui/Sidebar";

function App() {
   const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({ month: "all", category: "all" });

    useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);
return(
  <div className="min-h-screen bg-gray-50">
  <Header/>
  <Sidebar expenses={expenses } filters={filters} onFilterChange={setFilters} />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Dashboard expenses={expenses} setExpenses={setExpenses} filters={filters}/>
      </main>
    </div>
  );
};
export default App
