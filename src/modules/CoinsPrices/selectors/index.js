import * as R from "ramda";
export const coinPricesSelector = R.pathOr({}, ["coinPrices", "prices"]);
export const exchangersSelector = R.pathOr([], ["coinPrices", "exchangers"]);
