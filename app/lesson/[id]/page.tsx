"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";

const lessons = {
  "1": {
    id: 1,
    title: "Move Robo",
    concept: "Commands",
    emoji: "🤖",
    story:
      "Robo is stuck in the lab. Help him learn basic commands so he can reach the door.",
    xp: 10,
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
    emoji: "🌲",
    story:
      "Robo enters Loop Forest. He needs to repeat actions without writing the same code again and again.",
    xp: 15,
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
    emoji: "🐞",
    story:
      "A bug is guarding the gate. Robo can pass only if he has enough energy.",
    xp: 20,
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
    emoji: "💎",
    story:
      "Robo finds energy crystals. To keep track of his power, he needs to store numbers using variables.",
    xp: 25,
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
    emoji: "👾",
    story:
      "The Bug King blocks the exit. Robo must use commands, loops, conditions, and variables to win the final battle.",
    xp: 50,
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

export default function LessonPage() {
  const params = useParams();
  const lessonId = String(params.id);
  const lesson = lessons[lessonId as keyof typeof lessons];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [earnedXp, setEarnedXp] = useState(0);
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

  async function saveLocalProgress() {
    const completedLessons = JSON.parse(
      localStorage.getItem("completedLessons") || "[]"
    );

    if (!completedLessons.includes(lesson.id)) {
      completedLessons.push(lesson.id);
      localStorage.setItem("completedLessons", JSON.stringify(completedLessons));

      const currentXp = Number(localStorage.getItem("xp") || "0");
      localStorage.setItem("xp", String(currentXp + lesson.xp));
    }

    updateLocalStreak();
  }

  async function saveSupabaseProgress(userId: string) {
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
      .select("xp, streak, last_streak_date")
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
    }

    const { error: updateProfileError } = await supabase
      .from("profiles")
      .update({
        xp: newXp,
        streak: newStreak,
        last_streak_date: today,
      })
      .eq("id", userId);

    if (updateProfileError) {
      throw updateProfileError;
    }
  }

  async function saveProgress() {
    setSaving(true);
    setSaveError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    try {
      if (!user) {
        await saveLocalProgress();
      } else {
        await saveSupabaseProgress(user.id);
      }
    } catch (error) {
      console.error(error);
      setSaveError("Progress could not be saved. Please try again.");
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
      setEarnedXp(lesson.xp);
      setLessonCompleted(true);
      await saveProgress();
      return;
    }

    setCurrentQuestionIndex(currentQuestionIndex + 1);
    setSelectedAnswer(null);
  }

  function restartLesson() {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setEarnedXp(0);
    setLessonCompleted(false);
    setLives(3);
    setLessonFailed(false);
    setSaveError("");
  }

  function tryAgain() {
    setSelectedAnswer(null);
  }

 return (
  <main className="min-h-screen bg-[#101827] px-5 pb-10 pt-5 text-white md:px-6 md:py-8">
    <div className="mx-auto max-w-2xl">
      <div className="mb-5 flex items-center justify-between gap-3">
        <Link
          href="/learn"
          className="rounded-2xl border border-white/10 px-4 py-2 text-sm font-bold text-slate-300 transition hover:bg-white/10 md:text-base"
        >
          ← Map
        </Link>

        <div className="flex items-center gap-2">
          <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-bold md:text-base">
            ❤️ {lives}
          </div>

          <div className="rounded-2xl bg-white/5 px-4 py-2 text-sm font-bold md:text-base">
            XP: {earnedXp}
          </div>
        </div>
      </div>

      <div className="mb-5 h-3 overflow-hidden rounded-full bg-white/10">
        <div
          className="h-full rounded-full bg-emerald-400 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-2xl md:p-6">
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
              <div className="text-5xl md:text-6xl">{lesson.emoji}</div>

              <div className="rounded-full bg-emerald-400/10 px-4 py-2 text-xs font-bold text-emerald-300 md:text-sm">
                Quest {lesson.id} · Question {currentQuestionIndex + 1}/
                {totalQuestions}
              </div>
            </div>

            <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
              {lesson.title}
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-300">
              {lesson.story}
            </p>

            <div className="mt-6 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-left font-mono text-sm text-emerald-300">
              <p># Complete the code</p>
              <p className="whitespace-nowrap">
                {selectedAnswer
                  ? currentQuestion.codePreview.replace(
                      "__________",
                      selectedAnswer
                    )
                  : currentQuestion.codePreview}
              </p>
            </div>

            <h2 className="mt-6 text-xl font-bold leading-7 md:text-2xl">
              {currentQuestion.question}
            </h2>

            <div className="mt-5 grid gap-3">
              {currentQuestion.answers.map((answer) => {
                const selected = selectedAnswer === answer;
                const correct = answer === currentQuestion.correctAnswer;

                let buttonStyle = "bg-white/10 text-white hover:bg-white/20";

                if (selected && correct) {
                  buttonStyle = "bg-emerald-400 text-slate-950";
                }

                if (selected && !correct) {
                  buttonStyle = "bg-red-400 text-slate-950";
                }

                return (
                  <button
                    key={answer}
                    onClick={() => handleAnswer(answer)}
                    className={`rounded-2xl px-5 py-4 text-left font-mono text-base font-bold transition md:text-lg ${buttonStyle}`}
                  >
                    {answer}
                  </button>
                );
              })}
            </div>

            {isCorrect && (
              <div className="mt-6 rounded-2xl bg-emerald-400/10 p-5">
                <p className="text-lg font-bold text-emerald-300">Correct!</p>

                <p className="mt-2 leading-7 text-slate-300">
                  {currentQuestion.successMessage}
                </p>

                {saveError && (
                  <p className="mt-4 rounded-2xl bg-red-400/10 p-4 text-sm font-bold leading-6 text-red-300">
                    {saveError}
                  </p>
                )}

                <button
                  onClick={handleContinue}
                  disabled={saving}
                  className="mt-5 w-full rounded-2xl bg-emerald-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-emerald-300 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                >
                  {saving ? "Saving..." : "Continue →"}
                </button>
              </div>
            )}

            {isWrong && !lessonFailed && (
              <div className="mt-6 rounded-2xl bg-red-400/10 p-5">
                <p className="text-lg font-bold text-red-300">
                  Not quite. You lost 1 heart.
                </p>

                <p className="mt-2 leading-7 text-slate-300">
                  Read the question again and choose the best answer.
                </p>

                <button
                  onClick={tryAgain}
                  className="mt-5 w-full rounded-2xl bg-red-400 px-6 py-3 font-bold text-slate-950 transition hover:bg-red-300 sm:w-auto"
                >
                  Try Again
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center">
            <div className="text-6xl md:text-7xl">
              {isFinalLesson ? "🏆" : "🎉"}
            </div>

            <h1 className="mt-5 text-3xl font-extrabold md:text-4xl">
              {isFinalLesson ? "Robo Lab Complete!" : "Quest Complete!"}
            </h1>

            <p className="mt-3 text-base leading-7 text-slate-300 md:text-lg">
              {isFinalLesson
                ? `Amazing! You completed the first LooplyLand world and earned +${lesson.xp} XP.`
                : `You earned +${lesson.xp} XP and unlocked new coding powers.`}
            </p>

            {saveError && (
              <p className="mt-5 rounded-2xl bg-red-400/10 p-4 text-sm font-bold leading-6 text-red-300">
                {saveError}
              </p>
            )}

            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              {hasNextLesson ? (
                <Link
                  href={`/lesson/${nextLessonId}`}
                  className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
                >
                  Next Quest →
                </Link>
              ) : (
                <Link
                  href="/upgrade"
                  className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
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
  </main>
);

}