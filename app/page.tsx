import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />
     <section className="flex min-h-screen flex-col items-center justify-center px-6 pt-24 text-center">
        <div className="mb-6 rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-semibold text-emerald-300">
          Welcome to LooplyLand
        </div>

        <h1 className="max-w-4xl text-5xl font-extrabold leading-tight md:text-7xl">
          Kids learn coding through magical adventures.
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
          Complete quests, solve puzzles, earn XP, and learn programming step by step.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/learn"
            className="rounded-2xl bg-emerald-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Start Adventure
          </Link>

          <Link
            href="/parents"
            className="rounded-2xl border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
          >
            For Parents
          </Link>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <h2 className="text-4xl font-extrabold">
            Built for kids. Trusted by parents.
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            LooplyLand teaches logic, problem solving, and programming basics
            through short interactive lessons that feel like a game.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-6">
              <div className="text-4xl">🧠</div>
              <h3 className="mt-4 text-xl font-bold">Logic Skills</h3>
              <p className="mt-2 text-slate-300">
                Kids learn how to think step by step.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <div className="text-4xl">🎮</div>
              <h3 className="mt-4 text-xl font-bold">Game-like Lessons</h3>
              <p className="mt-2 text-slate-300">
                Quests, XP, levels, and fun challenges.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6">
              <div className="text-4xl">💻</div>
              <h3 className="mt-4 text-xl font-bold">Coding Basics</h3>
              <p className="mt-2 text-slate-300">
                Commands, loops, conditions, variables, and more.
              </p>
            </div>
          </div>

          <Link
            href="/parents"
            className="mt-10 inline-block rounded-2xl border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
          >
            Learn more for parents
          </Link>
        </div>
      </section>
    </main>
  );
}