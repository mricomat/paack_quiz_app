import React, { useContext } from "react";

import { IGlobalContextType } from "src/types/context";

const defContextInterface = {} as IGlobalContextType;

export const RootContext = React.createContext<IGlobalContextType>(defContextInterface);

export const useRootContext = (): IGlobalContextType => useContext(RootContext);

export default useRootContext;
