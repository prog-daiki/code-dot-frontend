import { Chapter } from "@/types/chapter";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getChapter(
  courseId: string,
  chapterId: string,
): Promise<Chapter> {
  try {
    const token = await auth().getToken();

    const response = await axios.get<Chapter>(
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
