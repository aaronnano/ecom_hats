import { createSlice } from '@reduxjs/toolkit'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        loadingCart: true,
        items: [],  // item: {product , quantity: 0}
        total: 0
    },
    reducers: {
        onAddItem: (state, { payload }) => {  // ProductPage
            state.items.push(payload)   // Nota: En cada operacion (+,-, *), en todas, siempre debe estar el Number(toFixed())
            state.total = Number((state.total + payload.product.price * payload.quantity).toFixed(2))  // 2 decimals
            // loadingCart = false ?
        },
        onDeleteItem: (state, { payload }) => {   // CartItem Component
            state.items = state.items.filter(item => item.id !== payload.id)
            state.total = Number((state.total - payload.product.price * payload.quantity).toFixed(2))  // 2 decimals
        },
        onClearItems: (state, { payload }) => {   // CartItem Component
            state.items = []
            state.total = 0
        },
        onSetLoadingCart: (state, { payload }) => {
            state.loadingCart = payload
        }
    }
})
export const { onAddItem, onDeleteItem, onClearItems, onSetLoadingCart } = cartSlice.actions