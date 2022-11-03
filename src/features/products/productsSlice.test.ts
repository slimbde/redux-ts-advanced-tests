import productsReducer, { receivedProducts } from "./productsSlice"
import products from "../../../public/products.json"


describe("products reducer", () => {
  it("should return the initial state when passed an empty action", () => {
    const initialState = {
      products: {}
    }
    expect(productsReducer(undefined, { type: "" })).toEqual(initialState)
  })

  it("should convert the products received to an object", () => {
    const initialState = {
      products: {}
    }
    const action = receivedProducts(products)
    const result = productsReducer(initialState, action)

    expect(Object.keys(result.products).length).toBe(products.length)
    products.forEach(product => {
      expect(result.products[product.id]).toEqual(product)
    })
  })

  it("should not allow the same product to be added more than once", () => {
    const initialState = undefined
    const action = receivedProducts(products)
    let result = productsReducer(initialState, action)

    expect(Object.keys(result.products).length).toBe(products.length)
    products.forEach(product => {
      expect(result.products[product.id]).toEqual(product)
    })

    result = productsReducer(result, action)
    expect(Object.keys(result.products).length).toBe(products.length)
  })

  it("should allow multiple products to be added in different times", () => {
    const initialState = undefined
    let action = receivedProducts(products.slice(0, 2))
    let result = productsReducer(initialState, action)

    expect(Object.keys(result.products).length).toBe(2)

    action = receivedProducts(products.slice(2, 5))
    result = productsReducer(result, action)
    expect(Object.keys(result.products).length).toBe(5)
  })
})