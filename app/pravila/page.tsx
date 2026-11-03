import type { Metadata } from "next";
import type { CSSProperties } from "react";
import ilgam from "@/public/img/ilgam.jpg";
import { CallButton, ParallaxImage, WhatsAppButton, WRAP } from "@/components/ui";

export const metadata: Metadata = {
  title: "Мои правила работы | Ильгам Кильдияров, Салаватский район РБ",
  description:
    "Правила, по которым работает Ильгам Кильдияров: сухой цемент, арматура с биркой завода, честный вес, цена с доставкой без доплат. Северо-восток Башкортостана.",
  alternates: { canonical: "/pravila" },
};

const RULES = [
  {
    title: "Никогда не продаём мокрый или слежавшийся цемент.",
    text: "Если мешки попали под дождь, мы их списываем, а не продаём вам.",
  },
  {
    title: "Арматура только с биркой завода.",
    text: "Никакого «гаражного» металла. Диаметр и вес можно проверить при приёмке.",
  },
  {
    title: "Если машина опаздывает, я сам звоню прорабу.",
    text: "Предупреждаю заранее, а не заставляю ждать на объекте.",
  },
  {
    title: "Колёса и диски проверяем на геометрию перед отгрузкой.",
    text: "Вам не придётся часами их центрировать.",
  },
  {
    title: "Вес и количество как в накладной.",
    text: "Можете пересчитать и перевесить при приёмке. Не сходится, разбираюсь в тот же день.",
  },
  {
    title: "Цену называю сразу с доставкой.",
    text: "Никаких доплат «на месте» и сюрпризов при разгрузке.",
  },
  {
    title: "Если чего-то нет, так и скажу.",
    text: "Не подменяю товар на другой без вашего согласия.",
  },
];

export default function Page() {
  return (
    <>
      {/* Сцена: фото и слова Ильгама */}
      <section className="bg-graphite text-white">
        <div className="grid lg:min-h-[80svh] lg:grid-cols-12">
          <div className="relative h-[52svh] min-h-[320px] lg:col-span-5 lg:h-auto">
            <ParallaxImage
              src={ilgam}
              alt="Ильгам Кильдияров"
              speed={0.08}
              preload
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-full w-full"
              imgClassName="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-graphite via-transparent to-transparent lg:bg-linear-to-l" />
          </div>
          <div className="relative z-10 -mt-20 flex flex-col justify-center px-5 pb-16 sm:px-8 lg:col-span-7 lg:mt-0 lg:py-20 lg:pr-[max(3rem,calc((100vw-1360px)/2+3rem))] lg:pl-12">
            <h1>
              <span className="mb-6 block text-base font-medium text-white/60">Ильгам Кильдияров</span>
              <span className="display block text-[clamp(3rem,8vw,6.4rem)]">
                <span className="block">Моё имя</span>
                <span className="block">моя гарантия</span>
              </span>
            </h1>
            <blockquote className="mt-10 max-w-2xl text-lg leading-relaxed text-white/75 md:text-xl">
              «Меня зовут Ильгам Кильдияров. За [15] лет в регионе я понял одно: люди устали от обмана с толщиной
              арматуры и маркой цемента. Я создал этот склад, чтобы вы могли просто позвонить мне и знать: то, что я
              привезу, будет идеального качества».
            </blockquote>
          </div>
        </div>
      </section>

      {/* Правила: крупные строки с номерами */}
      <section className="py-24 md:py-32">
        <div className={WRAP}>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-28">
                <h2 data-reveal className="display text-[clamp(2.8rem,6vw,4.8rem)] text-graphite">
                  Мои правила
                </h2>
                <p className="mt-6 text-sm text-steel">[Правила как пример. Утвердить формулировки с Ильгамом.]</p>
              </div>
            </div>
            <ol className="border-t border-line lg:col-span-8">
              {RULES.map((r, i) => (
                <li
                  key={r.title}
                  data-reveal
                  style={{ "--d": `${(i % 2) * 80}ms` } as CSSProperties}
                  className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-line py-8 md:grid-cols-[5rem_1fr] md:py-10"
                >
                  <span className="display text-3xl text-steel/50 md:text-5xl">{i + 1}</span>
                  <div>
                    <p className="title text-[1.6rem] text-graphite md:text-[2.2rem]">{r.title}</p>
                    <p className="mt-3 text-lg text-ink/75">{r.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Если что-то не так */}
      <section className="bg-sand py-24 md:py-32">
        <div className={`${WRAP} max-w-[1100px]`}>
          <p data-reveal className="title text-[2rem] text-graphite md:text-[3.4rem]">
            «Я лично контролирую отгрузку. Если вам привезли не тот объём или бракованный профнастил, звоните мне
            напрямую. Решу вопрос в тот же день».
          </p>
          <div data-reveal className="mt-12 flex flex-col gap-3 sm:flex-row">
            <CallButton label="Позвонить Ильгаму" />
            <WhatsAppButton />
          </div>
        </div>
      </section>
    </>
  );
}
