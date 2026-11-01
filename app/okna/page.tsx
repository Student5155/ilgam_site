import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("okna");

export default function Page() {
  return <CategoryPage slug="okna" />;
}
