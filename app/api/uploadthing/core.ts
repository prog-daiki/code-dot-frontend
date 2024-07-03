import {
  createUploadthing,
  type FileRouter,
} from "uploadthing/next";
import { auth } from "@clerk/nextjs/server";

const f = createUploadthing();

const handleAuth = (): { userId: string } => {
  const { userId } = auth();
  if (!userId || userId !== process.env.ADMIN_USER_ID)
    throw new Error("認証されていません");
  return { userId };
};

export const ourFileRouter = {
  courseImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(handleAuth)
    .onUploadComplete(() => {}),
  courseAttachment: f([
    "text",
    "image",
    "video",
    "audio",
    "pdf",
  ])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({
    video: { maxFileSize: "512MB", maxFileCount: 1 },
  })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
