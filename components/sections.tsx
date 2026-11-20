import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import ilgam from "@/public/img/ilgam.jpg";
import { CITIES, LOCAL_SEO } from "@/lib/geo";
import { categoriesByGroup, categoriesByHub, HUBS, type Category, type GroupName, type HubKey } from "@/lib/catalog";
import { mapLink, SITE, telLink, yandexMapSrc } from "@/lib/site";
import { ArrowIcon, ClockIcon, InstagramIcon, MaxIcon, PhoneIcon, PinIcon, PlusIcon, TelegramIcon, WhatsAppIcon } from "./Icons";
import SearchBox from "./SearchBox";
import { BTN, CallButton, ContactButtons, Kicker, MaxButton, ParallaxImage, StatusBadge, TypeTile, WhatsAppButton, WRAP } from "./ui";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/* ---------- 1. Два хаба на всю ширину: СТРОЙКА и АВТО ---------- */

export function HubSplit() {
  return (
    <section aria-label="Разделы" className="grid md:grid-cols-2">
      {(["stroyka", "avto"] as HubKey[]).map((key, i) => {
        const hub = HUBS[key];
        const dark = key === "avto";
        return (
          <div
            key={key}
            className={`${dark ? "bg-graphite-2 text-white" : "bg-sand text-graphite"} min-w-0 px-5 py-20 sm:px-8 md:py-28 lg:px-12`}
          >
            <div data-reveal style={delay(i * 120)} className={`max-w-[600px] ${i === 0 ? "md:ml-auto md:pr-6" : "md:pl-6"}`}>
              <Kicker className={dark ? "text-white/55" : ""}>{SITE.name} |</Kicker>
              <Link href={`/${key}`} className="group mt-3 flex items-end gap-4">
                <span className="display text-[15vw] md:text-[7vw] xl:text-[6.4rem]">{hub.label}</span>
                <ArrowIcon className="mb-[0.4em] size-9 shrink-0 opacity-50 transition-[transform,opacity] duration-300 group-hover:translate-x-1.5 group-hover:opacity-100" />
              </Link>
              <p className={`mt-6 max-w-md text-lg ${dark ? "text-white/70" : "text-ink/75"}`}>{hub.text}</p>
              <ul className="mt-9 flex flex-wrap gap-2.5">
                {categoriesByHub(key).map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/${c.slug}`}
                      className={`inline-flex rounded-full px-4.5 py-2.5 text-base font-medium transition-[transform,box-shadow,background-color] duration-300 hover:-translate-y-0.5 ${
                        dark
                          ? "bg-white/10 text-white hover:bg-white/16"
                          : "bg-white text-graphite shadow-soft hover:shadow-lift"
                      }`}
                    >
                      {c.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        );
      })}
    </section>
  );
}

/* ---------- 2. Направления: индекс строками ---------- */

function DirectionRow({ c }: { c: Category }) {
  const photo = c.photos?.[0];
  return (
    <Link
      href={`/${c.slug}`}
      className="group grid grid-cols-[minmax(0,1fr)_auto] items-center gap-5 py-7 md:grid-cols-[170px_minmax(0,1fr)_auto] md:gap-9"
    >
      <div className="relative hidden aspect-[4/3] overflow-hidden rounded-xl shadow-soft md:block">
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            placeholder="blur"
            sizes="170px"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
          />
        ) : (
          <TypeTile category={c} showNote={false} className="h-full" />
        )}
      </div>
      <div>
        <div className="flex flex-col items-start gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:gap-x-5">
          <span className="title text-[1.75rem] text-graphite sm:text-[2rem] md:text-[2.6rem]">{c.title}</span>
          <StatusBadge status={c.status} className="text-xs" />
        </div>
        <p className="mt-3 text-base text-ink/70 md:text-lg">{c.short}</p>
      </div>
      <span className="flex size-12 items-center justify-center rounded-full bg-white text-graphite shadow-soft transition-[background-color,color,transform] duration-300 group-hover:translate-x-1 group-hover:bg-graphite group-hover:text-white">
        <ArrowIcon className="size-5" />
      </span>
    </Link>
  );
}

export function DirectionIndex({ groups }: { groups: GroupName[] }) {
  return (
    <div className="space-y-20">
      {groups.map((g, gi) => (
        <div key={g} className="grid grid-cols-1 gap-4 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-3">
            <div className="lg:sticky lg:top-28">
              <p className="text-sm text-steel">{String(gi + 1).padStart(2, "0")}</p>
              <h3 className="title mt-2 text-3xl text-graphite">{g}</h3>
            </div>
          </div>
          <ul className="min-w-0 divide-y divide-line border-y border-line lg:col-span-9">
            {categoriesByGroup(g).map((c) => (
              <li key={c.slug} data-reveal>
                <DirectionRow c={c} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export function Directions() {
  return (
    <section id="napravleniya" className="scroll-mt-20 py-24 md:py-36">
      <div className={WRAP}>
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <h2 data-reveal className="display min-w-0 text-[11.5vw] text-graphite sm:text-[clamp(3.2rem,8vw,6.5rem)] lg:col-span-7">
            Направления
          </h2>
          <div data-reveal style={delay(120)} className="lg:col-span-5">
            <p className="text-lg text-ink/75">Стройка и авто отдельно. Найдите нужное по названию или выберите ниже.</p>
            <SearchBox className="mt-5" />
          </div>
        </div>
        <div className="mt-20 md:mt-28">
          <DirectionIndex groups={["Стройматериалы", "Окна и двери", "Колёса и диски"]} />
        </div>
      </div>
    </section>
  );
}

/* ---------- Где работаем: сёла и районы со ссылками на блоки на страницах ---------- */

const LOCAL_PAGES = ["okna", "dveri", "cement", "shiny", "profnastil", "metallocherepica"] as const;

export function Geography() {
  return (
    <section id="gde-rabotaem" className="scroll-mt-20 bg-sand py-24 md:py-32">
      <div className={WRAP}>
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <h2 data-reveal className="display min-w-0 text-[11vw] text-graphite sm:text-[clamp(2.8rem,6.5vw,5.2rem)] lg:col-span-7">
            Где работаем
          </h2>
          <p data-reveal className="text-lg text-ink/75 lg:col-span-5">
            Возим стройматериалы, окна, двери и шины по северо-востоку Башкортостана. Выберите своё село, чтобы
            посмотреть условия.
          </p>
        </div>
        <ul className="mt-14 border-t border-graphite/15">
          {CITIES.map((c, i) => (
            <li
              key={c.key}
              data-reveal
              style={delay((i % 3) * 80)}
              className="grid grid-cols-1 gap-4 border-b border-graphite/15 py-8 lg:grid-cols-12 lg:items-center lg:gap-10"
            >
              <div className="lg:col-span-4">
                <p className="title text-[1.7rem] text-graphite sm:text-[2rem] md:text-[2.5rem]">{c.name}</p>
                <p className="mt-1 text-base text-steel">{c.district}</p>
              </div>
              <p className="text-base text-ink/75 lg:col-span-3">{c.note}</p>
              <ul className="flex flex-wrap gap-2 lg:col-span-5 lg:justify-end">
                {LOCAL_PAGES.map((slug) => (
                  <li key={slug}>
                    <Link
                      href={`/${slug}#${c.anchor}`}
                      className="inline-flex rounded-full bg-white px-3.5 py-1.5 text-sm font-medium text-graphite shadow-[0_4px_14px_-8px_rgb(30_30_30/0.35)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-soft"
                    >
                      {LOCAL_SEO[slug]?.label} {c.inName}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- Instagram: блог Ильгама ---------- */

export function Instagram() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className={`${WRAP} grid items-end gap-10 lg:grid-cols-12`}>
        <div data-reveal className="lg:col-span-8">
          <Kicker>Блог в Instagram*</Kicker>
          <a
            href={SITE.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="display mt-4 block break-all text-[11vw] text-graphite transition-colors duration-300 hover:text-ink sm:text-[clamp(3rem,7vw,6.4rem)]"
          >
            {SITE.instagramHandle}
          </a>
          <p className="mt-6 max-w-xl text-lg text-ink/75">
            Активно веду блог: показываю отгрузки, склад, новые поступления и объекты. Подписывайтесь, чтобы видеть,
            как идёт работа.
          </p>
        </div>
        <div data-reveal style={delay(120)} className="lg:col-span-4 lg:justify-self-end">
          <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" className={BTN.light}>
            <InstagramIcon className="size-5" />
            Подписаться
          </a>
        </div>
      </div>
    </section>
  );
}

/* ---------- 3. Почему ко мне: тёмная полоса, крупная типографика без иконок ---------- */

const FACTS = [
  { title: "Лучшие предложения на рынке!", text: "Работаю в регионе только с проверенными поставщиками!" },
  {
    title: "Свой склад",
    text: "Адрес: Башкортостан, Салаватский район, д. Чулпан, ул. Коммунаров, 19/4. Также есть склад-филиал в Дуванском районе: Месягутово, ул. Промышленная, 14.",
  },
  { title: "Доставка по северо-востоку РБ", text: "Салаватский район и соседние районы республики." },
  { title: "Можно приехать и посмотреть", text: "Каждый день с 9:00 до 18:00. Позвоните, что едете." },
];

export function WhyMe() {
  return (
    <section className="bg-graphite py-24 text-white md:py-36">
      <div className={`${WRAP} grid gap-14 lg:grid-cols-12`}>
        <h2 data-reveal className="display text-[clamp(3rem,7vw,5.8rem)] lg:col-span-4">
          Почему ко&nbsp;мне
        </h2>
        <ol className="grid gap-x-14 gap-y-12 sm:grid-cols-2 lg:col-span-8">
          {FACTS.map((f, i) => (
            <li key={f.title} data-reveal style={delay(i * 90)} className="border-t border-white/15 pt-6">
              <p className="text-sm text-white/45">{String(i + 1).padStart(2, "0")}</p>
              <p className="title mt-4 text-[1.75rem] md:text-[2.1rem]">{f.title}</p>
              <p className="mt-3 text-lg text-white/65">{f.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- 4. Об Ильгаме ---------- */

export function About() {
  return (
    <section id="ob-ilgame" className="scroll-mt-20 py-24 md:py-36">
      <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-12 lg:gap-16`}>
        <div data-reveal className="lg:col-span-5">
          <ParallaxImage
            src={ilgam}
            alt="Ильгам Кильдияров"
            speed={0.1}
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="aspect-[4/5] rounded-2xl shadow-soft"
            imgClassName="object-cover object-top"
          />
        </div>
        <div data-reveal style={delay(120)} className="lg:col-span-6 lg:col-start-7">
          <Kicker>Об Ильгаме</Kicker>
          <p className="title mt-5 text-[2.1rem] text-graphite md:text-[3.2rem]">
            На звонки отвечаю сам. Если что-то не так, разбираюсь в тот же день.
          </p>
          <div className="mt-8 space-y-4 text-lg leading-relaxed text-ink/85">
            <p>Меня зовут Ильгам Кильдияров. Я местный и вожу стройматериалы и колёса по нашему району по лучшим ценам.</p>
            <p>Не обещаю того, чего не могу. Если товара нет или не успеваю привезти, скажу сразу, как есть.</p>
            <p>Мне важно, чтобы вы пришли ко мне ещё раз и посоветовали меня соседу.</p>
          </div>
          <Link href="/pravila" className={`${BTN.light} mt-9`}>
            Мои правила работы <ArrowIcon className="size-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- 5. Как заказать: три шага на песочной полосе ---------- */

const STEPS = [
  { title: "Звоните или пишите", text: "По телефону, в WhatsApp или Telegram. Скажите, что нужно и куда." },
  { title: "Уточняем объём и цену", text: "Считаю по вашему списку и сразу называю цену с доставкой." },
  { title: "Доставка или самовывоз", text: "Привожу на объект или забираете со склада сами." },
];

export function HowToOrder() {
  return (
    <section id="kak-zakazat" className="scroll-mt-20 bg-sand py-24 md:py-32">
      <div className={WRAP}>
        <h2 data-reveal className="display text-[clamp(2.8rem,6.5vw,5.2rem)] text-graphite">
          Как заказать
        </h2>
        <ol className="mt-14 grid gap-12 md:mt-20 md:grid-cols-3 md:gap-10">
          {STEPS.map((s, i) => (
            <li key={s.title} data-reveal style={delay(i * 120)} className="relative">
              <span aria-hidden className="display block text-[7rem] text-graphite/12 md:text-[9rem]">
                {i + 1}
              </span>
              <p className="title -mt-6 text-[1.7rem] text-graphite md:-mt-8 md:text-3xl">{s.title}</p>
              <p className="mt-3 max-w-xs text-lg text-ink/75">{s.text}</p>
            </li>
          ))}
        </ol>
        <ContactButtons className="mt-16" />
      </div>
    </section>
  );
}

/* ---------- 6. Отзыв: одно настоящее видео ---------- */

export function Reviews() {
  return (
    <section id="otzyvy" className="scroll-mt-20 py-24 md:py-36">
      <div className={`${WRAP} grid items-center gap-12 lg:grid-cols-12`}>
        <div data-reveal className="lg:col-span-6">
          <h2 className="display text-[clamp(2.8rem,6.5vw,5.2rem)] text-graphite">Отзыв</h2>
          <p className="mt-6 max-w-md text-lg text-ink/75">
            Видеоотзыв клиента, как есть: без постановки и без правок.
          </p>
          <ContactButtons className="mt-10" />
        </div>
        <div data-reveal style={delay(120)} className="lg:col-span-5 lg:col-start-8">
          <div className="mx-auto max-w-[360px] overflow-hidden rounded-2xl bg-ink shadow-lift">
            {/* Видео не запускается само: только по нажатию */}
            <video
              controls
              playsInline
              preload="none"
              poster="/img/otziv-poster.jpg"
              className="aspect-[9/16] w-full object-cover"
            >
              <source src="/video/otziv.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- 7. Частые вопросы ---------- */

export const FAQ = [
  {
    q: "Куда возите и сколько стоит доставка?",
    a: "Вожу по Салаватскому району и всему северо-востоку Башкортостана. Цена зависит от расстояния и объёма, называю её сразу, вместе с ценой товара. Арматуру в небольшом количестве могу привезти легковым прицепом.",
  },
  {
    q: "Как можно оплатить?",
    a: "Способ оплаты и график платежей обговариваем индивидуально: подойдёт практически любой удобный вам вариант.",
  },
  {
    q: "Какой минимальный заказ?",
    a: "Цемент продаём от 1 тонны. Объём от фуры считается оптом, оптовую цену обговариваем индивидуально. По остальным позициям минимального объёма нет: берите столько, сколько нужно, подход к каждому индивидуальный.",
  },
  {
    q: "Работаете с юрлицами?",
    a: "Да, работаю с юридическими лицами. Есть ЭДО. Оплата только с НДС.",
  },
  {
    q: "Можно приехать и посмотреть товар?",
    a: "Да. Склад открыт каждый день с 9:00 до 18:00. Позвоните перед выездом, чтобы я был на месте.",
  },
  {
    q: "Почему на сайте цены «от»?",
    a: "Цена зависит от объёма, марки и доставки. Скиньте список, посчитаю точно и назову итог без доплат на месте.",
  },
];

export function Faq() {
  return (
    <section id="voprosy" className="scroll-mt-20 bg-white py-24 md:py-32">
      <div className={`${WRAP} grid gap-12 lg:grid-cols-12`}>
        <div className="lg:col-span-4">
          <div data-reveal className="lg:sticky lg:top-28">
            <h2 className="display text-[clamp(2.6rem,5.5vw,4.4rem)] text-graphite">Частые вопросы</h2>
            <p className="mt-6 text-lg text-ink/75">Не нашли ответ? Спросите напрямую.</p>
            <div className="mt-6 flex flex-col gap-3">
              <CallButton />
              <MaxButton />
              <WhatsAppButton label="WhatsApp" />
            </div>
          </div>
        </div>
        <div className="border-t border-line lg:col-span-8">
          {FAQ.map((f) => (
            <details key={f.q} className="group border-b border-line">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 text-xl font-semibold text-graphite transition-colors duration-200 hover:text-ink md:text-[1.4rem]">
                {f.q}
                <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-paper text-steel transition-[transform,background-color,color] duration-300 group-open:rotate-45 group-hover:bg-graphite group-hover:text-white">
                  <PlusIcon className="size-5" />
                </span>
              </summary>
              <p className="max-w-2xl pb-7 text-lg leading-relaxed text-ink/80">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 8. Контакты: карта на всю ширину, данные поверх ---------- */

export function Contacts() {
  return (
    <section id="kontakty" className="relative flex scroll-mt-20 flex-col-reverse lg:block lg:min-h-[44rem]">
      <div className="h-[60svh] min-h-80 lg:absolute lg:inset-0 lg:h-auto">
        <iframe
          src={yandexMapSrc}
          title="Склад Ильгама Кильдиярова на Яндекс.Карте"
          loading="lazy"
          className="h-full w-full border-0"
        />
      </div>
      <div className={`${WRAP} relative py-14 lg:pointer-events-none lg:py-24`}>
        <div data-reveal className="lg:pointer-events-auto lg:max-w-md lg:rounded-2xl lg:bg-white lg:p-10 lg:shadow-lift">
          <h2 className="display text-[clamp(2.6rem,5vw,3.8rem)] text-graphite">Контакты</h2>
          <ul className="mt-8 space-y-5 text-lg">
            <li className="flex gap-3">
              <PhoneIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={telLink} className="font-semibold text-ink">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <MaxIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={SITE.max} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                MAX / {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-1 size-5 shrink-0 text-steel" />
              <span>
                <span className="block text-sm text-steel">Склад</span>
                <a href={mapLink(`Салаватский район, ${SITE.street}`)} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {SITE.address}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-1 size-5 shrink-0 text-steel" />
              <span>
                <span className="block text-sm text-steel">Склад-филиал</span>
                <a href={mapLink(SITE.branch)} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
                  {SITE.branch}
                </a>
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-1 size-5 shrink-0 text-steel" />
              <span>{SITE.hours}</span>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                WhatsApp / {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <TelegramIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                Telegram / {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
          <div className="mt-9 flex flex-col gap-3">
            <CallButton />
            <div className="grid grid-cols-2 gap-3">
              <a href={SITE.max} target="_blank" rel="noopener noreferrer" className={BTN.light}>
                <MaxIcon className="size-5" /> MAX
              </a>
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={BTN.light}>
                <WhatsAppIcon className="size-5" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
