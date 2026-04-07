import { ChangeEvent } from "react";

type ImageUploadProps = {
  handleUploadImage: (e: ChangeEvent<HTMLInputElement>) => void;
  image: string;
};

export const ImageUpload = ({ handleUploadImage, image }: ImageUploadProps) => {
  return (
    <div className="flex flex-col gap-2">
      <input
        type="file"
        name="image"
        accept="image/*"
        onChange={handleUploadImage}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm cursor-pointer"
      />
      {image && (
        <img
          src={image}
          alt="Preview"
          className="w-24 h-24 object-cover rounded-md"
        />
      )}
    </div>
  );
};
