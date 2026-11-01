"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { search } from "@/lib/search";
import { waLink } from "@/lib/site";
import { ArrowIcon, CategoryIcon, SearchIcon } from "./Icons";
import { CallButton, StatusBadge } from "./ui";

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
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-6 -translate-y-1/2 text-steel" />
        <input
          id="q"
          type="search"
          value={q}
          onChange={(e) => update(e.target.value)}
          autoFocus
          placeholder="Цемент, арматура 12, шины R16…"
          className="h-14 w-full rounded-md border border-line bg-white pr-4 pl-13 text-lg text-ink placeholder:text-steel/80 focus:border-steel focus:outline-none"
        />
      </form>

      <div className="mt-4 flex flex-wrap gap-2">
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            onClick={() => update(ex)}
            className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-graphite hover:border-steel"
          >
            {ex}
          </button>
        ))}
      </div>

      {q.trim() && hits.length === 0 && (
        <div className="mt-10 rounded-lg border border-line bg-white p-6">
          <p className="text-lg text-ink">
            По запросу «{q}» на сайте ничего нет. Это не значит, что у меня этого нет — позвоните, подскажу.
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <CallButton />
            <a
              href={waLink(`Здравствуйте, Ильгам! Есть ли у вас: ${q}?`)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center justify-center rounded-md border-2 border-terra px-5 font-semibold text-terra hover:bg-terra hover:text-white"
            >
              Спросить в WhatsApp
            </a>
          </div>
        </div>
      )}

      {categories.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-graphite">Направления</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2">
            {categories.map(({ category: c }) => (
              <li key={c.slug}>
                <Link
                  href={`/${c.slug}`}
                  className="flex items-center gap-4 rounded-lg border border-line bg-white p-4 hover:border-steel"
                >
                  <CategoryIcon icon={c.icon} className="size-10 shrink-0 text-steel" />
                  <span className="flex-1">
                    <span className="block font-bold text-graphite">{c.title}</span>
                    <span className="block text-sm text-steel">{c.hub === "avto" ? "АВТО" : "СТРОЙКА"} · {c.short}</span>
                  </span>
                  <ArrowIcon className="size-5 text-steel" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {items.length > 0 && (
        <section className="mt-10">
          <h2 className="text-xl font-bold text-graphite">Товары</h2>
          <ul className="mt-4 divide-y divide-line overflow-hidden rounded-lg border border-line bg-white">
            {items.map((h, i) =>
              h.type === "item" ? (
                <li key={`${h.category.slug}-${i}`}>
                  <Link href={`/${h.category.slug}#assortiment`} className="block p-4 hover:bg-paper">
                    <span className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <span className="font-semibold text-graphite">{h.item.name}</span>
                      <span className="font-semibold whitespace-nowrap text-ink">{h.item.price}</span>
                    </span>
                    <span className="mt-1 block text-sm text-steel">{h.category.title} · {h.item.spec}</span>
                    <StatusBadge status={h.status} className="mt-2 text-xs" />
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
