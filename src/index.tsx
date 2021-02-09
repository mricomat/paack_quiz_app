import { NavigationContainer, NavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect, useRef } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import Router from "src/routes/root";
import Navigator from "./utils/navigation";

const App = () => {
  const navRef = useRef<NavigationContainerRef>(null);
  const GlobalStack = createStackNavigator();

  useEffect(() => {
    Navigator.initNavigator(navRef.current);
  }, [navRef]);

  const Component = (props: any) => <Router isLoaded={true} navRef={navRef} {...props} />;

  return (
    <SafeAreaProvider>
      <NavigationContainer ref={navRef}>
        <GlobalStack.Navigator>
          <GlobalStack.Screen
            name="ROOT"
            component={Component}
            options={{
              headerShown: false,
            }}
          />
        </GlobalStack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;
