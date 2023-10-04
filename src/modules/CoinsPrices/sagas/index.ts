import { delay, put, takeLatest } from "redux-saga/effects";
import { ISagaNoAction } from "../../../shared/interfaces";
import { coinPricesActions } from "../reducer";
import { getCoinPrices } from "./getCoinPrices";
import { getAvailableExchangers } from "./getAvailableExchangers";

export const coinsPricesRootSaga: ISagaNoAction = function* () {
  yield takeLatest(coinPricesActions.getCoinPrices.trigger, getCoinPrices);
  yield takeLatest(
    coinPricesActions.getAvailableExchangers.trigger,
    getAvailableExchangers,
  );
  yield put(coinPricesActions.getAvailableExchangers.trigger());

  while (true) {
    yield put(coinPricesActions.getCoinPrices.trigger());
    yield delay(15000);
  }
};
