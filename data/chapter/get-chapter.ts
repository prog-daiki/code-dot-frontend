import { Chapter } from "@/types/chapter";
import { MuxData } from "@/types/mux-data";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ChapterWithMuxData = {
  chapter: Chapter;
  mux_data: MuxData | null;
};

/**
 * チャプターを取得する
 * @param courseId 講座ID
 * @param chapterId チャプターID
 * @returns チャプター
 * @throws Error チャプターの取得に失敗した場合
 */
export async function getChapter(
  courseId: string,
  chapterId: string,
): Promise<ChapterWithMuxData> {
  try {
    const token = await auth().getToken();
    const { data } = await axios.get<ChapterWithMuxData>(
      `${API_URL}/courses/${courseId}/chapters/${chapterId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return data;
  } catch (error) {
    const errorMessage =
      error instanceof AxiosError
        ? `チャプターの取得に失敗しました: ${error.message}`
        : "チャプターの取得中に予期せぬエラーが発生しました";
    console.error(errorMessage);
    throw new Error(errorMessage);
  }
}
