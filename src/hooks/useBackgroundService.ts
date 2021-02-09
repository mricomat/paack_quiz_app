import BackgroundService from "react-native-background-actions";
import { useReducer } from "react";
import Geolocation from "@react-native-community/geolocation";

import { IDelivery, ITrackData } from "src/types/api";
import { post } from "src/services/fetch";
import { deliveryDef } from "src/utils/defForm";
import storange from "src/utils/storange";

const options = {
  taskName: "Traking",
  taskTitle: "Runing Traking",
  taskDesc: "Traking description",
  taskIcon: {
    name: "ic_launcher",
    type: "mipmap",
  },
  color: "#ff00ff",
  parameters: {
    delay: 1000,
  },
};

export const useBackgroundService = (initDelivery: IDelivery, delay: number = 1000) => {
  const updateDeliveryReducer = (state: IDelivery, newState: Partial<IDelivery>) => ({ ...state, ...newState });

  const sleep = (time: number) => new Promise(resolve => setTimeout(() => resolve(time), time));

  const [delivery, setDelivery] = useReducer(updateDeliveryReducer, initDelivery);

  const updateDelivery = async (newDelivery: IDelivery) => {
    if (delivery.id !== newDelivery.id && !BackgroundService.isRunning()) {
      await stop();
      setDelivery(newDelivery);
      await storange.set(storange.keys.trakingDelivery, JSON.stringify({ trakingDelivery: newDelivery }));
      await start();
    }
  };

  const trakingTask = async () => {
    await new Promise(async () => {
      let values: ITrackData[] = [];
      for (let i = 0; BackgroundService.isRunning(); i++) {
        if (i % 10 == 0 && values.length > 0) {
          sendTrakingTask(values);
          values = [];
        }

        // Get data
        await Geolocation.getCurrentPosition(info => {
          console.log(info);
          values = [
            ...values,
            {
              latitude: info.coords.latitude,
              longitude: info.coords.longitude,
              battery_level: 2,
              timestamp: info.timestamp,
            },
          ];
        });

        await sleep(delay);
      }
    });
  };

  const sendTrakingTask = async (values: ITrackData[]) => {
    console.log(values);
    await post("/traking", { driver_id: 1234, tracking_data: values });
  };

  const start = async () => {
    await BackgroundService.start(trakingTask, options);
    await BackgroundService.updateNotification({ taskDesc: "New ExampleTask description" }); // Only Android, iOS will ignore this call
  };

  const stop = async () => {
    await BackgroundService.stop();
  };

  const stopReset = async () => {
    setDelivery(deliveryDef);
    await storange.remove(storange.keys.trakingDelivery);
    await BackgroundService.stop();
  };

  return {
    start,
    stop,
    stopReset,
    updateDelivery,
  };
};
