import {createContext} from 'react';
import {IMainStore} from './index';

export const MainStoreContext = createContext<IMainStore | null>(null);
