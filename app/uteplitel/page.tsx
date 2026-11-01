import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("uteplitel");

export default function Page() {
  return <CategoryPage slug="uteplitel" />;
}
