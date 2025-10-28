import React, { useRef } from 'react';
import { UploadIcon } from './Icons';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  preview: string | null;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, preview }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onImageUpload(event.target.files[0]);
    }
  };

  const handleDrop = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      onImageUpload(event.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/png, image/jpeg, image/webp"
        className="hidden"
      />
      <label
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className="cursor-pointer w-full aspect-square bg-gray-900/50 rounded-lg border-2 border-dashed border-indigo-500/50 flex flex-col items-center justify-center text-indigo-300 hover:bg-indigo-900/20 hover:border-indigo-400 transition-all duration-300"
      >
        {preview ? (
          <img src={preview} alt="Previsualización" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <div className="text-center p-4">
            <UploadIcon className="w-12 h-12 mx-auto mb-2 text-indigo-400" />
            <p className="font-semibold">Haz clic para subir o arrastra y suelta</p>
            <p className="text-sm text-gray-400">PNG, JPG o WEBP</p>
          </div>
        )}
      </label>
    </div>
  );
};