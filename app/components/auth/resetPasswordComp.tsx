"use client";

import { useState } from "react";
import { Grid3x3, Eye, EyeOff, CheckCircle2 } from "lucide-react";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== password2) {
      setError("Passwords do not match.");
      return;
    }

    // Hook up to your "reset password" API call here (include the reset
    // token from the URL, e.g. via useSearchParams()).
    console.log({ password, password2 });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen w-full flex bg-white">
      {/* Left: Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 sm:px-12 lg:px-20 py-12">
        <div className="w-full max-w-sm mx-auto">
          {/* Logo */}
          <div className="flex items-center gap-2 mb-10">
            <div className="w-8 h-8 rounded-md bg-indigo-600 flex items-center justify-center">
              <Grid3x3 className="w-4 h-4 text-white" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold text-gray-900">TailAdmin</span>
          </div>

          {!submitted ? (
            <>
              <h1 className="text-2xl font-bold text-gray-900 mb-1">
                Reset Password
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Your new password must be different from previously used
                passwords.
              </p>

              {error && (
                <div className="mb-5 rounded-lg bg-rose-50 border border-rose-200 px-4 py-2.5 text-sm text-rose-600">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    New Password<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter new password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-400">
                    Must be at least 8 characters.
                  </p>
                </div>

                <div>
                  <label
                    htmlFor="password2"
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Confirm Password<span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="password2"
                      type={showPassword2 ? "text" : "password"}
                      value={password2}
                      onChange={(e) => setPassword2(e.target.value)}
                      placeholder="Re-enter new password"
                      className="w-full rounded-lg border border-gray-300 px-4 py-2.5 pr-11 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword2((v) => !v)}
                      className="absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-400 hover:text-gray-600"
                      aria-label={showPassword2 ? "Hide password" : "Show password"}
                    >
                      {showPassword2 ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-2.5 transition"
                >
                  Reset Password
                </button>
              </form>
            </>
          ) : (
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Password reset
              </h1>
              <p className="text-sm text-gray-500 mb-8">
                Your password has been reset successfully. You can now sign in
                with your new password.
              </p>
              <a
                href="#"
                className="inline-block w-full rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium py-2.5 transition text-center"
              >
                Back to Sign In
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Right: Promo panel (kept consistent with the other auth pages) */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-600 items-center justify-center p-12">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-white/5 blur-2xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-blue-400/10 blur-3xl" />

        <div className="relative z-10 max-w-md text-center">
          <h2 className="text-2xl font-bold text-white mb-2">
            Almost there
          </h2>
          <p className="text-indigo-100 text-sm">
            Choose a strong new password to keep your account secure.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;