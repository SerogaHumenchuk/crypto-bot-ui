import { SagaIterator } from "redux-saga";

export interface Action<T = any> {
  type: string;
  payload: T;
}
export interface ISagaWithAction<T = {}> {
  (action: Action<T>): SagaIterator;
}

export interface ISaga<T = {}> {
  (action: T): SagaIterator;
}

export interface ISagaNoAction {
  (): SagaIterator;
}
