import Link from "next/link";
import { HUBS, type HubKey } from "@/lib/catalog";
import { SITE } from "@/lib/site";
import { GroupGrid, HowToOrder } from "./sections";
import { CallButton, WhatsAppButton } from "./ui";

export default function HubPage({ hub }: { hub: HubKey }) {
  const h = HUBS[hub];
  const other = HUBS[hub === "stroyka" ? "avto" : "stroyka"];
  return (
    <>
      <div className="mx-auto max-w-6xl px-4 pt-6 pb-12 md:pt-10">
        <nav aria-label="Навигация" className="text-sm text-steel">
          <Link href="/" className="hover:text-graphite">Главная</Link>
          <span className="mx-2">/</span>
          <span className="text-ink">{h.label}</span>
        </nav>
        <h1 className="mt-4 text-3xl font-extrabold text-graphite md:text-5xl">
          <span className="block text-base font-medium text-steel md:text-lg">{SITE.name} |</span>
          {h.label}
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-ink/85">{h.text}</p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <CallButton />
          <WhatsAppButton />
        </div>
        <div className="mt-12">
          {h.groups.map((g) => (
            <GroupGrid key={g} group={g} />
          ))}
        </div>
        <p className="mt-10 text-base text-steel">
          Нужно другое?{" "}
          <Link href={`/${other.key}`} className="font-semibold text-graphite underline underline-offset-4">
            Раздел {other.label}
          </Link>
        </p>
      </div>
      <HowToOrder />
    </>
  );
}
