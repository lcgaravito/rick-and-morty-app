import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";

const FavoriteCharactersScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        Very soon you will be able to add favorite characters...
      </Text>
    </View>
  );
};

export default FavoriteCharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.grayDark,
  },
  text: {
    fontFamily: "SpaceMonoItalic",
    color: COLORS.white,
    textAlign: "center",
    margin: 10,
    padding: 10,
    fontSize: 20,
  },
});
