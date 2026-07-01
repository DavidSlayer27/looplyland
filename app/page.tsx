"use client";

import Link from "next/link";
import Navbar from "./components/Navbar";
import { useEffect, useState } from "react";

const demoSteps = [
  {
    xp: 0,
    progress: 0,
    title: "Move Robo",
    concept: "Commands",
    emoji: "🤖",
    status: "Start Quest →",
    completed: false,
    secondTitle: "Loop Forest",
    secondConcept: "Loops",
    secondEmoji: "🌲",
    secondStatus: "Locked 🔒",
    thirdTitle: "Bug Gate",
    thirdConcept: "Conditions",
    thirdEmoji: "🐞",
    thirdStatus: "Locked",
  },
  {
    xp: 10,
    progress: 20,
    title: "Move Robo",
    concept: "Commands",
    emoji: "🤖",
    status: "Completed ✅",
    completed: true,
    secondTitle: "Loop Forest",
    secondConcept: "Loops",
    secondEmoji: "🌲",
    secondStatus: "Start Quest →",
    thirdTitle: "Bug Gate",
    thirdConcept: "Conditions",
    thirdEmoji: "🐞",
    thirdStatus: "Locked",
  },
  {
    xp: 25,
    progress: 40,
    title: "Loop Forest",
    concept: "Loops",
    emoji: "🌲",
    status: "Completed ✅",
    completed: true,
    secondTitle: "Bug Gate",
    secondConcept: "Conditions",
    secondEmoji: "🐞",
    secondStatus: "Start Quest →",
    thirdTitle: "Energy Crystals",
    thirdConcept: "Variables",
    thirdEmoji: "💎",
    thirdStatus: "Locked",
  },
  {
    xp: 45,
    progress: 60,
    title: "Bug Gate",
    concept: "Conditions",
    emoji: "🐞",
    status: "Completed ✅",
    completed: true,
    secondTitle: "Energy Crystals",
    secondConcept: "Variables",
    secondEmoji: "💎",
    secondStatus: "Start Quest →",
    thirdTitle: "Boss Fight",
    thirdConcept: "Final Challenge",
    thirdEmoji: "👾",
    thirdStatus: "Locked",
  },
  {
    xp: 70,
    progress: 80,
    title: "Energy Crystals",
    concept: "Variables",
    emoji: "💎",
    status: "Completed ✅",
    completed: true,
    secondTitle: "Boss Fight",
    secondConcept: "Final Challenge",
    secondEmoji: "👾",
    secondStatus: "Start Quest →",
    thirdTitle: "Debug Desert",
    thirdConcept: "Premium World",
    thirdEmoji: "🏜️",
    thirdStatus: "Locked",
  },
  {
    xp: 120,
    progress: 100,
    title: "Robo Lab Complete",
    concept: "World 1 Finished",
    emoji: "🏆",
    status: "Certificate Unlocked 🎓",
    completed: true,
    secondTitle: "Debug Desert",
    secondConcept: "Premium World",
    secondEmoji: "🏜️",
    secondStatus: "Locked 🔒",
    thirdTitle: "Function Tower",
    thirdConcept: "Premium World",
    thirdEmoji: "🗼",
    thirdStatus: "Locked",
  },
];

