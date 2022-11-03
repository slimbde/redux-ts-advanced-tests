import * as api from "./api"



jest.mock("./api", () => {
  return {
    async getProducts() {
      return []
    },

    async checkout(items: api.CartItems = {}) {
      const empty = Object.keys(items).length = 0
      if (empty) throw new Error("Must include cart items")
      if (items.badItem > 0) return { success: false }
      return { success: true }
    }
  }
})

describe("api test", () => {
  it("checkout should work", async () => {
    await api.checkout({ "22": 4 })
  })
})