"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";

const present = "food-images";

type CldUploadProps = {
  onUpload: (url: string) => void;
};

export const CldUpload = ({ onUpload }: CldUploadProps) => {
  const onUploadImage = (result: CloudinaryUploadWidgetResults) => {
    const info = result.info;
    if (typeof info === "object" && info.secure_url) {
      onUpload(info.secure_url);
    }
  };

  return (
    <CldUploadWidget uploadPreset={present} onSuccess={onUploadImage}>
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              open();
            }}
            className="border border-gray-300 rounded-md px-4 py-2 text-sm hover:bg-gray-50"
          >
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
};
