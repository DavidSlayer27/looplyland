import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

  {/* HERO */}
<section className="relative overflow-hidden px-5 pb-10 pt-24 sm:px-6 lg:pb-12 lg:pt-24">
  <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/15 blur-3xl lg:left-[70%] lg:top-[42%] lg:h-[390px] lg:w-[390px] lg:-translate-y-1/2" />

  <div className="relative mx-auto flex min-h-full w-full max-w-6xl flex-col">
    <div className="grid flex-1 items-center gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
      {/* HERO TEXT */}
      <div className="text-center lg:text-left">
        <div className="mb-3 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300 sm:text-sm">
          Coding quests for kids ages 8–12
        </div>

        <h1 className="mx-auto max-w-2xl text-4xl font-extrabold leading-[1.04] sm:text-5xl lg:mx-0 lg:text-[3.35rem] xl:text-[3.8rem]">
          Kids learn coding through short, game-like quests.
        </h1>

        <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-slate-300 sm:text-lg lg:mx-0">
          Help Robo solve puzzles while learning real coding skills like
          commands, loops, conditions, and variables.
        </p>

        <div className="mt-5 grid gap-3 sm:flex sm:justify-center lg:justify-start">
          <Link
            href="/learn"
            className="rounded-2xl bg-emerald-400 px-7 py-3.5 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Try Free Demo
          </Link>

          <Link
            href="/signup"
            className="rounded-2xl border border-white/20 px-7 py-3.5 text-center font-bold text-white transition hover:bg-white/10"
          >
            Create Free Account
          </Link>
        </div>

        <div className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs font-semibold text-slate-400 sm:text-sm lg:justify-start">
          <span>✓ No coding experience needed</span>
          <span>✓ Free Robo Lab world</span>
          <span>✓ Short beginner lessons</span>
        </div>
      </div>

      {/* ROBO */}
      <div className="relative mx-auto flex w-full max-w-md items-center justify-center lg:translate-y-2 lg:max-w-lg">
        <div className="absolute h-60 w-60 rounded-full bg-emerald-400/10 blur-2xl sm:h-72 sm:w-72 lg:h-80 lg:w-80" />

        <div className="relative flex flex-col items-center">
          <Image
            src="/mascot/Robo.png"
            alt="Robo, the LooplyLand coding guide"
            width={650}
            height={650}
            priority
            className="h-auto w-[210px] object-contain drop-shadow-2xl sm:w-[270px] lg:w-[320px] xl:w-[345px]"
          />

         <div className="mt-3 -translate-y-4 w-[220px] rounded-2xl border border-emerald-400/20 bg-slate-950/90 px-4 py-2.5 text-center shadow-xl backdrop-blur sm:w-[245px]">
            <p className="text-sm font-extrabold text-emerald-300">
              Hi, I&apos;m Robo! 👋
            </p>

            <p className="mt-0.5 text-xs leading-5 text-slate-300">
              Let&apos;s solve your first coding quest.
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* QUICK STEPS */}
    <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 sm:grid-cols-3 lg:mt-2">
      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/90 font-extrabold text-slate-950">
            1
          </div>

          <div>
            <p className="font-extrabold">Pick a quest</p>
            <p className="mt-0.5 text-sm text-slate-400">
              Start inside Robo Lab.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/90 font-extrabold text-slate-950">
            2
          </div>

          <div>
            <p className="font-extrabold">Solve puzzles</p>
            <p className="mt-0.5 text-sm text-slate-400">
              Answer coding questions.
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-400/90 font-extrabold text-slate-950">
            3
          </div>

          <div>
            <p className="font-extrabold">Earn XP</p>
            <p className="mt-0.5 text-sm text-slate-400">
              Build progress and streaks.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<div className="h-10 bg-gradient-to-b from-[#101827] to-slate-950" />

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
                  className="rounded-2xl border border-white/20 px-6 py-4 text-center font-bold text-white transition hover:bg-white/10"
                >
                  Learn More for Parents
                </Link>

                <Link
                  href="/learn"
                  className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
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
          <div className="grid items-center gap-8 md:grid-cols-[150px_1fr]">
            <div className="mx-auto">
              <Image
                src="/mascot/Robo.png"
                alt="Robo inviting kids to start coding"
                width={220}
                height={220}
                className="h-auto w-36 object-contain drop-shadow-xl md:w-40"
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

              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
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