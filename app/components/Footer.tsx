import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950 px-6 py-10 text-white">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <Link href="/" className="text-2xl font-extrabold">
            Looply<span className="text-emerald-300">Land</span>
          </Link>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Coding adventures for kids ages 8–12. Turn screen time into
            learning time.
          </p>
        </div>

        <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-300">
          <Link href="/learn" className="transition hover:text-white">
            Learn
          </Link>

          <Link href="/parents" className="transition hover:text-white">
            Parents
          </Link>

          <Link href="/upgrade" className="transition hover:text-white">
            Premium
          </Link>

          <Link href="/privacy" className="transition hover:text-white">
            Privacy Policy
          </Link>

        <Link href="/contact" className="transition hover:text-white">
  Contact
</Link>

        </div>
      </div>

      <div className="mx-auto mt-8 max-w-6xl text-sm text-slate-500">
        © 2026 LooplyLand. All rights reserved.
      </div>
    </footer>
  );
}