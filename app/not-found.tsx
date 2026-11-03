import Link from "next/link";
import SearchBox from "@/components/SearchBox";
import { BTN } from "@/components/ui";

export default function NotFound() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-5 py-24 sm:px-8 md:py-32">
      <h1>
        <span className="mb-4 block text-base font-medium text-steel">Ильгам Кильдияров</span>
        <span className="display block text-[clamp(3rem,9vw,6rem)] text-graphite">Такой страницы нет</span>
      </h1>
      <p className="mt-8 text-lg text-ink/80">Найдите товар через поиск или вернитесь на главную.</p>
      <SearchBox className="mt-8" />
      <Link href="/" className={`${BTN.light} mt-8`}>На главную</Link>
    </div>
  );
}
