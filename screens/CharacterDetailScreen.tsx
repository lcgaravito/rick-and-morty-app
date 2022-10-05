import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { CharactersStackParamList } from "../navigation";
import { CharacterDetail } from "../types";
import { COLORS } from "../constants/COLORS";
import { Card } from "../components";
import { Ionicons } from "@expo/vector-icons";

type CharacterDetailScreenProps = NativeStackScreenProps<
  CharactersStackParamList,
  "CharacterDetail"
>;

const CharacterDetailScreen = ({ route }: CharacterDetailScreenProps) => {
  const [data, setData] = useState<CharacterDetail>();
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
    fetchData();
  }, []);

  if (loading)
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );

  return (
    <ScrollView style={styles.container}>
      <Image style={styles.image} source={{ uri: data?.image }} />
      <Text style={styles.title}>{data?.name} </Text>
      <Card style={styles.card}>
        <Text style={styles.paragraphSubtitle}>Status:</Text>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={styles.paragraph}>{data?.status}</Text>
          {data?.status !== "unknown" && (
            <Ionicons
              style={{ marginLeft: 10 }}
              name={
                data?.status === "Alive"
                  ? "checkmark-circle-sharp"
                  : "close-circle-sharp"
              }
              size={30}
              color={data?.status === "Alive" ? COLORS.accent : COLORS.error}
            />
          )}
        </View>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.paragraphSubtitle}>Species:</Text>
        <Text style={styles.paragraph}>{data?.species}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.paragraphSubtitle}>Gender:</Text>
        <Text style={styles.paragraph}>{data?.gender}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.paragraphSubtitle}>Location:</Text>
        <Text style={styles.paragraph}>{data?.location.name}</Text>
      </Card>
      <Card style={styles.card}>
        <Text style={styles.paragraphSubtitle}>First seen in:</Text>
        <Text style={styles.paragraph}>{data?.origin.name}</Text>
      </Card>
    </ScrollView>
  );
};

export default CharacterDetailScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.grayDark,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 300,
    borderRadius: 10,
    marginHorizontal: 10,
    marginVertical: 5,
  },
  title: {
    fontFamily: "SpaceMonoBold",
    fontSize: 25,
    color: COLORS.white,
    margin: 5,
    padding: 20,
    textAlign: "center",
  },
  paragraphSubtitle: {
    fontFamily: "SpaceMono",
    color: COLORS.white,
    fontSize: 15,
  },
  paragraph: {
    fontFamily: "WorkSans",
    color: COLORS.white,
    fontSize: 22,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    margin: 5,
    marginVertical: 0,
    backgroundColor: "transparent",
    justifyContent: "space-between",
  },
});
