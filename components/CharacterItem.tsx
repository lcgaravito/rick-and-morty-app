import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import React from "react";
import { Character } from "../types";
import Card from "./Card";
import { COLORS } from "../constants/COLORS";

type CharacterItemProps = {
  item: Character;
  onSelected: (item: Character) => void;
};

const CharacterItem = ({ item, onSelected }: CharacterItemProps) => {
  return (
    <TouchableNativeFeedback onPress={() => onSelected(item)}>
      <Card style={styles.card}>
        <View style={styles.description}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.paragraph}>{item.status}</Text>
          <Text style={styles.paragraph}>{item.species}</Text>
        </View>
        <Image style={styles.image} source={{ uri: item.image }} />
      </Card>
    </TouchableNativeFeedback>
  );
};

export default CharacterItem;

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    padding: 0,
    backgroundColor: COLORS.grayLight,
    shadowColor: COLORS.primary,
  },
  description: {
    width: "70%",
    padding: 15,
  },
  image: {
    width: "30%",
    height: "100%",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
