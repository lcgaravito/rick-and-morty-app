import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Location, Response } from "../../types";
import { AppThunk, RootState } from "../store";

interface LocationsState {
  loading: boolean;
  locations: Response<Location>;
  page: string;
}

const initialState: LocationsState = {
  loading: false,
  page: "1",
  locations: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
};

export const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setPage: (state, { payload }: PayloadAction<string>) => {
      state.page = payload;
    },
    setLocations: (state, { payload }: PayloadAction<Response<Location>>) => {
      state.locations = payload;
    },
  },
});

export const { setLoading, setPage, setLocations } = locationsSlice.actions;

export const selectLocations = (state: RootState) => state.locations;

export const getLocations = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { locations } = selectLocations(getState());

  let url;
  if (locations.info.next) {
    url = locations.info.next;
    dispatch(setPage(locations.info.next.split("page=")[1]));
  } else {
    url = "https://rickandmortyapi.com/api/location";
    dispatch(setPage("1"));
  }
  const resp = await fetch(url);
  const jsonData = await resp.json();
  if (jsonData) {
    dispatch(setLocations(jsonData));
  }
  dispatch(setLoading(false));
};

export default locationsSlice.reducer;
