import { Dispatch, SetStateAction } from "react";

import { IDelivery } from "./api";

export interface IGlobalContextType {
  trakingDelivery: [IDelivery, Dispatch<SetStateAction<IDelivery>>];
}
