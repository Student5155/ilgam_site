"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { search } from "@/lib/search";
import { waLink } from "@/lib/site";
import { ArrowIcon, SearchIcon } from "./Icons";
import { BTN, CallButton, MaxButton, StatusBadge } from "./ui";

const EXAMPLES = ["цемент", "арматура 12", "сетка", "пеноплекс", "профнастил", "подоконник", "шины на трактор", "диски R15"];

export default function SearchClient() {
  const params = useSearchParams();
  const [q, setQ] = useState(params.get("q") ?? "");
  const hits = useMemo(() => search(q), [q]);
  const categories = hits.filter((h) => h.type === "category");
  const items = hits.filter((h) => h.type === "item");

  function update(value: string) {
    setQ(value);
    const url = value ? `/poisk?q=${encodeURIComponent(value)}` : "/poisk";
    window.history.replaceState(null, "", url);
  }

  return (
    <div>
      <form role="search" onSubmit={(e) => e.preventDefault()} className="relative">
        <label className="sr-only" htmlFor="q">Что ищете?</label>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-5 size-6 -translate-y-1/2 text-steel" />
        <input
          id="q"
          type="search"
          value={q}
          onChange={(e) => update(e.target.value)}
          autoFocus
          placeholder="Цемент, арматура 12, шины R16"
          className="h-16 w-full rounded-2xl bg-white pr-5 pl-14 text-xl text-ink shadow-soft placeholder:text-steel/80 focus:shadow-lift focus:outline-none"
        />
      </form>

      <div className="mt-5 flex flex-wrap gap-2.5">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => update(ex)}
            className="rounded-full bg-white px-4 py-2 text-sm text-graphite shadow-[0_4px_14px_-8px_rgb(30_30_30/0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-soft"
          >
            {ex}
          </button>
        ))}
      </div>

      {q.trim() && hits.length === 0 && (
        <div className="mt-14">
          <p className="title text-3xl text-graphite">По запросу «{q}» на сайте ничего нет.</p>
          <p className="mt-3 text-lg text-ink/75">Это не значит, что у меня этого нет. Позвоните, подскажу.</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <CallButton />
            <MaxButton />
            <a href={waLink(`Здравствуйте, Ильгам! Есть ли у вас: ${q}?`)} target="_blank" rel="noopener noreferrer" className={BTN.light}>
              Спросить в WhatsApp
            </a>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-steel">Направления</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {categories.map(({ category: c }) => (
              <li key={c.slug}>
                <Link href={`/${c.slug}`} className="group flex items-center gap-5 py-5">
                  <span className="flex-1">
                    <span className="title block text-2xl text-graphite md:text-3xl">{c.title}</span>
                    <span className="mt-1 flex flex-wrap gap-x-3 text-base text-steel">
                      <span>{c.hub === "avto" ? "АВТО" : "СТРОЙКА"}</span>
                      <span aria-hidden>/</span>
                      <span>{c.short}</span>
                    </span>
                  </span>
                  <ArrowIcon className="size-6 text-steel transition-transform duration-300 group-hover:translate-x-1 group-hover:text-graphite" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {items.length > 0 && (
        <section className="mt-14">
          <h2 className="text-sm font-medium text-steel">Товары</h2>
          <ul className="mt-3 divide-y divide-line border-y border-line">
            {items.map((h, i) =>
              h.type === "item" ? (
                <li key={`${h.category.slug}-${i}`}>
                  <Link href={`/${h.category.slug}#assortiment`} className="block py-5 transition-colors duration-200 hover:bg-white/60">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                      <span className="text-lg font-semibold text-graphite">{h.item.name}</span>
                      {h.item.price && <span className="title text-xl whitespace-nowrap text-ink">{h.item.price}</span>}
                    </span>
                    <span className="mt-1 flex flex-wrap gap-x-3 text-sm text-steel">
                      <span>{h.category.title}</span>
                      {h.item.spec && (
                        <>
                          <span aria-hidden>/</span>
                          <span>{h.item.spec}</span>
                        </>
                      )}
                    </span>
                    <StatusBadge status={h.status} className="mt-3 text-xs" />
                  </Link>
                </li>
              ) : null,
            )}
          </ul>
        </section>
      )}
    </div>
  );
}
