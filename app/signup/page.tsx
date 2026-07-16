"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabaseClient";

export default function SignupPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSignup(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setErrorMessage("");

    const cleanedEmail = email.trim().toLowerCase();

if (!cleanedEmail) {
  setErrorMessage("Please enter a valid email address.");
  setLoading(false);
  return;
}

if (password.length < 6) {
  setErrorMessage("Password must contain at least 6 characters.");
  setLoading(false);
  return;
}

    const { error } = await supabase.auth.signUp({
  email: cleanedEmail,
  password,
});

    setLoading(false);

    if (error) {
      setErrorMessage(error.message);
      return;
    }

    router.push("/learn");
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="flex min-h-screen items-center justify-center px-6 pb-20 pt-32 md:py-36">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl md:p-8">
          <p className="font-bold text-emerald-300">Join LooplyLand</p>

          <h1 className="mt-3 text-3xl font-extrabold md:text-4xl">
            Create account
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-300 md:text-base">
            Save your XP, streak, and coding progress.
          </p>

          <form onSubmit={handleSignup} className="mt-7 space-y-4 md:mt-8">
            <div>
              <label className="font-bold text-slate-200">Email</label>

              <input
  type="email"
  required
  autoComplete="email"
  maxLength={254}
  value={email}
  onChange={(event) => {
    setEmail(event.target.value);
    setErrorMessage("");
  }}
  placeholder="parent@email.com"
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
/>
            </div>

            <div>
              <label className="font-bold text-slate-200">Password</label>

              <input
  type="password"
  required
  minLength={6}
  maxLength={72}
  autoComplete="new-password"
  value={password}
  onChange={(event) => {
    setPassword(event.target.value);
    setErrorMessage("");
  }}
  placeholder="At least 6 characters"
  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none transition placeholder:text-slate-500 focus:border-emerald-400"
/>

            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {errorMessage && (
            <p className="mt-5 rounded-2xl bg-red-400/10 p-4 text-sm font-bold leading-6 text-red-300">
              {errorMessage}
            </p>
          )}

          <p className="mt-6 text-center text-sm leading-6 text-slate-300 md:text-base">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-emerald-300">
              Log in
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}