import Image from "next/image";
import ilgam from "@/public/img/ilgam.jpg";
import SearchBox from "@/components/SearchBox";
import { About, Contacts, Directions, Faq, HowToOrder, HubBlocks, Reviews, WhyMe } from "@/components/sections";
import { CallButton, WhatsAppButton } from "@/components/ui";

export default function Home() {
  return (
    <>
      {/* Первый экран */}
      <section className="border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 pt-8 pb-10 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:pt-14 md:pb-14">
          <div>
            <h1 className="text-[1.75rem] leading-tight font-extrabold text-graphite md:text-5xl md:leading-[1.1]">
              Ильгам Кильдияров — стройматериалы, окна и колёса в Северо-восточном регионе РБ
            </h1>
            <p className="mt-4 max-w-xl text-lg text-ink/85 md:text-xl">
              Всё для стройки и колёса на любую технику — в одном месте, с доставкой до вашего объекта.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <CallButton />
              <WhatsAppButton />
            </div>
            <SearchBox className="mt-6 max-w-xl" />
          </div>
          <div className="relative mx-auto aspect-[4/3] w-full overflow-hidden rounded-lg bg-line md:aspect-[6/7]">
            <Image
              src={ilgam}
              alt="Ильгам Кильдияров"
              fill
              preload
              placeholder="blur"
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover object-top"
            />
          </div>
        </div>
      </section>

      {/* Два хаба */}
      <section className="py-10 md:py-14" aria-label="Разделы">
        <div className="mx-auto max-w-6xl px-4">
          <HubBlocks />
        </div>
      </section>

      <Directions />
      <WhyMe />
      <About />
      <HowToOrder />
      <Reviews />
      <Faq />
      <Contacts />
    </>
  );
}
