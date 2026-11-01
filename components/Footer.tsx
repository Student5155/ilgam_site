import Link from "next/link";
import { CATEGORIES, HUBS } from "@/lib/catalog";
import { SITE, telLink } from "@/lib/site";
import { PhoneIcon } from "./Icons";
import { Logo } from "./Header";

// Год считается при сборке и кэшируется
async function Year() {
  "use cache";
  return <>{new Date().getFullYear()}</>;
}

export default function Footer() {
  return (
    <footer className="mt-auto bg-graphite pb-24 text-white/80 md:pb-0">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo className="text-xl" />
          <p className="mt-3 text-sm">Стройматериалы, окна и колёса на северо-востоке Башкортостана.</p>
          <a href={telLink} className="mt-4 inline-flex items-center gap-2 text-lg font-semibold text-white">
            <PhoneIcon className="size-5" /> {SITE.phoneDisplay}
          </a>
          <p className="mt-2 text-sm">{SITE.address}</p>
          <p className="text-sm">{SITE.hours}</p>
        </div>
        {(["stroyka", "avto"] as const).map((hub) => (
          <div key={hub}>
            <Link href={`/${hub}`} className="font-semibold text-white">
              {HUBS[hub].label === "СТРОЙКА" ? "Стройка" : "Авто"}
            </Link>
            <ul className="mt-3 space-y-2 text-sm">
              {CATEGORIES.filter((c) => c.hub === hub).map((c) => (
                <li key={c.slug}>
                  <Link href={`/${c.slug}`} className="hover:text-white">
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="font-semibold text-white">Ещё</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/pravila" className="hover:text-white">Мои правила работы</Link></li>
            <li><Link href="/poisk" className="hover:text-white">Поиск по товарам</Link></li>
            <li><Link href="/#kontakty" className="hover:text-white">Контакты и карта</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-5 text-sm">
          © <Year /> {SITE.name}. Частный предприниматель, ИНН [___________].
        </div>
      </div>
    </footer>
  );
}
