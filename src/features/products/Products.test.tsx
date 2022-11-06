import React from "react"
import { renderComponent } from "../test.utils"
import { Products } from "./Products"
import * as api from "../../app/api"
import mockProducts from "../../../public/products.json"
import { getByRole, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const getProductsSpy = jest.spyOn(api, "getProducts") //// we spy on getProducts method
getProductsSpy.mockResolvedValue(mockProducts)        //// each time it's triggered we mock its result

describe("Products component test", () => {
  it("should render Products component", async () => {
    const { debug } = renderComponent(<Products />)

    await waitFor(() => expect(getProductsSpy).toHaveBeenCalledTimes(1))
    const articles = screen.getAllByRole("article")
    expect(articles.length).toEqual(mockProducts.length)
  })


  it("each individual product should contain a heading", async () => {
    renderComponent(<Products />)
    for (let product of mockProducts) {
      await screen.findByRole("heading", { name: product.name })
    }
  })

  it("should be able to add a product to the cart", async () => {
    const { store } = renderComponent(<Products />)
    const heading = await screen.findByRole("heading", { name: /Bananas/i })
    const card = heading.parentNode
    const button = getByRole(card as HTMLElement, "button")

    userEvent.click(button)
    expect(Object.keys(store.getState().cart.items)).toHaveLength(1)
    userEvent.click(button)
    expect(Object.keys(store.getState().cart.items)).toHaveLength(1)
    expect(Object.values(store.getState().cart.items)).toEqual([2])
  })
})