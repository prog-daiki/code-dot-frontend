import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 講座を取得する
 * @param courseId 講座ID
 * @returns 講座
 */
export async function getCourse(courseId: string): Promise<Course> {
  try {
    const token = await auth().getToken();
    const response = await axios.get<Course>(`${API_URL}/courses/${courseId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("講座の取得に失敗しました:", error);
    throw error;
  }
}
