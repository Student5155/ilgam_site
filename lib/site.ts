// Контакты и общие данные. Всё, что в [квадратных скобках], — заглушки, заменить на реальные данные.

export const SITE = {
  name: "Ильгам Кильдияров",
  firstName: "Ильгам",
  lastName: "Кильдияров",
  phone: "+79659295369",
  phoneDisplay: "+7 965 929-53-69",
  whatsapp: "https://wa.me/79659295369",
  telegram: "https://t.me/+79659295369",
  region: "северо-восток Башкортостана",
  regionIn: "на северо-востоке Башкортостана",
  district: "Салаватский район",
  address: "Республика Башкортостан, Салаватский район",
  addressDetail: "[населённый пункт, улица, дом склада]",
  hours: "Ежедневно с 9:00 до 18:00, без выходных",
  coords: { lat: 54.206932, lon: 59.608124 },
  // Домен сайта: заменить, когда будет куплен
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
};

export const telLink = `tel:${SITE.phone}`;

export function waLink(text?: string) {
  return text ? `${SITE.whatsapp}?text=${encodeURIComponent(text)}` : SITE.whatsapp;
}

export const yandexMapSrc = `https://yandex.ru/map-widget/v1/?ll=${SITE.coords.lon}%2C${SITE.coords.lat}&z=13&pt=${SITE.coords.lon}%2C${SITE.coords.lat}%2Cpm2rdm`;
