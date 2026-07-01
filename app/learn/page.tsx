"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabaseClient";

const quests = [
  {
    id: 1,
    title: "Move Robo",
    concept: "Commands",
    emoji: "🤖",
  },
  {
    id: 2,
    title: "Loop Forest",
    concept: "Loops",
    emoji: "🌲",
  },
  {
    id: 3,
    title: "Bug Gate",
    concept: "Conditions",
    emoji: "🐞",
  },
  {
    id: 4,
    title: "Energy Crystals",
    concept: "Variables",
    emoji: "💎",
  },
  {
    id: 5,
    title: "Boss Fight",
    concept: "Final Challenge",
    emoji: "👾",
  },
];

const premiumWorlds = [
  {
    title: "Debug Desert",
    concept: "Debugging",
    emoji: "🏜️",
    description: "Find bugs, fix broken code, and help Robo escape the desert.",
  },
  {
    title: "Function Tower",
    concept: "Functions",
    emoji: "🗼",
    description:
      "Learn how to reuse code and build smarter programs step by step.",
  },
  {
    title: "Game Logic Island",
    concept: "Game Logic",
    emoji: "🏝️",
    description:
      "Use conditions, variables, and loops to understand how games work.",
  },
];

export default function LearnPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProgress();
  }, []);

  async function loadProgress() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      const savedLessons = JSON.parse(
        localStorage.getItem("completedLessons") || "[]"
      );

      const savedXp = Number(localStorage.getItem("xp") || "0");
      const savedStreak = Number(localStorage.getItem("streak") || "0");

      setIsLoggedIn(false);
      setCompletedLessons(savedLessons);
      setXp(savedXp);
      setStreak(savedStreak);
      setLoading(false);
      return;
    }

    setIsLoggedIn(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, streak")
      .eq("id", user.id)
      .single();

    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id);

    setXp(profile?.xp || 0);
    setStreak(profile?.streak || 0);
    setCompletedLessons(progress?.map((item) => item.lesson_id) || []);
    setLoading(false);
  }

  async function resetProgress() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      localStorage.removeItem("completedLessons");
      localStorage.removeItem("xp");
      localStorage.removeItem("streak");
      localStorage.removeItem("lastStreakDate");

      setCompletedLessons([]);
      setXp(0);
      setStreak(0);
      return;
    }

    await supabase.from("lesson_progress").delete().eq("user_id", user.id);

    await supabase
      .from("profiles")
      .update({
        xp: 0,
        streak: 0,
        last_streak_date: null,
      })
      .eq("id", user.id);

    setCompletedLessons([]);
    setXp(0);
    setStreak(0);
  }

  const completedCount = quests.filter((quest) =>
    completedLessons.includes(quest.id)
  ).length;

  const progressPercent = (completedCount / quests.length) * 100;
  const roundedProgressPercent = Math.round(progressPercent);
  const worldCompleted = completedCount === quests.length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#101827] text-white">
        <Navbar />

        <section className="flex min-h-screen items-center justify-center px-6 py-32">
          <p className="text-xl font-bold text-slate-300">
            Loading your adventure...
          </p>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="px-6 pb-40 pt-10">
        <div className="mx-auto max-w-5xl pt-24">
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-emerald-300">World 1</p>

              <h1 className="text-4xl font-extrabold">Robo Lab</h1>

              <p className="mt-2 text-slate-300">
                Complete quests and unlock new coding powers.
              </p>

              {!isLoggedIn && (
                <p className="mt-3 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-bold text-yellow-200">
                  Demo mode: your progress is saved only on this device. Sign up
                  to save it forever.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="rounded-2xl bg-white/5 px-5 py-3 font-bold">
                🔥 {streak} day streak
              </div>

              <div className="rounded-2xl bg-white/5 px-5 py-3 font-bold">
                XP: {xp}
              </div>

              <button
                onClick={resetProgress}
                className="rounded-2xl border border-red-400/30 px-5 py-3 font-bold text-red-300 transition hover:bg-red-400/10"
              >
                Reset
              </button>
            </div>
          </div>

          <section className="mb-12 rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-extrabold">Robo Lab Progress</h2>

                <p className="mt-1 text-slate-300">
                  {completedCount}/{quests.length} quests completed
                </p>
              </div>

              <div className="rounded-2xl bg-emerald-400/10 px-5 py-3 font-bold text-emerald-300">
                {roundedProgressPercent}%
              </div>
            </div>

            <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {worldCompleted && (
              <div className="mt-6 rounded-[2rem] border border-emerald-400/30 bg-emerald-400/10 p-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                  <div>
                    <div className="text-6xl">🏆</div>

                    <h3 className="mt-4 text-3xl font-extrabold">
                      Robo Lab Complete!
                    </h3>

                    <p className="mt-3 leading-7 text-slate-300">
                      Amazing work. You completed the first LooplyLand world and
                      learned commands, loops, conditions, variables, and final
                      challenge logic.
                    </p>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                      <Link
                        href="/upgrade"
                        className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
                      >
                        Unlock Premium Worlds
                      </Link>

                      <a
                        href="#certificate-preview"
                        className="rounded-2xl border border-white/20 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
                      >
                        View Certificate
                      </a>
                    </div>
                  </div>

                  <div
                    id="certificate-preview"
                    className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-6 text-center shadow-2xl"
                  >
                    <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-300">
                      Certificate Preview
                    </p>

                    <div className="mt-5 text-6xl">🎓</div>

                    <h4 className="mt-4 text-3xl font-extrabold">
                      Robo Lab Graduate
                    </h4>

                    <p className="mt-3 text-slate-300">
                      Awarded for completing World 1 in LooplyLand.
                    </p>

                    <div className="mt-6 grid gap-3 text-left">
                      <div className="rounded-2xl bg-white/5 p-4 font-bold">
                        ✅ Commands
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4 font-bold">
                        ✅ Loops
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4 font-bold">
                        ✅ Conditions
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4 font-bold">
                        ✅ Variables
                      </div>

                      <div className="rounded-2xl bg-white/5 p-4 font-bold">
                        ✅ Final Challenge
                      </div>
                    </div>

                    <p className="mt-6 text-sm text-slate-400">
                      Printable certificates coming soon with Premium.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <div className="relative mx-auto flex max-w-md flex-col items-center gap-8">
            {quests.map((quest, index) => {
              const isCompleted = completedLessons.includes(quest.id);
              const isUnlocked =
                quest.id === 1 || completedLessons.includes(quest.id - 1);

              return (
                <div
                  key={quest.id}
                  className={`flex w-full items-center ${
                    index % 2 === 0 ? "justify-start" : "justify-end"
                  }`}
                >
                  {isUnlocked ? (
                    <Link
                      href={`/lesson/${quest.id}`}
                      className={`w-64 rounded-3xl border p-5 shadow-xl transition hover:scale-105 ${
                        isCompleted
                          ? "border-emerald-400/60 bg-emerald-400/20"
                          : "border-emerald-400/30 bg-emerald-400/10 hover:bg-emerald-400/20"
                      }`}
                    >
                      <div className="text-5xl">{quest.emoji}</div>

                      <h2 className="mt-4 text-2xl font-extrabold">
                        {quest.title}
                      </h2>

                      <p className="mt-1 text-emerald-300">{quest.concept}</p>

                      <p className="mt-4 text-sm font-bold text-white">
                        {isCompleted ? "Completed ✅" : "Start Quest →"}
                      </p>
                    </Link>
                  ) : (
                    <div className="w-64 rounded-3xl border border-white/10 bg-white/5 p-5 opacity-50">
                      <div className="text-5xl">🔒</div>

                      <h2 className="mt-4 text-2xl font-extrabold">
                        {quest.title}
                      </h2>

                      <p className="mt-1 text-slate-400">{quest.concept}</p>

                      <p className="mt-4 text-sm font-bold text-slate-400">
                        Locked
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <section className="mt-16 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
            <p className="font-bold text-emerald-300">Coming soon</p>

            <h2 className="mt-3 text-3xl font-extrabold">
              Unlock more coding worlds
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Robo Lab is just the beginning. Premium worlds will introduce
              debugging, functions, algorithms, game logic, and more.
            </p>

            <Link
              href="/upgrade"
              className="mt-6 inline-block rounded-2xl bg-emerald-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Join Early Access
            </Link>
          </section>

          <section className="mt-10 grid gap-6 md:grid-cols-3">
            {premiumWorlds.map((world) => (
              <div
                key={world.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-6 opacity-80"
              >
                <div className="flex items-center justify-between">
                  <div className="text-5xl">{world.emoji}</div>

                  <div className="rounded-full bg-white/10 px-3 py-1 text-sm font-bold text-slate-300">
                    Locked
                  </div>
                </div>

                <h3 className="mt-5 text-2xl font-extrabold">{world.title}</h3>

                <p className="mt-2 font-bold text-emerald-300">
                  {world.concept}
                </p>

                <p className="mt-3 text-slate-300">{world.description}</p>
              </div>
            ))}
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}