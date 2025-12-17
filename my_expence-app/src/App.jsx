
import React, { useState, useEffect } from "react"; // adjust the path according to your folder structure
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
<<<<<<< HEAD
import { SidebarClose } from "lucide-react";
import Sidebar  from "./components/ui/Sidebar";
=======
import Sidebar  from "./components/ui/Sidebar"
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986

function App() {
   const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({ month: "all", category: "all" });

    useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);
<<<<<<< HEAD
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar expenses={expenses } filters={filters} onFilterChange={setFilters}  />
=======
return(
  <div className="min-h-screen bg-gray-50">
  <Header/>
  <Sidebar/ expenses={expenses } filters={filters} onFilterChange={setFilters} >
>>>>>>> 8c2c7395290318ba29136e1bb01e56f9d53c2986
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Dashboard expenses={expenses} setExpenses={setExpenses} filters={filters}/>
      </main>
    </div>
  );
};
export default App
