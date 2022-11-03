import { RootState } from './../../app/store';
import cartReducer, { addToCart, CartState, getMemoizedNumItems, getNumItems, getTotalPrice, removeFromCart, updateQuantity } from "./cartSlice"
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


describe("selectors", () => {
  describe("getNumItems", () => {
    let rootState: RootState

    beforeEach(() => {
      rootState = {
        cart: {
          items: {},
          checkoutState: "READY",
          errorMessage: "",
        },
        products: {
          products: {}
        }
      }
    })

    it("should return 0 with no items", () => {
      const count = getNumItems(rootState)
      expect(count).toBe(0)
    })

    it("should add up the total", () => {
      rootState = {
        ...rootState,
        cart: {
          ...rootState.cart,
          items: { abc: 3, def: 2 }
        }
      }

      const count = getNumItems(rootState)
      expect(count).toBe(5)
    })
  })

  describe("getMemoizedNumItems", () => {
    it("should return 0 with no items", () => {
      const cart: CartState = {
        items: {},
        checkoutState: "READY",
        errorMessage: "",
      }
      const count = getMemoizedNumItems({ cart } as RootState)
      expect(count).toBe(0)
    })

    it("should add up the totals", () => {
      const cart: CartState = {
        items: { abc: 22, def: 11 },
        checkoutState: "READY",
        errorMessage: "",
      }
      const count = getMemoizedNumItems({ cart } as RootState)
      expect(count).toBe(33)
    })

    it("should not compute with the same state", () => {
      const cart: CartState = {
        items: { abc: 22, def: 11 },
        checkoutState: "READY",
        errorMessage: "",
      }

      getMemoizedNumItems.resetRecomputations() ///// <<< resets its computations

      const count = getMemoizedNumItems({ cart } as RootState)
      const count2 = getMemoizedNumItems({ cart } as RootState)
      expect(getMemoizedNumItems.recomputations()).toBe(1)
    })

    it("should recompute with new state", () => {
      const cart: CartState = {
        items: { abc: 22, def: 11 },
        checkoutState: "READY",
        errorMessage: "",
      }

      getMemoizedNumItems.resetRecomputations() ///// <<< resets its computations

      getMemoizedNumItems({ cart } as RootState)
      getMemoizedNumItems({ cart } as RootState)

      cart.items = { abc: 2 }
      getMemoizedNumItems({ cart } as RootState)
      expect(getMemoizedNumItems.recomputations()).toBe(2)
    })
  })

  describe("getTotalPrice", () => {
    let rootState: RootState

    it("should return 0 with no items", () => {
      rootState = {
        cart: {
          checkoutState: "READY",
          errorMessage: "",
          items: {}
        },
        products: {
          products: {}
        }
      }
      const total = getTotalPrice(rootState)
      expect(total).toBe((+0).toFixed(2))
    })

    it("should calculate price correctly", () => {
      rootState = {
        cart: {
          ...rootState.cart,
          items: {
            [products[0].id]: 3,
            [products[1].id]: 2,
          }
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          }
        }
      }

      const price = products[0].price * rootState.cart.items[products[0].id] +
        products[1].price * rootState.cart.items[products[1].id]

      const total = getTotalPrice(rootState)

      expect(total).toBe(price.toFixed(2))
    })

    it("should not recompute with the same state", () => {
      rootState = {
        cart: {
          ...rootState.cart,
          items: {
            [products[0].id]: 3,
            [products[1].id]: 2,
          }
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          }
        }
      }

      getTotalPrice.resetRecomputations()

      getTotalPrice({ ...rootState })               ////// we send a brand new but equal object
      expect(getTotalPrice.recomputations()).toBe(1)
      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(1)
    })

    it("should recompute on cart change", () => {
      rootState = {
        cart: {
          ...rootState.cart,
          items: {
            [products[0].id]: 3,
            [products[1].id]: 2,
          }
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          }
        }
      }

      getTotalPrice.resetRecomputations()

      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(1)
      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(1)

      rootState.cart.items = {
        [products[0].id]: 3,
      }

      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(2)
    })

    it("should recompute on products change", () => {
      rootState = {
        cart: {
          ...rootState.cart,
          items: {
            [products[0].id]: 3,
            [products[1].id]: 2,
          }
        },
        products: {
          products: {
            [products[0].id]: products[0],
            [products[1].id]: products[1],
          }
        }
      }

      getTotalPrice.resetRecomputations()

      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(1)
      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(1)

      rootState.products.products = {
        [products[0].id]: products[0],
        [products[1].id]: products[1],
        [products[2].id]: products[2],
      }

      getTotalPrice({ ...rootState })
      expect(getTotalPrice.recomputations()).toBe(2)
    })
  })
})