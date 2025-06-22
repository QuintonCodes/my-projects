"use client";

import axios from "axios";
import { ImageIcon, Upload, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const generateId = () =>
  typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).slice(2, 11);

type Image = {
  id: string;
  url: string;
  file: File;
};

export default function ProductImagesForm() {
  const { control, setValue, getValues, watch } = useFormContext();
  const watchedImages = watch("images");

  const images = useMemo(() => watchedImages || [], [watchedImages]);
  const [uploading, setUploading] = useState(false);

  async function handleFileUpload(files: FileList) {
    if (!files.length) return;

    setUploading(true);
    const currentImages = getValues("images") || [];

    try {
      for (const file of Array.from(files)) {
        // Validate file type
        if (!file.type.startsWith("image/")) {
          toast.error("Invalid file type", {
            description: "Please upload only image files.",
          });
          continue;
        }

        // Validate file size (5MB limit)
        if (file.size > 5 * 1024 * 1024) {
          toast.error("File too large", {
            description: "Please upload images smaller than 5MB.",
          });
          continue;
        }

        // Create FormData for upload
        const formData = new FormData();
        formData.append("file", file);

        // Upload to API
        const response = await axios.post("/api/upload", formData);

        if (response.status !== 200 || !response.data.success) {
          toast.error("Upload failed");
          continue;
        }

        const result = await response.data;

        if (result) {
          const newImage = {
            id: generateId(),
            url: result.url,
            file: file,
          };

          setValue("images", [...currentImages, newImage]);
        }
      }

      toast("Images uploaded", {
        description: "Your images have been uploaded successfully.",
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast("Upload failed", {
        description:
          "There was an error uploading your images. Please try again.",
      });
    } finally {
      setUploading(false);
    }
  }

  const removeImage = (imageId: string) => {
    const currentImages = getValues("images") || [];
    const updatedImages = currentImages.filter(
      (img: Image) => img.id !== imageId
    );
    setValue("images", updatedImages);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ImageIcon className="w-5 h-5" />
          Product Images
        </CardTitle>
        <CardDescription>
          Upload photos of your product (up to 8 images)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <FormField
          control={control}
          name="images"
          render={() => (
            <FormItem>
              <FormLabel>Images</FormLabel>
              <FormControl>
                <div className="space-y-4">
                  {/* Upload Area */}
                  <div
                    className="p-8 text-center transition-colors border-2 border-dashed rounded-lg cursor-pointer border-muted-foreground/25 hover:border-muted-foreground/50"
                    onClick={() =>
                      document.getElementById("file-upload")?.click()
                    }
                  >
                    <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      {uploading
                        ? "Uploading..."
                        : "Click to upload or drag and drop"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, GIF up to 5MB each
                    </p>
                    <input
                      id="file-upload"
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        e.target.files && handleFileUpload(e.target.files)
                      }
                      disabled={uploading || images.length >= 8}
                    />
                  </div>

                  {/* Image Preview Grid */}
                  {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                      {images.map((image: Image, index: number) => (
                        <div key={image.id} className="relative group">
                          <div className="overflow-hidden border rounded-lg aspect-square">
                            <Image
                              src={image.url || "/placeholder.svg"}
                              alt={`Product image ${index + 1}`}
                              className="object-cover w-full h-full"
                              fill
                            />
                          </div>
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute w-6 h-6 transition-opacity opacity-0 top-2 right-2 group-hover:opacity-100"
                            onClick={() => removeImage(image.id)}
                          >
                            <X className="w-3 h-3" />
                          </Button>
                          {index === 0 && (
                            <div className="absolute px-2 py-1 text-xs text-white rounded bottom-2 left-2 bg-black/75">
                              Main
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </FormControl>
              <FormDescription>
                The first image will be used as the main product image. You can
                upload up to 8 images.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}
