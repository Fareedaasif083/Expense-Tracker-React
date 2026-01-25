
import React, { useState, useEffect } from "react"; // adjust the path according to your folder structure
import Header from "./components/Header";
import Dashboard from "./components/Dashboard";
import Sidebar  from "./components/ui/Sidebar";
import {supabase} from "./supabaseClients";

function App() {
   const [expenses, setExpenses] = useState([]);
    const [filters, setFilters] = useState({ month: "all", category: "all" });
   const [user,setUser]=useState(null);

    useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) {
      setExpenses(JSON.parse(stored));
    }
  }, []);

   useEffect(() => {
      supabase.auth.getSession().then((data)=> {
         if(data.session){
            setUser(data.session.user)
         }
         else{
            setUser(null)
         }
      })
      const listeners=supabase.auth.onAuthStateChange((event,session)=>{
         if(session){
            setUser(session.user)
         }
      else{
         setUser(null)
      }
      })

      return function cleanUp(){
         listeners.data.subscription.unsubscribe()
      }
   },[])
return(
  <div className="min-h-screen bg-gray-50">
  <Header user={user} setUser={setUser}/>
  <Sidebar expenses={expenses } filters={filters} onFilterChange={setFilters} />
      <main className="max-w-5xl mx-auto px-4 py-6">
         {!user &&(
           <div className="mb-4 ml-500 p-4 bg-yellow-100 text-yellow-800 rounded">
               Please login or signup to save and manage your expenses.
           </div>
           )}
        <Dashboard expenses={expenses} setExpenses={setExpenses} filters={filters}/>
      </main>
    </div>
  );
};
export default App
