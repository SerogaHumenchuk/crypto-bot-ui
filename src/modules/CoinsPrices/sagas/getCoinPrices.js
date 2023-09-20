import { put, call } from "redux-saga/effects";
import { coinPricesActions } from "../reducer";
import axios from "axios";

export const getCoinPrices = function* () {
  try {
    yield put(coinPricesActions.getCoinPrices.request());
    const { data } = yield call(axios.get, "http://localhost:3001/diffs", {
      headers: { ["Content-Type"]: "application/json" },
    });
    yield put(coinPricesActions.getCoinPrices.success(data));
  } catch (error) {
    yield put(coinPricesActions.getCoinPrices.failure(error));
  } finally {
    yield put(coinPricesActions.getCoinPrices.fulfill());
  }
};
