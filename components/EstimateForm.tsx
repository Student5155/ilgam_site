"use client";

import { useState } from "react";
import { SITE, telLink, waLink } from "@/lib/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

// Вместо корзины: человек пишет список, а Ильгам отвечает итоговой ценой с доставкой.
// Ничего не сохраняем и никуда не отправляем сами — просто открываем WhatsApp с готовым текстом.
export default function EstimateForm({
  topic,
  placeholder,
}: {
  topic: string;
  placeholder: string;
}) {
  const [list, setList] = useState("");
  const [place, setPlace] = useState("");

  const message = [
    `Здравствуйте, ${SITE.firstName}! Посчитайте, пожалуйста, смету (${topic}).`,
    list.trim() && `Что нужно: ${list.trim()}`,
    place.trim() && `Куда везти: ${place.trim()}`,
  ]
    .filter(Boolean)
    .join("\n");

  return (
    <form
      className="rounded-lg border border-line bg-white p-5 md:p-8"
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <label className="block">
        <span className="font-semibold text-graphite">Что нужно и сколько</span>
        <textarea
          value={list}
          onChange={(e) => setList(e.target.value)}
          rows={4}
          placeholder={placeholder}
          className="mt-2 w-full rounded-md border border-line bg-paper p-3 text-lg text-ink placeholder:text-steel/80 focus:border-steel focus:outline-none"
        />
      </label>
      <label className="mt-4 block">
        <span className="font-semibold text-graphite">Куда везти</span>
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Населённый пункт или «заберу сам»"
          className="mt-2 w-full rounded-md border border-line bg-paper p-3 text-lg text-ink placeholder:text-steel/80 focus:border-steel focus:outline-none"
        />
      </label>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md bg-terra px-5 py-3 font-semibold text-white hover:bg-terra-dark"
        >
          <WhatsAppIcon className="size-5" />
          Отправить список в WhatsApp
        </button>
        <a
          href={telLink}
          className="inline-flex min-h-12 items-center justify-center gap-2 rounded-md border-2 border-terra px-5 py-3 font-semibold text-terra hover:bg-terra hover:text-white"
        >
          <PhoneIcon className="size-5" />
          Или позвонить
        </a>
      </div>
      <p className="mt-4 text-sm text-steel">
        Откроется WhatsApp с вашим списком. Я посчитаю и отвечу итоговой ценой с доставкой.
      </p>
    </form>
  );
}
