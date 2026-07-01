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

    setLoading(true);
    setErrorMessage("");

    const { error } = await supabase.auth.signUp({
      email: email.trim().toLowerCase(),
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

      <section className="flex min-h-screen items-center justify-center px-6 py-32">
        <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl">
          <p className="font-bold text-emerald-300">Join LooplyLand</p>

          <h1 className="mt-3 text-4xl font-extrabold">Create account</h1>

          <p className="mt-3 text-slate-300">
            Save your XP, streak, and coding progress.
          </p>

          <form onSubmit={handleSignup} className="mt-8 space-y-4">
            <div>
              <label className="font-bold text-slate-200">Email</label>
              <input
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="parent@email.com"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="font-bold text-slate-200">Password</label>
              <input
                type="password"
                required
                minLength={6}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="At least 6 characters"
                className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none transition focus:border-emerald-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </form>

          {errorMessage && (
            <p className="mt-5 rounded-2xl bg-red-400/10 p-4 font-bold text-red-300">
              {errorMessage}
            </p>
          )}

          <p className="mt-6 text-center text-slate-300">
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