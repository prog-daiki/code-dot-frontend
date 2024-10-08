"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ListFilter, MoreHorizontal, Pencil } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { Course } from "@/types/course";

export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <Button variant="ghost">講座名</Button>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return <Button variant="ghost">価格</Button>;
    },
    cell: ({ row }) => {
      const price = parseFloat(row.getValue("price") || "0");
      const formatted = formatPrice(price);

      return <div>{formatted}</div>;
    },
  },
  {
    accessorKey: "publishFlag",
    header: ({ column }) => {
      const [filterState, setFilterState] = useState<
        "all" | "published" | "unpublished"
      >("all");

      const cycleFilter = () => {
        const nextState =
          filterState === "all"
            ? "published"
            : filterState === "published"
              ? "unpublished"
              : "all";
        setFilterState(nextState);
        column.setFilterValue(nextState);
      };

      return (
        <div className="flex justify-center">
          <Button onClick={cycleFilter} variant="ghost">
            公開
            <ListFilter className="ml-2 size-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const isPublished = row.getValue("publishFlag") || false;

      return (
        <div className="flex justify-center">
          <Badge
            className={cn(
              "bg-slate-500 hover:bg-slate-500",
              isPublished && "bg-sky-700 hover:bg-sky-700",
            )}
          >
            {isPublished ? "公開" : "非公開"}
          </Badge>
        </div>
      );
    },
    filterFn: (row, id, value): boolean => {
      if (value === "all") return true;
      const isPublished = row.getValue(id) as boolean;
      return value === "published" ? isPublished : !isPublished;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const { id } = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-4 w-8 p-0" variant="ghost">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link href={`/admin/courses/${id}`}>
              <DropdownMenuItem>
                <Pencil className="mr-2 size-4" />
                編集
              </DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
