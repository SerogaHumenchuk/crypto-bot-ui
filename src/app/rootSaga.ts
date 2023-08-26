import { ISagaNoAction } from "../shared/interfaces";
import { delay, fork } from "redux-saga/effects";
import { coinsPricesRootSaga } from "../modules/CoinsPrices/sagas";

export const rootSaga: ISagaNoAction = function* () {
  yield fork(coinsPricesRootSaga);
};
