
import React from 'react';
import { SparklesIcon } from './Icons';

export const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="inline-flex items-center justify-center">
        <SparklesIcon className="w-10 h-10 text-indigo-400 -ml-4 -mt-4 animate-pulse" />
        <h1 className="font-cinzel text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-purple-300 to-indigo-400">
          Avatar Arcana
        </h1>
         <SparklesIcon className="w-8 h-8 text-purple-400 mr-[-2rem] mt-4 animate-pulse delay-500" />
      </div>
    </header>
  );
};
