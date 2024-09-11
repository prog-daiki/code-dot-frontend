import { getCoursesPurchased } from "@/data/course/get-courses-purchased";
import { CoursesList } from "../home/_components/course-list";

const DashboardPage = async () => {
  const courses = await getCoursesPurchased();
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">購入済みの講座</h2>
      {courses.length === 0 ? (
        <p className="text-gray-500">購入済みの講座はありません。</p>
      ) : (
        <CoursesList items={courses} />
      )}
    </div>
  );
};

export default DashboardPage;
