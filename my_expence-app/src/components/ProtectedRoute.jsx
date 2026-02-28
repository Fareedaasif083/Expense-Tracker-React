// import React from "react";

// export default function ProtectedRoute({ user, children }) {
//   if (!user) {
//     return (
//       <div className="p-4 bg-yellow-100 text-yellow-800 rounded my-4 text-center">
//         Please login or signup to save and manage your expenses.
//       </div>
//     );
//   }

//   return children;
// }

import React from "react";

export default function ProtectedRoute({ user, children }) {
  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] px-4">

        {/* Animated Title */}
        <h1 className="text-5xl font-bold text-slate-900 mb-6 animate-slide">
          Expense Tracker
        </h1>

        {/* Login Card */}
        <div className="max-w-md w-full bg-yellow-100 shadow-lg rounded-xl p-6 text-center">
          <p className="text-gray-700 text-lg">
            Please login or signup to save and manage your expenses.
          </p>
        </div>

        {/* Animation style */}
        <style>
          {`
            @keyframes slideIn {
              from {
                transform: translateX(-200px);
                opacity: 0;
              }
              to {
                transform: translateX(0);
                opacity: 1;
              }
            }

            .animate-slide {
              animation: slideIn 0.8s ease-out forwards;
            }
          `}
        </style>

      </div>
    );
  }

  return children;
}