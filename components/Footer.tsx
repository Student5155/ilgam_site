import Link from "next/link";
import { CATEGORIES } from "@/lib/catalog";
import { SITE, telLink } from "@/lib/site";
import { WRAP } from "./ui";

// Год считается при сборке и кэшируется
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

const link = "transition-colors duration-200 hover:text-white";

export default function Footer() {
  return (
    <footer className="mt-auto overflow-hidden bg-graphite pb-24 text-white/70 md:pb-0">
      <div className={`${WRAP} grid gap-12 pt-20 pb-14 md:grid-cols-12`}>
        <div className="md:col-span-5">
          <a href={telLink} className="title text-3xl text-white transition-colors hover:text-white/80 md:text-4xl">
            {SITE.phoneDisplay}
          </a>
          <p className="mt-5 text-base">{SITE.address}</p>
          <p className="text-base">{SITE.hours}</p>
          <div className="mt-5 flex gap-5 text-base">
            <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={link}>WhatsApp</a>
            <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className={link}>Telegram</a>
          </div>
        </div>
        {(["stroyka", "avto"] as const).map((hub) => (
          <div key={hub} className="md:col-span-2">
            <Link href={`/${hub}`} className="font-semibold text-white">
              {hub === "stroyka" ? "Стройка" : "Авто"}
            </Link>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CATEGORIES.filter((c) => c.hub === hub).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className={link}>{c.title}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="md:col-span-3">
          <p className="font-semibold text-white">Ещё</p>
          <ul className="mt-4 space-y-2.5 text-sm">
            <li><Link href="/pravila" className={link}>Мои правила работы</Link></li>
            <li><Link href="/poisk" className={link}>Поиск по товарам</Link></li>
            <li><Link href="/#kontakty" className={link}>Контакты и карта</Link></li>
          </ul>
        </div>
      </div>

      {/* Подпись во всю ширину */}
      <div className={WRAP} aria-hidden>
        <p className="display -mb-[0.14em] text-[13.5vw] leading-none whitespace-nowrap text-white/[0.06] xl:text-[11.4rem]">
          {SITE.name}
        </p>
      </div>

      <div className="border-t border-white/10">
        <div className={`${WRAP} flex flex-col gap-1 py-6 text-sm sm:flex-row sm:justify-between`}>
          <span>© <Year /> {SITE.name}</span>
          <span>Частный предприниматель / ИНН [___________]</span>
        </div>
      </div>
    </footer>
  );
}
