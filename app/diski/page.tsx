import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("diski");

export default function Page() {
  return <CategoryPage slug="diski" />;
}
