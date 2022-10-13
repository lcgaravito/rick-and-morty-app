import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import charactersSlice from "./slices/charactersSlice";
import locationsSlice from "./slices/locationsSlice";

const store = configureStore({
  reducer: {
    characters: charactersSlice,
    locations: locationsSlice,
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
