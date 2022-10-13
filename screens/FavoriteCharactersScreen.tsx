import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  StyleSheet,
  Text,
} from "react-native";
import React from "react";
import { COLORS } from "../constants/COLORS";
import { useAppSelector } from "../redux/hooks";
import { CharacterItem } from "../components";
import { Character } from "../types";
import { selectCharacters } from "../redux/slices/charactersSlice";

const FavoriteCharactersScreen = () => {
  const { favoriteCharacters } = useAppSelector(selectCharacters);
  const renderItem: ListRenderItem<Character> = ({ item }) => (
    <CharacterItem item={item} onSelected={() => {}} />
  );
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Favorite Characters</Text>
      <FlatList
        data={favoriteCharacters}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
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
    fontFamily: "SpaceMonoBold",
    color: COLORS.white,
    textAlign: "center",
    margin: 10,
    padding: 10,
    fontSize: 20,
  },
});
