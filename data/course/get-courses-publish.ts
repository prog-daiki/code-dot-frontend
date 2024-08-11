import { Course } from "@/types/course";
import { Chapter } from "@/types/chapter";
import { Category } from "@/types/category";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type PublishCourseWithChapterWithCategory = {
  course: Course;
  chapters: Chapter[];
  category: Category;
};

export async function getCoursesPublish(
  title?: string,
  categoryId?: string,
): Promise<PublishCourseWithChapterWithCategory[]> {
  try {
    const token = await auth().getToken();
    const params = new URLSearchParams();
    if (title) params.append("title", title);
    if (categoryId) params.append("categoryId", categoryId);
    const url = `${API_URL}/courses/publish${params.toString() ? `?${params.toString()}` : ""}`;
    const response = await axios.get<PublishCourseWithChapterWithCategory[]>(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("公開講座の一覧取得に失敗しました:", error);
    throw error;
  }
}
