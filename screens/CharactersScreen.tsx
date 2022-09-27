import {
  ActivityIndicator,
  FlatList,
  ListRenderItem,
  StyleSheet,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { Card, CharacterItem } from "../components";
import { Character } from "../types";
import { COLORS } from "../constants/COLORS";

type CharactersScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "Characters"
>;

const CharactersScreen = ({ navigation }: CharactersScreenProps) => {
  const [data, setData] = useState<Character[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    const resp = await fetch("https://rickandmortyapi.com/api/character");
    const jsonData = await resp.json();
    if (jsonData?.results) {
      setData(jsonData.results);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSelectedCharacter = (item: Character) => {
    navigation.navigate("CharacterDetail", {
      name: item.name,
      url: item.url,
    });
  };

  const renderItem: ListRenderItem<Character> = ({ item }) => (
    <CharacterItem item={item} onSelected={handleSelectedCharacter} />
  );

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={renderItem}
    />
  );
};

export default CharactersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
