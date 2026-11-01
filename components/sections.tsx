import Image from "next/image";
import Link from "next/link";
import ilgam from "@/public/img/ilgam.jpg";
import { categoriesByGroup, categoriesByHub, HUBS, type GroupName, type HubKey } from "@/lib/catalog";
import { SITE, telLink, yandexMapSrc } from "@/lib/site";
import {
  ArrowIcon,
  CalendarIcon,
  CategoryIcon,
  ClockIcon,
  EyeIcon,
  PhoneIcon,
  PinIcon,
  TelegramIcon,
  TruckIcon,
  WarehouseIcon,
  WhatsAppIcon,
} from "./Icons";
import { CallButton, CategoryCard, Section, WhatsAppButton } from "./ui";

/* ---------- Два хаба: СТРОЙКА и АВТО ---------- */

export function HubBlocks() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {(["stroyka", "avto"] as HubKey[]).map((key) => {
        const hub = HUBS[key];
        const cats = categoriesByHub(key);
        return (
          <div key={key} className="flex flex-col rounded-lg border border-line border-t-4 border-t-graphite bg-white p-5 md:p-7">
            <Link href={`/${key}`} className="group">
              <p className="text-sm font-medium text-steel">{SITE.name} |</p>
              <h2 className="mt-1 flex items-center gap-3 text-3xl font-extrabold tracking-wide text-graphite md:text-4xl">
                {hub.label}
                <ArrowIcon className="size-7 text-steel group-hover:text-graphite" />
              </h2>
            </Link>
            <p className="mt-2 text-base text-ink/80">{hub.text}</p>
            <ul className="mt-5 flex flex-wrap gap-2">
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-md border border-line bg-paper px-3 py-2 text-base font-medium text-graphite hover:border-steel"
                  >
                    <CategoryIcon icon={c.icon} className="size-5 text-steel" />
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Направления по группам ---------- */

export function GroupGrid({ group }: { group: GroupName }) {
  return (
    <div className="mt-10 first:mt-0">
      <h3 className="border-b border-line pb-3 text-xl font-bold text-graphite">{group}</h3>
      <div className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {categoriesByGroup(group).map((c) => (
          <CategoryCard key={c.slug} category={c} />
        ))}
      </div>
    </div>
  );
}

export function Directions() {
  return (
    <Section id="napravleniya" title="Направления" lead="Стройка и авто — отдельно. Выберите, что нужно.">
      <GroupGrid group="Стройматериалы" />
      <GroupGrid group="Окна и двери" />
      <GroupGrid group="Колёса и диски" />
    </Section>
  );
}

/* ---------- Почему ко мне ---------- */

const FACTS = [
  { icon: CalendarIcon, title: "[15] лет на рынке", text: "Работаю в регионе с [____] года." },
  { icon: WarehouseIcon, title: "Свой склад", text: "[Населённый пункт, адрес склада]. Товар лежит под крышей." },
  { icon: TruckIcon, title: "Доставка по северо-востоку РБ", text: "Салаватский район и соседние районы республики." },
  { icon: EyeIcon, title: "Можно приехать и посмотреть", text: "Каждый день с 9:00 до 18:00. Позвоните, что едете." },
];

export function WhyMe() {
  return (
    <Section title="Почему ко мне" className="bg-white">
      <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {FACTS.map(({ icon: Icon, title, text }) => (
          <li key={title} className="border-l-2 border-steel/40 pl-5">
            <Icon className="size-8 text-steel" />
            <p className="mt-3 text-lg font-bold text-graphite">{title}</p>
            <p className="mt-1 text-base text-ink/80">{text}</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Об Ильгаме ---------- */

export function About() {
  return (
    <Section id="ob-ilgame" title="Об Ильгаме">
      <div className="grid items-start gap-8 md:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="relative aspect-[6/7] overflow-hidden rounded-lg bg-line">
          <Image
            src={ilgam}
            alt="Ильгам Кильдияров"
            fill
            placeholder="blur"
            sizes="(min-width: 768px) 40vw, 100vw"
            className="object-cover object-top"
          />
        </div>
        <div>
          <div className="space-y-4 text-lg leading-relaxed text-ink">
            <p>
              Меня зовут Ильгам Кильдияров. Я местный и много лет вожу стройматериалы и колёса по нашему району.
            </p>
            <p>
              На звонки отвечаю сам. Если что-то пошло не так — звоните мне напрямую, разберёмся в тот же день.
            </p>
            <p>
              Не обещаю того, чего не могу. Если товара нет или не успеваю привезти — скажу сразу, как есть.
            </p>
            <p>Мне важно, чтобы вы пришли ко мне ещё раз и посоветовали меня соседу.</p>
          </div>
          <p className="mt-4 text-sm text-steel">[Текст-пример. Заменить на слова Ильгама.]</p>
          <Link
            href="/pravila"
            className="mt-6 inline-flex items-center gap-2 font-semibold text-graphite underline-offset-4 hover:underline"
          >
            Мои правила работы <ArrowIcon className="size-4" />
          </Link>
        </div>
      </div>
    </Section>
  );
}

/* ---------- Как заказать ---------- */

const STEPS = [
  { title: "Звоните или пишите", text: "По телефону, в WhatsApp или Telegram. Скажите, что нужно и куда." },
  { title: "Уточняем объём и цену", text: "Считаю по вашему списку и сразу называю цену с доставкой." },
  { title: "Доставка или самовывоз", text: "Привожу на объект или забираете со склада сами." },
];

export function HowToOrder({ className = "bg-white" }: { className?: string }) {
  return (
    <Section id="kak-zakazat" title="Как заказать" className={className}>
      <ol className="grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <li key={s.title} className="flex gap-4">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-graphite text-lg font-bold text-white">
              {i + 1}
            </span>
            <div>
              <p className="text-lg font-bold text-graphite">{s.title}</p>
              <p className="mt-1 text-base text-ink/80">{s.text}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------- Отзывы (макеты скриншотов WhatsApp) ---------- */

const REVIEWS = [
  { who: "[Имя], прораб", place: "[населённый пункт]", text: "Ильгам, арматуру приняли, всё ровно. Завтра ещё 10 тонн надо" },
  { who: "[Имя]", place: "[населённый пункт]", text: "Цемент привезли к восьми, как договаривались. Мешки сухие, спасибо" },
  { who: "[Имя], частный дом", place: "[населённый пункт]", text: "Профнастил по размерам подошёл, ничего подрезать не пришлось" },
  { who: "[Имя], фермер", place: "[населённый пункт]", text: "Диски на погрузчик встали ровно, без биения. Следующие тоже у вас возьму" },
  { who: "[Имя]", place: "[населённый пункт]", text: "Окна поставили, откосы аккуратные. Соседу ваш номер дал" },
];

export function Reviews() {
  return (
    <Section
      id="otzyvy"
      title="Отзывы"
      lead="[Здесь будут скриншоты настоящих переписок с клиентами. Ниже — примеры, как это будет выглядеть.]"
    >
      <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {REVIEWS.map((r) => (
          <li key={r.text} className="overflow-hidden rounded-lg border border-line bg-white">
            <div className="flex items-center gap-3 bg-graphite px-4 py-3 text-white">
              <span className="flex size-9 items-center justify-center rounded-full bg-white/15 text-sm">
                <WhatsAppIcon className="size-4" />
              </span>
              <span>
                <span className="block text-sm font-semibold">{r.who}</span>
                <span className="block text-xs text-white/70">{r.place}</span>
              </span>
            </div>
            <div className="bg-chat p-4">
              <p className="max-w-[90%] rounded-lg rounded-tl-none bg-white px-3 py-2 text-base text-ink shadow-sm">
                {r.text}
                <span className="mt-1 block text-right text-xs text-steel">[дата]</span>
              </p>
            </div>
            <p className="px-4 py-2 text-xs text-steel">Пример отзыва — заменить на скриншот</p>
          </li>
        ))}
      </ul>
    </Section>
  );
}

/* ---------- Частые вопросы ---------- */

const FAQ = [
  {
    q: "Куда возите и сколько стоит доставка?",
    a: "Вожу по Салаватскому району и всему северо-востоку Башкортостана. Цена зависит от расстояния и объёма — называю её сразу, вместе с ценой товара. Арматуру в небольшом количестве могу привезти легковым прицепом.",
  },
  {
    q: "Как можно оплатить?",
    a: "[Наличными, переводом на карту, по счёту — уточнить.] Оплата при получении или по договорённости [уточнить].",
  },
  {
    q: "Какой минимальный заказ?",
    a: "Цемент — оптом от 1 тонны, от фуры считаю цену отдельно. По остальным товарам минимального заказа нет [уточнить] — звоните, даже если нужно немного.",
  },
  {
    q: "Работаете с юрлицами?",
    a: "[Да / нет — уточнить.] Выставляю счёт, закрывающие документы [уточнить: с НДС или без].",
  },
  {
    q: "Можно приехать и посмотреть товар?",
    a: "Да. Склад открыт каждый день с 9:00 до 18:00. Позвоните перед выездом, чтобы я был на месте.",
  },
  {
    q: "Почему на сайте цены «от»?",
    a: "Цена зависит от объёма, марки и доставки. Скиньте список — посчитаю точно и назову итог без доплат на месте.",
  },
];

export function Faq() {
  return (
    <Section id="voprosy" title="Частые вопросы" className="bg-white">
      <div className="divide-y divide-line rounded-lg border border-line bg-white">
        {FAQ.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-lg font-semibold text-graphite">
              {f.q}
              <span className="shrink-0 text-2xl leading-none text-steel group-open:rotate-45" aria-hidden>
                +
              </span>
            </summary>
            <p className="px-5 pb-5 text-base leading-relaxed text-ink/90">{f.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}

/* ---------- Контакты ---------- */

export function Contacts() {
  return (
    <Section id="kontakty" title="Контакты">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)]">
        <div className="rounded-lg border border-line bg-white p-6">
          <p className="text-xl font-bold text-graphite">{SITE.name}</p>
          <ul className="mt-5 space-y-4 text-lg">
            <li className="flex gap-3">
              <PhoneIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={telLink} className="font-semibold text-ink">{SITE.phoneDisplay}</a>
            </li>
            <li className="flex gap-3">
              <PinIcon className="mt-1 size-5 shrink-0 text-steel" />
              <span>
                {SITE.address}
                <span className="block text-base text-steel">{SITE.addressDetail}</span>
              </span>
            </li>
            <li className="flex gap-3">
              <ClockIcon className="mt-1 size-5 shrink-0 text-steel" />
              <span>{SITE.hours}</span>
            </li>
            <li className="flex gap-3">
              <WhatsAppIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                WhatsApp — {SITE.phoneDisplay}
              </a>
            </li>
            <li className="flex gap-3">
              <TelegramIcon className="mt-1 size-5 shrink-0 text-steel" />
              <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className="text-ink underline-offset-4 hover:underline">
                Telegram — {SITE.phoneDisplay}
              </a>
            </li>
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <CallButton />
            <WhatsAppButton />
          </div>
        </div>
        <div className="min-h-80 overflow-hidden rounded-lg border border-line bg-placeholder">
          <iframe
            src={yandexMapSrc}
            title="Склад Ильгама Кильдиярова на Яндекс.Карте"
            loading="lazy"
            className="h-full min-h-80 w-full"
          />
        </div>
      </div>
    </Section>
  );
}
