"use client";

import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const lessons = {
  "1": {
    id: 1,
    title: "Move Robo",
    concept: "Commands",
    image: "/quests/move-robo.png",
    story:
      "Robo is stuck in the lab. Help him learn basic commands so he can reach the door.",
    xp: 25,
    gems: 10,
    questions: [
      {
        question: "Which command moves Robo forward?",
        codePreview: "robot.__________",
        answers: ["move_forward()", "turn_left()", "sleep()"],
        correctAnswer: "move_forward()",
        successMessage: "Great! Robo moved forward.",
      },
      {
        question: "Which command turns Robo left?",
        codePreview: "robot.__________",
        answers: ["turn_left()", "move_forward()", "eat()"],
        correctAnswer: "turn_left()",
        successMessage: "Nice! Robo turned left.",
      },
      {
        question: "Which command should Robo avoid if he wants to move?",
        codePreview: "robot.__________",
        answers: ["sleep()", "move_forward()", "turn_left()"],
        correctAnswer: "sleep()",
        successMessage: "Correct! sleep() does not help Robo move.",
      },
    ],
  },
  "2": {
    id: 2,
    title: "Loop Forest",
    concept: "Loops",
    image: "/quests/loop-forest.png",
    story:
      "Robo enters Loop Forest. He needs to repeat actions without writing the same code again and again.",
    xp: 30,
    gems: 15,
    questions: [
      {
        question: "Which word helps repeat an action?",
        codePreview: "__________(3): collect_crystal()",
        answers: ["repeat", "random", "sleep"],
        correctAnswer: "repeat",
        successMessage: "Nice! Loops help repeat actions.",
      },
      {
        question: "Why are loops useful?",
        codePreview: "repeat(3): jump()",
        answers: ["They repeat code", "They delete code", "They stop the game"],
        correctAnswer: "They repeat code",
        successMessage: "Exactly! Loops save time.",
      },
      {
        question: "What does repeat(3) mean?",
        codePreview: "repeat(3): move_forward()",
        answers: ["Do it 3 times", "Do it 1 time", "Never do it"],
        correctAnswer: "Do it 3 times",
        successMessage: "Correct! Robo repeats the action 3 times.",
      },
    ],
  },
  "3": {
    id: 3,
    title: "Bug Gate",
    concept: "Conditions",
    image: "/quests/bug-gate.png",
    story:
      "A bug is guarding the gate. Robo can pass only if he has enough energy.",
    xp: 35,
    gems: 20,
    questions: [
      {
        question: "Which keyword checks a condition?",
        codePreview: "___ energy > 5: open_gate()",
        answers: ["if", "loop", "print"],
        correctAnswer: "if",
        successMessage: "Correct! Conditions help programs make decisions.",
      },
      {
        question: "What does this check: energy > 5?",
        codePreview: "if energy > 5: open_gate()",
        answers: [
          "If energy is greater than 5",
          "If energy is zero",
          "If Robo is sleeping",
        ],
        correctAnswer: "If energy is greater than 5",
        successMessage: "Yes! The program checks Robo's energy.",
      },
      {
        question: "What happens if the condition is true?",
        codePreview: "if energy > 5: open_gate()",
        answers: ["The gate opens", "The game closes", "Nothing ever happens"],
        correctAnswer: "The gate opens",
        successMessage: "Exactly! The action runs when the condition is true.",
      },
    ],
  },
  "4": {
    id: 4,
    title: "Energy Crystals",
    concept: "Variables",
    image: "/quests/energy-crystals.png",
    story:
      "Robo finds energy crystals. To keep track of his power, he needs to store numbers using variables.",
    xp: 40,
    gems: 20,
    questions: [
      {
        question: "What is a variable used for?",
        codePreview: "energy = 10",
        answers: [
          "To store information",
          "To delete the game",
          "To make Robo sleep",
        ],
        correctAnswer: "To store information",
        successMessage:
          "Correct! A variable stores information like numbers or text.",
      },
      {
        question: "Which variable stores Robo's energy?",
        codePreview: "energy = 10",
        answers: ["energy", "sleep", "gate"],
        correctAnswer: "energy",
        successMessage: "Nice! energy is the variable name.",
      },
      {
        question: "What value is stored inside energy?",
        codePreview: "energy = 10",
        answers: ["10", "energy", "robot"],
        correctAnswer: "10",
        successMessage: "Exactly! The variable energy stores the value 10.",
      },
    ],
  },
  "5": {
    id: 5,
    title: "Boss Fight",
    concept: "Final Challenge",
    image: "/quests/boss-fight.png",
    story:
      "The Bug King blocks the exit. Robo must use commands, loops, conditions, and variables to win the final battle.",
    xp: 100,
    gems: 50,
    questions: [
      {
        question: "Robo needs to move forward. Which command should he use?",
        codePreview: "robot.__________",
        answers: ["move_forward()", "sleep()", "hide()"],
        correctAnswer: "move_forward()",
        successMessage: "Great! Robo moves closer to the Bug King.",
      },
      {
        question: "Robo needs to attack 3 times. What helps repeat actions?",
        codePreview: "__________(3): attack()",
        answers: ["repeat", "if", "energy"],
        correctAnswer: "repeat",
        successMessage: "Correct! Loops help Robo repeat attacks.",
      },
      {
        question:
          "Robo can open the shield only if energy is greater than 5. Which keyword checks this?",
        codePreview: "___ energy > 5: open_shield()",
        answers: ["if", "sleep", "move"],
        correctAnswer: "if",
        successMessage: "Yes! Conditions help Robo make decisions.",
      },
      {
        question: "Which line stores Robo's energy?",
        codePreview: "__________",
        answers: ["energy = 10", "repeat(3)", "move_forward()"],
        correctAnswer: "energy = 10",
        successMessage:
          "Perfect! Variables help Robo remember important values.",
      },
      {
        question: "Final move: which concept repeats code?",
        codePreview: "repeat(3): attack()",
        answers: ["Loop", "Variable", "Condition"],
        correctAnswer: "Loop",
        successMessage:
          "Amazing! You defeated the Bug King and completed Robo Lab.",
      },
    ],
  },
};

