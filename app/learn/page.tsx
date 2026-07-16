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
    image: "/quests/move-robo.png",
    xpReward: 25,
    gemReward: 10,
    accent: "emerald",
  },
  {
    id: 2,
    title: "Loop Forest",
    concept: "Loops",
    image: "/quests/loop-forest.png",
    xpReward: 30,
    gemReward: 15,
    accent: "emerald",
  },
  {
    id: 3,
    title: "Bug Gate",
    concept: "Conditions",
    image: "/quests/bug-gate.png",
    xpReward: 35,
    gemReward: 20,
    accent: "purple",
  },
  {
    id: 4,
    title: "Energy Crystals",
    concept: "Variables",
    image: "/quests/energy-crystals.png",
    xpReward: 40,
    gemReward: 20,
    accent: "blue",
  },
  {
    id: 5,
    title: "Boss Fight",
    concept: "Final Challenge",
    image: "/quests/boss-fight.png",
    xpReward: 100,
    gemReward: 50,
    accent: "orange",
  },
];

const premiumWorlds = [
  {
    title: "Debug Desert",
    concept: "Debugging",
    image: "/premium/debug-desert1.png",
    description: "Find bugs, fix broken code, and help Robo escape the desert.",
  },
  {
    title: "Function Tower",
    concept: "Functions",
    image: "/premium/function-tower1.png",
    description:
      "Learn how to reuse code and build smarter programs step by step.",
  },
  {
    title: "Game Logic Island",
    concept: "Game Logic",
    image: "/premium/game-logic-island1.png",
    description:
      "Use conditions, variables, and loops to understand how games work.",
  },
];

const questPathPositions = [
  { top: 9, left: 4 },
  { top: 29, left: 4 },
  { top: 49, left: 4 },
  { top: 69, left: 4 },
  { top: 89, left: 4 },
];

function getQuestTheme(questId: number) {
  switch (questId) {
    case 1:
      return {
        text: "text-emerald-200",
        badge: "bg-emerald-300 text-slate-950",
        border: "border-emerald-200",
        glow: "shadow-[0_0_30px_rgba(110,231,183,0.75)]",
        goBackground: "bg-emerald-300",
        goBorder: "border-emerald-100",
        goColor: "#6ee7b7",
        goBorderColor: "#d1fae5",
        glowColor: "110, 231, 183",
      };

    case 2:
      return {
        text: "text-green-300",
        badge: "bg-green-400 text-slate-950",
        border: "border-green-300",
        glow: "shadow-[0_0_30px_rgba(74,222,128,0.75)]",
        goBackground: "bg-green-400",
        goBorder: "border-green-200",
        goColor: "#4ade80",
        goBorderColor: "#bbf7d0",
        glowColor: "74, 222, 128",
      };

    case 3:
      return {
        text: "text-purple-300",
        badge: "bg-purple-400 text-slate-950",
        border: "border-purple-300",
        glow: "shadow-[0_0_30px_rgba(192,132,252,0.75)]",
        goBackground: "bg-purple-400",
        goBorder: "border-purple-200",
        goColor: "#c084fc",
        goBorderColor: "#e9d5ff",
        glowColor: "192, 132, 252",
      };

    case 4:
      return {
        text: "text-blue-300",
        badge: "bg-blue-400 text-slate-950",
        border: "border-blue-300",
        glow: "shadow-[0_0_30px_rgba(96,165,250,0.75)]",
        goBackground: "bg-blue-400",
        goBorder: "border-blue-200",
        goColor: "#60a5fa",
        goBorderColor: "#bfdbfe",
        glowColor: "96, 165, 250",
      };

    case 5:
      return {
        text: "text-orange-300",
        badge: "bg-orange-400 text-slate-950",
        border: "border-orange-300",
        glow: "shadow-[0_0_30px_rgba(251,146,60,0.75)]",
        goBackground: "bg-orange-400",
        goBorder: "border-orange-200",
        goColor: "#fb923c",
        goBorderColor: "#fed7aa",
        glowColor: "251, 146, 60",
      };

    default:
      return {
        text: "text-emerald-300",
        badge: "bg-emerald-400 text-slate-950",
        border: "border-emerald-300",
        glow: "shadow-[0_0_30px_rgba(52,211,153,0.75)]",
        goBackground: "bg-emerald-400",
        goBorder: "border-emerald-200",
        goColor: "#34d399",
        goBorderColor: "#a7f3d0",
        glowColor: "52, 211, 153",
      };
  }
}

