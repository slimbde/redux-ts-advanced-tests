import React from "react"
import { renderComponent } from "../test.utils"
import { CartLink } from "./CartLink"
import { addToCart, removeFromCart, updateQuantity } from "./cartSlice"


describe("cart link tests", () => {


  it("should display cart link", () => {
    const { store, ...utils } = renderComponent(<CartLink />)
    expect(utils.getByRole("link")).toBeInTheDocument()
  })

  it("should display text Cart when cart is empty", () => {
    const { store, ...utils } = renderComponent(<CartLink />)
    const cart = utils.getByRole("link")
    expect(cart).toHaveTextContent("Cart")
    expect(cart).not.toHaveTextContent("0")
    expect(cart).not.toHaveTextContent("1")
  })

  it("should display quantity", () => {
    const { store, ...utils } = renderComponent(<CartLink />)
    const cart = utils.getByRole("link")
    expect(cart).toHaveTextContent("Cart")

    store.dispatch(addToCart("item1"))
    expect(cart).toHaveTextContent("1")

    store.dispatch(updateQuantity({ id: "item1", quantity: 50 }))
    expect(cart).toHaveTextContent("50")

    store.dispatch(removeFromCart("item1"))
    expect(cart).toHaveTextContent("Cart")
  })
})