function getLessonTheme(lessonId: number) {
  switch (lessonId) {
    case 1:
      return {
        text: "text-emerald-200",
        border: "border-emerald-200/70",
        badge: "border-emerald-300/30 bg-emerald-400/10 text-emerald-200",
        progress: "bg-emerald-300",
        card:
          "border-emerald-200/60 bg-gradient-to-br from-emerald-300/15 via-emerald-400/8 to-cyan-300/10",
        glow: "shadow-[0_0_45px_rgba(110,231,183,0.22)]",
        rgb: "110, 231, 183",
        button: "bg-emerald-300 hover:bg-emerald-200 text-slate-950",
feedback:
  "border-emerald-300/25 bg-emerald-400/10 text-emerald-200",
      };

    case 2:
      return {
        text: "text-green-300",
        border: "border-green-400/60",
        badge: "border-green-400/30 bg-green-400/10 text-green-300",
        progress: "bg-green-400",
        card:
          "border-green-400/60 bg-gradient-to-br from-green-500/15 via-emerald-500/8 to-lime-400/10",
        glow: "shadow-[0_0_45px_rgba(74,222,128,0.22)]",
        rgb: "74, 222, 128",
        button: "bg-green-400 hover:bg-green-300 text-slate-950",
feedback:
  "border-green-300/25 bg-green-400/10 text-green-200",
      };

    case 3:
      return {
        text: "text-purple-300",
        border: "border-purple-400/60",
        badge: "border-purple-400/30 bg-purple-400/10 text-purple-300",
        progress: "bg-purple-400",
        card:
          "border-purple-400/60 bg-gradient-to-br from-purple-500/18 via-violet-500/10 to-fuchsia-500/10",
        glow: "shadow-[0_0_50px_rgba(192,132,252,0.28)]",
        rgb: "192, 132, 252",
        button: "bg-purple-400 hover:bg-purple-300 text-slate-950",
feedback:
  "border-purple-300/25 bg-purple-400/10 text-purple-200",
      };

    case 4:
      return {
        text: "text-blue-300",
        border: "border-blue-400/60",
        badge: "border-blue-400/30 bg-blue-400/10 text-blue-300",
        progress: "bg-blue-400",
        card:
          "border-blue-400/60 bg-gradient-to-br from-blue-500/18 via-cyan-500/10 to-indigo-500/10",
        glow: "shadow-[0_0_50px_rgba(96,165,250,0.28)]",
        rgb: "96, 165, 250",
        button: "bg-blue-400 hover:bg-blue-300 text-slate-950",
feedback:
  "border-blue-300/25 bg-blue-400/10 text-blue-200",
      };

    case 5:
      return {
        text: "text-orange-300",
        border: "border-orange-400/60",
        badge: "border-orange-400/30 bg-orange-400/10 text-orange-300",
        progress: "bg-orange-400",
        card:
          "border-orange-400/60 bg-gradient-to-br from-orange-500/18 via-red-500/10 to-purple-500/10",
        glow: "shadow-[0_0_55px_rgba(251,146,60,0.3)]",
        rgb: "251, 146, 60",
        button: "bg-orange-400 hover:bg-orange-300 text-slate-950",
feedback:
  "border-orange-300/25 bg-orange-400/10 text-orange-200",
      };

    default:
      return {
        text: "text-emerald-300",
        border: "border-emerald-400/60",
        badge: "border-emerald-400/30 bg-emerald-400/10 text-emerald-300",
        progress: "bg-emerald-400",
        card: "border-emerald-400/60 bg-emerald-400/10",
        glow: "shadow-[0_0_45px_rgba(52,211,153,0.22)]",
        rgb: "52, 211, 153",
        button: "bg-emerald-400 hover:bg-emerald-300 text-slate-950",
feedback:
  "border-emerald-300/25 bg-emerald-400/10 text-emerald-200",
      };
  }
}

