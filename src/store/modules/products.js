import shop from "@/api/shop";

export default {
  namespaced: true,

  state: {
    items: []
  },

  getters: {
    availableProducts (state, getters) {
      //get products with inventory more than zero
      return state.items.filter(product => product.inventory > 0)
    },

    productIsInStock () {
      return (product) => {
        return product.inventory > 0
      }
    }
  },

  mutations: {
    setProducts (state, products) {
      // update products
      state.items = products
    },

    //decrement product
    decrementProductInventory (state, product) {
      product.inventory--
    }
  },

  actions: {
    fetchProducts({commit}) {
      return new Promise((resolve, reject) => {
        // make the call
        // call setProducts mutation
        shop.getProducts(products => {
          commit('setProducts', products)
          resolve()
        })
      })
    }
  }
}
