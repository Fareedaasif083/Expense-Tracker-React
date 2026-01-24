
// import { useState, useEffect } from "react"
// import { supabase } from "./config/supabaseClients"
// import Header from "./components/Header"
// import Dashboard from "./components/Dashboard"
// import Sidebar from "./components/ui/Sidebar"

// function App() {
//   const [user, setUser] = useState(null)
//   const [expenses, setExpenses] = useState([])
//   const [filters, setFilters] = useState({ month: "all", category: "all" })

//   // Supabase auth session
//   useEffect(() => {
//     supabase.auth.getSession().then(({ data }) => {
//       setUser(data.session?.user ?? null)
//     })

//     const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
//       setUser(session?.user ?? null)
//     })

//     return () => listener.subscription.unsubscribe()
//   }, [])

//   // Load expenses from localStorage
//   useEffect(() => {
//     const stored = localStorage.getItem("expenses")
//     if (stored) {
//       setExpenses(JSON.parse(stored))
//     }
//   }, [])

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header user={user} setUser={setUser} />

//       {user ? (
//         <div className="flex">
//           <Sidebar expenses={expenses} filters={filters} onFilterChange={setFilters} />
//           <main className="flex-1 max-w-5xl mx-auto px-4 py-6">
//             <Dashboard expenses={expenses} setExpenses={setExpenses} filters={filters} />
//           </main>
//         </div>
//       ) : (
//         <main className="p-4 text-center">
//           <p>Please login or signup to manage your expenses.</p>
//         </main>
//       )}
//     </div>
//   )
// }

// export default App

import { useState, useEffect } from "react"
import { supabase } from "./config/supabaseClients"
import Header from "./components/Header"
import Dashboard from "./components/Dashboard"
import Sidebar from "./components/ui/Sidebar"


function App() {
  const [user, setUser] = useState(null)
  const [expenses, setExpenses] = useState([])
  const [filters, setFilters] = useState({ month: "all", category: "all" })

  // Supabase auth session
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setUser(data.session?.user ?? null)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  // Load expenses from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("expenses")
    if (stored) {
      setExpenses(JSON.parse(stored))
    }
  }, [])

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} setUser={setUser} />

      <div className="flex">
        <Sidebar expenses={expenses} filters={filters} onFilterChange={setFilters} />
        <main className="flex-1 max-w-5xl mx-auto px-4 py-6">
          {!user && (
            <div className="mb-4 p-4 bg-yellow-100 text-yellow-800 rounded">
              Please login or signup to save and manage your expenses.
            </div>
          )}
          <Dashboard expenses={expenses} setExpenses={setExpenses} filters={filters} />
        </main>
      </div>
        </div>
)
 }

export default App