export default function LearnPage() {
  const [completedLessons, setCompletedLessons] = useState<number[]>([]);
  const [xp, setXp] = useState(0);
  const [gems, setGems] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pageEntered, setPageEntered] = useState(false);

 useEffect(() => {
  loadProgress();
}, []);

useEffect(() => {
  if (loading) return;

  const timer = window.setTimeout(() => {
    setPageEntered(true);
  }, 100);

  return () => window.clearTimeout(timer);
}, [loading]);

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
      const savedGems = Number(localStorage.getItem("gems") || "0");
      const savedStreak = Number(localStorage.getItem("streak") || "0");

     setIsLoggedIn(false);
setCompletedLessons(savedLessons);
setXp(savedXp);
setGems(savedGems);
setStreak(savedStreak);
setLoading(false);


return;

    }

    setIsLoggedIn(true);

    const { data: profile } = await supabase
      .from("profiles")
      .select("xp, gems, streak")
      .eq("id", user.id)
      .single();

    const { data: progress } = await supabase
      .from("lesson_progress")
      .select("lesson_id")
      .eq("user_id", user.id);

  setGems(profile?.gems || 0);
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
  localStorage.removeItem("gems");
  localStorage.removeItem("streak");
  localStorage.removeItem("lastStreakDate");

  setCompletedLessons([]);
  setXp(0);
  setGems(0);
  setStreak(0);
  return;
}

    await supabase.from("lesson_progress").delete().eq("user_id", user.id);

   await supabase
  .from("profiles")
  .update({
    xp: 0,
    gems: 0,
    streak: 0,
    last_streak_date: null,
  })
  .eq("id", user.id);

setCompletedLessons([]);
setXp(0);
setGems(0);
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
  const pathFillPercent = worldCompleted
  ? 100
  : questPathPositions[currentQuestId - 1].top;
  const currentTheme = getQuestTheme(currentQuestId);

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

   <section className="relative overflow-hidden px-3 pb-20 pt-20 sm:px-6 sm:pt-24 md:pb-28 md:pt-28">
  <div className="absolute inset-0">
    <Image
      src="/worlds/robo-lab.png"
      alt=""
      fill
      priority
      className="object-cover object-top"
    />

   <div className="absolute inset-0 bg-[#08111f]/40" />
<div className="absolute inset-0 bg-gradient-to-b from-[#08111f]/10 via-[#08111f]/25 to-[#101827]/70" />

  </div>
  
     {/* AMBIENT BACKGROUND EFFECTS */}
<div className="pointer-events-none absolute inset-0 overflow-hidden">
  {/* Lumini mari */}
  <div className="absolute left-[8%] top-[15%] h-64 w-64 animate-pulse rounded-full bg-emerald-400/10 blur-3xl [animation-duration:6s]" />

  <div className="absolute right-[8%] top-[42%] h-72 w-72 animate-pulse rounded-full bg-purple-400/10 blur-3xl [animation-delay:1.5s] [animation-duration:7s]" />

  <div className="absolute bottom-[8%] left-[35%] h-80 w-80 animate-pulse rounded-full bg-blue-400/10 blur-3xl [animation-delay:2.5s] [animation-duration:8s]" />

  {/* Stele și licurici */}
  {Array.from({ length: 22 }).map((_, index) => (
    <span
      key={index}
      className="absolute animate-world-particle rounded-full bg-white"
      style={{
        left: `${(index * 37) % 100}%`,
        top: `${8 + ((index * 23) % 84)}%`,
        width: `${2 + (index % 3)}px`,
        height: `${2 + (index % 3)}px`,
        animationDelay: `${(index % 7) * 0.6}s`,
        animationDuration: `${4 + (index % 5)}s`,
        opacity: 0.25 + (index % 4) * 0.12,
        boxShadow:
          index % 3 === 0
            ? "0 0 10px rgba(52,211,153,0.9)"
            : index % 3 === 1
              ? "0 0 10px rgba(96,165,250,0.8)"
              : "0 0 10px rgba(255,255,255,0.7)",
      }}
    />
  ))}
</div>

      <div
  className={`relative mx-auto max-w-6xl transition-all duration-1000 ease-out ${
   
    pageEntered
  ? "translate-y-0 scale-100 opacity-100"
  : "translate-y-8 scale-[0.985] opacity-0"

  }`}
>
       {/* GAME HUB */}
