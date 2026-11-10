import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Category, Status } from "@/lib/catalog";
import { SITE, telLink, waLink } from "@/lib/site";
import { ArrowIcon, MaxIcon, PhoneIcon, TelegramIcon, WhatsAppIcon } from "./Icons";

// Общий контейнер: широкий, с небольшими полями, контент держится в середине
export const WRAP = "mx-auto w-full max-w-[1360px] px-5 sm:px-8 lg:px-12";

/* ---------- Кнопки: без контура, мягкая тень ---------- */

const btn =
  "inline-flex min-h-13 items-center justify-center gap-2.5 rounded-xl px-6 py-3.5 text-base font-semibold transition-[transform,box-shadow,background-color,color] duration-300 ease-out hover:-translate-y-0.5 active:translate-y-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra";

export const BTN = {
  primary: `${btn} bg-terra text-white shadow-terra hover:bg-terra-dark`,
  light: `${btn} bg-white text-graphite shadow-soft hover:shadow-lift`,
  dark: `${btn} bg-white/10 text-white shadow-[0_14px_34px_-14px_rgb(0_0_0/0.6)] hover:bg-white/16`,
};

type Tone = "light" | "dark";

// Кнопка мессенджера MAX
export function MaxButton({
  className = "",
  label = "Написать в MAX",
  tone = "light",
}: {
  className?: string;
  label?: string;
  tone?: Tone | "primary";
}) {
  return (
    <a href={SITE.max} target="_blank" rel="noopener noreferrer" className={`${BTN[tone]} ${className}`}>
      <MaxIcon className="size-5" />
      {label}
    </a>
  );
}

export function CallButton({
  className = "",
  label = "Позвонить",
  tone = "primary",
}: {
  className?: string;
  label?: string;
  tone?: Tone | "primary";
}) {
  return (
    <a href={telLink} className={`${BTN[tone]} ${className}`}>
      <PhoneIcon className="size-5" />
      {label}
    </a>
  );
}

export function WhatsAppButton({
  className = "",
  label = "Написать в WhatsApp",
  text,
  tone = "light",
}: {
  className?: string;
  label?: string;
  text?: string;
  tone?: Tone;
}) {
  return (
    <a href={waLink(text)} target="_blank" rel="noopener noreferrer" className={`${BTN[tone]} ${className}`}>
      <WhatsAppIcon className="size-5" />
      {label}
    </a>
  );
}

// Набор кнопок связи: сначала позвонить, вторая MAX, третья WhatsApp
export function ContactButtons({
  tone = "light",
  className = "",
  waText,
}: {
  tone?: Tone;
  className?: string;
  waText?: string;
}) {
  return (
    <div className={`flex flex-col gap-3 sm:flex-row sm:flex-wrap ${className}`}>
      <CallButton />
      <MaxButton tone={tone} />
      <WhatsAppButton tone={tone} label="WhatsApp" text={waText} />
    </div>
  );
}

export function TelegramButton({ className = "", tone = "light" }: { className?: string; tone?: Tone }) {
  return (
    <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className={`${BTN[tone]} ${className}`}>
      <TelegramIcon className="size-5" />
      Telegram
    </a>
  );
}

export function EstimateLink({ className = "", tone = "light" }: { className?: string; tone?: Tone }) {
  return (
    <a href="#smeta" className={`${BTN[tone]} ${className}`}>
      Рассчитать смету
    </a>
  );
}

/* ---------- Плашка наличия ---------- */

const dot: Record<Status["kind"], string> = {
  stock: "bg-stock",
  order: "bg-steel",
  volume: "bg-graphite",
  ask: "bg-steel/40",
};

