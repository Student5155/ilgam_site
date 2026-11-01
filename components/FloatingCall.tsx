import { telLink } from "@/lib/site";
import { PhoneIcon } from "./Icons";

// Спокойная кнопка «Позвонить» на телефоне. Без анимации.
export default function FloatingCall() {
  return (
    <a
      href={telLink}
      className="fixed right-4 bottom-4 z-40 inline-flex h-14 items-center gap-2 rounded-full bg-terra px-5 font-semibold text-white shadow-lg shadow-black/20 md:hidden"
    >
      <PhoneIcon className="size-5" />
      Позвонить
    </a>
  );
}
