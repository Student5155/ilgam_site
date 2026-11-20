import CategoryPage, { categoryMetadata } from "@/components/CategoryPage";

export const metadata = categoryMetadata("metallocherepica");

export default function Page() {
  return <CategoryPage slug="metallocherepica" />;
}
