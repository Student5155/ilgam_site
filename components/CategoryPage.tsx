import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import { getCategory, HUBS, type Slug } from "@/lib/catalog";
import { SITE, waLink } from "@/lib/site";
import EstimateForm from "./EstimateForm";
import { WhatsAppIcon } from "./Icons";
import {
  CallButton,
  CategoryVisual,
  EstimateLink,
  Kicker,
  ParallaxImage,
  RelatedTile,
  StatusBadge,
  WhatsAppButton,
  WRAP,
} from "./ui";

export function categoryMetadata(slug: Slug): Metadata {
  const c = getCategory(slug);
  return {
    title: c.seoTitle,
    description: c.seoDescription,
    alternates: { canonical: `/${c.slug}` },
    openGraph: { title: c.seoTitle, description: c.seoDescription },
  };
}

export default function CategoryPage({ slug }: { slug: Slug }) {
  const c = getCategory(slug);
  const hub = HUBS[c.hub];
  const related = c.related.map(getCategory);
  const gallery = c.photos?.slice(1) ?? [];

  return (
    <>
      {/* Сцена: заголовок и главное фото */}
      <section className="bg-graphite text-white">
        <div className="grid lg:min-h-[78svh] lg:grid-cols-12">
          <div className="relative h-[44svh] min-h-[280px] lg:order-last lg:col-span-5 lg:h-auto">
            <CategoryVisual
              category={c}
              tone="dark"
              preload
              speed={0.08}
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-full w-full"
            />
          </div>
          <div className="flex flex-col justify-center px-5 py-14 sm:px-8 lg:col-span-7 lg:py-20 lg:pr-12 lg:pl-[max(3rem,calc((100vw-1360px)/2+3rem))]">
            <nav aria-label="Навигация" className="flex flex-wrap gap-x-2 text-sm text-white/55">
              <Link href="/" className="hover:text-white">Главная</Link>
              <span aria-hidden>/</span>
              <Link href={`/${hub.key}`} className="hover:text-white">{hub.label}</Link>
              <span aria-hidden>/</span>
              <span className="text-white/85">{c.title}</span>
            </nav>
            <h1 className="mt-8">
              <span className="mb-5 block text-base font-medium text-white/60">{SITE.name}</span>
              <span className="display block text-[9.6vw] sm:text-[clamp(2.7rem,6.6vw,4.4rem)] lg:text-[clamp(2.7rem,4.6vw,5rem)]">{c.h1}</span>
            </h1>
            <StatusBadge status={c.status} tone="dark" className="mt-8 self-start" />
            <div className="mt-6 max-w-xl space-y-3 text-lg leading-relaxed text-white/75">
              {c.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {c.terms && (
              <ul className="mt-6 flex flex-wrap gap-2.5">
                {c.terms.map((t) => (
                  <li key={t} className="rounded-full bg-white/10 px-4 py-2 text-base font-medium text-white">
                    {t}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <CallButton />
              <EstimateLink tone="dark" />
              <WhatsAppButton tone="dark" label="Написать" text={`Здравствуйте, ${SITE.firstName}! Интересует: ${c.title.toLowerCase()}.`} />
            </div>
          </div>
        </div>
      </section>

      {/* Дополнительные фото: соседние картинки едут с разной скоростью */}
      {gallery.length > 0 && (
        <section className="py-16 md:py-24">
          <div className={`${WRAP} grid grid-cols-2 gap-4 md:gap-8`}>
            {gallery.map((p, i) => (
              <div key={p.alt} data-reveal className={i % 2 ? "md:mt-24" : ""}>
                <ParallaxImage
                  src={p.src}
                  alt={p.alt}
                  speed={i % 2 ? 0.14 : 0.05}
                  sizes="(min-width: 768px) 45vw, 50vw"
                  className="aspect-[3/4] rounded-2xl shadow-soft"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Ассортимент */}
      <section id="assortiment" className="scroll-mt-20 py-20 md:py-28">
        <div className={WRAP}>
          <div data-reveal className="grid gap-6 lg:grid-cols-12 lg:items-end">
            <h2 className="display min-w-0 text-[10.5vw] text-graphite sm:text-[clamp(2.6rem,6vw,4.8rem)] lg:col-span-7">Ассортимент и цены</h2>
            <p className="text-lg text-ink/70 lg:col-span-5">
              Цены «от» как ориентир. Точную цену с доставкой назову, когда узнаю объём и адрес.
            </p>
          </div>

          {/* Таблица на компьютере */}
          <table data-reveal className="mt-14 hidden w-full text-left lg:table">
            <thead className="border-b-2 border-graphite text-sm text-steel">
              <tr>
                <th className="py-4 pr-6 font-medium">Наименование</th>
                <th className="py-4 pr-6 font-medium">Характеристики</th>
                <th className="py-4 pr-6 font-medium">Наличие</th>
                <th className="py-4 pr-6 font-medium whitespace-nowrap">Цена</th>
                <th className="py-4"><span className="sr-only">Запрос</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {c.items.map((item) => (
                <tr key={item.name} className="transition-colors duration-200 hover:bg-white">
                  <td className="py-6 pr-6 pl-2 text-lg font-semibold text-graphite">{item.name}</td>
                  <td className="py-6 pr-6 text-ink/75">{item.spec}</td>
                  <td className="py-6 pr-6"><StatusBadge status={item.status ?? c.status} className="text-xs" /></td>
                  <td className="title py-6 pr-6 text-xl whitespace-nowrap text-ink">{item.price}</td>
                  <td className="py-6 pr-2 text-right"><PriceRequest name={item.name} /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Список на телефоне и планшете */}
          <ul className="mt-10 divide-y divide-line border-y border-line lg:hidden">
            {c.items.map((item) => (
              <li key={item.name} className="py-6">
                <p className="text-lg font-semibold text-graphite">{item.name}</p>
                <p className="mt-1 text-base text-ink/75">{item.spec}</p>
                <p className="title mt-3 text-2xl text-ink">{item.price}</p>
                <StatusBadge status={item.status ?? c.status} className="mt-3 text-xs" />
                <div className="mt-4">
                  <PriceRequest name={item.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Доставка */}
      <section className="bg-sand py-20 md:py-28">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
          <h2 data-reveal className="display text-[clamp(2.6rem,6vw,4.8rem)] text-graphite lg:col-span-4">
            Доставка
          </h2>
          <ul className="border-t border-graphite/15 lg:col-span-8">
            {c.delivery.map((d, i) => (
              <li
                key={d}
                data-reveal
                style={{ "--d": `${i * 80}ms` } as CSSProperties}
                className="grid grid-cols-[3rem_1fr] gap-4 border-b border-graphite/15 py-6 text-lg text-ink md:text-xl"
              >
                <span className="text-sm text-steel">{String(i + 1).padStart(2, "0")}</span>
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Смета */}
      <section id="smeta" className="scroll-mt-20 bg-white py-20 md:py-28">
        <div className={`${WRAP} grid gap-10 lg:grid-cols-12`}>
          <div data-reveal className="lg:col-span-5">
            <h2 className="display text-[clamp(2.6rem,6vw,4.8rem)] text-graphite">Рассчитать смету</h2>
            <p className="mt-6 max-w-md text-lg text-ink/75">
              Напишите, что нужно и сколько. Я посчитаю и отвечу итоговой ценой с доставкой.
            </p>
          </div>
          <div data-reveal className="lg:col-span-6 lg:col-start-7">
            <EstimateForm topic={c.title.toLowerCase()} placeholder={c.estimatePlaceholder} />
          </div>
        </div>
      </section>

      {/* Соседние направления */}
      <section className="py-20 md:py-28">
        <div className={WRAP}>
          <Kicker>{SITE.name}</Kicker>
          <h2 className="display mt-3 text-[clamp(2.4rem,5vw,4rem)] text-graphite">Ещё у меня</h2>
          <div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <div key={r.slug} data-reveal>
                <RelatedTile category={r} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function PriceRequest({ name }: { name: string }) {
  return (
    <a
      href={waLink(`Здравствуйте, ${SITE.firstName}! Нужна цена с доставкой: ${name}. Количество: . Куда: .`)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-sm font-semibold whitespace-nowrap text-graphite shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
    >
      <WhatsAppIcon className="size-4 text-stock" />
      Запросить цену с доставкой
    </a>
  );
}
