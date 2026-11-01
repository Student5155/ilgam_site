import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import type { Category, Status } from "@/lib/catalog";
import { SITE, telLink, waLink } from "@/lib/site";
import { ArrowIcon, CategoryIcon, PhoneIcon, TelegramIcon, WhatsAppIcon } from "./Icons";

const btn =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-md px-5 py-3 text-base font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terra";

export function CallButton({ className = "", label = "Позвонить" }: { className?: string; label?: string }) {
  return (
    <a href={telLink} className={`${btn} bg-terra text-white hover:bg-terra-dark ${className}`}>
      <PhoneIcon className="size-5" />
      {label}
    </a>
  );
}

export function WhatsAppButton({
  className = "",
  label = "Написать в WhatsApp",
  text,
}: {
  className?: string;
  label?: string;
  text?: string;
}) {
  return (
    <a
      href={waLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btn} border-2 border-terra bg-white text-terra hover:bg-terra hover:text-white ${className}`}
    >
      <WhatsAppIcon className="size-5" />
      {label}
    </a>
  );
}

export function TelegramButton({ className = "" }: { className?: string }) {
  return (
    <a
      href={SITE.telegram}
      target="_blank"
      rel="noopener noreferrer"
      className={`${btn} border-2 border-terra bg-white text-terra hover:bg-terra hover:text-white ${className}`}
    >
      <TelegramIcon className="size-5" />
      Написать в Telegram
    </a>
  );
}

export function EstimateLink({ className = "" }: { className?: string }) {
  return (
    <a href="#smeta" className={`${btn} bg-terra text-white hover:bg-terra-dark ${className}`}>
      Рассчитать смету
    </a>
  );
}

const statusStyles: Record<Status["kind"], string> = {
  stock: "bg-stock",
  order: "bg-steel",
  volume: "bg-graphite",
  ask: "border border-steel bg-transparent",
};

export function StatusBadge({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3 py-1 text-sm font-medium text-ink ${className}`}
    >
      <span className={`size-2.5 shrink-0 rounded-full ${statusStyles[status.kind]}`} aria-hidden />
      {status.label}
    </span>
  );
}

export function Section({
  id,
  title,
  lead,
  children,
  className = "",
}: {
  id?: string;
  title: string;
  lead?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`scroll-mt-20 py-12 md:py-16 ${className}`}>
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-2xl font-bold text-graphite md:text-3xl">{title}</h2>
        {lead && <p className="mt-3 max-w-2xl text-lg text-steel">{lead}</p>}
        <div className="mt-8">{children}</div>
      </div>
    </section>
  );
}

// Фото направления: настоящее фото, если есть, иначе нейтральная графика с подписью
export function CategoryVisual({
  category,
  priority = false,
  sizes = "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw",
}: {
  category: Category;
  priority?: boolean;
  sizes?: string;
}) {
  const photo = category.photos?.[0];
  if (photo) {
    return (
      <div className="relative aspect-[4/3] overflow-hidden bg-line">
        <Image
          src={photo.src}
          alt={photo.alt}
          fill
          sizes={sizes}
          placeholder="blur"
          preload={priority}
          className="object-cover"
        />
      </div>
    );
  }
  return (
    <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 bg-placeholder p-4 text-center">
      <CategoryIcon icon={category.icon} className="size-16 text-steel" />
      <span className="text-xs leading-snug text-steel">[Сюда — {category.photoNeeded}]</span>
    </div>
  );
}

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/${category.slug}`}
      className="group flex flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-steel"
    >
      <CategoryVisual category={category} />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <StatusBadge status={category.status} className="self-start text-xs" />
        <h4 className="text-xl font-bold text-graphite">{category.title}</h4>
        <p className="text-base text-ink/80">{category.short}</p>
        <span className="mt-auto inline-flex items-center gap-1 pt-2 font-semibold text-graphite group-hover:underline">
          Подробнее <ArrowIcon className="size-4" />
        </span>
      </div>
    </Link>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="rounded bg-placeholder px-1 text-steel">{children}</span>;
}
