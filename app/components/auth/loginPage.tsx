"use client";

import { useState, FormEvent } from "react";
import { Eye, EyeOff, Car, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log({ email, password, keepLoggedIn });
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-sm mx-auto">
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <Car className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold text-gray-900">FleetFlow</span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 mb-1">Sign In</h1>
          <p className="text-sm text-gray-500 mb-8">
            Enter your email and password to manage your fleet's cash flow!
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
                Email<span className="text-rose-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1.5">
                Password<span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <a href="/forget-password" className="text-sm font-medium text-indigo-600 hover:text-indigo-700">
                Forgot password?
              </a>
            </div>
            <Link
              href="/home"
              className="block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-2.5 transition text-center"
            >
              Sign In
            </Link>
          </form>

          <p className="text-sm text-gray-500 text-center mt-6">
            Don't have a fleet account?{" "}
            <a href="/register" className="font-medium text-indigo-600 hover:text-indigo-700">
              Sign Up
            </a>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 items-center justify-center p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            #1 Vehicle Cash Flow Management Platform
          </h2>
          <p className="text-indigo-100 text-sm mb-10">
            Track fuel costs, maintenance spend, and vehicle revenue in one place.
          </p>

          <div className="rounded-xl bg-white shadow-2xl p-5 text-left">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-indigo-600 flex items-center justify-center">
                  <Car className="w-3.5 h-3.5 text-white" />
                </div>
                <span className="text-xs font-semibold text-gray-800">FleetFlow</span>
              </div>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[10px] text-gray-400">Net cash flow</span>
                </div>
                <div className="text-sm font-bold text-gray-800">K18,420.00</div>
                <div className="text-[10px] text-emerald-500">+9.6%</div>
              </div>
              <div className="rounded-lg bg-gray-50 p-3">
                <div className="flex items-center gap-1.5 mb-1">
                  <Car className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[10px] text-gray-400">Active vehicles</span>
                </div>
                <div className="text-sm font-bold text-gray-800">127</div>
                <div className="text-[10px] text-emerald-500">+11.0%</div>
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 mb-3">
              <div className="flex items-center gap-1.5 mb-2">
                <TrendingUp className="w-3.5 h-3.5 text-blue-500" />
                <span className="text-[10px] text-gray-400">Monthly revenue vs. expenses</span>
              </div>
              <div className="flex items-end gap-1 h-10">
                {[40, 65, 45, 80, 55, 90, 60].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm bg-indigo-400/70" style={{ height: `${h}%` }} />
                ))}
              </div>
            </div>

            <div className="rounded-lg bg-gray-50 p-3 flex items-center justify-between">
              <div>
                <div className="text-[10px] text-gray-400 mb-0.5">Fuel budget used</div>
                <div className="text-sm font-bold text-gray-800">75.55%</div>
              </div>
              <div className="w-10 h-10 rounded-full border-4 border-indigo-500 border-r-gray-200" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;