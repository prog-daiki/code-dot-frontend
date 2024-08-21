import { cn } from "@/lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import { AlertTriangle, CheckCircleIcon, LucideIcon } from "lucide-react";

// バナーのスタイルを定義
const bannerStyles = cva(
  "border text-center p-4 text-sm flex items-center w-full",
  {
    variants: {
      type: {
        warning: "bg-yellow-200/80 border-yellow-300 text-primary",
        success: "bg-emerald-700 border-emerald-800 text-secondary",
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
      <Icon className="size-4 mr-2" />
      {label}
    </div>
  );
};