<div className="grid gap-8 sm:gap-10 xl:grid-cols-[280px_minmax(0,1fr)_280px] xl:items-start">
  {/* LEFT HUD */}
  <aside className="xl:sticky xl:top-28">
    <div className="rounded-[1.5rem] border border-white/10 bg-slate-950/75 p-4 shadow-2xl backdrop-blur-xl sm:rounded-[2rem] sm:p-5">
     
     <div className="inline-flex items-center gap-3 rounded-2xl border border-emerald-400/30 bg-gradient-to-r from-emerald-400/15 to-cyan-400/10 px-4 py-3 shadow-[0_0_25px_rgba(52,211,153,0.12)]">
  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-300/30 bg-slate-950/50 text-xl">
    🌍
  </div>

  <div>
    <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-emerald-300">
      World 1
    </p>

    <p className="mt-0.5 font-extrabold text-white">
      Robo Lab
    </p>
  </div>

  <div className="ml-2 hidden border-l border-white/10 pl-3 sm:block">
    <p className="text-[9px] font-bold uppercase tracking-wider text-slate-500">
      Difficulty
    </p>

    <div className="mt-1 flex gap-0.5 text-xs">
      <span className="text-yellow-300">★</span>
      <span className="text-yellow-300">★</span>
      <span className="text-slate-700">★</span>
      <span className="text-slate-700">★</span>
      <span className="text-slate-700">★</span>
    </div>
  </div>
</div>

     <h1 className="mt-4 text-3xl font-extrabold leading-tight sm:text-4xl">
        Robo Lab Journey
      </h1>

      <p className="mt-3 leading-7 text-slate-300">
        Complete every quest to reach the Boss Fight.
      </p>

      {!isLoggedIn && (
        <div className="mt-5 rounded-2xl border border-yellow-400/30 bg-yellow-400/10 px-4 py-3 text-sm font-bold leading-6 text-yellow-200">
          Demo progress is saved only on this device.
        </div>
      )}

      {/* STATS */}
      <div className="mt-5 grid grid-cols-3 gap-2 xl:mt-6 xl:grid-cols-1">
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-emerald-400/20 bg-white/[0.04] p-3 text-center xl:flex-row xl:text-left">
          <Image
            src="/icons/gem1.png"
            alt="Gems"
            width={60}
            height={60}
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
          />

          <div>
            <p className="text-lg font-extrabold">{gems}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Gems
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-2xl border border-yellow-400/20 bg-white/[0.04] p-3 text-center xl:flex-row xl:text-left">
          <Image
            src="/icons/xp2.png"
            alt="XP"
            width={60}
            height={60}
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
          />

          <div>
            <p className="text-lg font-extrabold">{xp}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              XP
            </p>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 rounded-2xl border border-orange-400/20 bg-white/[0.04] p-3 text-center xl:flex-row xl:text-left">
          <Image
            src="/icons/streak2.png"
            alt="Day streak"
            width={60}
            height={60}
            className="h-9 w-9 object-contain sm:h-11 sm:w-11"
          />

          <div>
            <p className="text-lg font-extrabold">{streak}</p>
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Day streak
            </p>
          </div>
        </div>
      </div>

      {/* PROGRESS */}
      <div className="mt-6 rounded-2xl border border-white/10 bg-black/20 p-4">
        <div className="flex items-center justify-between gap-4">
          <p className="font-bold text-emerald-300">World progress</p>

          <p className="font-extrabold text-emerald-300">
            {roundedProgressPercent}%
          </p>
        </div>

        <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-emerald-400 shadow-[0_0_18px_rgba(52,211,153,0.65)] transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

      <div className="mt-3 flex items-center justify-between gap-3">
  <p className="text-sm font-semibold text-slate-400">
    {completedCount}/{quests.length} completed
  </p>

  <div
    className="flex gap-1"
    aria-label={`${completedCount} of ${quests.length} quests completed`}
  >
    {quests.map((quest) => {
      const completed = completedLessons.includes(quest.id);

      return (
        <span
          key={quest.id}
          className={`text-lg transition duration-500 ${
            completed
              ? "scale-110 text-yellow-300 drop-shadow-[0_0_8px_rgba(250,204,21,0.7)]"
              : "text-slate-700"
          }`}
        >
          ★
        </span>
      );
    })}
  </div>
</div>

      </div>
    </div>

  </aside>

  {/* CENTER QUEST PATH */}
  <section>
    <div className="text-center">
      <p className="font-bold text-emerald-300">Robo Lab Adventure</p>

      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
        Follow Robo&apos;s Path
      </h2>

      <p className="mx-auto mt-3 max-w-xl text-slate-300">
        Complete each coding quest to power the laboratory and unlock the final
        battle.
      </p>
    </div>

    <div className="relative mx-auto mt-10 max-w-xl pb-10">
    
 {/* STRAIGHT PROGRESS PATH */}
