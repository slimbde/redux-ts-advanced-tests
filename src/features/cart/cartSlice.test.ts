import cartReducer, { addToCart, CartState, removeFromCart, updateQuantity } from "./cartSlice"
import products from "../../../public/products.json"


describe("cart reducer", () => {
  let initialState: CartState

  beforeEach(() => {
    initialState = {
      items: {},
      checkoutState: "READY",
      errorMessage: "",
    }
  })

  test("returns the initial state when pass an empty action", () => {
    const state = undefined
    const action = { type: "" }
    const result = cartReducer(state, action)
    expect(result).toEqual(initialState)
  })

  test("performs addToCart action correctly", () => {
    const state = undefined
    const productId = products[0].id
    const action = addToCart(productId)
    const result = cartReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      items: { [productId]: 1 },
    })
  })

  test("performs removeFromCart correctly", () => {
    const productId = products[0].id
    const state: CartState = {
      ...initialState,
      items: { [productId]: 1 },
    }
    const action = removeFromCart(productId)
    const result = cartReducer(state, action)
    expect(result).toEqual(initialState)
  })

  test("perform updateQuantity correctly", () => {
    const productId = products[0].id
    const state: CartState = {
      ...initialState,
      items: { [productId]: 1 },
    }
    const action = updateQuantity({ id: productId, quantity: 100 })
    const result = cartReducer(state, action)
    expect(result).toEqual({
      ...initialState,
      items: { [productId]: 100 }
    })
  })
})