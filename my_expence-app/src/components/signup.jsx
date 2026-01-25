import React, { useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "../supabaseClients"

export default function Signup({ signupSuccess, onFlip }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      signupSuccess(data.user);
    }
  };

  return (
    <div className=" flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-gray-800  rounded-lg  shadow m-20  mb-30">
        <h2 className="text-2xl font-semibold mt-5 text-center text-white">
          Sign Up
        </h2>
        <form
          onSubmit={handleSignup}
          className="flex flex-col gap-3 mt-5 rounded-xl"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" w-full mb-3.5 border border-white rounded text-white"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className=" w-full border border-white rounded mb-3.5 text-white"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <Button className="bg-slate-900 text-gray-300 border rounded-4xl">
            Sign Up
          </Button>
        </form>
        <div className="mt-4 text-center">
          <span className="text-white text-sm">Already have an account? </span>
          <button onClick={onFlip} className="text-blue-400 text-sm underline">Login</button>
        </div>
      </div>
    </div>
  );
}
