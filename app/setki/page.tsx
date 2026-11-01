import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("setki");

export default function Page() {
  return <CategoryPage slug="setki" />;
}