<div className="pointer-events-none absolute bottom-0 left-[50px] top-0 hidden w-3 overflow-hidden rounded-full bg-slate-600/60 sm:block">
  {/* Partea colorată până la GO */}
  <div
    className="absolute left-0 top-0 w-full overflow-hidden rounded-full transition-[height] duration-700"
    style={{
      height: `${pathFillPercent}%`,
    }}
  >
    {/* Gradientul păstrează dimensiunea întregului path */}
    <div
      className="absolute left-0 top-0 w-full"
      style={{
        height: `${10000 / pathFillPercent}%`,
        background: `
  linear-gradient(
    to bottom,
    #a7f3d0 0%,
    #34d399 17%,
    #22c55e 25%,
    #15803d 37%,
    #a855f7 49%,
    #7c3aed 58%,
    #38bdf8 68%,
    #2563eb 78%,
    #fb923c 88%,
    #ef4444 100%
  )
`,
      }}
    />
  </div>

  {/* Strălucirea secțiunii completate */}
  <div
    className="absolute left-0 top-0 w-full rounded-full shadow-[0_0_24px_rgba(52,211,153,0.7)] transition-[height] duration-700"
    style={{
      height: `${pathFillPercent}%`,
    }}
  />

  {/* Reflexie albă pe întreaga bară */}
  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-50" />
</div>

