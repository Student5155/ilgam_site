"use client";

import { useState } from "react";
import { SITE, telLink, waLink } from "@/lib/site";
import { MaxIcon, PhoneIcon, WhatsAppIcon } from "./Icons";
import { BTN } from "./ui";

// Вместо корзины: человек пишет список, а Ильгам отвечает итоговой ценой с доставкой.
// Ничего не сохраняем и никуда не отправляем сами: просто открываем WhatsApp с готовым текстом.

const field =
  "mt-2 w-full rounded-xl bg-paper p-4 text-lg text-ink shadow-[inset_0_1px_3px_rgb(30_30_30/0.08)] placeholder:text-steel/80 transition-shadow duration-200 focus:shadow-[inset_0_1px_3px_rgb(30_30_30/0.08),0_0_0_2px_var(--color-steel)] focus:outline-none";

export default function EstimateForm({ topic, placeholder }: { topic: string; placeholder: string }) {
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
      onSubmit={(e) => {
        e.preventDefault();
        window.open(waLink(message), "_blank", "noopener,noreferrer");
      }}
    >
      <label className="block">
        <span className="font-semibold text-graphite">Что нужно и сколько</span>
        <textarea value={list} onChange={(e) => setList(e.target.value)} rows={4} placeholder={placeholder} className={field} />
      </label>
      <label className="mt-6 block">
        <span className="font-semibold text-graphite">Куда везти</span>
        <input
          value={place}
          onChange={(e) => setPlace(e.target.value)}
          placeholder="Населённый пункт или «заберу сам»"
          className={field}
        />
      </label>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <button type="submit" className={BTN.primary}>
          <WhatsAppIcon className="size-5" />
          Отправить список в WhatsApp
        </button>
        <a href={SITE.max} target="_blank" rel="noopener noreferrer" className={BTN.light}>
          <MaxIcon className="size-5" />
          Написать в MAX
        </a>
        <a href={telLink} className={BTN.light}>
          <PhoneIcon className="size-5" />
          Позвонить
        </a>
      </div>
      <p className="mt-5 text-sm text-steel">
        Откроется WhatsApp с вашим списком. В MAX список можно вставить в сообщение. Я посчитаю и отвечу итоговой ценой с доставкой.
      </p>
    </form>
  );
}
