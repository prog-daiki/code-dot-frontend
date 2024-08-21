import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 講座の一覧を取得する
 * @returns 講座の一覧
 * @throws Error 講座の取得に失敗した場合
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const token = await auth().getToken();
    const { data } = await axios.get<Course[]>(`${API_URL}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? `講座の一覧取得に失敗しました: ${error.message}`
        : "講座の一覧取得中に予期せぬエラーが発生しました";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
