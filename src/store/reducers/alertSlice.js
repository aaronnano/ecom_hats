import { createSlice } from '@reduxjs/toolkit'

export const alertSlice = createSlice({
    name: 'alert',
    initialState: {
        isActive: false,
        message: '',
        color: ''
    },
    reducers: {
        onSetActive: (state, { payload }) => {
            state.isActive = true
            state.message = payload.message
            state.color = payload.color
        },
        onSetClose: (state, { payload }) => {
            state.isActive = false
        }
    }
})
export const { onSetActive, onSetClose } = alertSlice.actions