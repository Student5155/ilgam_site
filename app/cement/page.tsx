import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("cement");

export default function Page() {
  return <CategoryPage slug="cement" />;
}
