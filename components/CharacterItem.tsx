import {
  Image,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Character } from "../types";
import Card from "./Card";
import { COLORS } from "../constants/COLORS";
import { Ionicons } from "@expo/vector-icons";
import {
  selectCharacters,
  toggleFavoriteCharacter,
} from "../redux/slices/charactersSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";

type CharacterItemProps = {
  item: Character;
  onSelected: (item: Character) => void;
};

const CharacterItem = ({ item, onSelected }: CharacterItemProps) => {
  const dispatch = useAppDispatch();
  const { favoriteCharacters } = useAppSelector(selectCharacters);
  return (
    <TouchableNativeFeedback onPress={() => onSelected(item)}>
      <Card style={styles.card}>
        <Image style={styles.image} source={{ uri: item.image }} />
        <View style={styles.description}>
          <View
            style={{
              maxWidth: "90%",
            }}
          >
            <Text style={styles.title}>{item.name}</Text>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              {item.status !== "unknown" && (
                <Ionicons
                  style={{ marginRight: 5 }}
                  name={
                    item.status === "Alive"
                      ? "checkmark-circle-sharp"
                      : "close-circle-sharp"
                  }
                  size={20}
                  color={item.status === "Alive" ? COLORS.accent : COLORS.error}
                />
              )}
              <Text style={styles.paragraph}>{item.status}</Text>
            </View>
            <Text style={styles.paragraph}>{item.species}</Text>
          </View>
          <TouchableOpacity
            style={styles.toggleButton}
            onPress={() => dispatch(toggleFavoriteCharacter(item))}
          >
            <Ionicons
              name={
                favoriteCharacters.includes(item) ? "heart" : "heart-outline"
              }
              size={30}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
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
  image: {
    width: "30%",
    height: "100%",
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  description: {
    width: "70%",
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  toggleButton: {
    alignSelf: "center",
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
