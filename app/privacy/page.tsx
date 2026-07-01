import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="px-6 pb-24 pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="font-bold text-emerald-300">LooplyLand</p>

          <h1 className="mt-3 text-5xl font-extrabold">Privacy Policy</h1>

          <p className="mt-4 text-slate-400">Last updated: July 2026</p>

          <div className="mt-10 space-y-8 leading-8 text-slate-300">
            <section>
              <h2 className="text-2xl font-extrabold text-white">
                1. What is LooplyLand?
              </h2>

              <p className="mt-3">
                LooplyLand is an educational web app designed to help kids ages
                8–12 learn coding basics through quests, puzzles, XP, streaks,
                and learning progress.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                2. Information we collect
              </h2>

              <p className="mt-3">
                We may collect basic account information such as email address,
                login information, learning progress, XP, streaks, completed
                lessons, and early access waitlist emails.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                3. How we use information
              </h2>

              <p className="mt-3">
                We use this information to create accounts, save learning
                progress, improve LooplyLand, show progress dashboards, and
                contact users who join the Premium early access waitlist.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                4. Children&apos;s privacy
              </h2>

              <p className="mt-3">
                LooplyLand is designed for children, but accounts and waitlist
                signups should be created or supervised by a parent or guardian.
                We aim to collect only the information needed to provide the
                educational experience.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                5. Third-party services
              </h2>

              <p className="mt-3">
                LooplyLand may use third-party services such as Supabase for
                authentication and database storage, and Vercel for hosting,
                analytics, and performance insights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                6. Analytics
              </h2>

              <p className="mt-3">
                We use analytics to understand how visitors use LooplyLand, such
                as which pages are visited and how the website performs. This
                helps us improve the product.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                7. Data security
              </h2>

              <p className="mt-3">
                We take reasonable steps to protect account and progress data.
                However, no online service can guarantee perfect security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-extrabold text-white">
                8. Contact
              </h2>

              <p className="mt-3">
                If you have questions about this Privacy Policy, you can contact
                us at{" "}
                <a
                  href="mailto:contact@looplyland.com"
                  className="font-bold text-emerald-300 hover:text-emerald-200"
                >
                  contact@looplyland.com
                </a>
                .
              </p>

              <p className="mt-3">
                For account issues, login problems, or technical support, you
                can email us at{" "}
                <a
                  href="mailto:support@looplyland.com"
                  className="font-bold text-emerald-300 hover:text-emerald-200"
                >
                  support@looplyland.com
                </a>
                .
              </p>
            </section>

            <p className="rounded-2xl border border-white/10 bg-white/5 p-5 text-sm leading-7 text-slate-400">
              This Privacy Policy is a simple MVP version and may be updated as
              LooplyLand grows.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}