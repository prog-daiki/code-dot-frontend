import { getCategories } from "@/data/category/get-categories";
import { Categories } from "./_components/categories";

export default async function DashboardPage() {
  const categories = await getCategories();

  return (
    <div>
      <Categories items={categories} />
    </div>
  );
}
