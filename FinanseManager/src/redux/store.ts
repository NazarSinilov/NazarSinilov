import { configureStore } from '@reduxjs/toolkit';
import thunk from "redux-thunk"
import AsyncStorage from "@react-native-async-storage/async-storage";
import {persistReducer, persistStore} from "redux-persist";
import configReducer from "./userConfigSlice";
import expensesReducer from "./expensesSlice";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, configReducer)
const persistedReducerExpenses = persistReducer(persistConfig, expensesReducer)

export const store = configureStore({
    reducer: {
        config: persistedReducer,
        expenses: persistedReducerExpenses
    },
    middleware: [thunk]
});

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>