export function StatusBadge({
  status,
  className = "",
  tone = "light",
}: {
  status: Status;
  className?: string;
  tone?: Tone;
}) {
  const look = tone === "dark" ? "bg-white/10 text-white" : "bg-white text-ink shadow-[0_4px_14px_-8px_rgb(30_30_30/0.35)]";
  return (
    <span className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm font-medium ${look} ${className}`}>
      <span className={`size-2 shrink-0 rounded-full ${tone === "dark" && status.kind === "volume" ? "bg-white" : dot[status.kind]}`} aria-hidden />
      {status.label}
    </span>
  );
}

/* ---------- Подпись над заголовком ---------- */

export function Kicker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <p className={`text-sm font-medium tracking-wide text-steel ${className}`}>{children}</p>;
}

/* ---------- Картинки ---------- */

// Фото с лёгким параллаксом. Контейнер задаёт размер, картинка внутри едет медленнее страницы.
export function ParallaxImage({
  src,
  alt,
  speed = 0.08,
  sizes,
  preload = false,
  className = "",
  imgClassName = "object-cover",
}: {
  src: StaticImageData;
  alt: string;
  speed?: number;
  sizes: string;
  preload?: boolean;
  className?: string;
  imgClassName?: string;
}) {
  return (
    <div className={`relative overflow-hidden bg-sand ${className}`}>
      <div className="absolute inset-0" data-parallax={speed}>
        <Image src={src} alt={alt} fill placeholder="blur" preload={preload} sizes={sizes} className={imgClassName} />
      </div>
    </div>
  );
}

// Вместо стоковых фото: крупная типографика с подписью, какое фото сюда нужно
export function TypeTile({
  category,
  tone = "light",
  className = "",
  showNote = true,
}: {
  category: Category;
  tone?: Tone;
  className?: string;
  showNote?: boolean;
}) {
  const dark = tone === "dark";
  return (
    <div className={`relative overflow-hidden ${dark ? "bg-graphite-2" : "bg-sand"} ${className}`}>
      <span
        aria-hidden
        className={`display absolute -bottom-[0.12em] -left-[0.04em] text-[clamp(4.5rem,12vw,11rem)] whitespace-nowrap ${
          dark ? "text-white/[0.07]" : "text-graphite/[0.08]"
        }`}
      >
        {category.title}
      </span>
      {showNote && category.photoNeeded && (
        <span className={`absolute top-4 left-4 right-4 text-xs leading-snug ${dark ? "text-white/50" : "text-steel"}`}>
          [Сюда: {category.photoNeeded}]
        </span>
      )}
    </div>
  );
}

export function CategoryVisual({
  category,
  sizes,
  className = "",
  tone = "light",
  preload = false,
  speed = 0.06,
}: {
  category: Category;
  sizes: string;
  className?: string;
  tone?: Tone;
  preload?: boolean;
  speed?: number;
}) {
  const photo = category.photos?.[0];
  if (photo?.fit === "contain") {
    return (
      <div className={`relative overflow-hidden ${tone === "dark" ? "bg-ink" : "bg-sand"} ${className}`}>
        <Image src={photo.src} alt={photo.alt} fill placeholder="blur" preload={preload} sizes={sizes} className="object-contain p-4 md:p-8" />
      </div>
    );
  }
  if (photo) {
    return <ParallaxImage src={photo.src} alt={photo.alt} sizes={sizes} preload={preload} speed={speed} className={className} />;
  }
  return <TypeTile category={category} tone={tone} className={className} />;
}

/* ---------- Ссылка-плитка на направление ---------- */

export function RelatedTile({ category }: { category: Category }) {
  return (
    <Link href={`/${category.slug}`} className="group block">
      <div className="overflow-hidden rounded-2xl shadow-soft transition-shadow duration-300 group-hover:shadow-lift">
        {category.photos?.[0] ? (
          <div className="relative aspect-[4/3]">
            <Image
              src={category.photos[0].src}
              alt={category.photos[0].alt}
              fill
              placeholder="blur"
              sizes="(min-width: 1024px) 30vw, (min-width: 640px) 50vw, 100vw"
              className={`${category.photos[0].fit === "contain" ? "bg-ink object-contain p-3" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
            />
          </div>
        ) : (
          <TypeTile category={category} className="aspect-[4/3]" showNote={false} />
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="title text-2xl text-graphite">{category.title}</p>
          <p className="mt-2 text-base text-ink/75">{category.short}</p>
        </div>
        <ArrowIcon className="mt-1 size-6 shrink-0 text-steel transition-transform duration-300 group-hover:translate-x-1 group-hover:text-graphite" />
      </div>
    </Link>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="rounded bg-sand px-1 text-steel">{children}</span>;
}
