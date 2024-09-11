"use client";

import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";
import { useState } from "react";

interface PurchaseButtonProps {
  courseId: string;
}

export const PurchaseButton = ({ courseId }: PurchaseButtonProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const token = await getToken();

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/courses/${courseId}/checkout`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      window.location.assign(response.data.url);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <button
      className="w-full bg-gradient-to-r from-sky-900 to-indigo-800 text-white font-bold py-6 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl shadow-lg text-xl relative overflow-hidden group"
      onClick={onClick}
      disabled={isLoading}
    >
      <span className="relative z-10">講座を購入する</span>
      <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300 ease-in-out"></span>
      <span className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
        →
      </span>
    </button>
  );
};