{/* ROBO + GO FOLLOW THE PATH */}
{!worldCompleted && (
  <div
    className={`pointer-events-none absolute z-40 hidden -translate-x-1/2 -translate-y-1/2 items-center transition-all duration-700 ease-out sm:flex ${
  pageEntered
    ? "opacity-100"
    : "-translate-x-[65%] opacity-0"
}`}

    style={{
      top: `${questPathPositions[currentQuestId - 1].top}%`,
      left: `${questPathPositions[currentQuestId - 1].left}%`,
    }}
  >
    
    {currentQuestId >= 4 && (
  <div className="absolute right-full mr-3 hidden w-[180px] rounded-2xl border border-white/10 bg-slate-950/90 px-4 py-3 text-left shadow-xl backdrop-blur xl:block">
    <p className={`text-sm font-extrabold ${currentTheme.text}`}>
      {currentQuestId === 4
        ? "You’re almost there!"
        : "Final challenge ahead!"}
    </p>

    <p className="mt-1 text-xs leading-5 text-slate-300">
      {currentQuestId === 4
        ? "Keep going — the Boss Fight is just one quest away."
        : "Use everything you learned and finish Robo Lab."}
    </p>

    <div className="absolute right-[-8px] top-1/2 h-4 w-4 -translate-y-1/2 rotate-45 border-r border-t border-white/10 bg-slate-950/90" />
  </div>
)}

    {/* ROBO */}
    <div className="relative animate-robo-float">
      <div
        className="absolute inset-2 rounded-full blur-2xl"
        style={{
          backgroundColor: `rgba(${currentTheme.glowColor}, 0.3)`,
        }}
      />

      <Image
        src="/mascot/Robo.png"
        alt="Robo showing the current quest"
        width={130}
        height={130}
        priority
        className="relative h-20 w-20 object-contain drop-shadow-2xl"
      />
    </div>

    {/* GO AREA */}
    <div className="relative -ml-2">
     
      {/* HALO 1 */}
      <div
        className="absolute inset-0 animate-go-halo rounded-full"
        style={{
          backgroundColor: `rgba(${currentTheme.glowColor}, 0.3)`,
        }}
      />

      {/* HALO 2 */}
      <div
        className="absolute inset-0 animate-go-halo rounded-full [animation-delay:0.9s]"
        style={{
          backgroundColor: `rgba(${currentTheme.glowColor}, 0.22)`,
        }}
      />

      {/* PARTICULE */}
      <span
        className="animate-quest-sparkle absolute -left-2 top-2 h-2 w-2 rounded-full [animation-delay:0.2s]"
        style={{
          backgroundColor: currentTheme.goColor,
          boxShadow: `0 0 10px rgba(${currentTheme.glowColor}, 0.9)`,
        }}
      />

      <span
        className="animate-quest-sparkle absolute right-0 top-0 h-1.5 w-1.5 rounded-full [animation-delay:0.8s]"
        style={{
          backgroundColor: currentTheme.goColor,
          boxShadow: `0 0 10px rgba(${currentTheme.glowColor}, 0.9)`,
        }}
      />

      <span
        className="animate-quest-sparkle absolute left-3 top-1 h-1 w-1 rounded-full [animation-delay:1.4s]"
        style={{
          backgroundColor: "#ffffff",
          boxShadow: `0 0 8px rgba(${currentTheme.glowColor}, 0.9)`,
        }}
      />

      {/* BUTON GO */}
      <div
        className="relative flex h-14 w-14 animate-go-breathe items-center justify-center rounded-full border-4 font-black text-slate-950"
        style={{
          backgroundColor: currentTheme.goColor,
          borderColor: currentTheme.goBorderColor,
          boxShadow: `0 0 30px rgba(${currentTheme.glowColor}, 0.85)`,
        }}
      >
        <span className="relative z-10 text-sm">GO!</span>

        <span className="absolute -bottom-5 text-base text-white">↓</span>
      </div>
    </div>
  </div>
)}

      <div className="relative grid gap-10 sm:gap-12">
        {quests.map((quest) => {
          const isCompleted = completedLessons.includes(quest.id);

          const isUnlocked =
            quest.id === 1 || completedLessons.includes(quest.id - 1);

          const isCurrent =
            quest.id === currentQuestId && !worldCompleted;

          const isBoss = quest.id === quests.length;

          const theme = getQuestTheme(quest.id);

         const cardColor = isBoss
  ? "border-orange-400/70 bg-gradient-to-br from-orange-500/20 via-red-500/10 to-purple-500/20 shadow-[0_0_35px_rgba(249,115,22,0.2)]"
  : quest.id === 4
    ? "border-blue-400/50 bg-blue-500/10"
    : quest.id === 3
      ? "border-purple-400/60 bg-purple-500/15 shadow-[0_0_28px_rgba(168,85,247,0.12)]"
      : quest.id === 2
        ? "border-green-400/60 bg-gradient-to-br from-green-500/18 via-emerald-500/10 to-lime-500/10 shadow-[0_0_28px_rgba(34,197,94,0.12)]"
        : "border-emerald-200/70 bg-gradient-to-br from-emerald-300/20 via-emerald-400/12 to-cyan-300/10 shadow-[0_0_30px_rgba(110,231,183,0.16)]";

        const questCard = (
  <div
    className={`group relative overflow-hidden rounded-[1.75rem] border p-4 backdrop-blur-xl transition duration-300 sm:ml-24 sm:p-5 ${
      !isUnlocked
        ? "border-white/10 bg-slate-950/65 opacity-55"
        : isCompleted
          ? `${cardColor} opacity-75 shadow-lg hover:-translate-y-1 hover:opacity-95`
          : `${cardColor} shadow-2xl hover:-translate-y-1`
    } ${
      isCurrent
        ? quest.id === 3
          ? "opacity-100 ring-2 ring-purple-300/80 shadow-[0_0_45px_rgba(168,85,247,0.35)]"
          : quest.id === 4
            ? "opacity-100 ring-2 ring-blue-300/80 shadow-[0_0_45px_rgba(59,130,246,0.35)]"
            : quest.id === 5
              ? "opacity-100 ring-2 ring-orange-300/80 shadow-[0_0_45px_rgba(249,115,22,0.35)]"
              : "opacity-100 ring-2 ring-emerald-300/80 shadow-[0_0_45px_rgba(52,211,153,0.35)]"
        : ""
    }`}
  >
             {isCurrent && (
  <div
    className="pointer-events-none absolute inset-0 animate-current-card-glow"
    style={{
      background: `radial-gradient(
        circle at 15% 50%,
        rgba(${theme.glowColor}, 0.28),
        transparent 65%
      )`,
    }}
  />
)}

              <div className="relative flex items-center gap-4">
               <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-slate-950/70 sm:h-24 sm:w-24">
  <Image
    src={quest.image}
    alt={quest.title}
    fill
    sizes="96px"
    className={`object-contain ${
      quest.id === 1 || quest.id === 3 ? "scale-[1.22] p-0" : "p-1"
    }`}
  />
</div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                     
                     <div className="flex flex-wrap items-center gap-2">
  <p
    className={`text-xs font-bold uppercase tracking-[0.15em] ${theme.text}`}
  >
    {isBoss ? "Final Quest" : `Quest ${quest.id}`}
  </p>

  {isCurrent && (
    <span
      className={`rounded-full border px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${theme.text} ${theme.border} bg-slate-950/40`}
    >
      Current quest
    </span>
  )}
</div>

                      <h3 className="mt-1 text-xl font-extrabold sm:text-2xl">
                        {quest.title}
                      </h3>
                    </div>

                    <span
  className={`rounded-full px-3 py-1 text-xs font-bold ${
    
    isCurrent
  ? `${theme.badge} animate-pulse [animation-duration:2.4s]`
  : isCompleted
    ? "border border-white/10 bg-white/10 text-slate-300"

      : "bg-white/10 text-slate-300"
  }`}
>
  {isCompleted
    ? "Done"
    : isCurrent
      ? "Next"
      : isUnlocked
        ? "Open"
        : "Locked"}
</span>
                  </div>

                  <p className="mt-1 font-semibold text-slate-300">
                    {quest.concept}
                  </p>

                 <div className="mt-3 flex flex-wrap gap-2">
  <div className="flex items-center gap-2 rounded-xl border border-yellow-400/20 bg-slate-950/35 px-3 py-2">
    <Image
      src="/icons/xp2.png"
      alt="XP reward"
      width={28}
      height={28}
      className="h-6 w-6 object-contain"
    />

    <div className="leading-none">
      <p className="text-sm font-extrabold text-yellow-300">
        +{quest.xpReward}
      </p>

      <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        XP
      </p>
    </div>
  </div>

  <div className="flex items-center gap-2 rounded-xl border border-emerald-400/20 bg-slate-950/35 px-3 py-2">
    <Image
      src="/icons/gem1.png"
      alt="Gem reward"
      width={28}
      height={28}
      className="h-6 w-6 object-contain"
    />

    <div className="leading-none">
      <p className={`text-sm font-extrabold ${theme.text}`}>
        +{quest.gemReward}
      </p>

      <p className="mt-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">
        Gems
      </p>
    </div>
  </div>
</div>

                </div>
              </div>

              <div className="relative mt-4 flex items-center justify-between border-t border-white/10 pt-4">
                <span className="text-sm font-bold text-slate-300">
                  {!isUnlocked
                    ? "Complete the previous quest"
                    : isCompleted
                      ? "Practice again"
                      : isCurrent
                        ? "Continue adventure"
                        : "Start quest"}
                </span>

                {isUnlocked && (
                 <span
  className={`text-xl font-bold transition group-hover:translate-x-1 ${theme.text}`}
>
  →
</span>
                )}
              </div>
            </div>
          );

          return (
            <div key={quest.id} className="relative min-h-44">
       
              {/* MOBILE CURRENT QUEST GUIDE */}
{isCurrent && (
  <div className="mb-4 flex items-center justify-center gap-2 sm:hidden">
    <div className="relative animate-robo-float">
      <div
        className="absolute inset-2 rounded-full blur-xl"
        style={{
          backgroundColor: `rgba(${theme.glowColor}, 0.3)`,
        }}
      />

      <Image
        src="/mascot/Robo.png"
        alt="Robo showing the current quest"
        width={90}
        height={90}
        className="relative h-16 w-16 object-contain drop-shadow-2xl"
      />
    </div>

    <div className="relative">
      <div
        className="absolute inset-0 animate-go-halo rounded-full"
        style={{
          backgroundColor: `rgba(${theme.glowColor}, 0.28)`,
        }}
      />

      <div
        className="relative flex h-12 w-12 animate-go-breathe items-center justify-center rounded-full border-[3px] font-black text-slate-950"
        style={{
          backgroundColor: theme.goColor,
          borderColor: theme.goBorderColor,
          boxShadow: `0 0 24px rgba(${theme.glowColor}, 0.75)`,
        }}
      >
        <span className="text-xs">GO!</span>
      </div>
    </div>

    <div className="ml-1">
      <p className={`text-xs font-extrabold ${theme.text}`}>
        Current quest
      </p>

      <p className="mt-0.5 text-[11px] text-slate-400">
        Tap the card to continue
      </p>
    </div>
  </div>
)}

              {isUnlocked ? (
                <Link href={`/lesson/${quest.id}`}>{questCard}</Link>
              ) : (
                questCard
              )}
            </div>
          );
        })}
      </div>
    </div>
  </section>

  {/* RIGHT WORLDS */}
  <aside className="xl:sticky xl:top-28">
    <div className="rounded-[2rem] border border-white/10 bg-slate-950/80 p-4 shadow-2xl backdrop-blur-xl sm:p-5">
      <p className="text-center font-bold text-emerald-300">
        What&apos;s next?
      </p>

      <h2 className="mt-1 text-center text-xl font-extrabold">
        Upcoming Worlds
      </h2>

     <div className="mt-5 grid gap-4">
  {premiumWorlds.slice(1).map((world) => (
    <Link
      key={world.title}
      href="/upgrade"
      className="group relative block h-36 overflow-hidden rounded-2xl border border-white/10 shadow-xl transition duration-300 hover:-translate-y-1 hover:border-emerald-400/40 hover:shadow-2xl"
    >
      <Image
        src={world.image}
        alt={world.title}
        fill
        sizes="280px"
        className="object-cover transition duration-500 group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-transparent transition group-hover:via-slate-950/20" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <div className="flex items-end justify-between gap-3">
          <div>
            <p className="font-extrabold">{world.title}</p>

            <p className="mt-1 text-sm text-slate-300">
              {world.concept}
            </p>
          </div>

          <span className="rounded-full border border-white/10 bg-slate-950/80 px-3 py-1 text-xs font-bold transition group-hover:border-emerald-400/30 group-hover:text-emerald-300">
            🔒
          </span>
        </div>
      </div>
    </Link>
  ))}
