import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getCourse(
  courseId: string,
): Promise<Course> {
  const token = await auth().getToken();
  const response = await axios.get<Course>(
    `${API_BASE_URL}/courses/${courseId}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );
  return response.data;
}
