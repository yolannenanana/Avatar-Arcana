import type { FantasyCharacter } from './types';
import { VampireIcon, WerewolfIcon, FairyIcon, ElfIcon, GnomeIcon, CustomIcon, MonsterIcon, NymphIcon } from './components/Icons';

export const FANTASY_CHARACTERS: FantasyCharacter[] = [
  { name: 'Vampiro', icon: VampireIcon },
  { name: 'Hombre Lobo', icon: WerewolfIcon },
  { name: 'Hada', icon: FairyIcon },
  { name: 'Elfo', icon: ElfIcon },
  { name: 'Gnomo', icon: GnomeIcon },
  { name: 'Ninfa del Mar', icon: NymphIcon },
  { name: 'Monstruo Mitológico', icon: MonsterIcon },
  { name: 'Personalizado', icon: CustomIcon },
];