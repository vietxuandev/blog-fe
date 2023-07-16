import { Global } from '@/generated/graphql';
import { createContext } from 'react';

export const GlobalContext = createContext<Partial<Global>>({});
