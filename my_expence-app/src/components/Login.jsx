import React, { useState } from "react";
import { Button } from "./ui/button";
import { supabase } from "../supabaseClients"

export default function Login({ loginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      loginSuccess(data.user);
    }
  };

  const handleGoogleLogin = async (e) => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "Google",
    });

    if (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-sm p-6 bg-gray-800  rounded-lg  shadow m-20  mb-30">
        <h2 className="text-2xl font-semibold mt-5 text-center text-white">
          Login
        </h2>
        <form
          onSubmit={handleLogin}
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
            Login
          </Button>
        </form>
        <p className="text-center text-sm mt-2.5 mb-2.5 text-white ">Or</p>
        <Button
          onClick={handleGoogleLogin}
          className="bg-slate-900 text-gray-300 border rounded-4xl w-85"
        >
          Login with Google
        </Button>
      </div>
    </div>
  );
}
