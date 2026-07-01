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
    setErrorMessage("This email is already on the waitlist.");
    return;
  }

  setErrorMessage(`${error.message} ${error.code ? `(${error.code})` : ""}`);
  return;
}

    setSubmitted(true);
    setEmail("");
  }

  return (
    <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
      <Navbar />
      <div className="mx-auto max-w-5xl pt-24">
        <Link
          href="/learn"
          className="rounded-2xl border border-white/10 px-4 py-2 font-bold text-slate-300 transition hover:bg-white/10"
        >
          ← Back to Map
        </Link>

        <section className="mt-16 text-center">
          <div className="mx-auto mb-6 w-fit rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            LooplyLand Premium
          </div>

          <h1 className="mx-auto max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
            Unlock the full coding adventure.
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
            Give your child access to more coding worlds, interactive quests,
            boss fights, certificates, and progress tracking for parents.
          </p>
        </section>

        <section className="mt-16 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-5xl">🗺️</div>
            <h2 className="mt-5 text-2xl font-extrabold">More Worlds</h2>
            <p className="mt-3 text-slate-300">
              Unlock new coding areas like Loop Forest, Variable Village, and
              Function Tower.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-5xl">🏆</div>
            <h2 className="mt-5 text-2xl font-extrabold">Certificates</h2>
            <p className="mt-3 text-slate-300">
              Children earn certificates after completing each coding world.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="text-5xl">👨‍👩‍👧</div>
            <h2 className="mt-5 text-2xl font-extrabold">
              Parent Dashboard
            </h2>
            <p className="mt-3 text-slate-300">
              Parents can see what their child learned and how much progress
              they made.
            </p>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-2xl rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
          {!submitted ? (
            <>
              <h2 className="text-3xl font-extrabold">
                Join the early access list
              </h2>

              <p className="mt-3 text-slate-300">
                Enter a parent email and we&apos;ll send access when Premium is
                ready.
              </p>

              <form
                onSubmit={handleSubmit}
                className="mt-6 flex flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  required
                  placeholder="Parent email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  className="min-w-0 flex-1 rounded-2xl border border-white/10 bg-slate-950 px-5 py-4 text-white outline-none placeholder:text-slate-500"
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
                <p className="mt-4 font-bold text-red-300">{errorMessage}</p>
              )}
            </>
          ) : (
            <>
              <div className="text-7xl">✅</div>

              <h2 className="mt-5 text-3xl font-extrabold">
                You&apos;re on the list!
              </h2>

              <p className="mt-3 text-slate-300">
                Thanks! We&apos;ll notify you when Premium worlds are ready.
              </p>

              <Link
                href="/learn"
                className="mt-6 inline-block rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Back to Map
              </Link>
            </>
          )}
        </section>
      </div>
    </main>
  );
}