import React from 'react';
import type { FantasyCharacter } from '../types';
import { FANTASY_CHARACTERS } from '../constants';

interface CharacterSelectorProps {
  selectedCharacter: FantasyCharacter;
  setSelectedCharacter: (character: FantasyCharacter) => void;
  customCharacter: string;
  setCustomCharacter: (value: string) => void;
}

export const CharacterSelector: React.FC<CharacterSelectorProps> = ({
  selectedCharacter,
  setSelectedCharacter,
  customCharacter,
  setCustomCharacter,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-indigo-200">Elige una forma para tu nuevo ser:</p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FANTASY_CHARACTERS.map((char) => (
          <button
            key={char.name}
            onClick={() => setSelectedCharacter(char)}
            className={`flex flex-col items-center justify-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 aspect-square ${
              selectedCharacter.name === char.name
                ? 'bg-indigo-600 border-indigo-400 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-gray-700/50 border-gray-600 hover:bg-indigo-900/30 hover:border-indigo-500'
            }`}
          >
            <char.icon className="w-8 h-8 sm:w-10 sm:h-10" />
            <span className="text-xs sm:text-sm font-semibold text-center">{char.name}</span>
          </button>
        ))}
      </div>
      {selectedCharacter.name === 'Personalizado' && (
        <div className="mt-2">
          <input
            type="text"
            value={customCharacter}
            onChange={(e) => setCustomCharacter(e.target.value)}
            placeholder="Ej: Elemental de Fuego, Ninja Cyborg..."
            className="w-full px-4 py-3 bg-gray-900 border-2 border-indigo-500/50 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
        </div>
      )}
    </div>
  );
};