import { createContext } from "react";

import { getScreenSize } from "../utils/window";

const WindowContext = createContext(getScreenSize());

export default WindowContext;