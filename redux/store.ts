import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import charactersSlice from "./slices/charactersSlice";

const store = configureStore({
  reducer: {
    characters: charactersSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export default store;
