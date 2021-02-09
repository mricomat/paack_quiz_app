import AsyncStorage from "@react-native-async-storage/async-storage";
import { printLog } from "./config";
import { log } from "src/utils/logger";

type ICallbackError = (error?: Error, result?: string) => void;

const keys = {
  trakingDelivery: "TRAKING_DELIVERY",
};

const set = async (key: string, value: string, callback?: ICallbackError) => {
  try {
    await AsyncStorage.setItem(key, value, callback);
    if (printLog) log("key setted", key, value);
    return true;
  } catch (e) {
    log("error saving in", key, "value", value, e);
    return false;
  }
};

const get = async (key: string, callback?: ICallbackError) => {
  try {
    const value = await AsyncStorage.getItem(key, callback);
    if (printLog) {
      if (value === null) log("no previous value for", key);
      else log("key getted", key, value);
    }
    return value;
  } catch (e) {
    log("error getting", key, e);
    return null;
  }
};

const remove = async (key: string, callback?: ICallbackError) => {
  try {
    await AsyncStorage.removeItem(key);
    if (printLog) log("key removed", key);
    if (callback) callback();
    return true;
  } catch (e) {
    log("error deleting key", key, e);
    return false;
  }
};

export default {
  set,
  get,
  remove,
  keys,
};
