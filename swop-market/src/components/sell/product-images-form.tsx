"use client";

import { ImagePlus, Trash2, UploadCloud } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import { useCallback, useMemo } from "react";
import { useFormContext } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { generateId } from "@/lib/utils";

type ImageType = {
  id: string;
  url: string;
  file?: File;
};

export default function ProductImagesForm() {
  const { control, setValue, watch } = useFormContext();
  const watchedImages = watch("images");
  const images: ImageType[] = useMemo(
    () => watchedImages || [],
    [watchedImages]
  );

  const handleImageUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files.length > 0) {
        const newImages = Array.from(e.target.files).map((file) => {
          // In a real app, you would upload the file to a server and get a URL
          // For this demo, we'll create a local object URL
          const imageUrl = URL.createObjectURL(file);
          return {
            id: generateId(),
            url: imageUrl,
            file: file,
          };
        });

        setValue("images", [...images, ...newImages], { shouldValidate: true });
      }
    },
    [images, setValue]
  );

  const removeImage = useCallback(
    (id: string) => {
      setValue(
        "images",
        images.filter((img) => img.id !== id),
        { shouldValidate: true }
      );
    },
    [images, setValue]
  );

  // For demo purposes, add placeholder images
  const addPlaceholderImage = useCallback(() => {
    const placeholderImages = [
      "/placeholder.svg?height=500&width=500",
      "/placeholder.svg?height=500&width=500&text=Product+Image+2",
      "/placeholder.svg?height=500&width=500&text=Product+Image+3",
      "/placeholder.svg?height=500&width=500&text=Product+Image+4",
    ];

    const existingCount = images.length;
    if (existingCount < placeholderImages.length) {
      const newImage = {
        id: generateId(),
        url: placeholderImages[existingCount],
      };

      setValue("images", [...images, newImage], { shouldValidate: true });
    }
  }, [images, setValue]);

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Product Images</h2>
        <p className="text-sm text-muted-foreground">
          Add up to 8 images of your product. The first image will be the main
          image.
        </p>
      </div>

      <FormField
        control={control}
        name="images"
        render={() => (
          <FormItem>
            <FormLabel>Images</FormLabel>
            <FormControl>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  <AnimatePresence>
                    {images.map((image, index) => (
                      <motion.div
                        key={image.id}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="relative overflow-hidden border rounded-md aspect-square"
                      >
                        <Image
                          src={image.url || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                        {index === 0 && (
                          <div className="absolute px-2 py-1 text-xs text-white bg-teal-700 rounded top-2 left-2">
                            Main
                          </div>
                        )}
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute w-8 h-8 top-2 right-2 opacity-80 hover:opacity-100"
                          onClick={() => removeImage(image.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {images.length < 8 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative flex flex-col items-center justify-center transition-colors border border-dashed rounded-md cursor-pointer aspect-square hover:bg-muted/50"
                      onClick={() =>
                        document.getElementById("image-upload")?.click()
                      }
                    >
                      <ImagePlus className="w-8 h-8 mb-2 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Add Image
                      </span>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </motion.div>
                  )}
                </div>

                {images.length === 0 && (
                  <div className="p-8 text-center border border-dashed rounded-lg">
                    <div className="flex flex-col items-center justify-center mx-auto">
                      <UploadCloud className="w-12 h-12 mb-4 text-muted-foreground" />
                      <h3 className="mb-1 text-lg font-semibold">
                        Upload Images
                      </h3>
                      <p className="mb-4 text-sm text-muted-foreground">
                        Drag and drop your images here, or click to browse
                      </p>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() =>
                          document.getElementById("image-upload")?.click()
                        }
                      >
                        <ImagePlus className="w-4 h-4 mr-2" />
                        Browse Files
                      </Button>
                      <input
                        id="image-upload"
                        type="file"
                        accept="image/*"
                        multiple
                        className="hidden"
                        onChange={handleImageUpload}
                      />

                      {/* For demo purposes only */}
                      <Button
                        type="button"
                        variant="link"
                        className="mt-2"
                        onClick={addPlaceholderImage}
                      >
                        Add Demo Image
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </FormControl>
            <FormDescription>
              Clear, high-quality images from multiple angles will help your
              item sell faster.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
