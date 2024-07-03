import { Course } from "@/types/course";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

export async function getCourse(
  courseId: string,
): Promise<Course> {
  const { getToken } = auth();
  const token = await getToken();
  const response = await axios.get(
    `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data;
}
