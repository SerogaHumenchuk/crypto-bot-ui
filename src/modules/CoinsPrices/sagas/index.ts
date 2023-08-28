import { call } from "redux-saga/effects";
import { ISagaNoAction } from "../../../shared/interfaces";
import axios from "axios";

export const coinsPricesRootSaga: ISagaNoAction = function* () {
  yield call(axios.get, "http://localhost:3001/diffs", {
    headers: { ["Content-Type"]: "application/json" },
  });
  yield call(axios.get, "http://localhost:3001/prices", {
    headers: { ["Content-Type"]: "application/json" },
  });
};
