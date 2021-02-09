import { NavigationProp, CommonActions, StackActions, DrawerActions } from "@react-navigation/native";

import { log } from "src/utils/logger";

export enum routeNames {
  // root
  DeliveriesList = "DeliveriesList",
  DeliveryDetail = "DeliveryDetail",
}

interface INavigation {
  navigation: NavigationProp<{}> | null;
  initNavigator: (navigatorRef: any) => void;
  openDrawer: () => void;
  navigate: (routeName: string, params?: object) => void;
  popToTop: () => void;
  goBack: () => void;
  resetStackTo: (routeName: string) => void;
  push: (routeName: string, params?: object) => void;
}

export let current: string | number | undefined = "";

const Navigator: INavigation = {
  navigation: null,

  initNavigator: (navigatorRef: any) => {
    Navigator.navigation = navigatorRef;
  },

  navigate: (routeName: string, params?: object) => {
    log("navigate", current, routeName, { params }); // TODO use prinlog

    Navigator?.navigation?.dispatch(CommonActions.navigate(routeName, params));
  },

  goBack: () => {
    log("goBack");
    current = "";
    Navigator?.navigation?.dispatch(CommonActions.goBack());
  },

  openDrawer: () => {
    Navigator?.navigation?.dispatch(DrawerActions.openDrawer());
  },

  push: (routeName: string, params?: object) => {
    log("navigate", routeName, { params });

    Navigator?.navigation?.dispatch(StackActions.push(routeName, params));
  },

  popToTop: () => {
    log("PopToTop");
    if (current === "popToTop") return;
    current = "popToTop";
    Navigator?.navigation?.dispatch(StackActions.popToTop());
  },

  resetStackTo: (routeName: string) => {
    log("resetTo", routeName);
    current = routeName;
    Navigator?.navigation?.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: routeName }],
      })
    );
  },
};

export default Navigator;
