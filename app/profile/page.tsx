"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
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
      .select("xp, gems, streak")
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
      <main className="min-h-screen bg-[#101827] text-white">
        <Navbar />

        <section className="flex min-h-screen items-center justify-center px-6 py-32">
          <p className="text-lg font-bold text-slate-300 md:text-xl">
            Loading dashboard...
          </p>
        </section>

        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-6xl">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="font-bold text-emerald-300">Parent Dashboard</p>

              <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
                Learning Progress
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 md:text-base md:leading-7">
                Track your child&apos;s coding journey, completed quests,
                learning streak, and skills learned in LooplyLand.
              </p>

              <p className="mt-3 break-words text-sm font-semibold text-slate-500">
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
              <p className="text-sm text-slate-300 md:text-base">Total XP</p>
              <h2 className="mt-3 text-4xl font-extrabold">⭐ {xp}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                XP grows as quests are completed.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-300 md:text-base">
                Daily Streak
              </p>
              <h2 className="mt-3 text-4xl font-extrabold">🔥 {streak}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Streak rewards daily learning consistency.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <p className="text-sm text-slate-300 md:text-base">
                Robo Lab Progress
              </p>
              <h2 className="mt-3 text-4xl font-extrabold">
                {completedCount}/{quests.length}
              </h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {progressPercent}% of World 1 completed.
              </p>
            </div>
          </div>

          <section className="mt-8 rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="font-bold text-emerald-300">World 1</p>

                <h2 className="mt-2 text-2xl font-extrabold md:text-3xl">
                  Robo Lab
                </h2>

                <p className="mt-1 text-slate-300">
                  {progressPercent}% completed
                </p>
              </div>

              {worldCompleted ? (
                <div className="w-full rounded-2xl bg-emerald-400/10 px-5 py-3 text-center font-bold text-emerald-300 sm:w-auto">
                  Completed 🏆
                </div>
              ) : (
                <Link
                  href={nextQuest ? `/lesson/${nextQuest.id}` : "/learn"}
                  className="w-full rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
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
              <div className="mt-6 rounded-3xl border border-emerald-400/20 bg-emerald-400/10 p-5 md:p-6">
                <p className="font-bold text-emerald-300">
                  Recommended next step
                </p>

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl md:text-5xl">
                      {nextQuest.emoji}
                    </div>

                    <div>
                      <h3 className="text-xl font-extrabold md:text-2xl">
                        {nextQuest.title}
                      </h3>

                      <p className="text-sm text-slate-300 md:text-base">
                        Learn: {nextQuest.concept}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/lesson/${nextQuest.id}`}
                    className="w-full rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
                  >
                    Start
                  </Link>
                </div>
              </div>
            )}

            {worldCompleted && (
              <div className="mt-6 rounded-[2rem] border border-emerald-400/30 bg-emerald-400/10 p-5 md:p-6">
                <div className="grid gap-6 lg:grid-cols-2 lg:items-center">
                  <div>
                    <div className="text-5xl md:text-6xl">🏆</div>

                    <h3 className="mt-4 text-2xl font-extrabold md:text-3xl">
                      Robo Lab Complete!
                    </h3>

                    <p className="mt-3 leading-7 text-slate-300">
                      Your child completed the first LooplyLand world and
                      learned key beginner coding concepts.
                    </p>

                    <Link
                      href="/upgrade"
                      className="mt-6 inline-block w-full rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
                    >
                      Unlock Premium Worlds
                    </Link>
                  </div>

                  <div className="rounded-[1.5rem] border border-white/10 bg-slate-950 p-5 text-center shadow-2xl md:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.25em] text-emerald-300 md:text-sm md:tracking-[0.3em]">
                      Certificate Preview
                    </p>

                    <div className="mt-5 text-5xl md:text-6xl">🎓</div>

                    <h4 className="mt-4 text-2xl font-extrabold md:text-3xl">
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

          <section className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="font-bold text-emerald-300">
                What your child learned
              </p>

              <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                Skills unlocked
              </h2>

              {completedSkills.length === 0 ? (
                <p className="mt-5 leading-7 text-slate-300">
                  No completed skills yet. Start Robo Lab to begin learning
                  commands, loops, conditions, and variables.
                </p>
              ) : (
                <div className="mt-6 grid gap-4">
                  {completedSkills.map((quest) => (
                    <div
                      key={quest.id}
                      className="rounded-2xl border border-white/10 bg-slate-950/50 p-4 md:p-5"
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-4xl">{quest.emoji}</div>

                        <div>
                          <h3 className="text-lg font-extrabold md:text-xl">
                            {quest.concept}
                          </h3>

                          <p className="text-sm text-slate-300 md:text-base">
                            {quest.skill}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-5 md:p-6">
              <p className="font-bold text-emerald-300">Parent summary</p>

              <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
                Learning snapshot
              </h2>

              <div className="mt-6 grid gap-3 md:gap-4">
                <div className="rounded-2xl bg-slate-950/50 p-4 md:p-5">
                  ✅ Completed quests: {completedCount}/{quests.length}
                </div>

                <div className="rounded-2xl bg-slate-950/50 p-4 md:p-5">
                  ⭐ Total XP earned: {xp}
                </div>

                <div className="rounded-2xl bg-slate-950/50 p-4 md:p-5">
                  🔥 Current streak: {streak} day
                  {streak === 1 ? "" : "s"}
                </div>

                <div className="rounded-2xl bg-slate-950/50 p-4 md:p-5">
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

          <section className="mt-8 rounded-[2rem] border border-emerald-400/20 bg-emerald-400/10 p-6 text-center md:p-8">
            <p className="font-bold text-emerald-300">Coming soon</p>

            <h2 className="mt-3 text-2xl font-extrabold md:text-3xl">
              More worlds. More skills. More progress.
            </h2>

            <p className="mx-auto mt-3 max-w-2xl leading-7 text-slate-300">
              Premium worlds will introduce debugging, functions, algorithms,
              game logic, certificates, and more detailed parent progress
              tracking.
            </p>

            <Link
              href="/upgrade"
              className="mt-6 inline-block w-full rounded-2xl bg-emerald-400 px-8 py-4 font-bold text-slate-950 transition hover:bg-emerald-300 sm:w-auto"
            >
              Join Early Access
            </Link>
          </section>
        </div>
      </section>

      <Footer />
    </main>
  );
}