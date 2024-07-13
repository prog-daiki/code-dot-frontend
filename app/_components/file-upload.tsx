"use client";

import { useToast } from "@/components/ui/use-toast";

import { OurFileRouter } from "@/app/api/uploadthing/core";
import { UploadDropzone } from "@/lib/uploadthing";

type Props = {
  onChange: (url?: string) => void;
  endpoint: keyof OurFileRouter;
};

export const FileUpload = ({
  onChange,
  endpoint,
}: Props) => {
  const { toast } = useToast();
  return (
    <UploadDropzone
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      onUploadError={(error: Error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }}
    />
  );
};
