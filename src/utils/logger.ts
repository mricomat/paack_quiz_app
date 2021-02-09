import { isDebug } from "src/utils/config";

export const log = (message?: any, ...optionalParams: any[]) => {
  isDebug && console.log(message, ...optionalParams);
};
