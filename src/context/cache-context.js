import { createContext } from 'react';

import Cache from '../utils/cache';

const CacheContext = createContext(new Cache());

export default CacheContext;