export default function Home() {
  const [demoStepIndex, setDemoStepIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStepIndex((currentStep) => (currentStep + 1) % demoSteps.length);
    }, 1800);

    return () => clearInterval(interval);
  }, []);

  const demoStep = demoSteps[demoStepIndex];

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
                Coding adventures for kids ages 8–12
              </div>

              <h1 className="text-5xl font-extrabold leading-tight md:text-7xl">
                Kids learn coding through magical adventures.
              </h1>

              <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 md:text-xl">
                LooplyLand turns coding basics into quests, puzzles, XP,
                streaks, and boss fights — so kids learn logic while having fun.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
                <Link
                  href="/signup"
                  className="rounded-2xl bg-emerald-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Create Free Account
                </Link>

                <Link
                  href="/learn"
                  className="rounded-2xl border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
                >
                  Try Demo
                </Link>
              </div>

              <p className="mt-5 text-sm font-semibold text-slate-400">
                No prior coding experience needed.
              </p>
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-2xl">
              <div className="rounded-[1.5rem] bg-slate-950 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-emerald-300">
                      World 1
                    </p>
                    <h2 className="text-3xl font-extrabold">Robo Lab</h2>
                  </div>

                  <div className="rounded-2xl bg-emerald-400 px-4 py-2 font-bold text-slate-950 transition-all duration-500">
                    XP {demoStep.xp}
                  </div>
                </div>

                <div className="mt-6 h-4 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-emerald-400 transition-all duration-700 ease-out"
                    style={{ width: `${demoStep.progress}%` }}
                  />
                </div>

                <div className="mt-8 grid gap-4">
                  <div
                    key={`${demoStep.title}-${demoStepIndex}`}
                    className={`rounded-3xl border p-5 transition-all duration-500 ${
                      demoStep.completed
                        ? "border-emerald-400/60 bg-emerald-400/20"
                        : "border-emerald-400/40 bg-emerald-400/10"
                    }`}
                  >
                    <div className="text-5xl">{demoStep.emoji}</div>

                    <h3 className="mt-3 text-2xl font-extrabold">
                      {demoStep.title}
                    </h3>

                    <p className="mt-1 text-emerald-300">
                      {demoStep.concept}
                    </p>

                    <p className="mt-4 text-sm font-bold text-white">
                      {demoStep.status}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-emerald-400/30 bg-emerald-400/10 p-5 transition-all duration-500">
                    <div className="text-5xl">{demoStep.secondEmoji}</div>

                    <h3 className="mt-3 text-2xl font-extrabold">
                      {demoStep.secondTitle}
                    </h3>

                    <p className="mt-1 text-emerald-300">
                      {demoStep.secondConcept}
                    </p>

                    <p className="mt-4 text-sm font-bold text-white">
                      {demoStep.secondStatus}
                    </p>
                  </div>

                  <div className="rounded-3xl border border-white/10 bg-white/5 p-5 opacity-60 transition-all duration-500">
                    <div className="text-5xl">{demoStep.thirdEmoji}</div>

                    <h3 className="mt-3 text-2xl font-extrabold">
                      {demoStep.thirdTitle}
                    </h3>

                    <p className="mt-1 text-slate-400">
                      {demoStep.thirdConcept}
                    </p>

                    <p className="mt-4 text-sm font-bold text-slate-400">
                      {demoStep.thirdStatus}
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex justify-center gap-2">
                  {demoSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === demoStepIndex
                          ? "w-8 bg-emerald-400"
                          : "w-2 bg-white/20"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-6xl text-center">
          <p className="font-bold text-emerald-300">
            Fun for kids. Valuable for parents.
          </p>

          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Educational screen time that builds real skills.
          </h2>

          <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-300">
            LooplyLand helps children learn logic, problem solving, and
            programming basics through short interactive adventures designed for
            ages 8–12.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">🧠</div>
              <h3 className="mt-5 text-2xl font-extrabold">Logic Skills</h3>
              <p className="mt-3 text-slate-300">
                Kids practice step-by-step thinking, patterns, decisions, and
                problem solving.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">🎮</div>
              <h3 className="mt-5 text-2xl font-extrabold">
                Game-like Learning
              </h3>
              <p className="mt-3 text-slate-300">
                Quests, XP, streaks, levels, and boss fights keep children
                engaged.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <div className="text-5xl">💻</div>
              <h3 className="mt-5 text-2xl font-extrabold">Coding Basics</h3>
              <p className="mt-3 text-slate-300">
                Commands, loops, conditions, variables, debugging, and beginner
                coding concepts.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <p className="font-bold text-emerald-300">How it works</p>

              <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
                A simple daily adventure system.
              </h2>

              <p className="mt-5 text-lg leading-8 text-slate-300">
                Children complete short quests, answer coding puzzles, earn XP,
                build streaks, and unlock new worlds.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/parents"
                  className="rounded-2xl border border-white/20 px-8 py-4 text-center text-lg font-bold text-white transition hover:bg-white/10"
                >
                  Learn More for Parents
                </Link>

                <Link
                  href="/signup"
                  className="rounded-2xl bg-emerald-400 px-8 py-4 text-center text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Start Free
                </Link>
              </div>
            </div>

            <div className="grid gap-5">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-4xl">1️⃣</p>
                <h3 className="mt-4 text-2xl font-extrabold">
                  Start with Robo Lab
                </h3>
                <p className="mt-2 text-slate-300">
                  Kids begin with simple commands and friendly coding puzzles.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-4xl">2️⃣</p>
                <h3 className="mt-4 text-2xl font-extrabold">
                  Complete quests
                </h3>
                <p className="mt-2 text-slate-300">
                  Each quest teaches one coding idea through interactive
                  questions.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
                <p className="text-4xl">3️⃣</p>
                <h3 className="mt-4 text-2xl font-extrabold">
                  Track progress
                </h3>
                <p className="mt-2 text-slate-300">
                  XP, streaks, and completed quests help children stay
                  consistent.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-24">
        <div className="mx-auto max-w-4xl rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-10 text-center">
          <p className="font-bold text-emerald-300">Ready to begin?</p>

          <h2 className="mt-4 text-4xl font-extrabold md:text-5xl">
            Give your child a fun first step into coding.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-300">
            Start with the free Robo Lab world and see how LooplyLand turns
            coding into an adventure.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              href="/signup"
              className="rounded-2xl bg-emerald-400 px-8 py-4 text-lg font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Create Free Account
            </Link>

            <Link
              href="/parents"
              className="rounded-2xl border border-white/20 px-8 py-4 text-lg font-bold text-white transition hover:bg-white/10"
            >
              For Parents
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}