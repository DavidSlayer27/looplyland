"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { supabase } from "@/lib/supabaseClient";

const quests = [
  {
    id: 1,
    title: "Move Robo",
    concept: "Commands",
    emoji: "🤖",
    skill: "Step-by-step instructions",
  },
  {
    id: 2,
    title: "Loop Forest",
    concept: "Loops",
    emoji: "🌲",
    skill: "Repeating actions",
  },
  {
    id: 3,
    title: "Bug Gate",
    concept: "Conditions",
    emoji: "🐞",
    skill: "Decision making",
  },
  {
    id: 4,
    title: "Energy Crystals",
    concept: "Variables",
    emoji: "💎",
    skill: "Storing information",
  },
  {
    id: 5,
    title: "Boss Fight",
    concept: "Final Challenge",
    emoji: "👾",
    skill: "Review and problem solving",
  },
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
  const worldCompleted = completedCount === quests.length;

  const nextQuest = quests.find(
    (quest) => !completedLessons.includes(quest.id)
  );

  const completedSkills = quests.filter((quest) =>
    completedLessons.includes(quest.id)
  );

  if (loading) {
    return (
      <main className="min-h-screen bg-[#101827] px-6 py-10 text-white">
        <Navbar />

        <div className="flex min-h-screen items-center justify-center">
          <p className="text-xl font-bold text-slate-300">
            Loading dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-24 pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-bold text-emerald-300">Parent Dashboard</p>

              <h1 className="mt-3 text-5xl font-extrabold">
                Learning Progress
              </h1>

              <p className="mt-3 max-w-2xl text-slate-300">
                Track your child&apos;s coding journey, completed quests,
                learning streak, and skills learned in LooplyLand.
              </p>

              <p className="mt-3 text-sm font-semibold text-slate-500">
                Account: {email}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/learn"
                className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Continue Learning
              </Link>

              <Link
                href="/upgrade"
                className="rounded-2xl border border-white/20 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
              >
                Premium Worlds
              </Link>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300">Total XP</p>
              <h2 className="mt-3 text-4xl font-extrabold">⭐ {xp}</h2>
              <p className="mt-3 text-sm text-slate-400">
                XP grows as quests are completed.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300">Daily Streak</p>
              <h2 className="mt-3 text-4xl font-extrabold">🔥 {streak}</h2>
              <p className="mt-3 text-sm text-slate-400">
                Streak rewards daily learning consistency.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-slate-300">Robo Lab Progress</p>
              <h2 className="mt-3 text-4xl font-extrabold">
                {completedCount}/{quests.length}
              </h2>
              <p className="mt-3 text-sm text-slate-400">
                {progressPercent}% of World 1 completed.
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-emerald-300">World 1</p>
                <h2 className="mt-2 text-3xl font-extrabold">Robo Lab</h2>
                <p className="mt-1 text-slate-300">
                  {progressPercent}% completed
                </p>
              </div>

              {worldCompleted ? (
                <div className="rounded-2xl bg-emerald-400/10 px-5 py-3 font-bold text-emerald-300">
                  Completed 🏆
                </div>
              ) : (
                <Link
                  href={nextQuest ? `/lesson/${nextQuest.id}` : "/learn"}
                  className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Next Quest →
                </Link>
              )}
            </div>

            <div className="mt-5 h-4 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-emerald-400 transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {nextQuest && (
              <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-6">
                <p className="font-bold text-emerald-300">
                  Recommended next step
                </p>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-5xl">{nextQuest.emoji}</div>

                    <div>
                      <h3 className="text-2xl font-extrabold">
                        {nextQuest.title}
                      </h3>
                      <p className="text-slate-300">
                        Learn: {nextQuest.concept}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/lesson/${nextQuest.id}`}
                    className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
                  >
                    Start
                  </Link>
                </div>
              </div>
            )}

            {worldCompleted && (
              <div className="mt-6 rounded-[2rem] border border-emerald-400/30 bg-emerald-400/10 p-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                  <div>
                    <div className="text-6xl">🏆</div>

                    <h3 className="mt-4 text-3xl font-extrabold">
                      Robo Lab Complete!
                    </h3>

                    <p className="mt-3 leading-7 text-slate-300">
                      Your child completed the first LooplyLand world and
                      learned key beginner coding concepts.
                    </p>

                    <Link
                      href="/upgrade"
                      className="mt-6 inline-block rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
                    >
                      Unlock Premium Worlds
                    </Link>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-6 text-center shadow-2xl">
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

                    <p className="mt-6 text-sm text-slate-400">
                      Printable certificates coming soon with Premium.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>

          <section className="mt-8 grid gap-8 lg:grid-cols-2">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="font-bold text-emerald-300">
                What your child learned
              </p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Skills unlocked
              </h2>

              {completedSkills.length === 0 ? (
                <p className="mt-5 text-slate-300">
                  No completed skills yet. Start Robo Lab to begin learning
                  commands, loops, conditions, and variables.
                </p>
              ) : (
                <div className="mt-6 grid gap-4">
                  {completedSkills.map((quest) => (
                    <div
                      key={quest.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/50 p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{quest.emoji}</div>

                        <div>
                          <h3 className="text-xl font-extrabold">
                            {quest.concept}
                          </h3>
                          <p className="text-slate-300">{quest.skill}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
              <p className="font-bold text-emerald-300">Parent summary</p>

              <h2 className="mt-3 text-3xl font-extrabold">
                Learning snapshot
              </h2>

              <div className="mt-6 grid gap-4">
                <div className="rounded-2xl bg-slate-950/50 p-5">
                  ✅ Completed quests: {completedCount}/{quests.length}
                </div>

                <div className="rounded-2xl bg-slate-950/50 p-5">
                  ⭐ Total XP earned: {xp}
                </div>

                <div className="rounded-2xl bg-slate-950/50 p-5">
                  🔥 Current streak: {streak} day
                  {streak === 1 ? "" : "s"}
                </div>

                <div className="rounded-2xl bg-slate-950/50 p-5">
                  🧠 Focus area: Logic and beginner coding basics
                </div>
              </div>

              <p className="mt-6 text-sm leading-6 text-slate-400">
                This dashboard is an early version. Premium will include a more
                detailed parent dashboard with learning history, certificates,
                and progress insights.
              </p>
            </div>
          </section>

          <section className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-8 text-center">
            <p className="font-bold text-emerald-300">Coming soon</p>

            <h2 className="mt-3 text-3xl font-extrabold">
              More worlds. More skills. More progress.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-300">
              Premium worlds will introduce debugging, functions, algorithms,
              game logic, certificates, and more detailed parent progress
              tracking.
            </p>

            <Link
              href="/upgrade"
              className="mt-6 inline-block rounded-2xl bg-emerald-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Join Early Access
            </Link>
          </section>
        </div>
      </section>
    </main>
  );
}