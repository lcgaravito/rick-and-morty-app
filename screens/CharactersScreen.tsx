import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CharactersStackParamList } from "../navigation";
import { CharacterItem } from "../components";
import { Character } from "../types";
import { COLORS } from "../constants/COLORS";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  getCharacters,
  selectCharacters,
} from "../redux/slices/charactersSlice";

type CharactersScreenProps = NativeStackScreenProps<
  CharactersStackParamList,
  "Characters"
>;

const CharactersScreen = ({ navigation }: CharactersScreenProps) => {
  const { characters: data, page, loading } = useAppSelector(selectCharacters);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getCharacters());
  }, []);

  const handleSelectedCharacter = (item: Character) => {
    navigation.navigate("CharacterDetail", {
      name: item.name,
      url: item.url,
    });
  };

  const handleRefresh = () => {
    dispatch(getCharacters());
  };

  const renderItem: ListRenderItem<Character> = ({ item }) => (
    <CharacterItem item={item} onSelected={handleSelectedCharacter} />
  );
  return (
    <View style={styles.container}>
      <View style={styles.pagination}>
        <Text style={styles.text}>Total: {data.info.count}</Text>
        <Text style={styles.text}>
          Page {page} of {data.info.pages}
        </Text>
      </View>
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={handleRefresh}
            title="Pull to refresh"
            tintColor={COLORS.white}
            titleColor={COLORS.white}
          />
        }
      />
    </View>
  );
};

export default CharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pagination: {
    flexDirection: "row",
  },
  text: {
    fontFamily: "WorkSans",
    color: COLORS.white,
    margin: 5,
  },
});
