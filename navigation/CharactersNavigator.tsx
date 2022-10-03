import { Platform } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CharactersStackParamList } from "./CharactersStackParamList";
import { CharacterDetailScreen, CharactersScreen } from "../screens";
import { COLORS } from "../constants/COLORS";

const Stack = createNativeStackNavigator<CharactersStackParamList>();

const CharactersNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Characters"
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
      <Stack.Screen name="Characters" component={CharactersScreen} />
      <Stack.Screen
        name="CharacterDetail"
        component={CharacterDetailScreen}
        options={({ route }) => ({
          title: route.params.name,
        })}
      />
    </Stack.Navigator>
  );
};

export default CharactersNavigator;
