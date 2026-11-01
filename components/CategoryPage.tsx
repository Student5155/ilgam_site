import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getCategory, HUBS, type Slug } from "@/lib/catalog";
import { SITE, waLink } from "@/lib/site";
import EstimateForm from "./EstimateForm";
import { TruckIcon, WhatsAppIcon } from "./Icons";
import { CallButton, CategoryCard, CategoryVisual, EstimateLink, StatusBadge, WhatsAppButton } from "./ui";

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

  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 md:pt-10">
        <nav aria-label="Навигация" className="text-sm text-steel">
          <Link href="/" className="hover:text-graphite">Главная</Link>
          <span className="mx-2">/</span>
          <Link href={`/${hub.key}`} className="hover:text-graphite">{hub.label}</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{c.title}</span>
        </nav>

        <h1 className="mt-4 text-[1.7rem] leading-tight font-extrabold text-graphite md:text-4xl">{c.h1}</h1>

        <div className="mt-6 grid gap-8 md:grid-cols-2">
          <div>
            <div className="overflow-hidden rounded-lg border border-line">
              <CategoryVisual category={c} priority sizes="(min-width: 768px) 50vw, 100vw" />
            </div>
            {c.photos && c.photos.length > 1 && (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {c.photos.slice(1).map((p) => (
                  <div key={p.alt} className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line">
                    <Image src={p.src} alt={p.alt} fill placeholder="blur" sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <StatusBadge status={c.status} />
            <div className="mt-4 space-y-3 text-lg leading-relaxed text-ink">
              {c.intro.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {c.terms && (
              <ul className="mt-5 space-y-2 rounded-lg border border-line bg-white p-4">
                {c.terms.map((t) => (
                  <li key={t} className="flex gap-2 text-base font-semibold text-graphite">
                    <span className="text-steel">—</span> {t}
                  </li>
                ))}
              </ul>
            )}
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <EstimateLink />
              <CallButton />
              <WhatsAppButton label="Написать" text={`Здравствуйте, ${SITE.firstName}! Интересует: ${c.title.toLowerCase()}.`} />
            </div>
          </div>
        </div>
      </div>

      {/* Ассортимент */}
      <section id="assortiment" className="scroll-mt-20 py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-graphite md:text-3xl">Ассортимент и цены</h2>
          <p className="mt-2 text-base text-steel">
            Цены «от» — ориентир. Точную цену с доставкой назову, когда узнаю объём и адрес.
          </p>

          {/* Таблица на компьютере */}
          <table className="mt-6 hidden w-full overflow-hidden rounded-lg border border-line bg-white text-left md:table">
            <thead className="bg-graphite text-sm text-white">
              <tr>
                <th className="p-4 font-semibold">Наименование</th>
                <th className="p-4 font-semibold">Характеристики</th>
                <th className="p-4 font-semibold">Наличие</th>
                <th className="p-4 font-semibold whitespace-nowrap">Цена</th>
                <th className="p-4"><span className="sr-only">Запрос</span></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {c.items.map((item) => (
                <tr key={item.name}>
                  <td className="p-4 font-semibold text-graphite">{item.name}</td>
                  <td className="p-4 text-ink/80">{item.spec}</td>
                  <td className="p-4"><StatusBadge status={item.status ?? c.status} className="text-xs" /></td>
                  <td className="p-4 font-bold whitespace-nowrap text-ink">{item.price}</td>
                  <td className="p-4 text-right">
                    <PriceRequest name={item.name} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Карточки на телефоне */}
          <ul className="mt-6 space-y-3 md:hidden">
            {c.items.map((item) => (
              <li key={item.name} className="rounded-lg border border-line bg-white p-4">
                <p className="text-lg font-bold text-graphite">{item.name}</p>
                <p className="mt-1 text-base text-ink/80">{item.spec}</p>
                <p className="mt-2 text-xl font-bold text-ink">{item.price}</p>
                <StatusBadge status={item.status ?? c.status} className="mt-2 text-xs" />
                <div className="mt-3">
                  <PriceRequest name={item.name} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Доставка */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="flex items-center gap-3 text-2xl font-bold text-graphite md:text-3xl">
            <TruckIcon className="size-8 text-steel" /> Доставка
          </h2>
          <ul className="mt-5 max-w-3xl space-y-3 text-lg text-ink">
            {c.delivery.map((d) => (
              <li key={d} className="flex gap-3">
                <span className="mt-2.5 size-2 shrink-0 rounded-full bg-steel" aria-hidden />
                {d}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Смета */}
      <section id="smeta" className="scroll-mt-20 py-12">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-graphite md:text-3xl">Рассчитать смету</h2>
          <p className="mt-2 text-lg text-ink/85">
            Напишите, что нужно и сколько. Я посчитаю и отвечу итоговой ценой с доставкой.
          </p>
          <div className="mt-6">
            <EstimateForm topic={c.title.toLowerCase()} placeholder={c.estimatePlaceholder} />
          </div>
        </div>
      </section>

      {/* Соседние направления */}
      <section className="border-t border-line py-12">
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="text-2xl font-bold text-graphite">Ещё у меня</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <CategoryCard key={r.slug} category={r} />
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
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-md border-2 border-terra px-4 text-sm font-semibold whitespace-nowrap text-terra hover:bg-terra hover:text-white"
    >
      <WhatsAppIcon className="size-4" />
      Запросить цену с доставкой
    </a>
  );
}
