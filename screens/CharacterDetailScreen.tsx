import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation";
import { Character } from "../types";
import { COLORS } from "../constants/COLORS";

type CharacterDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "CharacterDetail"
>;

const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
  const [data, setData] = useState<Character>();
  const [loading, setLoading] = useState<boolean>(true);
  const fetchData = async () => {
    const resp = await fetch(route.params.url);
    const jsonData = await resp.json();
    if (jsonData) {
      setData(jsonData);
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log(route.params.url);
    fetchData();
  }, []);

  if (loading)
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{ uri: data?.image }} />
      <Text style={styles.title}>{data?.name} </Text>
      <Text style={styles.paragraph}>Status: {data?.status} </Text>
      <Text style={styles.paragraph}>Species: {data?.species} </Text>
      <Text style={styles.paragraph}>Gender: {data?.gender} </Text>
    </View>
  );
};

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: Dimensions.get("window").width / 2,
    height: 200,
    borderRadius: 10,
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
