import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * 講座の一覧を取得する
 * @returns 講座の一覧
 */
export async function getCourses(): Promise<Course[]> {
  try {
    const token = await auth().getToken();
    const response = await axios.get<Course[]>(`${API_URL}/courses`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("講座の取得に失敗しました:", error);
    throw error;
  }
}
