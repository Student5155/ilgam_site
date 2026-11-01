import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("shiny");

export default function Page() {
  return <CategoryPage slug="shiny" />;
}
