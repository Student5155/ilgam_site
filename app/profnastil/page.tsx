import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("profnastil");

export default function Page() {
  return <CategoryPage slug="profnastil" />;
}
