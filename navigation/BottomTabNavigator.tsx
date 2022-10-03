import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import { BottomTabParamList } from "./BottomTabParamList";
import CharactersNavigator from "./CharactersNavigator";
import LocationsNavigator from "./LocationsNavigator";
import { Platform } from "react-native";

const BottomTabs = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      initialRouteName="CharactersTab"
      screenOptions={{
        headerShown: false,
        tabBarLabelStyle: {
          fontFamily: "SpaceMono",
          color: COLORS.primary,
          marginBottom: Platform.OS === "android" ? 5 : 0,
        },
        tabBarStyle: {
          backgroundColor: COLORS.grayDark,
        },
      }}
    >
      <BottomTabs.Screen
        name="CharactersTab"
        component={CharactersNavigator}
        options={{
          title: "Characters",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "people" : "people-outline"}
              size={22}
              color={COLORS.primary}
            />
          ),
        }}
      />
      <BottomTabs.Screen
        name="LocationsTab"
        component={LocationsNavigator}
        options={{
          title: "Locations",
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "planet" : "planet-outline"}
              size={22}
              color={COLORS.primary}
            />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

export default BottomTabNavigator;
