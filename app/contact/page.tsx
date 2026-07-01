import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-emerald-400/20 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-5 w-fit rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-bold text-emerald-300 md:mb-6">
            Contact LooplyLand
          </div>

          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-7xl">
            Questions, feedback, or early access?
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-300 md:mt-6 md:text-lg md:leading-8">
            We&apos;d love to hear from parents, educators, and early users who
            want to help shape LooplyLand.
          </p>

          <div className="mx-auto mt-8 max-w-2xl rounded-[2rem] border border-white/10 bg-white/5 p-6 text-left md:mt-10 md:p-8">
            <p className="font-bold text-emerald-300">Email us</p>

            <h2 className="mt-3 break-words text-2xl font-extrabold md:text-3xl">
              contact@looplyland.com
            </h2>

            <p className="mt-4 leading-7 text-slate-300">
              For general questions, parent feedback, education partnerships,
              or Premium early access, email us at{" "}
              <a
                href="mailto:contact@looplyland.com"
                className="break-words font-bold text-emerald-300 hover:text-emerald-200"
              >
                contact@looplyland.com
              </a>
              .
            </p>

            <p className="mt-4 leading-7 text-slate-300">
              For account issues, login problems, or technical support, email us
              at{" "}
              <a
                href="mailto:support@looplyland.com"
                className="break-words font-bold text-emerald-300 hover:text-emerald-200"
              >
                support@looplyland.com
              </a>
              .
            </p>

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                href="mailto:contact@looplyland.com"
                className="rounded-2xl bg-emerald-400 px-6 py-3 text-center font-bold text-slate-950 transition hover:bg-emerald-300"
              >
                Contact Us
              </a>

              <a
                href="mailto:support@looplyland.com"
                className="rounded-2xl border border-white/20 px-6 py-3 text-center font-bold text-white transition hover:bg-white/10"
              >
                Get Support
              </a>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl">👨‍👩‍👧</div>

              <h3 className="mt-4 text-xl font-extrabold">Parents</h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Ask questions about learning progress, safety, or Premium.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl">🏫</div>

              <h3 className="mt-4 text-xl font-extrabold">Educators</h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Contact us about using LooplyLand with students.
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl">💡</div>

              <h3 className="mt-4 text-xl font-extrabold">Feedback</h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                Share ideas for quests, worlds, characters, or features.
              </p>
            </div>
          </div>

          <div className="mt-10">
            <Link
              href="/upgrade"
              className="font-bold text-emerald-300 transition hover:text-emerald-200"
            >
              Want Premium? Join the early access waitlist →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}