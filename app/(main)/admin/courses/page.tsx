import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { getCourses } from "@/data/course/get-courses";

const CoursesPage = async () => {
  const courses = await getCourses();

  return (
    <div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
