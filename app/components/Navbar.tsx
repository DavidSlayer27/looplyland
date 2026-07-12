"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [checkingUser, setCheckingUser] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

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
    setMenuOpen(false);
  }

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#101827]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 text-white md:px-6">
          <Link
            href="/"
            onClick={closeMenu}
            className="text-xl font-extrabold sm:text-2xl"
          >
            Looply<span className="text-emerald-300">Land</span>
          </Link>

          <nav className="hidden items-center gap-6 font-bold text-slate-300 md:flex">
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

          <div className="hidden items-center gap-3 md:flex">
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
                  className="rounded-2xl border border-white/10 px-5 py-3 font-bold text-white transition hover:bg-white/10"
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

          <button
            onClick={() => setMenuOpen((currentValue) => !currentValue)}
            className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-bold text-white transition hover:bg-white/10 md:hidden"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#101827] pt-24 text-white md:hidden">
          <div className="mx-auto flex h-full max-w-6xl flex-col px-5 pb-8">
            <nav className="grid gap-4">
              <Link
                href="/learn"
                onClick={closeMenu}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-2xl font-extrabold text-white transition hover:bg-white/10"
              >
                Learn
              </Link>

              <Link
                href="/parents"
                onClick={closeMenu}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-2xl font-extrabold text-white transition hover:bg-white/10"
              >
                Parents
              </Link>

              <Link
                href="/upgrade"
                onClick={closeMenu}
                className="rounded-3xl border border-white/10 bg-white/5 px-6 py-5 text-2xl font-extrabold text-white transition hover:bg-white/10"
              >
                Premium
              </Link>
            </nav>

            <div className="mt-6 border-t border-white/10 pt-6">
              {checkingUser ? (
                <div className="rounded-3xl bg-white/5 px-6 py-4 text-center font-bold text-slate-300">
                  ...
                </div>
              ) : isLoggedIn ? (
                <div className="grid gap-3">
                  <Link
                    href="/profile"
                    onClick={closeMenu}
                    className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="rounded-2xl border border-white/20 px-6 py-4 text-center text-lg font-bold text-white transition hover:bg-white/10"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="grid gap-3">
                  <Link
                    href="/learn"
                    onClick={closeMenu}
                    className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Try Free Demo
                  </Link>

                  <Link
                    href="/signup"
                    onClick={closeMenu}
                    className="rounded-2xl border border-white/20 px-6 py-4 text-center text-lg font-bold text-white transition hover:bg-white/10"
                  >
                    Create Free Account
                  </Link>

                  <Link
                    href="/login"
                    onClick={closeMenu}
                    className="rounded-2xl bg-white/5 px-6 py-4 text-center text-lg font-bold text-slate-200 transition hover:bg-white/10"
                  >
                    Login
                  </Link>
                </div>
              )}
            </div>

            <div className="mt-auto pt-8">
              <p className="text-sm font-semibold leading-6 text-slate-400">
                Coding quests for kids ages 8–12. Turn screen time into learning
                time.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}