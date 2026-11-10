import ilgam from "@/public/img/ilgam.jpg";
import { About, Contacts, Directions, Faq, HowToOrder, HubSplit, Reviews, WhyMe } from "@/components/sections";
import { ContactButtons, ParallaxImage } from "@/components/ui";

export default function Home() {
  return (
    <>
      {/* Первый экран: одна крупная сцена */}
      <section className="relative overflow-hidden bg-graphite text-white">
        <div className="grid lg:min-h-[calc(100svh-4.5rem)] lg:grid-cols-12">
          <div className="relative h-[58svh] min-h-[360px] lg:order-last lg:col-span-5 lg:h-auto">
            <ParallaxImage
              src={ilgam}
              alt="Ильгам Кильдияров"
              speed={0.08}
              preload
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="h-full w-full"
              imgClassName="object-cover object-[50%_18%]"
            />
            <div className="absolute inset-0 bg-linear-to-t from-graphite via-graphite/10 to-transparent lg:bg-linear-to-r lg:via-transparent" />
          </div>

          <div className="relative z-10 -mt-28 flex flex-col justify-end px-5 pb-16 sm:px-8 lg:col-span-7 lg:mt-0 lg:justify-center lg:py-20 lg:pr-10 lg:pl-[max(3rem,calc((100vw-1360px)/2+3rem))]">
            <h1>
              <span className="mb-7 block text-base font-medium text-white/60">
                Ильгам Кильдияров / стройматериалы, окна и колёса
              </span>
              <span className="display block text-[10.6vw] lg:text-[min(6.2vw,7.4rem)]">
                <span className="block">Строить проще,</span>
                <span className="block">когда знаешь,</span>
                <span className="block">кому звонить</span>
              </span>
            </h1>
            <p className="mt-8 max-w-[34rem] text-lg text-white/75 md:text-xl">
              Цемент, арматура, сетка, профнастил, утеплители, окна, шины и диски. Один склад в Салаватском районе и
              доставка по всему северо-востоку Башкортостана.
            </p>
            <ContactButtons tone="dark" className="mt-10" />
          </div>
        </div>
      </section>

      <HubSplit />
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
