import Link from "next/link";
import { Button } from "@/components/ui/button";

export const AdminButton = () => (
  <Link href="/admin/courses">
    <Button variant="ghost">管理者モード</Button>
  </Link>
);
