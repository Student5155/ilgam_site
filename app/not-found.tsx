import Link from "next/link";
import SearchBox from "@/components/SearchBox";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-16">
      <h1 className="text-3xl font-extrabold text-graphite">Такой страницы нет</h1>
      <p className="mt-3 text-lg text-ink/85">Попробуйте найти товар через поиск или вернитесь на главную.</p>
      <SearchBox className="mt-6" />
      <Link href="/" className="mt-6 inline-block font-semibold text-graphite underline underline-offset-4">
        На главную — Ильгам Кильдияров
      </Link>
    </div>
  );
}
