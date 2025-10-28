import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { CharacterSelector } from './components/CharacterSelector';
import { ResultDisplay } from './components/ResultDisplay';
import { Header } from './components/Header';
import { transformImageToFantasy } from './services/geminiService';
import type { FantasyCharacter } from './types';
import { FANTASY_CHARACTERS } from './constants';
import { MagicWandIcon, ArrowRightIcon } from './components/Icons';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<File | null>(null);
  const [originalImagePreview, setOriginalImagePreview] = useState<string | null>(null);
  const [selectedCharacter, setSelectedCharacter] = useState<FantasyCharacter>(FANTASY_CHARACTERS[0]);
  const [customCharacter, setCustomCharacter] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = (file: File) => {
    setOriginalImage(file);
    setGeneratedImage(null);
    setError(null);
    const reader = new FileReader();
    reader.onloadend = () => {
      setOriginalImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleTransform = useCallback(async () => {
    if (!originalImage) {
      setError('Por favor, sube una imagen primero.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    const characterToGenerate = selectedCharacter.name === 'Personalizado' ? customCharacter : selectedCharacter.name;
    if (!characterToGenerate) {
      setError('Por favor, selecciona o especifica un personaje de fantasía.');
      setIsLoading(false);
      return;
    }

    try {
      const prompt = `Transforma a la persona de esta foto en ${characterToGenerate}, manteniendo sus rasgos faciales principales reconocibles pero adaptándolos al estilo de fantasía. La imagen final debe ser un retrato artístico de alta calidad.`;
      
      const reader = new FileReader();
      reader.readAsDataURL(originalImage);
      reader.onloadend = async () => {
        try {
          const base64Data = (reader.result as string).split(',')[1];
          const mimeType = originalImage.type;
          const generatedBase64 = await transformImageToFantasy(base64Data, mimeType, prompt);
          setGeneratedImage(`data:image/png;base64,${generatedBase64}`);
        } catch (err) {
            console.error(err);
            if (err instanceof Error) {
               setError(`Ocurrió un error durante la transformación: ${err.message}. Por favor, inténtalo de nuevo.`);
            } else {
               setError('Ocurrió un error desconocido durante la transformación. Por favor, inténtalo de nuevo.');
            }
        } finally {
          setIsLoading(false);
        }
      };
      reader.onerror = () => {
        setError('Error al leer el archivo de imagen.');
        setIsLoading(false);
      }

    } catch (err) {
      console.error(err);
      if (err instanceof Error) {
         setError(`Ocurrió un error: ${err.message}`);
      } else {
         setError('Ocurrió un error desconocido.');
      }
      setIsLoading(false);
    }
  }, [originalImage, selectedCharacter, customCharacter]);

  const finalCharacterName = selectedCharacter.name === 'Personalizado' ? customCharacter : selectedCharacter.name;
  
  return (
    <div className="min-h-screen bg-gray-900 bg-gradient-to-br from-gray-900 to-indigo-900/50 text-gray-100 flex flex-col items-center p-4 sm:p-6 md:p-8">
      <Header />
      <main className="w-full max-w-6xl mx-auto flex flex-col items-center">
        <p className="text-center text-lg md:text-xl text-indigo-300 max-w-3xl mb-8">
          Sube tu retrato y elige tu destino. Nuestro motor arcano revelará tu ser fantástico.
        </p>

        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-indigo-700/50 shadow-2xl shadow-indigo-900/50 flex flex-col gap-6">
            <h2 className="text-2xl font-cinzel font-bold text-indigo-300 border-b-2 border-indigo-500/30 pb-2 flex items-center gap-2">
              <span className="text-3xl">1</span>La Ofrenda
            </h2>
            <ImageUploader onImageUpload={handleImageUpload} preview={originalImagePreview} />
          </div>
          <div className="bg-gray-800/50 p-6 rounded-2xl border border-indigo-700/50 shadow-2xl shadow-indigo-900/50 flex flex-col gap-6">
            <h2 className="text-2xl font-cinzel font-bold text-indigo-300 border-b-2 border-indigo-500/30 pb-2 flex items-center gap-2">
              <span className="text-3xl">2</span>El Conjuro
            </h2>
            <CharacterSelector
              selectedCharacter={selectedCharacter}
              setSelectedCharacter={setSelectedCharacter}
              customCharacter={customCharacter}
              setCustomCharacter={setCustomCharacter}
            />
          </div>
        </div>

        <div className="w-full flex justify-center mb-8">
          <button
            onClick={handleTransform}
            disabled={isLoading || !originalImage || !finalCharacterName}
            className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-bold text-white bg-indigo-600 rounded-full transition-all duration-300 ease-in-out overflow-hidden hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed disabled:text-gray-400 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 shadow-lg shadow-indigo-500/30 disabled:shadow-none"
          >
            <span className="absolute left-0 w-0 h-full transition-all duration-300 ease-out bg-white opacity-10 group-hover:w-full"></span>
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Conjurando...
              </>
            ) : (
              <>
                <MagicWandIcon className="w-6 h-6 mr-3 transition-transform duration-300 group-hover:scale-125 group-hover:rotate-12"/>
                Transformar
              </>
            )}
          </button>
        </div>

        {error && (
          <div className="w-full max-w-3xl p-4 mb-8 text-center bg-red-900/50 border border-red-700 text-red-200 rounded-lg">
            <strong>Error:</strong> {error}
          </div>
        )}

        <ResultDisplay
          originalImage={originalImagePreview}
          generatedImage={generatedImage}
          isLoading={isLoading}
        />
      </main>
    </div>
  );
};

export default App;