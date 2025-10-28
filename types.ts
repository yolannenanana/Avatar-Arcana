// FIX: Import React to resolve 'Cannot find namespace' error.
import React from 'react';

export interface FantasyCharacter {
  name: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}
