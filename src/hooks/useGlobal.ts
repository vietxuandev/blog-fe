import { GlobalContext } from '@/contexts/global';
import { useContext } from 'react';

export const useGlobal = () => useContext(GlobalContext);
