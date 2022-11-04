import { getStoreWithState, RootState, store } from '../app/store';
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import React from "react";
import { MemoryRouter } from "react-router-dom";
import { Product } from "../app/api";


export function renderComponent(component: JSX.Element, state?: RootState) {
  const store = getStoreWithState(state)
  const utils = render(
    <Provider store={store}>
      <MemoryRouter>{component}</MemoryRouter>
    </Provider>
  )
  return { store, ...utils }
}

export function getStateWithItems(items: Record<string, number>, products: Record<string, Product> = {}) {
  const state: RootState = {
    cart: {
      errorMessage: "",
      checkoutState: "READY",
      items
    },
    products: { products }
  }
  return state
}