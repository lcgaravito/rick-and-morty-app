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
import { LocationsStackParamList } from "../navigation";
import { LocationItem } from "../components";
import { Location } from "../types";
import { COLORS } from "../constants/COLORS";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getLocations, selectLocations } from "../redux/slices/locationsSlice";

type LocationsScreenProps = NativeStackScreenProps<
  LocationsStackParamList,
  "Locations"
>;

const LocationsScreen = ({ navigation }: LocationsScreenProps) => {
  const { locations: data, loading, page } = useAppSelector(selectLocations);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLocations());
  }, []);

  const handleRefresh = () => {
    dispatch(getLocations());
  };

  const renderItem: ListRenderItem<Location> = ({ item }) => (
    <LocationItem item={item} />
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

export default LocationsScreen;

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
