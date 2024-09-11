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
  purchased: boolean;
};

/**
 * 購入済みの講座の一覧を取得する
 * @returns 購入済みの講座の一覧
 * @throws Error 購入済みの講座の一覧取得に失敗した場合
 */
export async function getCoursesPurchased(): Promise<
  PublishCourseWithChapterWithCategory[]
> {
  try {
    const token = await auth().getToken();
    const url = `${API_URL}/courses/purchased`;
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
