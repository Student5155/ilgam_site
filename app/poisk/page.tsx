import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";
import { ContactButtons } from "@/components/ui";

export const metadata: Metadata = {
  title: "Поиск по товарам | Ильгам Кильдияров, Салаватский район РБ",
  description:
    "Найдите нужный товар: цемент, арматура, сетка, профнастил, утеплители, окна, шины, диски. Ильгам Кильдияров, северо-восток Башкортостана.",
  alternates: { canonical: "/poisk" },
};

export default function Page() {
  return (
    <div className="mx-auto w-full max-w-[1000px] px-5 pt-14 pb-24 sm:px-8 md:pt-20">
      <h1>
        <span className="mb-4 block text-base font-medium text-steel">Ильгам Кильдияров / стройматериалы, окна и колёса</span>
        <span className="display block text-[clamp(3rem,9vw,6rem)] text-graphite">Поиск</span>
      </h1>
      <div className="mt-10">
        <Suspense fallback={<div className="h-16 rounded-2xl bg-white shadow-soft" />}>
          <SearchClient />
        </Suspense>
      </div>
      <div className="mt-20 border-t border-line pt-10">
        <p className="title text-2xl text-graphite md:text-3xl">Не нашли нужное? Спросите напрямую.</p>
        <ContactButtons className="mt-6" />
      </div>
    </div>
  );
}
