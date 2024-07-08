"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React, { useEffect, useState } from "react";
import "./imagesStyle.css";

// UPPY
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHRUpload from "@uppy/xhr-upload";

import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import Image from "next/image";
import { Form, FormField, FormMessage } from "@/components/ui/form";
import { DndContext, DragOverlay, closestCenter } from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { SortableItem } from "../components/sortableItem";
import Item from "../components/item";
import { restrictToHorizontalAxis } from "@dnd-kit/modifiers";

interface imageUploadResult {
  id: string;
  url: string;
}

export default function ImagesStep({ form }: { form: any }) {
  const [images, setImages] = useState<Array<imageUploadResult>>([]);
  const [thumbnailImageID, setThumbnailImageID] = useState<string | null>(null);
  const [isMaxImages, setIsMaxImages] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const uppy = new Uppy({
    allowMultipleUploadBatches: false,
    restrictions: {
      maxFileSize: 10000000,
      maxNumberOfFiles: 10 - images.length,
      minNumberOfFiles: 1,
      allowedFileTypes: [".jpg", ".jpeg", ".png"],
    },
  }).use(XHRUpload, {
    fieldName: "image",
    withCredentials: true,
    endpoint: process.env.NEXT_PUBLIC_API_URL + "/listings/imageUpload",
  });

  uppy.on("upload-success", (file, response) => {
    if (response.body.id) {
      let images: Array<imageUploadResult> = form.getValues("images");
      console.log("current images", images);
      if (images === undefined) {
        form.setValue("images", [
          {
            id: response.body.id,
            url: response.body.url,
          },
        ]);
        setImages([
          {
            id: response.body.id,
            url: response.body.url,
          },
        ]);
      } else {
        images.push({ id: response.body.id, url: response.body.url });
        setImages(images);
        form.setValue("images", images);
      }
    }
  });

  useEffect(() => {
    form.setValue("thumbnail", thumbnailImageID);
  }, [thumbnailImageID]);

  useEffect(() => {
    if (images.length > 0) {
      setThumbnailImageID(images[0].id);
    }
    console.log(images);
    form.setValue("images", images);
  }, [images]);

  function removeImage(index: number) {
    let currentImages = images;
    currentImages = currentImages.filter((image, i) => i !== index);
    setImages(currentImages);
    form.setValue("images", currentImages);
  }

  function handleDragStart(event: any) {
    const { active } = event;

    setActiveId(active.id);
  }

  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setImages((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }

    setActiveId(null);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          Upload Images{" "}
          <span className="text-gray-500">({images.length}/10)</span>
        </CardTitle>
        <CardDescription>
          Add <span className="text-blue-700 font-medium">up to 10 images</span>{" "}
          of your item.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-4">
            <FormField
              control={form.control}
              name="images"
              render={() => (
                <>
                  <Dashboard
                    disabled={isMaxImages}
                    className="w-full"
                    uppy={uppy}
                  />
                  <div className="w-full flex gap-4 overflow-auto pb-2">
                    {images.length > 0 && (
                      <DndContext
                        collisionDetection={closestCenter}
                        onDragStart={handleDragStart}
                        onDragEnd={handleDragEnd}
                      >
                        <SortableContext
                          items={images}
                          strategy={horizontalListSortingStrategy}
                        >
                          {images.map((image, index) => {
                            return (
                              <SortableItem key={image.id} id={image.id}>
                                <div
                                  key={index}
                                  className="w-32 h-32 bg-gray-50 rounded-md relative cursor-pointer overflow-hidden"
                                  style={{
                                    backgroundImage: `url(${image.url})`,
                                    backgroundSize: "cover",
                                    backgroundPosition: "center",
                                  }}
                                >
                                  <div
                                    onClick={() => removeImage(index)}
                                    className="p-1 right-1 top-1 border-black border rounded-full bg-white hover:bg-gray-100 cursor-pointer absolute"
                                  >
                                    <Image
                                      src="/assets/icons/close.png"
                                      width={12}
                                      height={12}
                                      alt=""
                                    />
                                  </div>
                                  {image.id === thumbnailImageID && (
                                    <div className="p-1 w-full bottom-0 leading-4 bg-green-600 absolute text-sm text-center text-white">
                                      Thumbnail
                                    </div>
                                  )}
                                </div>
                              </SortableItem>
                            );
                          })}
                        </SortableContext>
                        <DragOverlay modifiers={[restrictToHorizontalAxis]}>
                          {activeId ? <Item id={activeId} /> : null}
                        </DragOverlay>
                      </DndContext>
                    )}
                  </div>
                  {images.length > 0 && (
                    <p className="text-sm text-gray-500">
                      Drag images to rearrange.
                    </p>
                  )}
                  <FormMessage />
                </>
              )}
            />
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
