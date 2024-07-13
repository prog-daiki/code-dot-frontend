import { Category } from "@/types/category";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function getCategories(): Promise<Category[]> {
  const { getToken } = auth();
  const token = await getToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/categories`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
