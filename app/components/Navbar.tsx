"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setIsLoggedIn(Boolean(user));
      setCheckingUser(false);
    }

    checkUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(Boolean(session?.user));
      setCheckingUser(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setIsLoggedIn(false);
  }

  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#101827]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-2xl font-extrabold">
          Looply<span className="text-emerald-300">Land</span>
        </Link>

        <nav className="hidden items-center gap-6 font-bold text-slate-300 sm:flex">
          <Link href="/learn" className="transition hover:text-white">
            Learn
          </Link>

          <Link href="/parents" className="transition hover:text-white">
            Parents
          </Link>

          <Link href="/upgrade" className="transition hover:text-white">
            Premium
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          {checkingUser ? (
            <div className="rounded-2xl bg-white/5 px-5 py-3 font-bold text-slate-300">
              ...
            </div>
          ) : isLoggedIn ? (
            <>
              <Link
                href="/profile"
                className="rounded-2xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Profile
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/10"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="hidden rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/10 sm:inline-block"
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="rounded-2xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}