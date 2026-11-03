import Form from "next/form";
import { SearchIcon } from "./Icons";

// Обычная форма: отправляет на /poisk?q=... (работает и без JavaScript)
export default function SearchBox({ defaultValue = "", className = "" }: { defaultValue?: string; className?: string }) {
  return (
    <Form action="/poisk" role="search" className={`flex w-full gap-2 ${className}`}>
      <label className="relative flex-1">
        <span className="sr-only">Что ищете?</span>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-steel" />
        <input
          name="q"
          type="search"
          defaultValue={defaultValue}
          placeholder="Цемент, арматура 12, шины R16"
          className="h-13 w-full rounded-xl bg-white pr-3 pl-12 text-lg text-ink shadow-soft placeholder:text-steel/80 focus:shadow-lift focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="h-13 shrink-0 rounded-xl bg-graphite px-6 font-semibold text-white shadow-soft transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-lift"
      >
        Найти
      </button>
    </Form>
  );
}
