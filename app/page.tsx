import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden px-6 pb-16 pt-28 md:pb-20 md:pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* HERO TEXT */}
            <div className="text-center lg:text-left">
              <div className="mb-5 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 md:mb-6">
                Coding game for kids ages 8–12
              </div>

              <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
                Kids learn coding by completing short quests.
              </h1>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:mt-6 md:text-xl md:leading-8 lg:mx-0">
                LooplyLand helps kids practice commands, loops, conditions, and
                variables through game-like lessons, XP, streaks, and boss
                fights.
              </p>

              <div className="mt-7 grid gap-3 sm:flex sm:justify-center lg:justify-start">
                <Link
                  href="/learn"
                  className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-emerald-300 md:px-8 md:text-lg"
                >
                  Try Free Demo
                </Link>

                <Link
                  href="/signup"
                  className="rounded-2xl border border-white/20 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-white/10 md:px-8 md:text-lg"
                >
                  Create Free Account
                </Link>
              </div>

              <div className="mt-6 grid gap-3 text-left sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-bold text-emerald-300">1. Pick a quest</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Start inside Robo Lab.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-bold text-emerald-300">
                    2. Solve puzzles
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Answer coding questions.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <p className="font-bold text-emerald-300">3. Earn XP</p>
                  <p className="mt-1 text-sm leading-6 text-slate-400">
                    Build progress and streaks.
                  </p>
                </div>
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-400">
                No coding experience needed. Starts with Robo Lab.
              </p>
            </div>

            {/* ROBO HERO CARD */}
            <div className="relative mx-auto w-full max-w-lg">
              <div className="absolute inset-8 rounded-full bg-emerald-400/20 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-b from-emerald-400/10 to-white/5 p-6 shadow-2xl md:p-8">
                <div className="absolute right-5 top-5 rounded-full border border-emerald-400/30 bg-[#101827]/80 px-4 py-2 text-xs font-extrabold text-emerald-300 backdrop-blur">
                  YOUR CODING GUIDE
                </div>

                <div className="flex min-h-[360px] items-end justify-center md:min-h-[430px]">
                  <Image
                    src="/mascot/Robo.png"
                    alt="Robo, the LooplyLand coding adventure guide"
                    width={700}
                    height={700}
                    priority
                    className="h-auto w-full max-w-[340px] object-contain drop-shadow-2xl md:max-w-[420px]"
                  />
                </div>

                <div className="relative -mt-5 rounded-3xl border border-white/10 bg-slate-950/90 p-5 text-center backdrop-blur md:p-6">
                  <p className="font-bold text-emerald-300">Meet Robo</p>

                  <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                    Your coding adventure buddy.
                  </h2>

                  <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300 md:text-base">
                    Robo guides kids through quests, coding puzzles, rewards,
                    and new worlds.
                  </p>

                  <div className="mt-5 grid grid-cols-3 gap-2 text-sm font-bold">
                    <div className="rounded-2xl bg-white/5 px-3 py-3">
                      🧩 Puzzles
                    </div>

                    <div className="rounded-2xl bg-white/5 px-3 py-3">
                      ⭐ XP
                    </div>

                    <div className="rounded-2xl bg-white/5 px-3 py-3">
                      🏆 Rewards
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BENEFITS */}
      <section className="bg-slate-950 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-bold text-emerald-300">
            Fun for kids. Valuable for parents.
          </p>

          <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
            Educational screen time that builds real skills.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg md:leading-8">
            LooplyLand helps children learn logic, problem solving, and
            programming basics through short interactive adventures designed
            for ages 8–12.
          </p>

          <div className="mt-10 grid gap-6 md:mt-12 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left md:p-8">
              <div className="text-5xl">🧠</div>

              <h3 className="mt-5 text-2xl font-extrabold">Logic Skills</h3>

              <p className="mt-3 leading-7 text-slate-300">
                Kids practice step-by-step thinking, patterns, decisions, and
                problem solving.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left md:p-8">
              <div className="text-5xl">🎮</div>

              <h3 className="mt-5 text-2xl font-extrabold">
                Game-like Learning
              </h3>

              <p className="mt-3 leading-7 text-slate-300">
                Quests, XP, streaks, levels, and boss fights keep children
                engaged.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 text-left md:p-8">
              <div className="text-5xl">💻</div>

              <h3 className="mt-5 text-2xl font-extrabold">Coding Basics</h3>

              <p className="mt-3 leading-7 text-slate-300">
                Commands, loops, conditions, variables, debugging, and beginner
                coding concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="px-6 py-20 md:py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="font-bold text-emerald-300">How it works</p>

              <h2 className="mt-4 text-3xl font-extrabold md:text-5xl">
                A simple daily adventure system.
              </h2>

              <p className="mt-5 text-base leading-7 text-slate-300 md:text-lg md:leading-8">
                Children complete short quests, answer coding puzzles, earn XP,
                build streaks, and unlock new worlds.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Link
                  href="/parents"
                  className="rounded-2xl border border-white/20 px-6 py-4 text-center text-base font-bold text-white transition hover:bg-white/10 md:px-8 md:text-lg"
                >
                  Learn More for Parents
                </Link>

                <Link
                  href="/learn"
                  className="rounded-2xl bg-emerald-400 px-6 py-4 text-center text-base font-bold text-slate-950 transition hover:bg-emerald-300 md:px-8 md:text-lg"
                >
                  Try Free Demo
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-extrabold text-emerald-300">
                  STEP 1
                </p>

                <h3 className="mt-3 text-2xl font-extrabold">
                  Start with Robo Lab
                </h3>

                <p className="mt-2 leading-7 text-slate-300">
                  Kids begin with simple commands and friendly coding puzzles.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-extrabold text-emerald-300">
                  STEP 2
                </p>

                <h3 className="mt-3 text-2xl font-extrabold">
                  Complete short quests
                </h3>

                <p className="mt-2 leading-7 text-slate-300">
                  Each quest teaches one coding idea through interactive
                  questions.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-sm font-extrabold text-emerald-300">
                  STEP 3
                </p>

                <h3 className="mt-3 text-2xl font-extrabold">
                  Track learning progress
                </h3>

                <p className="mt-2 leading-7 text-slate-300">
                  XP, streaks, and completed quests help children stay
                  consistent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-slate-950 px-6 py-20 md:py-24">
        <div className="mx-auto max-w-4xl overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 md:p-10">
          <div className="grid items-center gap-8 md:grid-cols-[180px_1fr]">
            <div className="mx-auto">
              <Image
                src="/mascot/Robo.png"
                alt="Robo celebrating a new coding adventure"
                width={250}
                height={250}
                className="h-auto w-40 object-contain drop-shadow-xl md:w-44"
              />
            </div>

            <div className="text-center md:text-left">
              <p className="font-bold text-emerald-300">Ready to begin?</p>

              <h2 className="mt-3 text-3xl font-extrabold md:text-5xl">
                Give your child a fun first step into coding.
              </h2>

              <p className="mt-4 text-base leading-7 text-slate-300 md:text-lg">
                Start with the free Robo Lab world and help Robo complete his
                first coding adventure.
              </p>

              <div className="mt-7 flex flex-col gap-3 sm:flex-row md:justify-start">
                <Link
                  href="/learn"
                  className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Try Free Demo
                </Link>

                <Link
                  href="/signup"
                  className="rounded-2xl border border-white/20 px-6 py-4 text-center font-bold text-white transition hover:bg-white/10"
                >
                  Create Free Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}