import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LocationsStackParamList } from "./LocationsStackParamList";
import { LocationsScreen } from "../screens";
import { Platform } from "react-native";
import { COLORS } from "../constants/COLORS";

const Stack = createNativeStackNavigator<LocationsStackParamList>();

const LocationsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Locatios"
      screenOptions={{
        headerStyle: {
          backgroundColor:
            Platform.OS === "android" ? COLORS.primary : COLORS.grayDark,
        },
        headerTintColor:
          Platform.OS === "android" ? COLORS.white : COLORS.primary,
        headerTitleStyle: {
          fontFamily: "SpaceMonoBold",
          fontWeight: "bold",
          fontSize: 20,
        },
        contentStyle: {
          backgroundColor: COLORS.grayDark,
        },
      }}
    >
      <Stack.Screen name="Locatios" component={LocationsScreen} />
    </Stack.Navigator>
  );
};

export default LocationsNavigator;
