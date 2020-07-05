/*
 * @Author: hannq
 * @Date: 2020-06-04 12:03:30
 * @Last Modified by: hannq
 * @Last Modified time: 2020-07-03 13:59:57
 */

import type { IActorsFactory, IStore, Combine } from './helper';
import { initStateMap } from './init-state';

/**
 * 创建 actorsFactory
 */
export function createActorsFactory<S extends object[]>(...defaultStates: S) {
  // @ts-ignore
  return function<A extends any>(actorsFactory: IActorsFactory<S, A>) {
    initStateMap.set(actorsFactory, Object.assign({}, ...defaultStates));
    return actorsFactory;
  }
}

export function createActorsFactory2<S extends object[], AF extends (store: IStore<Combine<S[number]>>) => any>(defaultStates: S, actorsFactory: AF): AF;
export function createActorsFactory2<S extends object, AF extends (store: IStore<S>) => any>(defaultStates: S, actorsFactory: AF): AF;

/**
 * 创建 actorsFactory
 */
export function createActorsFactory2(
  defaultStates,
  actorsFactory
) {
  const defaultState = Array.isArray(defaultStates) ? Object.assign({}, ...defaultStates) : { ...defaultStates };
  initStateMap.set(actorsFactory, defaultState);
  return actorsFactory;
}

/**
 * 合并 ActorsFactories
 * @param factories
 */
export function combineActorsFactories<F>(factories: F) {
  return factories
}

/**
 * 统一使用的 reducer
 * @param prevState
 * @param param1
 */
export function unionReducer(prevState: object, { payload, namespace }: { type: string, namespace?: string, payload: object }) {
  if (namespace) {
    return {
      ...prevState,
      [namespace]: {
        ...prevState[namespace],
        ...payload
      }
    }
  } else {
    return {
      ...prevState,
      ...payload,
    }
  }
}
