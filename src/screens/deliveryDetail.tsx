import React, { useEffect, useState } from "react";
import { SafeAreaView, StatusBar, StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";

import { get } from "src/services/fetch";
import { IDelivery } from "src/types/api";
import { deliveryDef } from "src/utils/defForm";
import useRootContext from "src/hooks/useContext";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  deliveryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 20,
  },
  button: {
    marginTop: 16,
    backgroundColor: "black",
    width: "100%",
    height: 40,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
  },
});

const DeliveryDetail = ({ route }: { route: any }) => {
  const {
    trakingDelivery: [deliveryActive, setTrakingDelivery],
  } = useRootContext();

  const [delivery, setDelivery] = useState<IDelivery>(deliveryDef);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    getDeliveryService();
  }, []);

  const getDeliveryService = async () => {
    const { data, error } = await get("/delivery", { id: route.params.id });
    if (!error) {
      setDelivery(data.delivery && data.delivery[0]);
    }

    setIsLoading(false);
  };

  const renderDelivery = () => {
    const isActive = deliveryActive.id === delivery.id;
    return (
      <View style={styles.deliveryContainer}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View>
            <Text>{delivery.customer_name}</Text>
            <View style={{ marginTop: 12 }}>
              <Text>
                {"Latitude:  "}
                <Text style={{ color: "orange" }}>{delivery.latitude}</Text>
              </Text>
              <Text>
                {"Longitude:  "}
                <Text style={{ color: "orange" }}>{delivery.longitude}</Text>
              </Text>
            </View>
          </View>
          <Text>{delivery.address}</Text>
        </View>
        <Text style={{ marginTop: 12 }}>{delivery.special_instructions}</Text>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: isActive ? "orange" : "black" }]}
          onPress={() => setTrakingDelivery(isActive ? deliveryDef : delivery)}
        >
          <Text style={{ color: "white" }}>{isActive ? "ACTIVE" : "Make active"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"orange"} style={{ justifyContent: "center", flex: 1 }} />
        ) : (
          renderDelivery()
        )}
      </SafeAreaView>
    </>
  );
};

export default DeliveryDetail;
