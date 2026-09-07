import { catalog } from "@/lib/catalog";
import { utcDay } from "@/lib/day";
import { proverbForDay } from "@/lib/proverb";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default function Home() {
  const daily = proverbForDay({ day: utcDay(new Date()), catalog });

  return (
    <main className="mx-auto flex min-h-dvh max-w-[40rem] flex-col items-center justify-center px-6 py-20 text-center">
      <h1 className="text-sm tracking-[0.18em] text-ink/75">{site.name}</h1>
      <p className="mt-8 text-[0.7rem] font-medium tracking-[0.22em] text-rust [font-variant-caps:all-small-caps]">
        {daily.day}
      </p>
      <blockquote className="font-display mt-8 text-pretty text-3xl leading-snug font-medium italic text-ink sm:text-4xl">
        {daily.proverb.text}
      </blockquote>
      <p className="mt-6 text-sm text-ink/50">{daily.proverb.origin}</p>
      <p className="mt-20 text-sm text-ink/45">A new proverb arrives each UTC day.</p>
    </main>
  );
}
