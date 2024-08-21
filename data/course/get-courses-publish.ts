import { Course } from "@/types/course";
import { Chapter } from "@/types/chapter";
import { Category } from "@/types/category";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type PublishCourseWithChapterWithCategory = {
  course: Course;
  chapters: Chapter[];
  category: Category;
};

/**
 * 公開講座の一覧を取得する
 * @param title タイトル
 * @param categoryId カテゴリーID
 * @returns 公開講座の一覧
 * @throws Error 公開講座の一覧取得に失敗した場合
 */
export async function getCoursesPublish(
  title?: string,
  categoryId?: string,
): Promise<PublishCourseWithChapterWithCategory[]> {
  try {
    const token = await auth().getToken();
    const params = new URLSearchParams();

    if (title) {
      params.append("title", title);
    }
    if (categoryId) {
      params.append("categoryId", categoryId);
    }

    const url = `${API_URL}/courses/publish${params.toString() ? `?${params.toString()}` : ""}`;
    const { data } = await axios.get<PublishCourseWithChapterWithCategory[]>(
      url,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? `公開講座の一覧取得に失敗しました: ${error.message}`
        : "公開講座の一覧取得中に予期せぬエラーが発生しました";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
