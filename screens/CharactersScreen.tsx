import {
  FlatList,
  ListRenderItem,
  RefreshControl,
  StyleSheet,
  Text,
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
  const [data, setData] = useState<{
    info: {
      count: number;
      pages: number;
      next?: string | null;
      prev?: string | null;
    };
    results: Character[];
  }>({
    info: { count: 0, pages: 0, next: null, prev: null },
    results: [],
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState<string>("1");
  const fetchData = async () => {
    setLoading(true);
    let url;
    if (data.info.next) {
      url = data.info.next;
      setPage(data.info.next.split("page=")[1]);
    } else {
      url = "https://rickandmortyapi.com/api/character/";
      setPage("1");
    }
    const resp = await fetch(url);
    const jsonData = await resp.json();
    if (jsonData) {
      setData(jsonData);
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

  const handleRefresh = () => {
    fetchData();
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
    marginBottom: 20,
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
