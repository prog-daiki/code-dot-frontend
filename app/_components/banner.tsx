import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

// バナーのスタイルを定義
const bannerStyles = cva(
  "flex w-full items-center border p-4 text-center text-sm",
  {
    variants: {
      type: {
        warning: "border-yellow-300 bg-yellow-200/80 text-primary",
        success: "border-emerald-800 bg-emerald-700 text-secondary",
      },
    },
    defaultVariants: {
      type: "warning",
    },
  },
);

// バナーのプロパティを定義
type BannerType = "warning" | "success";

interface BannerProps extends VariantProps<typeof bannerStyles> {
  label: string;
  type?: BannerType;
}

// バナータイプに対応するアイコンを定義
const bannerIcons: Record<BannerType, LucideIcon> = {
  warning: AlertTriangle,
  success: CheckCircleIcon,
};

export const Banner = ({ label, type = "warning" }: BannerProps) => {
  const Icon = bannerIcons[type];

  return (
    <div className={cn(bannerStyles({ type }))}>
      <Icon className="mr-2 size-4" />
      {label}
    </div>
  );
};
