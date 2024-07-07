"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { OurFileRouter } from "@/app/api/uploadthing/core";
import { useToast } from "@/components/ui/use-toast";

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
      onClientUploadComplete={(res) => {
        onChange(res?.[0]?.url);
      }}
      endpoint={endpoint}
      onUploadError={(error: Error) => {
        toast({
          title: error.message,
          variant: "destructive",
        });
      }}
    />
  );
};
