import { Category } from "@/types/category";
import { Chapter } from "@/types/chapter";
import { Course } from "@/types/course";
import { MuxData } from "@/types/mux-data";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export type PublishCourseWithChapterWithCategoryWithMuxData = {
  course: Course;
  chapters: (Chapter & { muxData: MuxData | null })[];
  category: Category;
  purchased: boolean;
};

/**
 * 公開講座を取得する
 * @param courseId 講座ID
 * @returns 公開講座
 * @throws Error 公開講座の取得に失敗した場合
 */
export async function getCoursePublish(courseId: string) {
  try {
    const token = await auth().getToken();

    const url = `${API_URL}/courses/${courseId}/publish`;
    const { data } =
      await axios.get<PublishCourseWithChapterWithCategoryWithMuxData>(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? `公開講座の取得に失敗しました: ${error.message}`
        : "公開講座の取得中に予期せぬエラーが発生しました";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
