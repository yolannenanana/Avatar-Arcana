import React from 'react';
import { ArrowRightIcon, DownloadIcon } from './Icons';

interface ResultDisplayProps {
  originalImage: string | null;
  generatedImage: string | null;
  isLoading: boolean;
}

const ImagePanel: React.FC<{ src: string | null; title: string; isLoading?: boolean; onSave?: () => void; }> = ({ src, title, isLoading = false, onSave }) => (
  <div className="w-full flex-1 flex flex-col items-center">
    <h3 className="text-2xl font-cinzel font-bold text-indigo-300 mb-4">{title}</h3>
    <div className="w-full aspect-square bg-gray-900/50 rounded-lg border-2 border-indigo-500/50 flex items-center justify-center overflow-hidden relative group">
      {isLoading ? (
        <div className="flex flex-col items-center text-indigo-300 p-4">
          <svg className="animate-spin h-10 w-10 text-indigo-400 mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="font-semibold text-center">La transformación está en progreso...</span>
        </div>
      ) : src ? (
        <img src={src} alt={title} className="w-full h-full object-cover" />
      ) : (
        <div className="text-gray-500 p-4 text-center">
            {title === "La Visión" ? "Tu creación aparecerá aquí." : "Sube una imagen para comenzar."}
        </div>
      )}
    </div>
    {src && !isLoading && title === "La Visión" && onSave && (
        <button
            onClick={onSave}
            className="mt-4 inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-indigo-600 rounded-lg transition-all duration-300 ease-in-out hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-md shadow-indigo-500/20"
        >
            <DownloadIcon className="w-5 h-5 mr-2" />
            Guardar Imagen
        </button>
    )}
  </div>
);

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalImage, generatedImage, isLoading }) => {
  if (!originalImage && !generatedImage && !isLoading) {
    return null;
  }
  
  const handleSaveImage = () => {
    if (!generatedImage) return;
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = 'avatar-arcana-vision.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full max-w-5xl bg-gray-800/50 p-6 rounded-2xl border border-indigo-700/50 shadow-2xl shadow-indigo-900/50">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8">
        <ImagePanel src={originalImage} title="El Mortal" />
        <div className="text-indigo-400 self-center hidden md:block">
            <ArrowRightIcon className="w-10 h-10 animate-pulse" />
        </div>
         <div className="text-indigo-400 self-center md:hidden transform rotate-90">
            <ArrowRightIcon className="w-10 h-10 animate-pulse" />
        </div>
        <ImagePanel src={generatedImage} title="La Visión" isLoading={isLoading && !generatedImage} onSave={handleSaveImage} />
      </div>
    </div>
  );
};