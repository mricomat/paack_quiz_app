import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Text,
  ActivityIndicator,
} from "react-native";

import { get } from "src/services/fetch";
import { IDelivery } from "src/types/api";
import { routeNames } from "src/utils/navigation";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "white",
  },
  deliveryContainer: {
    paddingHorizontal: 12,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    backgroundColor: "#FAFAFA",
    borderRadius: 6,
  },
});

const DeliveriesList = () => {
  const [deliveries, setDeliveries] = useState<IDelivery[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const navigation = useNavigation();

  useEffect(() => {
    getDeliveriesService();
  }, []);

  const getDeliveriesService = async () => {
    const { data, error } = await get("/deliveries", {});
    if (!error) {
      setDeliveries(data.deliveries);
    }

    setIsLoading(false);
  };

  const renderDelivery = ({ item }: { item: IDelivery }) => {
    return (
      <TouchableOpacity
        style={styles.deliveryContainer}
        onPress={() => navigation.navigate(routeNames.DeliveryDetail, { id: item.id })}
      >
        <View>
          <Text>{item.customer_name}</Text>
          <View style={{ marginTop: 12 }}>
            <Text>
              {"Latitude:  "}
              <Text style={{ color: "orange" }}>{item.latitude}</Text>
            </Text>
            <Text>
              {"Longitude:  "}
              <Text style={{ color: "orange" }}>{item.longitude}</Text>
            </Text>
          </View>
        </View>
        <Text>{item.address}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size={"large"} color={"orange"} style={{ justifyContent: "center", flex: 1 }} />
        ) : (
          <FlatList renderItem={renderDelivery} data={deliveries} contentContainerStyle={{ marginTop: 24 }} />
        )}
      </SafeAreaView>
    </>
  );
};

export default DeliveriesList;
