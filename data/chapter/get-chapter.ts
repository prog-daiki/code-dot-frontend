import { Chapter } from "@/types/chapter";
import { MuxData } from "@/types/mux-data";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

type ChapterWithMuxData = {
  chapter: Chapter;
  mux_data: MuxData | null;
};

export async function getChapter(
  courseId: string,
  chapterId: string,
): Promise<ChapterWithMuxData> {
  try {
    const token = await auth().getToken();
    const response = await axios.get<ChapterWithMuxData>(
      `${API_URL}/courses/${courseId}/chapters/${chapterId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("チャプターの取得に失敗しました");
    throw error;
  }
}
