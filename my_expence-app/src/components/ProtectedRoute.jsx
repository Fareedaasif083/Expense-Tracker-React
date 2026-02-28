import React from "react";

function ProtectedRoute({user,children}){
  if(!user){
    return(
      <div className="flex flex-col items-center justify-center h-[500px] px-4">
        <h1 className="text-5xl text-slate-900 font-bold mb-9 animate-leftslide">
          Expense Tracker
        </h1>
        <style>
          {`
           @keyframes slide-component{
           from{
             transform:translateX(-200px);
             opacity:0;
            }
            to{
             transform:translateX(0px);
             opacity:1;
             }
            }
            .animate-leftslide{
             animation: slide-component 0.9s ease-out forwards;
            }
          `}
        </style>
        <div className="max-w-[450px] w-full bg-yellow-100 shadow-lg text-center p-6 rounded-xl">
          <p className="text-lg text-black">
             Please login or signup to save and manage your expenses.
          </p>
        </div>
      </div>
    )
  }
  return children;
}
  
