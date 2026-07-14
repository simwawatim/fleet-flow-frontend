"use client";

import { useState } from "react";
import { Grid3x3, ArrowLeft, MailCheck, Car } from "lucide-react";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    console.log({ email });
    setSubmitted(true);
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

          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Forgot Password?
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Enter the email address linked to your account and we'll send
                you a link to reset your password.
              </p>

              {error && (
                <div className="mb-5 rounded-lg bg-rose-50 border border-rose-200 px-4 py-2.5 text-sm text-rose-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
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

                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-2.5 transition"
                >
                  Send Reset Link
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-indigo-50 flex items-center justify-center mx-auto mb-5">
                <MailCheck className="w-6 h-6 text-indigo-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Check your email
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                We've sent a password reset link to{" "}
                <span className="font-medium text-gray-700">{email}</span>.
                Didn't get it?{" "}
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Try another email
                </button>
                .
              </p>
            </div>
          )}

          <a
            href="/"
            className="mt-6 flex items-center justify-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft size={16} />
            Back to Sign In
          </a>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 items-center justify-center p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Locked out? We've got you.
          </h2>
          <p className="text-indigo-100 text-sm">
            Reset your password in a few clicks and get right back to work.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;