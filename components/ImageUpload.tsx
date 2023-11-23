"use client";

import { useEffect, useState } from "react";
import { CldUploadButton, CldImage } from "next-cloudinary";
import Image from "next/image";

interface ImageUploadProps {
  value: string;
  onChange: (src: string) => void;
  disabled?: boolean;
}

const ImageUpload = ({ value, onChange, disabled }: ImageUploadProps) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className="space-y-4 w-full flex flex-col justify-center items-center">
      <CldUploadButton
        onUpload={(result: any) => onChange(result.info.public_id)}
        options={{
          maxFiles: 1,
        }}
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME}
      >
        <div className="relative w-40 h-40">
          {value ? (
            <CldImage fill alt="Upload" src={value} />
          ) : (
            <Image fill alt="Upload" src="/images/placeholder.svg" />
          )}
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
