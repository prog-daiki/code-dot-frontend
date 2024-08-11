import { Category } from "@/types/category";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * カテゴリーの一覧を取得する
 * @returns カテゴリーの一覧
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const token = await auth().getToken();
    const response = await axios.get<Category[]>(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("カテゴリーの一覧取得に失敗しました:", error);
    throw error;
  }
}
