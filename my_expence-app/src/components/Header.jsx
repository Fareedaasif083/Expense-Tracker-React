// import React from "react";
// import Authentication from "./Authentication"
// import { Button } from "./ui/button"

// export default function Header({ user, setUser }) {
//   return (
//     <header className="w-full bg-white shadow-sm">
//       <div className="max-w-5xl flex items-center justify-between mx-auto px-4 py-4">
//         <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
//           <h1 className="text-xl font-semibold">Expense Tracker</h1>
//           <div className="text-sm text-gray-500">Track money. Stay sane.</div>
//         </div>
//         <div>
//           {user ? (
//             <div className="flex items-center gap-2">
//               <span className="text-sm text-gray-700">{user.email}</span>
//               <Button
//                 variant="secondary"
//                 size="sm"
//                 onClick={() => supabase.auth.signOut().then(() => setUser(null))}
//               >
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <Authentication setUser={setUser} />
//           )}
//         </div>
//       </div>
//     </header>
//   )
// }
import Authentication from "./Authentication"
import { Button } from "./ui/button"
import { supabase } from "../config/supabaseClients" // make sure this path is correct

export default function Header({ user, setUser }) {
  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout error:", error.message)
    } else {
      setUser(null)
    }
  }

  return (
    <header className="w-full bg-white shadow-sm">
      <div className="max-w-5xl flex items-center justify-between mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4">
          <h1 className="text-xl font-semibold">Expense Tracker</h1>
          <div className="text-sm text-gray-500">Track money. Stay sane.</div>
        </div>
        <div>
          {user ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-700">{user.email}</span>
              <Button variant="secondary" size="sm" onClick={handleLogout}>
                Logout
              </Button>
            </div>
          ) : (
            <Authentication setUser={setUser} />
          )}
        </div>
      </div>
    </header>
  )
}

