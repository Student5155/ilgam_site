import type { Metadata } from "next";
import HubPage from "@/components/HubPage";

export const metadata: Metadata = {
  title: "Шины и диски на любую технику | Салаватский район, северо-восток РБ | Ильгам Кильдияров",
  description:
    "Шины и колёсные диски на легковые и грузовые машины, тракторы и спецтехнику любого размера. Доставка по северо-востоку Башкортостана. Ильгам Кильдияров.",
  alternates: { canonical: "/avto" },
};

export default function Page() {
  return <HubPage hub="avto" />;
}
