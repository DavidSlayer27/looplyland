import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ParentsPage() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-5 w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 md:mb-6">
            For Parents · Ages 8–12
          </div>

          <h1 className="mx-auto max-w-5xl text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
            Help your child learn coding through fun daily adventures.
          </h1>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 md:mt-6 md:text-xl md:leading-8">
            LooplyLand turns coding basics into short quests, puzzles, XP,
            streaks, and boss fights — helping kids build logic and
            problem-solving skills while having fun.
          </p>

          <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row md:mt-10 md:gap-4">
            <Link
              href="/signup"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-emerald-300 md:px-8 md:text-lg"
            >
              Create Free Account
            </Link>

            <Link
              href="/learn"
              className="rounded-2xl border border-white/20 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10 md:px-8 md:text-lg"
            >
              Try Demo
            </Link>
          </div>

          <p className="mt-5 text-sm font-semibold text-slate-400">
            No prior coding experience needed.
          </p>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold text-emerald-300">
              Fun for kids. Valuable for parents.
            </p>

            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Turn screen time into learning time.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              LooplyLand is designed for children ages 8–12 who are curious
              about games, robots, technology, and how things work.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:mt-12 md:grid-cols-3 md:gap-6">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-5xl">🧠</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Builds logic skills
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Children learn to break problems into small steps, make
                decisions, and think in a structured way.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-5xl">💻</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Teaches coding basics
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                Commands, loops, conditions, variables, debugging, and beginner
                programming ideas are introduced step by step.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 md:p-8">
              <div className="text-5xl">🎮</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Feels like a game
              </h3>
              <p className="mt-3 leading-7 text-slate-300">
                XP, hearts, streaks, quests, locked worlds, and boss fights keep
                kids motivated to continue.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 md:p-12">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center lg:gap-10">
            <div>
              <p className="font-bold text-emerald-300">
                What your child learns
              </p>

              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                Real coding concepts, explained through adventures.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                The first world, Robo Lab, introduces core coding ideas in a
                friendly way. Each quest focuses on one concept and gives your
                child a small win.
              </p>
            </div>

            <div className="grid gap-3 md:gap-4">
              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:p-5">
                <p className="font-bold text-emerald-300">Commands</p>
                <p className="mt-1 text-slate-300">
                  Giving clear step-by-step instructions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:p-5">
                <p className="font-bold text-emerald-300">Loops</p>
                <p className="mt-1 text-slate-300">
                  Understanding how computers repeat actions.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:p-5">
                <p className="font-bold text-emerald-300">Conditions</p>
                <p className="mt-1 text-slate-300">
                  Learning how programs make decisions using if logic.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:p-5">
                <p className="font-bold text-emerald-300">Variables</p>
                <p className="mt-1 text-slate-300">
                  Storing values like energy, score, and progress.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/60 p-4 md:p-5">
                <p className="font-bold text-emerald-300">Problem Solving</p>
                <p className="mt-1 text-slate-300">
                  Practicing focus, logic, and debugging through challenges.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <p className="font-bold text-emerald-300">How LooplyLand works</p>

            <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
              Short quests. Clear progress. More consistency.
            </h2>

            <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
              Children can complete short lessons in a few minutes, making it
              easier to build a daily habit.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 md:mt-12 lg:grid-cols-4">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-5xl">1️⃣</div>
              <h3 className="mt-4 text-xl font-extrabold">Start a quest</h3>
              <p className="mt-2 text-slate-300">
                Your child begins a short coding mission.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-5xl">2️⃣</div>
              <h3 className="mt-4 text-xl font-extrabold">Solve puzzles</h3>
              <p className="mt-2 text-slate-300">
                They answer interactive questions and learn by doing.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-5xl">3️⃣</div>
              <h3 className="mt-4 text-xl font-extrabold">Earn rewards</h3>
              <p className="mt-2 text-slate-300">
                XP, hearts, streaks, and completed quests show progress.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-center">
              <div className="text-5xl">4️⃣</div>
              <h3 className="mt-4 text-xl font-extrabold">Unlock worlds</h3>
              <p className="mt-2 text-slate-300">
                New worlds introduce new coding concepts step by step.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="font-bold text-emerald-300">
                Why parents like it
              </p>

              <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
                Designed to feel useful, not like wasted screen time.
              </h2>

              <div className="mt-8 grid gap-3 md:gap-4">
                <div className="rounded-2xl bg-slate-950/60 p-4 md:p-5">
                  ✅ Short daily learning sessions
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-4 md:p-5">
                  ✅ Beginner-friendly coding concepts
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-4 md:p-5">
                  ✅ Progress, XP, and streak tracking
                </div>

                <div className="rounded-2xl bg-slate-950/60 p-4 md:p-5">
                  ✅ Built for kids ages 8–12
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 md:p-8">
              <p className="font-bold text-emerald-300">What is coming next</p>

              <h2 className="mt-4 text-3xl font-extrabold md:text-4xl">
                Premium worlds and parent progress dashboard.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                The free Robo Lab world is just the beginning. Future worlds can
                include debugging, game logic, algorithms, creative coding, and
                a dashboard where parents can see progress.
              </p>

              <Link
                href="/upgrade"
                className="mt-8 inline-block w-full rounded-2xl bg-emerald-400 px-8 py-4 text-center font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                Join Early Access
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center md:p-10">
          <p className="font-bold text-emerald-300">
            Start with the free world
          </p>

          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
            See if your child enjoys learning coding with LooplyLand.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            Create a free account, try Robo Lab, and watch your child complete
            their first coding quests.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-2xl bg-emerald-400 px-6 py-4 text-base font-bold text-slate-950 transition hover:bg-emerald-300 md:px-8 md:text-lg"
            >
              Create Free Account
            </Link>

            <Link
              href="/upgrade"
              className="rounded-2xl border border-white/20 px-6 py-4 text-base font-bold text-white transition hover:bg-white/10 md:px-8 md:text-lg"
            >
              Join Early Access
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}