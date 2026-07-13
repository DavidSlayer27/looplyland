"use client";

import Image from "next/image";
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
  const currentQuestId =
  quests.find((quest) => !completedLessons.includes(quest.id))?.id ??
  quests.length;

  if (loading) {
    return (
      <main className="min-h-screen bg-[#101827] text-white">
        <Navbar />

        <section className="flex min-h-screen items-center justify-center px-6 py-32">
          <p className="text-lg font-bold text-slate-300 md:text-xl">
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

    <section className="relative overflow-hidden px-5 pb-24 pt-24 sm:px-6 md:pb-28 md:pt-28">
      <div className="absolute left-1/2 top-24 h-80 w-80 -translate-x-1/2 rounded-full bg-emerald-400/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        {/* TOP AREA */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
          <div>
            <div className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300">
              World 1 · Robo Lab
            </div>

            <h1 className="mt-4 text-4xl font-extrabold leading-tight sm:text-5xl">
              Begin your coding adventure.
            </h1>

            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-300 sm:text-lg">
              Complete five short quests with Robo and learn commands, loops,
              conditions, variables, and beginner problem solving.
            </p>

            {!isLoggedIn && (
              <div className="mt-5 max-w-2xl rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-bold leading-6 text-yellow-200">
                Demo mode: progress is saved only on this device. Create a free
                account to keep it permanently.
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold">
                🔥 {streak} day streak
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold">
                ⭐ {xp} XP
              </div>

              <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 font-bold">
                ✅ {completedCount}/{quests.length} quests
              </div>
            </div>
          </div>

          {/* ROBO GUIDE */}
          <div className="relative mx-auto flex max-w-xs flex-col items-center">
            <div className="absolute h-56 w-56 animate-pulse rounded-full bg-emerald-400/15 blur-2xl [animation-duration:4s]" />

            <Image
              src="/mascot/Robo.png"
              alt="Robo guiding the player through Robo Lab"
              width={420}
              height={420}
              priority
            className="relative h-auto w-52 object-contain drop-shadow-2xl transition duration-500 hover:-translate-y-2 hover:scale-[1.03] sm:w-60"
            />

            <div className="-mt-3 w-full rounded-2xl border border-emerald-400/20 bg-slate-950/90 px-5 py-4 text-center shadow-xl">
              <p className="font-extrabold text-emerald-300">
                Ready for your first quest?
              </p>

              <p className="mt-1 text-sm leading-6 text-slate-300">
                Start with Move Robo and unlock the path step by step.
              </p>
            </div>
          </div>
        </div>

        {/* PROGRESS */}
        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.04] p-5 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-300">
                World progress
              </p>

              <h2 className="mt-2 text-2xl font-extrabold">
                Robo Lab
              </h2>
            </div>

            <div className="rounded-2xl bg-emerald-400/10 px-5 py-3 text-center font-extrabold text-emerald-300">
              {roundedProgressPercent}% complete
            </div>
          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm font-semibold text-slate-400">
            <span>{completedCount} completed</span>
            <span>{quests.length - completedCount} remaining</span>
          </div>
        </section>

        {/* QUEST PATH */}
<section className="mt-14">
  <div className="text-center">
    <p className="font-bold text-emerald-300">Quest map</p>

    <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
      Follow Robo through the lab
    </h2>

    <p className="mx-auto mt-3 max-w-xl leading-7 text-slate-400">
      Complete each quest to unlock the next stop on the adventure.
    </p>
  </div>

  <div className="relative mx-auto mt-12 max-w-4xl">
    {/* DECORATIVE MAP BACKGROUND */}
    <div className="absolute inset-0 hidden overflow-hidden rounded-[3rem] sm:block">
      <div className="absolute left-[8%] top-[6%] h-28 w-28 rounded-full bg-emerald-400/5 blur-2xl" />
      <div className="absolute right-[8%] top-[36%] h-32 w-32 rounded-full bg-emerald-400/5 blur-2xl" />
      <div className="absolute left-[18%] bottom-[8%] h-32 w-32 rounded-full bg-emerald-400/5 blur-2xl" />
    </div>

    <div className="relative grid gap-5 sm:gap-8">
      {quests.map((quest, index) => {
        const isCompleted = completedLessons.includes(quest.id);
        const isUnlocked =
          quest.id === 1 || completedLessons.includes(quest.id - 1);
        const isCurrent = quest.id === currentQuestId && !worldCompleted;

        const alignment =
          index % 2 === 0
            ? "sm:mr-auto sm:translate-x-6"
            : "sm:ml-auto sm:-translate-x-6";

        return (
          <div
            key={quest.id}
            className={`relative w-full sm:w-[52%] ${alignment}`}
          >
            {/* CURVED CONNECTOR */}
            {index < quests.length - 1 && (
              <div
                className={`pointer-events-none absolute top-[92%] hidden h-20 w-[46%] border-b-[3px] border-dashed sm:block ${
                  index % 2 === 0
                    ? "left-[76%] rounded-br-[3rem] border-r-[3px]"
                    : "right-[76%] rounded-bl-[3rem] border-l-[3px]"
                } ${
                  isCompleted
                    ? "border-emerald-400/60"
                    : "border-white/10"
                }`}
              />
            )}

            {/* CURRENT QUEST MARKER */}
            {isCurrent && (
              <div
                className={`absolute top-1/2 z-20 hidden -translate-y-1/2 sm:flex ${
                  index % 2 === 0 ? "-right-14" : "-left-14"
                }`}
              >
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-emerald-400 shadow-[0_0_30px_rgba(52,211,153,0.65)]">
                  <div className="absolute inset-0 animate-ping rounded-full bg-emerald-400/40" />
                  <span className="relative text-sm font-black text-slate-950">
                    GO
                  </span>
                </div>
              </div>
            )}

            {isUnlocked ? (
              <Link
                href={`/lesson/${quest.id}`}
                className={`group relative block overflow-hidden rounded-[1.75rem] border p-5 shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
                  isCompleted
                    ? "border-emerald-400/50 bg-emerald-400/15"
                    : isCurrent
                    ? "border-emerald-300 bg-emerald-400/10 shadow-[0_0_35px_rgba(52,211,153,0.14)]"
                    : "border-emerald-400/25 bg-white/[0.04] hover:bg-emerald-400/10"
                }`}
              >
                {isCurrent && (
                  <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-emerald-400/10 to-transparent [animation-duration:3s]" />
                )}

                <div className="relative flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-4">
                    <div
                      className={`flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl border ${
                        isCurrent
                          ? "border-emerald-400/50 bg-emerald-400/10"
                          : "border-white/5 bg-slate-950/80"
                      }`}
                    >
                      {quest.id === 1 ? (
                        <Image
                          src="/mascot/Robo.png"
                          alt="Robo"
                          width={70}
                          height={70}
                          className="h-14 w-14 object-contain"
                        />
                      ) : (
                        <span className="text-4xl">{quest.emoji}</span>
                      )}
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-emerald-300">
                        Quest {quest.id}
                      </p>

                      <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">
                        {quest.title}
                      </h3>

                      <p className="mt-1 text-sm font-bold text-slate-400">
                        {quest.concept}
                      </p>
                    </div>
                  </div>

                  <div
                    className={`shrink-0 rounded-full px-3 py-1 text-xs font-bold ${
                      isCompleted
                        ? "bg-emerald-400 text-slate-950"
                        : isCurrent
                        ? "bg-emerald-400/20 text-emerald-200"
                        : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {isCompleted ? "Done" : isCurrent ? "Next" : "Open"}
                  </div>
                </div>

                <div className="relative mt-5 flex items-center justify-between border-t border-white/10 pt-4">
                  <span className="text-sm font-bold text-slate-300">
                    {isCompleted
                      ? "Replay quest"
                      : isCurrent
                      ? "Continue adventure"
                      : "Start quest"}
                  </span>

                  <span className="font-bold text-emerald-300 transition duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </div>
              </Link>
            ) : (
              <div className="relative overflow-hidden rounded-[1.75rem] border border-white/10 bg-white/[0.03] p-5 opacity-55">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl border border-white/5 bg-slate-950/70 text-3xl">
                      🔒
                    </div>

                    <div className="min-w-0">
                      <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                        Quest {quest.id}
                      </p>

                      <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">
                        {quest.title}
                      </h3>

                      <p className="mt-1 text-sm font-bold text-slate-500">
                        {quest.concept}
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-500">
                    Locked
                  </div>
                </div>

                <p className="mt-5 border-t border-white/10 pt-4 text-sm font-bold text-slate-500">
                  Complete the previous quest to unlock.
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>

    <div className="mx-auto mt-8 flex w-fit items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-5 py-3 text-sm font-bold text-emerald-300">
      <span>🏁</span>
      <span>Complete all 5 quests to finish Robo Lab</span>
    </div>
  </div>
</section>

        {/* WORLD COMPLETE */}
        {worldCompleted && (
          <section className="mt-14 overflow-hidden rounded-[2rem] border border-emerald-400/30 bg-emerald-400/10 p-6 sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:items-center">
              <div className="mx-auto">
                <Image
                  src="/mascot/Robo.png"
                  alt="Robo celebrating completion of Robo Lab"
                  width={260}
                  height={260}
                  className="h-auto w-48 object-contain drop-shadow-xl"
                />
              </div>

              <div className="text-center lg:text-left">
                <p className="font-bold text-emerald-300">
                  World complete
                </p>

                <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
                  You became a Robo Lab Graduate!
                </h2>

                <p className="mt-4 leading-7 text-slate-300">
                  You completed all five quests and learned commands, loops,
                  conditions, variables, and final challenge logic.
                </p>

                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
                  <a
                    href="#certificate-preview"
                    className="rounded-2xl border border-white/20 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
                  >
                    View Certificate
                  </a>

                  <Link
                    href="/upgrade"
                    className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Explore Next Worlds
                  </Link>
                </div>
              </div>
            </div>

            <div
              id="certificate-preview"
              className="mt-8 rounded-[1.5rem] border border-white/10 bg-slate-950/90 p-6 text-center"
            >
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300">
                Certificate Preview
              </p>

              <h3 className="mt-4 text-2xl font-extrabold sm:text-3xl">
                Robo Lab Graduate
              </h3>

              <p className="mt-3 text-slate-300">
                Awarded for completing World 1 in LooplyLand.
              </p>

              <div className="mx-auto mt-6 grid max-w-2xl gap-3 sm:grid-cols-2">
                {[
                  "Commands",
                  "Loops",
                  "Conditions",
                  "Variables",
                  "Final Challenge",
                ].map((skill) => (
                  <div
                    key={skill}
                    className="rounded-2xl bg-white/5 p-4 text-left font-bold"
                  >
                    ✅ {skill}
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PREMIUM TEASER */}
        <section className="mt-14 rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-emerald-400/10 to-white/[0.03] p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_320px] lg:items-center">
            <div>
              <p className="font-bold text-emerald-300">
                The adventure continues
              </p>

              <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
                New coding worlds are coming.
              </h2>

              <p className="mt-4 max-w-2xl leading-7 text-slate-300">
                Explore debugging, functions, algorithms, and game logic in
                future LooplyLand worlds.
              </p>

              <Link
                href="/upgrade"
                className="mt-6 inline-block w-full rounded-2xl bg-emerald-400 px-7 py-4 text-center font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
              >
                Join Early Access
              </Link>
            </div>

            <div className="grid gap-3">
              {premiumWorlds.map((world) => (
                <div
                  key={world.title}
                  className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-950/60 p-4"
                >
                  <div className="text-3xl">{world.emoji}</div>

                  <div className="min-w-0">
                    <p className="font-extrabold">{world.title}</p>
                    <p className="mt-1 text-sm font-bold text-emerald-300">
                      {world.concept}
                    </p>
                  </div>

                  <span className="ml-auto text-sm font-bold text-slate-500">
                    Soon
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESET */}
        <div className="mt-10 text-center">
          <button
            onClick={resetProgress}
            className="text-sm font-bold text-slate-500 transition hover:text-red-300"
          >
            Reset learning progress
          </button>
        </div>
      </div>
    </section>

    <Footer />
  </main>
);
}