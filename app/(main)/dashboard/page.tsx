import { getCategories } from "@/data/category/get-categories";
import { Categories } from "./_components/categories";
import { SearchInput } from "./_components/search-input";

export default async function DashboardPage() {
  const categories = await getCategories();

  return (
    <div>
      <div className="mb-4">
        <SearchInput />
      </div>
      <Categories items={categories} />
    </div>
  );
}
