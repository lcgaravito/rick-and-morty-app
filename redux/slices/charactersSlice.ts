import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Character, CharacterDetail, Response } from "../../types";
import { AppThunk, RootState } from "../store";

interface CharactersState {
  loading: boolean;
  characters: Response<Character>;
  selectedCharacter?: CharacterDetail;
  page: string;
  favoriteCharacters: Character[];
}

const initialState: CharactersState = {
  loading: false,
  page: "1",
  characters: {
    info: {
      count: 0,
      pages: 0,
      next: null,
      prev: null,
    },
    results: [],
  },
  favoriteCharacters: [],
};

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    toggleFavoriteCharacter: (state, { payload }: PayloadAction<Character>) => {
      if (
        state.favoriteCharacters.find(
          (character) => character.id === payload.id
        )
      ) {
        state.favoriteCharacters = state.favoriteCharacters.filter(
          (character) => character.id !== payload.id
        );
      } else {
        state.favoriteCharacters.push(payload);
      }
    },
    setLoading: (state, { payload }: PayloadAction<boolean>) => {
      state.loading = payload;
    },
    setPage: (state, { payload }: PayloadAction<string>) => {
      state.page = payload;
    },
    setCharacters: (state, { payload }: PayloadAction<Response<Character>>) => {
      state.characters = payload;
    },
    setSelectedCharacter: (
      state,
      { payload }: PayloadAction<CharacterDetail>
    ) => {
      state.selectedCharacter = payload;
    },
  },
});

export const {
  toggleFavoriteCharacter,
  setLoading,
  setPage,
  setCharacters,
  setSelectedCharacter,
} = charactersSlice.actions;

export const selectCharacters = (state: RootState) => state.characters;

export const getCharacters = (): AppThunk => async (dispatch, getState) => {
  dispatch(setLoading(true));
  const { characters } = selectCharacters(getState());

  let url;
  if (characters.info.next) {
    url = characters.info.next;
    dispatch(setPage(characters.info.next.split("page=")[1]));
  } else {
    url = "https://rickandmortyapi.com/api/character/";
    dispatch(setPage("1"));
  }
  const response = await fetch(url);
  const jsonData = await response.json();
  if (jsonData) {
    dispatch(setCharacters(jsonData));
  }
  dispatch(setLoading(false));
};

export const getSelectedCharacter = (url: string): AppThunk => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const response = await fetch(url);
    const jsonData = await response.json();
    if (jsonData) {
      dispatch(setSelectedCharacter(jsonData));
    }
    dispatch(setLoading(false));
  };
};

export default charactersSlice.reducer;
