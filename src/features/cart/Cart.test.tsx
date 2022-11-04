import React from "react";
import { getStateWithItems, renderComponent } from "../test.utils";
import { Cart } from "./Cart";
import { screen } from "@testing-library/react"
import products from "../../../public/products.json"
import userEvent from "@testing-library/user-event";



it("an empty cart should not have any items", async () => {
  renderComponent(<Cart />)
  const rows = await screen.findAllByRole("row")
  expect(rows).toHaveLength(2)
  screen.getByText("$0.00", { selector: ".total" })   ///// it throws an error if it doesn't exist
})

it("cart should display correct total", async () => {
  const p0 = products[0]
  const p1 = products[1]

  const state = getStateWithItems({
    [p0.id]: 2,
    [p1.id]: 1,
  }, {
    [p0.id]: p0,
    [p1.id]: p1,
  })

  renderComponent(<Cart />, state)

  const rows = await screen.findAllByRole("row")
  expect(rows).toHaveLength(4)

  const price = (p0.price * 2 + p1.price).toFixed(2)

  screen.getByText(`$${price}`, { selector: ".total" })
})

it("changes total when quantity changes", async () => {
  const p0 = products[0]
  const p1 = products[1]

  const state = getStateWithItems({
    [p0.id]: 2,
    [p1.id]: 1,
  }, {
    [p0.id]: p0,
    [p1.id]: p1,
  })

  const utils = renderComponent(<Cart />, state)

  const rows = await utils.findAllByRole("row")
  expect(rows).toHaveLength(4)

  const quantity1 = utils.getAllByTestId("quantity")[0]
  userEvent.clear(quantity1)
  userEvent.tab()

  let price = p1.price.toFixed(2)
  utils.getByText(`$${price}`, { selector: ".total" })

  userEvent.type(quantity1, "1")
  userEvent.tab()

  price = (p0.price * 1 + p1.price).toFixed(2)
  utils.getByText(`$${price}`, { selector: ".total" })
})