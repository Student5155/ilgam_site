import Form from "next/form";
import { SearchIcon } from "./Icons";

// Обычная форма: отправляет на /poisk?q=... (работает и без JavaScript)
export default function SearchBox({
  defaultValue = "",
  autoFocus = false,
  className = "",
}: {
  defaultValue?: string;
  autoFocus?: boolean;
  className?: string;
}) {
  return (
    <Form action="/poisk" role="search" className={`flex w-full gap-2 ${className}`}>
      <label className="relative flex-1">
        <span className="sr-only">Что ищете?</span>
        <SearchIcon className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-steel" />
        <input
          name="q"
          type="search"
          defaultValue={defaultValue}
          autoFocus={autoFocus}
          placeholder="Цемент, арматура 12, шины R16…"
          className="h-12 w-full rounded-md border border-line bg-white pr-3 pl-10 text-lg text-ink placeholder:text-steel/80 focus:border-steel focus:outline-none"
        />
      </label>
      <button
        type="submit"
        className="h-12 shrink-0 rounded-md bg-graphite px-5 font-semibold text-white hover:bg-ink"
      >
        Найти
      </button>
    </Form>
  );
}
