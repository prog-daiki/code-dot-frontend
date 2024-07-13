import { Category } from "@/types/category";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCategories(): Promise<Category[]> {
  const token = await auth().getToken();

  const response = await axios.get<Category[]>(
    `${API_URL}/categories`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
}
