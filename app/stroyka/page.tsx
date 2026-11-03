import type { Metadata } from "next";
import HubPage from "@/components/HubPage";

export const metadata: Metadata = {
  title: "Стройматериалы и окна | Салаватский район, северо-восток РБ | Ильгам Кильдияров",
  description:
    "Цемент, арматура, кладочная сетка, профнастил, сайдинг, утеплители, пластиковые окна с доставкой по Салаватскому району и северо-востоку Башкортостана. Ильгам Кильдияров.",
  alternates: { canonical: "/stroyka" },
};

export default function Page() {
  return <HubPage hub="stroyka" />;
}
