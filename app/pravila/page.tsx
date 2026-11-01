import type { Metadata } from "next";
import Image from "next/image";
import ilgam from "@/public/img/ilgam.jpg";
import { CallButton, WhatsAppButton } from "@/components/ui";

export const metadata: Metadata = {
  title: "Мои правила работы — Ильгам Кильдияров, Салаватский район РБ",
  description:
    "Правила, по которым работает Ильгам Кильдияров: сухой цемент, арматура с биркой завода, честный вес, цена с доставкой без доплат. Северо-восток Башкортостана.",
  alternates: { canonical: "/pravila" },
};

const RULES = [
  {
    title: "Никогда не продаём мокрый или слежавшийся цемент.",
    text: "Если мешки попали под дождь — мы их списываем, а не продаём вам.",
  },
  {
    title: "Арматура — только с биркой завода.",
    text: "Никакого «гаражного» металла. Диаметр и вес можно проверить при приёмке.",
  },
  {
    title: "Если машина опаздывает — я сам звоню прорабу.",
    text: "Предупреждаю заранее, а не заставляю ждать на объекте.",
  },
  {
    title: "Колёса и диски проверяем на геометрию перед отгрузкой.",
    text: "Вам не придётся часами их центрировать.",
  },
  {
    title: "Вес и количество — как в накладной.",
    text: "Можете пересчитать и перевесить при приёмке. Не сходится — разбираюсь в тот же день.",
  },
  {
    title: "Цену называю сразу с доставкой.",
    text: "Никаких доплат «на месте» и сюрпризов при разгрузке.",
  },
  {
    title: "Если чего-то нет — так и скажу.",
    text: "Не подменяю товар на другой без вашего согласия.",
  },
];

export default function Page() {
  return (
    <>
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] md:py-14">
          <div className="relative mx-auto aspect-[6/7] w-full max-w-xs overflow-hidden rounded-lg bg-line md:max-w-none">
            <Image
              src={ilgam}
              alt="Ильгам Кильдияров"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 80vw"
              className="object-cover object-top"
            />
          </div>
          <div>
            <p className="text-sm font-medium text-steel">Ильгам Кильдияров</p>
            <h1 className="mt-1 text-3xl font-extrabold text-graphite md:text-5xl">Мои правила работы</h1>
            <blockquote className="mt-6 border-l-4 border-graphite pl-5 text-lg leading-relaxed text-ink md:text-xl">
              «Меня зовут Ильгам Кильдияров. За [15] лет в регионе я понял одно: люди устали от обмана с толщиной
              арматуры и маркой цемента. Я создал этот склад, чтобы вы могли просто позвонить мне и знать: то, что я
              привезу, — будет идеального качества. Моё имя — моя гарантия».
            </blockquote>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <ol className="space-y-4">
            {RULES.map((r, i) => (
              <li key={r.title} className="flex gap-4 rounded-lg border border-line bg-white p-5 md:p-6">
                <span className="text-2xl font-extrabold text-steel tabular-nums md:text-3xl">{i + 1}</span>
                <div>
                  <p className="text-lg font-bold text-graphite md:text-xl">{r.title}</p>
                  <p className="mt-1 text-base text-ink/85 md:text-lg">{r.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-steel">[Правила — примеры. Утвердить формулировки с Ильгамом.]</p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold text-graphite md:text-3xl">Если что-то не так</h2>
          <p className="mt-4 text-lg leading-relaxed text-ink">
            «Я лично контролирую отгрузку. Если вам привезли не тот объём или бракованный профнастил — звоните мне
            напрямую, я решу вопрос в тот же день».
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <CallButton label="Позвонить Ильгаму" />
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </>
  );
}
