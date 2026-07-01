import Link from "next/link";
import Navbar from "../components/Navbar";

export default function ParentsPage() {
  return (
    <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
        <Navbar />
      <div className="mx-auto max-w-6xl pt-24">
        <div className="flex items-center justify-between">
         </div>

        <section className="mt-20 text-center">
          <div className="mx-auto mb-6 w-fit rounded-full bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
            For Parents
          </div>

          <h1 className="mx-auto max-w-5xl text-5xl font-extrabold leading-tight md:text-7xl">
            Help your child learn coding through fun daily adventures.
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-300 md:text-xl">
            LooplyLand turns programming basics into short game-like lessons
            that help children build logic, focus, and problem-solving skills.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/learn"
              className="rounded-2xl bg-emerald-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Try Free Demo
            </Link>

            <Link
              href="/upgrade"
              className="rounded-2xl border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              Join Early Access
            </Link>
          </div>
        </section>

        <section className="mt-24 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="text-5xl">🧠</div>
            <h2 className="mt-5 text-2xl font-extrabold">
              Builds logic skills
            </h2>
            <p className="mt-3 text-slate-300">
              Children learn how to break problems into small steps, make
              decisions, and think like builders.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="text-5xl">💻</div>
            <h2 className="mt-5 text-2xl font-extrabold">
              Teaches coding basics
            </h2>
            <p className="mt-3 text-slate-300">
              LooplyLand introduces commands, loops, conditions, variables, and
              debugging through simple interactive quests.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-7">
            <div className="text-5xl">🎮</div>
            <h2 className="mt-5 text-2xl font-extrabold">
              Feels like a game
            </h2>
            <p className="mt-3 text-slate-300">
              XP, hearts, quests, locked worlds, and boss fights keep children
              motivated to continue learning.
            </p>
          </div>
        </section>

        <section className="mt-24 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8 md:p-12">
          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div>
              <h2 className="text-4xl font-extrabold">
                What your child learns
              </h2>

              <p className="mt-4 text-slate-300">
                LooplyLand starts with beginner-friendly coding concepts and
                turns them into small missions children can complete in a few
                minutes.
              </p>
            </div>

            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-950/60 p-5">
                <p className="font-bold text-emerald-300">Commands</p>
                <p className="mt-1 text-slate-300">
                  Learning how to give instructions step by step.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/60 p-5">
                <p className="font-bold text-emerald-300">Loops</p>
                <p className="mt-1 text-slate-300">
                  Understanding how computers repeat actions.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/60 p-5">
                <p className="font-bold text-emerald-300">Conditions</p>
                <p className="mt-1 text-slate-300">
                  Learning how programs make decisions using if/else logic.
                </p>
              </div>

              <div className="rounded-2xl bg-slate-950/60 p-5">
                <p className="font-bold text-emerald-300">Problem Solving</p>
                <p className="mt-1 text-slate-300">
                  Practicing focus, logic, and debugging through challenges.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-24">
          <h2 className="text-center text-4xl font-extrabold">
            How LooplyLand works
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-4">
            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <div className="text-5xl">1️⃣</div>
              <h3 className="mt-4 text-xl font-bold">Start a quest</h3>
              <p className="mt-2 text-slate-300">
                Your child chooses a short coding mission.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <div className="text-5xl">2️⃣</div>
              <h3 className="mt-4 text-xl font-bold">Solve puzzles</h3>
              <p className="mt-2 text-slate-300">
                They answer interactive coding questions.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <div className="text-5xl">3️⃣</div>
              <h3 className="mt-4 text-xl font-bold">Earn XP</h3>
              <p className="mt-2 text-slate-300">
                Progress is rewarded with XP, hearts, and unlocked worlds.
              </p>
            </div>

            <div className="rounded-3xl bg-white/5 p-6 text-center">
              <div className="text-5xl">4️⃣</div>
              <h3 className="mt-4 text-xl font-bold">Keep learning</h3>
              <p className="mt-2 text-slate-300">
                New worlds introduce new coding concepts step by step.
              </p>
            </div>
          </div>
        </section>

        <section className="mx-auto mt-24 max-w-3xl rounded-3xl border border-white/10 bg-white/5 p-8 text-center">
          <h2 className="text-4xl font-extrabold">
            Start with the free demo.
          </h2>

          <p className="mt-4 text-slate-300">
            Try the first LooplyLand quests and see how your child responds.
            Premium worlds are coming soon.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/learn"
              className="rounded-2xl bg-emerald-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Try Free Demo
            </Link>

            <Link
              href="/upgrade"
              className="rounded-2xl border border-white/20 px-8 py-4 font-bold text-white transition hover:bg-white/10"
            >
              Join Early Access
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}