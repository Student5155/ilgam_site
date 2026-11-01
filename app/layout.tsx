import type { Metadata, Viewport } from "next";
import { Manrope } from "next/font/google";
import Footer from "@/components/Footer";
import FloatingCall from "@/components/FloatingCall";
import Header from "@/components/Header";
import { SITE } from "@/lib/site";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: "Ильгам Кильдияров — стройматериалы, окна и колёса | Салаватский район, РБ",
  description:
    "Цемент, арматура, кладочная сетка, профнастил, утеплители, пластиковые окна, шины и диски с доставкой по Салаватскому району и северо-востоку Башкортостана. Ильгам Кильдияров, +7 965 929-53-69.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: SITE.name,
    images: ["/img/ilgam.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#2B2F33",
};

// Микроразметка LocalBusiness для поисковиков
const localBusiness = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: SITE.name,
  description: "Стройматериалы, пластиковые окна, шины и диски на северо-востоке Башкортостана.",
  telephone: SITE.phone,
  url: SITE.url,
  image: `${SITE.url}/img/ilgam.jpg`,
  address: {
    "@type": "PostalAddress",
    addressCountry: "RU",
    addressRegion: "Республика Башкортостан",
    addressLocality: "Салаватский район",
    // streetAddress: "[улица, дом склада]" — добавить, когда будет точный адрес
  },
  geo: { "@type": "GeoCoordinates", latitude: SITE.coords.lat, longitude: SITE.coords.lon },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "09:00",
      closes: "18:00",
    },
  ],
  areaServed: "Северо-восток Республики Башкортостан",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ru" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness).replace(/</g, "\\u003c") }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <FloatingCall />
      </body>
    </html>
  );
}
