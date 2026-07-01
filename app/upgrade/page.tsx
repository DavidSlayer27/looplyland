"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UpgradePage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setLoading(true);
    setErrorMessage("");

    const cleanedEmail = email.trim().toLowerCase();

    const { error } = await supabase.from("waitlist").insert([
      {
        email: cleanedEmail,
      },
    ]);

    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        setErrorMessage("This email is already on the early access list.");
        return;
      }

      setErrorMessage(`${error.message} ${error.code ? `(${error.code})` : ""}`);
      return;
    }

    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <section className="text-center">
            <div className="mx-auto mb-6 w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              LooplyLand Premium · Coming Soon
            </div>

            <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
              Unlock more coding worlds for your child.
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-300 md:text-xl">
              Premium will give kids ages 8–12 access to new coding worlds,
              harder quests, boss fights, certificates, and a parent progress
              dashboard.
            </p>

            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="#pricing"
                className="rounded-2xl bg-emerald-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                View Pricing
              </a>

              <a
                href="#early-access"
                className="rounded-2xl border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
              >
                Join Early Access
              </a>
            </div>

            <p className="mt-5 text-sm font-semibold text-slate-400">
              Premium is not live yet. Join early access to get notified first.
            </p>
          </section>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-bold text-emerald-300">
            More learning. More motivation.
          </p>

          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            What Premium will include
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            The free Robo Lab world teaches the basics. Premium will expand the
            adventure with new worlds, skills, challenges, and parent tools.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">🗺️</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                More Coding Worlds
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                New areas like Debug Desert, Function Tower, Algorithm Arena,
                and Game Logic Island.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">👾</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Boss Fights & Challenges
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Review quests and final challenges help children remember what
                they learned.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">🏆</div>
              <h3 className="mt-5 text-2xl font-extrabold">Certificates</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Children earn certificates after completing each world, giving
                them a visible sense of achievement.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">👨‍👩‍👧</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Parent Dashboard
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Parents can see XP, streaks, completed quests, and what their
                child has learned.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">🔥</div>
              <h3 className="mt-5 text-2xl font-extrabold">Daily Streaks</h3>
              <p className="mt-3 leading-7 text-slate-300">
                Short daily quests help children build consistency without long
                study sessions.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">💻</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Advanced Beginner Skills
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Loops, conditions, variables, debugging, functions, algorithms,
                and beginner project logic.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold text-emerald-300">Simple pricing</p>

            <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
              Start free. Upgrade when your child wants more.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
              Pricing is not active yet. These are expected early-access prices
              to help parents understand the future Premium plan.
            </p>
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-slate-300">Free</p>

                  <h3 className="mt-3 text-4xl font-extrabold">€0</h3>

                  <p className="mt-3 text-slate-300">
                    Try the first coding world and see if your child enjoys
                    LooplyLand.
                  </p>
                </div>

                <div className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-slate-300">
                  Available now
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Robo Lab world
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ 5 beginner coding quests
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ XP and streak tracking
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Basic profile dashboard
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5 text-slate-400">
                  ❌ Premium worlds
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5 text-slate-400">
                  ❌ Printable certificates
                </div>
              </div>

              <Link
                href="/signup"
                className="mt-8 inline-block w-full rounded-2xl border border-white/20 px-6 py-4 text-center font-bold text-white transition hover:bg-white/10"
              >
                Create Free Account
              </Link>
            </div>

            <div className="relative rounded-[2rem] border border-emerald-400/40 bg-emerald-400/10 p-8 shadow-2xl">
              <div className="absolute -top-4 left-8 rounded-full bg-emerald-400 px-4 py-2 text-sm font-extrabold text-slate-950">
                Best for families
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-bold text-emerald-300">
                    Premium · Coming Soon
                  </p>

                  <h3 className="mt-3 text-4xl font-extrabold">
                    €7.99
                    <span className="text-lg font-bold text-slate-300">
                      /month
                    </span>
                  </h3>

                  <p className="mt-2 font-bold text-emerald-300">
                    or expected €59/year
                  </p>

                  <p className="mt-3 text-slate-300">
                    Unlock the full coding adventure with more worlds,
                    certificates, and parent progress tools.
                  </p>
                </div>

                <div className="rounded-full bg-emerald-400 px-4 py-2 text-sm font-bold text-slate-950">
                  Early access
                </div>
              </div>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Everything in Free
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ More coding worlds
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Boss fights and review challenges
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Printable certificates
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Parent progress dashboard
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Future worlds: debugging, functions, algorithms, game logic
                </div>
              </div>

              <a
                href="#early-access"
                className="mt-8 inline-block w-full rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Join Early Access
              </a>
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-3xl text-center text-sm leading-6 text-slate-400">
            Final pricing may change before launch. Early access helps us
            understand which families are interested in Premium before payments
            go live.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="font-bold text-emerald-300">For kids</p>

              <h2 className="mt-4 text-4xl font-extrabold">
                More adventures to unlock.
              </h2>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-slate-950/60 p-5">
                  🎮 More quests, XP, and boss fights
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  🤖 New worlds with new characters
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  🏆 Certificates and milestones
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  🔥 Motivation through daily streaks
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8">
              <p className="font-bold text-emerald-300">For parents</p>

              <h2 className="mt-4 text-4xl font-extrabold">
                A clearer way to track learning.
              </h2>

              <div className="mt-8 grid gap-4">
                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ See what your child completed
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Track XP, streak, and consistency
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Understand what concepts they learned
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-5">
                  ✅ Turn screen time into learning time
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="early-access" className="px-6 py-24">
        <div className="mx-auto max-w-3xl rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center md:p-10">
          {!submitted ? (
            <>
              <p className="font-bold text-emerald-300">
                Early access waitlist
              </p>

              <h2 className="mt-4 text-4xl font-extrabold">
                Want Premium when it launches?
              </h2>

              <p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">
                Enter a parent email and we&apos;ll notify you when premium
                worlds, certificates, and parent progress tools are ready.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="Parent email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500 focus:border-emerald-400"
                />

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-2xl bg-emerald-400 px-6 py-4 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Request Access"}
                </button>
              </form>

              {errorMessage && (
                <p className="mt-4 rounded-2xl bg-red-400/10 p-4 font-bold text-red-300">
                  {errorMessage}
                </p>
              )}

              <p className="mt-5 text-sm text-slate-400">
                No spam. Just updates about LooplyLand Premium.
              </p>
            </>
          ) : (
            <>
              <div className="text-7xl">✅</div>

              <h2 className="mt-5 text-4xl font-extrabold">
                You&apos;re on the list!
              </h2>

              <p className="mt-4 leading-7 text-slate-300">
                Thanks! We&apos;ll notify you when Premium worlds are ready.
              </p>

              <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
                <Link
                  href="/learn"
                  className="rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Back to Map
                </Link>

                <Link
                  href="/parents"
                  className="rounded-2xl border border-white/20 px-6 py-3 font-bold text-white transition hover:bg-white/10"
                >
                  For Parents
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}