export default function LessonPage() {
  const params = useParams();
  const lessonId = String(params.id);
  const lesson = lessons[lessonId as keyof typeof lessons];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);
  const [rewardGranted, setRewardGranted] = useState<boolean | null>(null);
  const [lessonCompleted, setLessonCompleted] = useState(false);
  const [lives, setLives] = useState(3);
  const [lessonFailed, setLessonFailed] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");

  if (!lesson) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#101827] px-6 py-20 text-white">
        <div className="max-w-xl text-center">
          <h1 className="text-3xl font-extrabold md:text-4xl">
            Quest not found
          </h1>

          <p className="mt-4 text-slate-300">
            This lesson does not exist yet.
          </p>

          <Link
            href="/learn"
            className="mt-8 inline-block rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950"
          >
            Back to Map
          </Link>
        </div>
      </main>
    );
  }

  const theme = getLessonTheme(lesson.id);
  const currentQuestion = lesson.questions[currentQuestionIndex];
  const totalQuestions = lesson.questions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;

  const isCorrect = selectedAnswer === currentQuestion.correctAnswer;
  const isWrong =
    selectedAnswer !== null && selectedAnswer !== currentQuestion.correctAnswer;

  const nextLessonId = lesson.id + 1;
  const hasNextLesson = lessons[String(nextLessonId) as keyof typeof lessons];
  const isFinalLesson = lesson.id === 5;

  function getTodayDate() {
    return new Date().toISOString().split("T")[0];
  }

  function getYesterdayDate() {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return yesterday.toISOString().split("T")[0];
  }

  function updateLocalStreak() {
    const today = getTodayDate();
    const yesterday = getYesterdayDate();

    const lastStreakDate = localStorage.getItem("lastStreakDate");
    const currentStreak = Number(localStorage.getItem("streak") || "0");

    if (lastStreakDate === today) {
      return;
    }

    if (lastStreakDate === yesterday) {
      localStorage.setItem("streak", String(currentStreak + 1));
    } else {
      localStorage.setItem("streak", "1");
    }

    localStorage.setItem("lastStreakDate", today);
  }

  async function saveLocalProgress(): Promise<boolean> {
  const completedLessons: number[] = JSON.parse(
    localStorage.getItem("completedLessons") || "[]"
  );

  const isFirstCompletion = !completedLessons.includes(lesson.id);

  if (isFirstCompletion) {
    completedLessons.push(lesson.id);

    localStorage.setItem(
      "completedLessons",
      JSON.stringify(completedLessons)
    );

    const currentXp = Number(localStorage.getItem("xp") || "0");
    const currentGems = Number(localStorage.getItem("gems") || "0");

    localStorage.setItem("xp", String(currentXp + lesson.xp));
    localStorage.setItem("gems", String(currentGems + lesson.gems));
  }

  updateLocalStreak();

  return isFirstCompletion;
}

  async function saveSupabaseProgress(
  userId: string
): Promise<boolean> {
  
    const { data: existingLesson, error: existingLessonError } = await supabase
      .from("lesson_progress")
      .select("id")
      .eq("user_id", userId)
      .eq("lesson_id", lesson.id)
      .maybeSingle();

    if (existingLessonError) {
      throw existingLessonError;
    }

    const { data: profile, error: profileError } = await supabase
    .from("profiles")
    .select("xp, gems, streak, last_streak_date")
    .eq("id", userId)
    .single();

    if (profileError) {
      throw profileError;
    }

    const today = getTodayDate();
    const yesterday = getYesterdayDate();

    let newStreak = profile.streak || 0;

    if (profile.last_streak_date !== today) {
      if (profile.last_streak_date === yesterday) {
        newStreak = newStreak + 1;
      } else {
        newStreak = 1;
      }
    }

    let newXp = profile.xp || 0;
    let newGems = profile.gems || 0;

    if (!existingLesson) {
  const { error: progressError } = await supabase
    .from("lesson_progress")
    .insert({
      user_id: userId,
      lesson_id: lesson.id,
      completed: true,
    });

  if (progressError) {
    throw progressError;
  }

  newXp = newXp + lesson.xp;
  newGems = newGems + lesson.gems;
}

   const { error: updateProfileError } = await supabase
  .from("profiles")
  .update({
    xp: newXp,
    gems: newGems,
    streak: newStreak,
    last_streak_date: today,
  })
  .eq("id", userId);

    if (updateProfileError) {
      throw updateProfileError;
    }

    return !existingLesson;

  }

 async function saveProgress(): Promise<boolean | null> {
  setSaving(true);
  setSaveError("");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  try {
    if (!user) {
      return await saveLocalProgress();
    }

    return await saveSupabaseProgress(user.id);
  } catch (error) {
    console.error(error);
    setSaveError("Progress could not be saved. Please try again.");
    return null;
  } finally {
    setSaving(false);
  }
}

  function handleAnswer(answer: string) {
    if (selectedAnswer !== null) return;

    setSelectedAnswer(answer);

    if (answer !== currentQuestion.correctAnswer) {
      const newLives = lives - 1;
      setLives(newLives);

      if (newLives === 0) {
        setLessonFailed(true);
      }
    }
  }

  async function handleContinue() {
    if (!isCorrect || saving) return;

    const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

    if (isLastQuestion) {
  const receivedReward = await saveProgress();

  if (receivedReward === null) {
    return;
  }

  setRewardGranted(receivedReward);
  setEarnedXp(receivedReward ? lesson.xp : 0);
  setLessonCompleted(true);

  return;
}

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  }

  function restartLesson() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setEarnedXp(0);
    setRewardGranted(null);
    setLessonCompleted(false);
    setLives(3);
    setLessonFailed(false);
    setSaveError("");
  }

  function tryAgain() {
    setSelectedAnswer(null);
  }

 return (
  <main className="relative min-h-screen overflow-hidden bg-[#101827] px-4 pb-10 pt-5 text-white sm:px-5 md:px-6 md:py-8">
  <div className="fixed inset-0">
    <Image
      src="/worlds/robo-lab.png"
      alt=""
      fill
      priority
      className="object-cover object-center"
    />

    <div className="absolute inset-0 bg-[#08111f]/60" />

    <div className="absolute inset-0 bg-gradient-to-b from-[#08111f]/35 via-[#08111f]/55 to-[#101827]/90" />
  </div>

  <div
    className="pointer-events-none fixed left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full blur-3xl"
    style={{
      backgroundColor: `rgba(${theme.rgb}, 0.12)`,
    }}
  />
    <div className="relative z-10 mx-auto max-w-2xl">
     
     <div className="mb-5 flex items-center justify-between gap-3">
  <Link
    href="/learn"
    className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-2 text-sm font-bold text-slate-300 shadow-lg backdrop-blur transition hover:border-white/20 hover:bg-white/10 md:text-base"
  >
    ← Map
  </Link>

  <div className="flex items-center gap-2">
    <div className="flex items-center gap-2 rounded-2xl border border-red-400/20 bg-red-400/10 px-3 py-2 shadow-lg backdrop-blur sm:px-4">
      <span className="text-lg">❤️</span>

      <div>
        <p className="text-sm font-extrabold text-white">{lives}</p>
        <p className="hidden text-[9px] font-bold uppercase tracking-wider text-red-200 sm:block">
          Hearts
        </p>
      </div>
    </div>

    <div className="flex items-center gap-2 rounded-2xl border border-yellow-400/20 bg-yellow-400/10 px-3 py-2 shadow-lg backdrop-blur sm:px-4">
      <Image
        src="/icons/xp2.png"
        alt="XP earned"
        width={28}
        height={28}
        className="h-7 w-7 object-contain"
      />

      <div>
        <p className="text-sm font-extrabold text-yellow-300">{earnedXp}</p>
        <p className="hidden text-[9px] font-bold uppercase tracking-wider text-slate-400 sm:block">
          XP earned
        </p>
      </div>
    </div>
  </div>
</div>

     <div className="mb-5">
  <div className="flex items-center justify-between gap-3">
    <p className={`text-xs font-extrabold uppercase tracking-[0.16em] ${theme.text}`}>
      Quest progress
    </p>

    <p className="text-xs font-bold text-slate-400">
      {currentQuestionIndex + 1} of {totalQuestions}
    </p>
  </div>

  <div className="mt-2 h-3 overflow-hidden rounded-full border border-white/10 bg-slate-950/60">
    <div
      className={`h-full rounded-full transition-all duration-500 ${theme.progress}`}
      style={{
        width: `${progress}%`,
        boxShadow: `0 0 18px rgba(${theme.rgb}, 0.7)`,
      }}
    />
  </div>
</div>

     <div
  className={`relative overflow-hidden rounded-[2rem] border p-5 backdrop-blur-xl md:p-7 ${theme.card} ${theme.glow}`}
>
  <div
    className="pointer-events-none absolute inset-0"
    style={{
      background: `radial-gradient(
        circle at 15% 15%,
        rgba(${theme.rgb}, 0.18),
        transparent 48%
      )`,
    }}
  />
  
  <div className="relative">

        {lessonFailed ? (
          <div className="text-center">
            <div className="text-6xl md:text-7xl">💔</div>

            <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
              Out of hearts!
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-300">
              Don&apos;t worry. Try the quest again and help Robo continue the
              adventure.
            </p>

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={restartLesson}
                className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Restart Quest
              </button>

              <Link
                href="/learn"
                className="rounded-2xl border border-white/10 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
              >
                Back to Map
              </Link>
            </div>
          </div>
        ) : !lessonCompleted ? (
          <>
            <div className="flex items-center justify-between gap-4">
             <div
  className={`relative h-20 w-20 overflow-hidden rounded-2xl border bg-slate-950/70 sm:h-24 sm:w-24 ${theme.border}`}
>
  <Image
    src={lesson.image}
    alt={lesson.title}
    fill
    sizes="96px"
    className={`object-contain ${
      lesson.id === 1 || lesson.id === 3 ? "scale-[1.2]" : "p-1"
    }`}
  />

  <div
    className="pointer-events-none absolute inset-0"
    style={{
      boxShadow: `inset 0 0 24px rgba(${theme.rgb}, 0.18)`,
    }}
  />
</div>

             <div
  className={`rounded-full border px-4 py-2 text-xs font-bold md:text-sm ${theme.badge}`}
>

                Quest {lesson.id} · Question {currentQuestionIndex + 1}/
                {totalQuestions}
              </div>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
              {lesson.title}
            </h1>

            <p className={`mt-2 text-sm font-extrabold uppercase tracking-[0.18em] ${theme.text}`}>
  {lesson.concept}
</p>

            <p className="mt-3 text-base leading-7 text-slate-300">
              {lesson.story}
            </p>

           <div className="mt-6 overflow-hidden rounded-2xl border border-white/10 bg-[#050914] shadow-xl">
  <div className="flex items-center gap-2 border-b border-white/10 bg-white/[0.03] px-4 py-3">
    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

    <span className="ml-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
      Robo Code Console
    </span>
  </div>

  <div className="overflow-x-auto p-4 text-left font-mono text-sm">
    <p className="text-slate-500"># Complete the code</p>

    <p className={`mt-2 whitespace-nowrap font-bold ${theme.text}`}>
      <span className="mr-3 text-slate-600">01</span>

      {selectedAnswer
        ? currentQuestion.codePreview.replace(
            "__________",
            selectedAnswer
          )
        : currentQuestion.codePreview}
    </p>
  </div>
</div>

            <h2 className="mt-6 text-xl font-bold leading-7 md:text-2xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-5 grid gap-3">
  {currentQuestion.answers.map((answer, answerIndex) => {
    const selected = selectedAnswer === answer;
    const correct = answer === currentQuestion.correctAnswer;

    let buttonStyle =
      "border-white/10 bg-slate-950/45 text-white hover:border-white/20 hover:bg-white/10";

    if (selectedAnswer !== null && correct) {
      buttonStyle =
        "border-emerald-300 bg-emerald-400 text-slate-950 shadow-[0_0_22px_rgba(52,211,153,0.25)]";
    }

    if (selected && !correct) {
      buttonStyle =
        "border-red-300 bg-red-400 text-slate-950 shadow-[0_0_22px_rgba(248,113,113,0.2)]";
    }

    return (
      <button
        key={answer}
        onClick={() => handleAnswer(answer)}
        disabled={selectedAnswer !== null}
        className={`group flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left font-mono text-base font-bold transition duration-200 md:px-5 ${buttonStyle} disabled:cursor-default`}
      >
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border text-xs font-extrabold ${
            selectedAnswer !== null && correct
              ? "border-emerald-900/20 bg-emerald-950/20"
              : selected && !correct
                ? "border-red-900/20 bg-red-950/20"
                : `border-white/10 bg-white/5 ${theme.text}`
          }`}
        >
          {String.fromCharCode(65 + answerIndex)}
        </span>

        <span className="min-w-0 flex-1">{answer}</span>

        {selectedAnswer !== null && correct && (
          <span className="text-lg">✓</span>
        )}

        {selected && !correct && <span className="text-lg">✕</span>}
      </button>
    );
  })}
</div>

           {isCorrect && (
 <div
  className={`mt-5 rounded-2xl border p-4 ${theme.feedback}`}
>
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
       <p className={`font-bold ${theme.text}`}>Correct!</p>

        <p className="mt-1 text-sm leading-6 text-slate-300">
          {currentQuestion.successMessage}
        </p>
      </div>

      <button
  onClick={handleContinue}
  disabled={saving}
  className={`rounded-2xl px-6 py-3 font-bold transition disabled:cursor-not-allowed disabled:opacity-60 ${theme.button}`}
>
  {saving ? "Saving..." : "Continue →"}
</button>

    </div>

    {saveError && (
      <p className="mt-4 rounded-2xl bg-red-400/10 p-4 text-sm font-bold leading-6 text-red-300">
        {saveError}
      </p>
    )}
  </div>
)}

            {isWrong && !lessonFailed && (
  <div className="mt-5 rounded-2xl bg-red-400/10 p-4">
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="font-bold text-red-300">
          Not quite. You lost 1 heart.
        </p>

        <p className="mt-1 text-sm leading-6 text-slate-300">
          Try again and choose the best answer.
        </p>
      </div>

      <button
        onClick={tryAgain}
        className="rounded-2xl bg-red-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-red-300"
      >
        Try Again
      </button>
    </div>
  </div>
)}
          </>
        ) : (
          <div className="text-center">
            
            <div
  className={`relative mx-auto h-28 w-28 overflow-hidden rounded-[2rem] border bg-slate-950/70 ${theme.border}`}
>
  <Image
    src={lesson.image}
    alt={`${lesson.title} completed`}
    fill
    sizes="112px"
    className={`object-contain ${
      lesson.id === 1 || lesson.id === 3 ? "scale-[1.2]" : "p-2"
    }`}
  />

  <div
    className="pointer-events-none absolute inset-0"
    style={{
      boxShadow: `inset 0 0 30px rgba(${theme.rgb}, 0.25)`,
    }}
  />
</div>

<p
  className={`mt-5 text-sm font-extrabold uppercase tracking-[0.2em] ${theme.text}`}
>
  Quest {lesson.id} completed
</p>

            <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
              {isFinalLesson ? "Robo Lab Complete!" : "Quest Complete!"}
            </h1>

           <p className="mt-3 text-base leading-7 text-slate-300 md:text-lg">
  {rewardGranted
    ? isFinalLesson
      ? "Amazing! You completed the first LooplyLand world and collected your rewards."
      : "You completed the quest and collected new rewards."
    : "Great practice! You already collected the rewards for this quest."}
</p>

{rewardGranted ? (
  <div className="mx-auto mt-6 grid max-w-md grid-cols-2 gap-3">
    <div className="rounded-2xl border border-yellow-400/20 bg-yellow-400/10 p-4">
      <Image
        src="/icons/xp2.png"
        alt="XP reward"
        width={52}
        height={52}
        className="mx-auto h-12 w-12 object-contain"
      />

      <p className="mt-2 text-xl font-extrabold text-yellow-300">
        +{lesson.xp}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        XP earned
      </p>
    </div>

    <div className="rounded-2xl border border-emerald-400/20 bg-emerald-400/10 p-4">
      <Image
        src="/icons/gem1.png"
        alt="Gem reward"
        width={52}
        height={52}
        className="mx-auto h-12 w-12 object-contain"
      />

      <p className="mt-2 text-xl font-extrabold text-emerald-300">
        +{lesson.gems}
      </p>

      <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
        Gems earned
      </p>
    </div>
  </div>
) : (
  <div className="mx-auto mt-6 max-w-md rounded-2xl border border-white/10 bg-slate-950/45 p-5">
    <div className="flex items-center justify-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-2xl">
        ✓
      </div>

      <div className="text-left">
        <p className="font-extrabold text-white">
          Practice complete
        </p>

        <p className="mt-1 text-sm text-slate-400">
          XP and Gems were already collected.
        </p>
      </div>
    </div>
  </div>
)}

            {saveError && (
              <p className="mt-5 rounded-2xl bg-red-400/10 p-4 text-sm font-bold leading-6 text-red-300">
                {saveError}
              </p>
            )}

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {hasNextLesson ? (
             
             <Link
  href={`/lesson/${nextLessonId}`}
  className={`rounded-2xl px-6 py-3 text-center font-bold transition ${theme.button}`}
>
  Next Quest →
</Link>

              ) : (
               
                <Link
       href="/upgrade"
       className={`rounded-2xl px-6 py-3 text-center font-bold transition ${theme.button}`}
>
  Unlock Premium Worlds
</Link>

              )}

              <Link
                href="/learn"
                className="rounded-2xl border border-white/10 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
              >
                Back to Map
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
   </div>
  </main>
);

}