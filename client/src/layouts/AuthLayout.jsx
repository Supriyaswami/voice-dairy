import { Outlet } from "react-router-dom";

const AuthLayout = () => (
  <div className="flex min-h-screen items-center justify-center px-4 py-12">
    <div className="w-full max-w-6xl rounded-[2.5rem] border border-white/50 bg-white/60 p-4 shadow-velvet backdrop-blur-2xl dark:border-white/10 dark:bg-white/5 md:p-8">
      <div className="grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <section className="rounded-[2rem] bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.85),_rgba(255,245,236,0.65),_rgba(236,210,185,0.8))] p-8 dark:bg-[radial-gradient(circle_at_top,_rgba(70,50,35,0.55),_rgba(32,26,22,0.92),_rgba(23,20,18,1))]">
          <p className="text-xs uppercase tracking-[0.35em] text-stone-500 dark:text-stone-400">ECHO DIARY</p>
          <h1 className="mt-5 max-w-xl font-display text-5xl leading-tight text-stone-900 dark:text-white">
            Speak your day. Relive your memories.
          </h1>
          <p className="mt-5 max-w-lg text-base leading-8 text-stone-600 dark:text-stone-300">
            Record your day, review the exact transcript, and let AI shape it into a diary entry that stays faithful to what really happened.
          </p>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {[
              "Voice-first daily capture",
              "Transcript editing before AI",
              "Beautiful diary reading with audio playback"
            ].map((item) => (
              <div key={item} className="rounded-[1.5rem] border border-white/50 bg-white/65 p-4 text-sm shadow-sm dark:border-white/10 dark:bg-white/5">
                {item}
              </div>
            ))}
          </div>
        </section>
        <section className="flex items-center">
          <div className="w-full">
            <Outlet />
          </div>
        </section>
      </div>
    </div>
  </div>
);

export default AuthLayout;

