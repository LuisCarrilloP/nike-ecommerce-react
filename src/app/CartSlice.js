import { createSlice } from '@reduxjs/toolkit'
import toast from "react-hot-toast"

const initialState = {
  cartState: false,
  cartItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  cartTotalAmount: 0,
  cartTotalQty: 0
}

const CartSlice = createSlice({
  initialState,
  name: "cart",
  reducers: {
    setOpenCart: (state, action) => {
      state.cartState = action.payload.cartState
    },
    setCloseCart: (state, action) => {
      state.cartState = action.payload.cartState
    },
    setAddItemToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if(itemIndex >= 0){
        state.cartItems[itemIndex].cartQty += 1

        toast.success(`${state.cartItems[itemIndex].cartQty} ${action.payload.title} in Cart`)
      }else{
        const temp = {...action.payload, cartQty: 1}
        state.cartItems.push(temp)  

        toast.success(`${action.payload.title} added to Cart`)//action.payload.title = name of the item
      }

      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    setRemoveItemFromCart: (state, action) => {
      const removeItem = state.cartItems.filter((item) => item.id !== action.payload.id)

      state.cartItems = removeItem
      localStorage.setItem('cart', JSON.stringify(state.cartItems))

      toast.success(`${action.payload.title} Removed from Cart`)//action.payload.title = name of the item
    },
    setIncreaseItemQtyt: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if(itemIndex >= 0){
        state.cartItems[itemIndex].cartQty += 1
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    setDecreaseItemQtyt: (state, action) => {
      const itemIndex = state.cartItems.findIndex((item) => item.id === action.payload.id)

      if(state.cartItems[itemIndex].cartQty > 1){
        state.cartItems[itemIndex].cartQty -= 1
      }
      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    setClearCartItems: (state, action) => {
      state.cartItems = []
      toast.success(`Cart Cleared`)

      localStorage.setItem('cart', JSON.stringify(state.cartItems))
    },
    setGetTotals: (state, action) => {
      let { totalAmount, totalQty } = state.cartItems.reduce((cartTotal, cartItem) => {
        const { price, cartQty } = cartItem
        const totalPrice = price * cartQty

        cartTotal.totalAmount += totalPrice
        cartTotal.totalQty += cartQty

        return cartTotal
      }, {
        totalAmount: 0,
        totalQty: 0
      })

      state.cartTotalAmount = totalAmount
      state.cartTotalQty = totalQty
    }
  }
})

export const { setOpenCart, setCloseCart, setAddItemToCart, setRemoveItemFromCart, setIncreaseItemQtyt, setDecreaseItemQtyt, setClearCartItems, setGetTotals } = CartSlice.actions

export const selectCartState = (state) => state.cart.cartState
export const selectCartItems = (state) => state.cart.cartItems

export const selectTotalAmount = (state) => state.cart.cartTotalAmount
export const selectTotalQty = (state) => state.cart.cartTotalQty

export default CartSlice.reducer