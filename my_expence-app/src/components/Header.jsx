import React from "react";
import { Button } from "./ui/button";
import Authentication from "./Authentication"
import {supabase} from "./supabaseClients"

const Header = ({user,setUser}) => {
  const logout=async() =>{
    const result=await supabase.auth.signOut()
    if(result.error){
      console.error("logout error:" ,result.error.message)
    }
    else{
      setUser(null)
    }
  }:
  return (
    <div>
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
                 <Button className="bg-slate-900 text-gray-300 border rounded-4xl" onClick={logout}>
                    Logout
                 </Button>
               </div>
              ):(
                 <Authentication setUser={setUser}/>
                )
            }
          </div>
        </div>
      </header>
    </div>
  );
};

export default Header;
