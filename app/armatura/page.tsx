import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("armatura");

export default function Page() {
  return <CategoryPage slug="armatura" />;
}
