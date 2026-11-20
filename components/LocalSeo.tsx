import type { CSSProperties } from "react";
import { CITIES, LOCAL_SEO } from "@/lib/geo";
import { WRAP } from "./ui";

// Блок «по районам» на странице направления: по одному разделу на село, у каждого свой якорь.
// Весь текст виден сразу (не прячем во вкладки), чтобы поисковики его учитывали.
export default function LocalSeo({ slug }: { slug: string }) {
  const seo = LOCAL_SEO[slug];
  if (!seo) return null;

  return (
    <section id="po-rajonam" className="scroll-mt-20 py-20 md:py-28">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 data-reveal className="display min-w-0 text-[10vw] text-graphite sm:text-[clamp(2.6rem,5.6vw,4.6rem)] lg:col-span-7">
            {seo.title}
          </h2>
          <p data-reveal className="text-lg text-ink/75 lg:col-span-5">{seo.lead}</p>
        </div>

        {/* Быстрый переход к своему селу */}
        <nav aria-label="Сёла и районы" className="mt-10 flex flex-wrap gap-2.5">
          {CITIES.map((c) => (
            <a
              key={c.key}
              href={`#${c.anchor}`}
              className="rounded-full bg-white px-4 py-2 text-base font-medium text-graphite shadow-[0_4px_14px_-8px_rgb(30_30_30/0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-soft"
            >
              {c.name}
            </a>
          ))}
        </nav>

        <div className="mt-14 grid grid-cols-1 gap-x-16 border-t border-line lg:grid-cols-2">
          {CITIES.map((c, i) => {
            const block = seo.blocks[c.key];
            return (
              <article
                key={c.key}
                id={c.anchor}
                data-reveal
                style={{ "--d": `${(i % 2) * 90}ms` } as CSSProperties}
                className="scroll-mt-24 border-b border-line py-10"
              >
                <p className="text-sm text-steel">
                  {c.name} / {c.district}
                </p>
                <h3 className="title mt-3 text-[1.5rem] text-graphite sm:text-[1.7rem] md:text-[2.1rem]">{block.heading}</h3>
                <div className="mt-4 space-y-3 text-lg leading-relaxed text-ink/80">
                  {block.text.map((t) => (
                    <p key={t}>{t}</p>
                  ))}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
