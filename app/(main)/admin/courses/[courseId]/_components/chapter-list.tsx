"use client";

import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { Grid, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";
import { Chapter } from "@/types/chapter";

type Props = {
  items: Chapter[];
  onReorder: (
    updateData: { id: string; position: number }[],
  ) => void;
  onEdit: (id: string) => void;
};

export const ChaptersList = ({
  items,
  onReorder,
  onEdit,
}: Props) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

    // 配列のコピーを生成
    const newChapters = Array.from(chapters);
    const [reorderItem] = newChapters.splice(
      source.index,
      1,
    );
    newChapters.splice(destination.index, 0, reorderItem!);

    setChapters(newChapters);

    const startIndex = Math.min(
      source.index,
      destination.index,
    );
    const endIndex = Math.max(
      source.index,
      destination.index,
    );

    const updateChapters = newChapters.slice(
      startIndex,
      endIndex + 1,
    );

    const bulkUpdateData = updateChapters.map(
      (chapter) => ({
        id: chapter.id,
        position:
          newChapters.findIndex(
            (item) => item.id === chapter.id,
          ) + 1,
      }),
    );

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="chapters">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {chapters.map((chapter, index) => (
                <Draggable
                  draggableId={chapter.id}
                  index={index}
                  key={chapter.id}
                >
                  {(provided) => (
                    <div
                      className={cn(
                        "flex items-center gap-x-2 border-slate-200 border text-slate-700 rounded-md mb-2 text-sm",
                        chapter.publishFlag &&
                          "bg-sky-100 border-sky-200 text-sky-700",
                      )}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <div
                        className={cn(
                          "px-2 py-3 border-r border-r-slate-200 hover:bg-slate-100 rounded-l-md transition",
                          chapter.publishFlag &&
                            "border-r-sky-200 hover:bg-sky-200",
                        )}
                        {...provided.dragHandleProps}
                      >
                        <Grid className="size-5" />
                      </div>
                      {chapter.title}
                      <div className="ml-auto flex items-center gap-x-2 pr-2">
                        {chapter.freeFlag && (
                          <Badge>Free</Badge>
                        )}
                        <Badge
                          className={cn(
                            "bg-slate-500",
                            chapter.publishFlag &&
                              "bg-sky-700",
                          )}
                        >
                          {chapter.publishFlag
                            ? "Published"
                            : "Draft"}
                        </Badge>
                        <Pencil
                          className="size-4 cursor-pointer transition hover:opacity-75"
                          onClick={() => onEdit(chapter.id)}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};
