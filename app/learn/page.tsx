"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
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
  const worldCompleted = completedCount === quests.length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl font-bold text-slate-300">
            Loading your adventure...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
      <Navbar />

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
              {Math.round(progressPercent)}%
            </div>
          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {worldCompleted && (
            <div className="mt-6 rounded-2xl border border-emerald-400/30 bg-emerald-400/10 p-5">
              <div className="text-5xl">🏆</div>
              <h3 className="mt-3 text-2xl font-extrabold">
                Robo Lab Complete!
              </h3>
              <p className="mt-2 text-slate-300">
                Amazing work. You completed the first LooplyLand world and
                learned commands, loops, conditions, and variables.
              </p>

              <Link
                href="/upgrade"
                className="mt-5 inline-block rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Unlock Premium Worlds
              </Link>
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

        {!worldCompleted && (
          <div className="mt-16 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
            <h2 className="text-3xl font-extrabold">
              Unlock more coding worlds
            </h2>

            <p className="mx-auto mt-3 max-w-xl text-slate-300">
              Continue the adventure with new quests, boss fights,
              certificates, and a parent progress dashboard.
            </p>

            <Link
              href="/upgrade"
              className="mt-6 inline-block rounded-2xl bg-emerald-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Unlock Premium Worlds
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}