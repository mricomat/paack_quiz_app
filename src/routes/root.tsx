import { useNavigation } from "@react-navigation/native";
import { CardStyleInterpolators, createStackNavigator, TransitionSpecs } from "@react-navigation/stack";
import React, { FC, useEffect, useState } from "react";
import { PermissionsAndroid } from "react-native";

import { useBackgroundService } from "src/hooks/useBackgroundService";
import { RootContext } from "src/hooks/useContext";
import DeliveriesList from "src/screens/deliveriesList";
import DeliveryDetail from "src/screens/deliveryDetail";
import { IDelivery } from "src/types/api";
import { deliveryDef } from "src/utils/defForm";
import { routeNames } from "src/utils/navigation";
import storange from "src/utils/storange";

export const APPStack = createStackNavigator();

const DefaultOptions = { headerShown: false };

interface IProps {
  navRef: any;
}

const APPStackComponent: FC<IProps> = () => {
  const trakingDelivery = useState<IDelivery>({} as IDelivery);
  const backgroundService = useBackgroundService(deliveryDef);

  useEffect(() => {
    handleBackgroundService();
    if (trakingDelivery[0].id === 0) {
      backgroundService.stopReset();
    }
  }, [trakingDelivery[0]]);

  useEffect(() => {
    initData();
  }, []);

  const handleBackgroundService = async () => {
    let delivery = trakingDelivery[0];
    if (delivery && delivery.id) {
      backgroundService.updateDelivery(delivery);
    }
  };

  const initData = async () => {
    try {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    } catch (err) {
      console.warn(err);
    }

    const res = await storange.get(storange.keys.trakingDelivery);
    const lastTrakingDelivery = res && JSON.parse(res);
    if (lastTrakingDelivery && lastTrakingDelivery.trakingDelivery) {
      trakingDelivery[1](lastTrakingDelivery.trakingDelivery as IDelivery);
    }
  };

  return (
    <RootContext.Provider value={{ trakingDelivery }}>
      <APPStack.Navigator
        screenOptions={{
          gestureEnabled: true,
          gestureDirection: "horizontal",
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          transitionSpec: {
            open: TransitionSpecs.TransitionIOSSpec,
            close: TransitionSpecs.TransitionIOSSpec,
          },
        }}
      >
        <APPStack.Screen name={routeNames.DeliveriesList} component={DeliveriesList} options={DefaultOptions} />
        <APPStack.Screen name={routeNames.DeliveryDetail} component={DeliveryDetail} options={DefaultOptions} />
      </APPStack.Navigator>
    </RootContext.Provider>
  );
};

export default APPStackComponent;
