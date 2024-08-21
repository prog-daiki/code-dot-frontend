import { Category } from "@/types/category";
import { auth } from "@clerk/nextjs/server";
import axios, { AxiosError } from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

/**
 * カテゴリーの一覧を取得する
 * @returns カテゴリーの一覧
 * @throws Error カテゴリー取得に失敗した場合
 */
export async function getCategories(): Promise<Category[]> {
  try {
    const token = await auth().getToken();
    const { data } = await axios.get<Category[]>(`${API_URL}/categories`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error) {
    const message =
      error instanceof AxiosError
        ? error.response?.data?.message || error.message
        : "不明なエラーが発生しました";
    console.error(`カテゴリーの一覧取得に失敗しました: ${message}`);
    throw new Error(`カテゴリー取得エラー: ${message}`);
  }
}