</div>
     
      {/* WORLD 2 PREVIEW */}

    <div className="mt-5 overflow-hidden rounded-2xl border border-orange-400/25 bg-gradient-to-br from-orange-400/10 via-slate-950/70 to-slate-950 p-4">
  <div className="flex items-center gap-3">
    <div className="relative h-16 w-20 shrink-0 overflow-hidden rounded-xl border border-orange-300/20">
      <Image
        src="/premium/debug-desert1.png"
        alt="Debug Desert preview"
        fill
        sizes="80px"
        className="object-cover"
      />

      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-slate-950/40" />
    </div>

    <div className="min-w-0 flex-1">
      <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-orange-300">
        Next destination
      </p>

      <p className="mt-1 font-extrabold text-white">
        Debug Desert
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Complete Robo Lab to continue the adventure.
      </p>
    </div>
  </div>

  <div className="mt-4 flex items-center gap-2">
    <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
      <div
        className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-orange-400 transition-all duration-700"
        style={{
          width: `${progressPercent}%`,
        }}
      />
    </div>

    <span className="text-xs font-extrabold text-orange-300">
      {roundedProgressPercent}%
    </span>
  </div>

  <div className="mt-3 flex items-center justify-center gap-2 text-xs font-bold text-slate-400">
   <span>{worldCompleted ? "Coming soon" : "Finish Robo Lab"}</span>
    <span>→</span>
    <span className={worldCompleted ? "text-orange-300" : "text-slate-600"}>
      Debug Desert
    </span>
  </div>
