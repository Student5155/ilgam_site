import type { Metadata } from "next";
import { Suspense } from "react";
import SearchClient from "@/components/SearchClient";

export const metadata: Metadata = {
  title: "Поиск по товарам — Ильгам Кильдияров, Салаватский район РБ",
  description:
    "Найдите нужный товар: цемент, арматура, сетка, профнастил, утеплители, окна, шины, диски. Ильгам Кильдияров, северо-восток Башкортостана.",
  alternates: { canonical: "/poisk" },
};

export default function Page() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-8 pb-16 md:pt-12">
      <h1 className="text-3xl font-extrabold text-graphite md:text-4xl">Поиск по товарам</h1>
      <p className="mt-2 text-lg text-steel">Ильгам Кильдияров — стройматериалы, окна и колёса</p>
      <div className="mt-6">
        <Suspense fallback={<div className="h-14 rounded-md border border-line bg-white" />}>
          <SearchClient />
        </Suspense>
      </div>
    </div>
  );
}
