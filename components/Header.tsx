import Link from "next/link";
import { SITE, telLink } from "@/lib/site";
import { PhoneIcon, SearchIcon, TelegramIcon, WhatsAppIcon } from "./Icons";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`text-lg font-extrabold leading-none tracking-tight md:text-xl ${className}`}>
      <span className="text-terra">{SITE.firstName}</span> <span className="text-white">{SITE.lastName}</span>
    </Link>
  );
}

const iconBtn =
  "inline-flex size-10 items-center justify-center rounded-md text-white/90 hover:bg-white/10 hover:text-white";

export default function Header() {
  return (
    <header className="sticky top-0 z-40 bg-graphite text-white">
      <div className="mx-auto flex h-14 max-w-6xl items-center gap-2 px-4 md:h-16">
        <Logo />
        <nav className="ml-8 hidden items-center gap-6 text-sm font-medium text-white/80 lg:flex" aria-label="Разделы">
          <Link href="/stroyka" className="hover:text-white">Стройка</Link>
          <Link href="/avto" className="hover:text-white">Авто</Link>
          <Link href="/pravila" className="hover:text-white">Мои правила</Link>
          <Link href="/#kontakty" className="hover:text-white">Контакты</Link>
        </nav>
        <div className="ml-auto flex items-center gap-1">
          <Link href="/poisk" className={iconBtn} aria-label="Поиск по товарам">
            <SearchIcon className="size-5" />
          </Link>
          <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="Написать в WhatsApp">
            <WhatsAppIcon className="size-5" />
          </a>
          <a href={SITE.telegram} target="_blank" rel="noopener noreferrer" className={iconBtn} aria-label="Написать в Telegram">
            <TelegramIcon className="size-5" />
          </a>
          <a
            href={telLink}
            className="ml-1 inline-flex h-10 items-center gap-2 rounded-md px-2 font-semibold text-white hover:bg-white/10 sm:px-3"
            aria-label={`Позвонить ${SITE.phoneDisplay}`}
          >
            <PhoneIcon className="size-5" />
            <span className="hidden sm:inline">{SITE.phoneDisplay}</span>
          </a>
        </div>
      </div>
    </header>
  );
}