</div>

      <Link
        href="/upgrade"
        className="mt-5 block rounded-2xl border border-emerald-400/30 bg-emerald-400/10 px-5 py-3 text-center font-bold text-emerald-300 transition hover:bg-emerald-400/20"
      >
        See all worlds →
      </Link>
    </div>
  </aside>
</div>

        {/* WORLD COMPLETE */}
{worldCompleted && (
  <section className="relative mt-16 overflow-hidden rounded-[2rem] border border-emerald-300/40 bg-slate-950/90 p-6 shadow-[0_0_60px_rgba(52,211,153,0.2)] backdrop-blur-xl sm:p-10">
    {/* CONFETTI */}
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: 24 }).map((_, index) => (
        <span
          key={index}
         className="absolute top-[-20px] h-3 w-2 animate-confetti rounded-sm [animation-iteration-count:3] sm:[animation-iteration-count:1]"
          style={{
            left: `${(index * 17) % 100}%`,
            animationDelay: `${(index % 8) * 0.22}s`,
            animationDuration: `${2.8 + (index % 5) * 0.35}s`,
            backgroundColor: [
              "#34d399",
              "#60a5fa",
              "#c084fc",
              "#facc15",
              "#fb923c",
            ][index % 5],
          }}
        />
      ))}
    </div>

    <div className="relative grid gap-10 lg:grid-cols-[300px_minmax(0,1fr)] lg:items-center">
      {/* ROBO CELEBRATION */}
      <div className="relative mx-auto flex min-h-[320px] w-full max-w-sm items-end justify-center">
        <div className="absolute bottom-8 h-52 w-52 rounded-full bg-emerald-400/20 blur-3xl" />

        <Image
          src="/mascot/Robo.png"
          alt="Robo celebrating completion of Robo Lab"
          width={420}
          height={420}
          className="relative z-10 h-auto w-64 animate-robo-celebrate object-contain drop-shadow-2xl sm:w-72"
        />

      </div>

      {/* CONTENT */}
      <div className="text-center lg:text-left">
        <p className="font-bold uppercase tracking-[0.2em] text-emerald-300">
          Robo Lab completed
        </p>

        <h2 className="mt-3 text-4xl font-extrabold leading-tight sm:text-5xl">
          You became a Robo Lab Graduate!
        </h2>

        <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
          You completed every quest, defeated the final challenge, and learned
          commands, loops, conditions, variables, and beginner coding logic.
        </p>

        <div className="mt-7 grid gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
            <Image
              src="/icons/xp2.png"
              alt="XP"
              width={44}
              height={44}
              className="mx-auto h-10 w-10 object-contain lg:mx-0"
            />

            <p className="mt-2 text-xl font-extrabold text-yellow-300">
              {xp} XP
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Total earned
            </p>
          </div>

          <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
            <Image
              src="/icons/gem1.png"
              alt="Gems"
              width={44}
              height={44}
              className="mx-auto h-10 w-10 object-contain lg:mx-0"
            />

            <p className="mt-2 text-xl font-extrabold text-emerald-300">
              {gems} Gems
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Collected
            </p>
          </div>

          <div className="rounded-2xl border border-orange-400/20 bg-orange-400/10 p-4">
            <Image
              src="/icons/streak2.png"
              alt="Day streak"
              width={44}
              height={44}
              className="mx-auto h-10 w-10 object-contain lg:mx-0"
            />

            <p className="mt-2 text-xl font-extrabold text-orange-300">
              {streak} days
            </p>

            <p className="mt-1 text-xs font-bold uppercase tracking-wider text-slate-400">
              Current streak
            </p>
          </div>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start">
          <a
            href="#certificate-preview"
            className="rounded-2xl border border-white/20 bg-white/5 px-6 py-4 text-center font-extrabold text-white transition hover:-translate-y-1 hover:bg-white/10"
          >
            View Certificate
          </a>

          <Link
            href="/upgrade"
            className="rounded-2xl bg-emerald-400 px-6 py-4 text-center font-extrabold text-slate-950 transition hover:-translate-y-1 hover:bg-emerald-300"
          >
            Explore Premium Worlds
          </Link>
        </div>
      </div>
    </div>

    {/* CERTIFICATE */}
    <div
      id="certificate-preview"
      className="relative mt-12 overflow-hidden rounded-[2rem] border border-yellow-300/30 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 p-6 text-center shadow-2xl sm:p-10"
    >

      <div className="absolute left-[-80px] top-[-80px] h-56 w-56 rounded-full bg-yellow-300/10 blur-3xl" />
      <div className="absolute bottom-[-80px] right-[-80px] h-56 w-56 rounded-full bg-emerald-400/15 blur-3xl" />

      <div className="relative">
        <p className="text-xs font-extrabold uppercase tracking-[0.35em] text-yellow-300 sm:text-sm">
          Certificate of Completion
        </p>

        <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/10 text-4xl shadow-[0_0_35px_rgba(250,204,21,0.18)]">
          🎓
        </div>

        <p className="mt-6 text-sm uppercase tracking-[0.2em] text-slate-400">
          This certifies that
        </p>

        <h3 className="mt-3 text-2xl font-extrabold sm:text-5xl">
          Robo Lab Graduate
        </h3>

        <p className="mx-auto mt-5 max-w-2xl leading-8 text-slate-300">
          successfully completed World 1 of LooplyLand and demonstrated
          beginner knowledge of commands, loops, conditions, variables, and
          coding logic.
        </p>

        <div className="mx-auto mt-8 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-5">
          {[
            "Commands",
            "Loops",
            "Conditions",
            "Variables",
            "Final Challenge",
          ].map((skill) => (
            <div
              key={skill}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-200"
            >
              ✓ {skill}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-10 h-px max-w-xl bg-gradient-to-r from-transparent via-yellow-300/50 to-transparent" />

        <p className="mt-6 text-sm font-bold text-emerald-300">
          LooplyLand · World 1
        </p>

        <p className="mt-2 text-xs text-slate-500">
          Printable certificates are coming with Premium.
        </p>
      </div>
    </div>
  </section>
)}

        {/* RESET */}
      {!isLoggedIn && (
  <div className="mt-12 flex justify-center">
    <button
      onClick={resetProgress}
      className="rounded-xl border border-white/10 bg-slate-950/50 px-4 py-2 text-xs font-bold text-slate-400 transition hover:border-red-400/30 hover:bg-red-400/10 hover:text-red-300"
    >
      Reset demo progress
    </button>
  </div>
)}
      </div>
    </section>

    <Footer />
  </main>
);
}