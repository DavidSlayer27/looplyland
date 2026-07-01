"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";

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

  useEffect(() => {
    const savedLessons = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    );

    const savedXp = Number(localStorage.getItem("xp") || "0");

    setCompletedLessons(savedLessons);
    setXp(savedXp);
  }, []);

  function resetProgress() {
    localStorage.removeItem("completedLessons");
    localStorage.removeItem("xp");
    setCompletedLessons([]);
    setXp(0);
  }

  return (
    <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
      <Navbar />
      <div className="mx-auto max-w-4xl pt-24">
        <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold">LooplyLand Map</h1>
            <p className="mt-2 text-slate-300">
              Complete quests and unlock new coding powers.
            </p>
          </div>

          <div className="flex gap-3">
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

        <div className="mt-16 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
          <h2 className="text-3xl font-extrabold">
            Unlock more coding worlds
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            Continue the adventure with new quests, boss fights, certificates,
            and a parent progress dashboard.
          </p>

          <Link
            href="/upgrade"
            className="mt-6 inline-block rounded-2xl bg-emerald-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
          >
            Unlock Premium Worlds
          </Link>
        </div>
      </div>
    </main>
  );
}