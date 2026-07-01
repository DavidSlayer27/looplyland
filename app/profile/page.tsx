"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "@/lib/supabaseClient";

const quests = [
  { id: 1, title: "Move Robo", concept: "Commands", emoji: "🤖" },
  { id: 2, title: "Loop Forest", concept: "Loops", emoji: "🌲" },
  { id: 3, title: "Bug Gate", concept: "Conditions", emoji: "🐞" },
  { id: 4, title: "Energy Crystals", concept: "Variables", emoji: "💎" },
  { id: 5, title: "Boss Fight", concept: "Final Challenge", emoji: "👾" },
];

export default function ProfilePage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    setLoading(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    setEmail(user.email || "");

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

  const completedCount = quests.filter((quest) =>
    completedLessons.includes(quest.id)
  ).length;

  const progressPercent = Math.round((completedCount / quests.length) * 100);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl font-bold text-slate-300">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
      <Navbar />

      <section className="mx-auto max-w-5xl pt-24">
        <div className="mb-10">
          <p className="font-bold text-emerald-300">My Progress</p>
          <h1 className="mt-3 text-5xl font-extrabold">Profile</h1>
          <p className="mt-3 text-slate-300">{email}</p>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-300">Total XP</p>
            <h2 className="mt-3 text-4xl font-extrabold">⭐ {xp}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-300">Daily Streak</p>
            <h2 className="mt-3 text-4xl font-extrabold">🔥 {streak}</h2>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <p className="text-slate-300">World 1 Progress</p>
            <h2 className="mt-3 text-4xl font-extrabold">
              {completedCount}/{quests.length}
            </h2>
          </div>
        </div>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-extrabold">Robo Lab</h2>
              <p className="mt-1 text-slate-300">
                {progressPercent}% completed
              </p>
            </div>

            <Link
              href="/learn"
              className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Continue Learning
            </Link>
          </div>

          <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-emerald-400 transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="mt-8 grid gap-4">
            {quests.map((quest) => {
              const isCompleted = completedLessons.includes(quest.id);

              return (
                <div
                  key={quest.id}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-slate-950/40 p-5"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{quest.emoji}</div>

                    <div>
                      <h3 className="text-xl font-extrabold">{quest.title}</h3>
                      <p className="text-slate-300">{quest.concept}</p>
                    </div>
                  </div>

                  <p
                    className={`font-bold ${
                      isCompleted ? "text-emerald-300" : "text-slate-400"
                    }`}
                  >
                    {isCompleted ? "Completed ✅" : "Not completed"}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </section>
    </main>
  );
}