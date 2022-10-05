import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Location } from "../types";
import Card from "./Card";
import { COLORS } from "../constants/COLORS";

type LocationItemProps = {
  item: Location;
};

const LocationItem = ({ item }: LocationItemProps) => {
  return (
    <Card style={styles.card}>
      <View style={styles.description}>
        <Text style={styles.title}>{item.name}</Text>
        <Text style={styles.paragraph}>{item.type}</Text>
        <Text style={styles.paragraph}>{item.dimension}</Text>
      </View>
    </Card>
  );
};

export default LocationItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 0,
    backgroundColor: COLORS.grayLight,
    shadowColor: COLORS.primary,
  },
  description: {
    padding: 15,
    width: "100%",
  },
  title: {
    fontFamily: "SpaceMonoBold",
    fontSize: 20,
    color: COLORS.white,
  },
  paragraph: {
    fontFamily: "WorkSans",
    color: COLORS.white,
  },
});
