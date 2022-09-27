import { useFonts } from "expo-font";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { COLORS } from "./constants/COLORS";
import { AppNavigator } from "./navigation";

export default function App() {
  const [loaded] = useFonts({
    SpaceMono: require("./assets/fonts/SpaceMono-Regular.ttf"),
    SpaceMonoBold: require("./assets/fonts/SpaceMono-Bold.ttf"),
    SpaceMonoItalic: require("./assets/fonts/SpaceMono-Italic.ttf"),
    WorkSans: require("./assets/fonts/WorkSans-Regular.ttf"),
  });
  if (!loaded)
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} color={COLORS.primary} />
      </View>
    );

  return (
    <>
      <AppNavigator />
      <StatusBar style={Platform.OS === "ios" ? "light" : "dark"} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
    alignItems: "center",
    justifyContent: "center",
  },
});
