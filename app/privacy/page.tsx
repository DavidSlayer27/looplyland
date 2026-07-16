import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#101827] text-white">
      <Navbar />

      <section className="px-6 pb-20 pt-28 md:pb-24 md:pt-36">
        <div className="mx-auto max-w-4xl">
          <p className="font-bold text-emerald-300">LooplyLand</p>

          <h1 className="mt-3 text-4xl font-extrabold sm:text-5xl">
            Privacy Policy
          </h1>

          <p className="mt-4 text-sm text-slate-400 md:text-base">
            Last updated: July 2026
          </p>

          <div className="mt-8 space-y-7 leading-7 text-slate-300 md:mt-10 md:space-y-8 md:leading-8">
            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                1. What is LooplyLand?
              </h2>

              <p className="mt-3">
                LooplyLand is an educational web app designed to help kids ages
                8–12 learn coding basics through quests, puzzles, XP, Gems,
                streaks, and learning progress.
              </p>
            </section>

                <section>
  <h2 className="text-xl font-extrabold text-white md:text-2xl">
    2. Who operates LooplyLand?
  </h2>

  <p className="mt-3">
    LooplyLand is currently operated as an independent educational
    project. For privacy-related questions or requests, you can contact
    us at{" "}
    <a
      href="mailto:contact@looplyland.com"
      className="break-words font-bold text-emerald-300 hover:text-emerald-200"
    >
      contact@looplyland.com
    </a>
    .
  </p>
</section>

            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                3. Information we collect
              </h2>

              <p className="mt-3">
                We may collect basic account information such as email address,
                login information, learning progress, XP, Gems, streaks,
                completed lessons, and early access waitlist emails.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                4. How we use information
              </h2>

              <p className="mt-3">
                We use this information to create accounts, save learning
                progress, improve LooplyLand, show progress dashboards, and
                contact users who join the Premium early access waitlist.
              </p>
            </section>

            <section>
  <h2 className="text-xl font-extrabold text-white md:text-2xl">
    5. Children&apos;s privacy
  </h2>

  <p className="mt-3">
    LooplyLand is designed for children ages 8–12. Accounts should be
    created and managed by a parent or legal guardian. Children should
    not create accounts or submit personal information without the
    involvement and permission of a parent or guardian.
  </p>

  <p className="mt-3">
    We aim to collect only the information necessary to provide and
    improve the educational experience. Parents or guardians may contact
    us to request access to, correction of, or deletion of information
    associated with their child&apos;s account.
  </p>
</section>

            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                6. Third-party services
              </h2>

              <p className="mt-3">
                LooplyLand may use third-party services such as Supabase for
                authentication and database storage, and Vercel for hosting,
                analytics, and performance insights.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                7. Analytics
              </h2>

              <p className="mt-3">
                We use analytics to understand how visitors use LooplyLand, such
                as which pages are visited and how the website performs. This
                helps us improve the product.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                8. Data security
              </h2>

              <p className="mt-3">
                We take reasonable steps to protect account and progress data.
                However, no online service can guarantee perfect security.
              </p>
            </section>

            <section>
  <h2 className="text-xl font-extrabold text-white md:text-2xl">
    9. Data retention and deletion
  </h2>

  <p className="mt-3">
    We keep account and learning progress information only for as long as
    it is reasonably needed to provide LooplyLand, maintain accounts, and
    meet applicable legal obligations.
  </p>

  <p className="mt-3">
    A parent or guardian may request deletion of an account and its
    associated personal information by contacting us at{" "}
    <a
      href="mailto:support@looplyland.com"
      className="break-words font-bold text-emerald-300 hover:text-emerald-200"
    >
      support@looplyland.com
    </a>
    .
  </p>
</section>

            <section>
              <h2 className="text-xl font-extrabold text-white md:text-2xl">
                10. Contact
              </h2>

              <p className="mt-3">
                If you have questions about this Privacy Policy, you can contact
                us at{" "}
                <a
                  href="mailto:contact@looplyland.com"
                  className="break-words font-bold text-emerald-300 hover:text-emerald-200"
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
                  className="break-words font-bold text-emerald-300 hover:text-emerald-200"
                >
                  support@looplyland.com
                </a>
                .
              </p>
            </section>

            <p className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm leading-7 text-slate-400 md:p-5">
            We may update this Privacy Policy as LooplyLand develops or as our
            legal and operational requirements change. The updated date at the top
            of this page will show when the latest changes were made.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}