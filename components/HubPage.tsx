import Link from "next/link";
import { HUBS, type HubKey } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { ArrowIcon } from "./Icons";
import { DirectionIndex, HowToOrder } from "./sections";
import { CallButton, WhatsAppButton, WRAP } from "./ui";

export default function HubPage({ hub }: { hub: HubKey }) {
  const h = HUBS[hub];
  const other = HUBS[hub === "stroyka" ? "avto" : "stroyka"];
  const dark = hub === "avto";
  return (
    <>
      {/* Сцена: гигантское слово раздела */}
      <section className={`${dark ? "bg-graphite-2 text-white" : "bg-sand text-graphite"} overflow-hidden`}>
        <div className={`${WRAP} pt-10 pb-20 md:pt-14 md:pb-28`}>
          <nav aria-label="Навигация" className={`flex gap-2 text-sm ${dark ? "text-white/55" : "text-steel"}`}>
            <Link href="/" className="hover:underline">Главная</Link>
            <span aria-hidden>/</span>
            <span>{h.label}</span>
          </nav>
          <h1 className="mt-14 md:mt-20">
            <span className={`mb-4 block text-base font-medium ${dark ? "text-white/60" : "text-steel"}`}>{SITE.name} |</span>
            <span className="display block text-[clamp(4rem,17vw,15rem)] leading-[0.8]">{h.label}</span>
          </h1>
          <div className="mt-12 grid gap-8 lg:grid-cols-12 lg:items-end">
            <p className={`text-xl lg:col-span-6 ${dark ? "text-white/75" : "text-ink/80"}`}>{h.text}</p>
            <div className="flex flex-col gap-3 sm:flex-row lg:col-span-6 lg:justify-end">
              <CallButton />
              <WhatsAppButton tone={dark ? "dark" : "light"} />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <div className={WRAP}>
          <DirectionIndex groups={h.groups} />
          <Link
            href={`/${other.key}`}
            className="group mt-24 flex items-end justify-between gap-6 border-t border-line pt-10"
          >
            <span>
              <span className="block text-base text-steel">Нужно другое? Раздел</span>
              <span className="display mt-2 block text-[clamp(3rem,9vw,6rem)] text-graphite">{other.label}</span>
            </span>
            <ArrowIcon className="mb-4 size-10 shrink-0 text-steel transition-transform duration-300 group-hover:translate-x-2 group-hover:text-graphite" />
          </Link>
        </div>
      </section>

      <HowToOrder />
    </>
  );
}
