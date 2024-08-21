import { Chapter } from "@/types/chapter";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * チャプターの一覧を取得する
 * @param courseId 講座ID
 * @returns チャプターの一覧
 * @throws Error APIリクエストが失敗した場合
 */
export async function getChapters(courseId: string): Promise<Chapter[]> {
  try {
    const token = await auth().getToken();
    const response = await axios.get<Chapter[]>(
      `${API_URL}/courses/${courseId}/chapters`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? `APIエラー: ${error.response?.status} - ${error.response?.statusText}`
        : "不明なエラーが発生しました";
    console.error(`チャプターの一覧取得に失敗しました: ${errorMessage}`, error);
    throw new Error(`チャプターの一覧取得に失敗しました: ${errorMessage}`);
  }
}
