import Link from "next/link";

export default function Navbar() {
  return (
    <header className="fixed left-0 top-0 z-50 w-full border-b border-white/10 bg-[#101827]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4 text-white">
        <Link href="/" className="text-2xl font-extrabold">
          Looply<span className="text-emerald-300">Land</span>
        </Link>

        <nav className="hidden items-center gap-6 font-bold text-slate-300 sm:flex">
          <Link href="/learn" className="transition hover:text-white">
            Learn
          </Link>

          <Link href="/parents" className="transition hover:text-white">
            Parents
          </Link>

          <Link href="/upgrade" className="transition hover:text-white">
            Premium
          </Link>
        </nav>

        <Link
          href="/learn"
          className="rounded-2xl bg-emerald-400 px-5 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
        >
          Start
        </Link>
      </div>
    </header>
  );
}