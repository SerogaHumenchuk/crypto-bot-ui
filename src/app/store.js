import { configureStore, combineReducers } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { rootSaga } from "./rootSaga";
import { coinPricesReducer } from "../modules/CoinsPrices/reducer";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  coinPrices: coinPricesReducer.reducer,
});

const middlewares = [sagaMiddleware];
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false, serializableCheck: false }).concat(
      middlewares,
    ),
});

sagaMiddleware.run(rootSaga);
