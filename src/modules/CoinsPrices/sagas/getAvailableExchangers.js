import { put, call } from "redux-saga/effects";
import { coinPricesActions } from "../reducer";
import axios from "axios";

export const getAvailableExchangers = function* () {
  try {
    yield put(coinPricesActions.getAvailableExchangers.request());
    const { data } = yield call(
      axios.get,
      "https://crypto-bot-api.onrender.com/available-exchangers",
      {
        headers: { ["Content-Type"]: "application/json" },
      },
    );
    yield put(coinPricesActions.getAvailableExchangers.success(data));
  } catch (error) {
    yield put(coinPricesActions.getAvailableExchangers.failure(error));
  } finally {
    yield put(coinPricesActions.getAvailableExchangers.fulfill());
  }
};
