import { createSlice } from '@reduxjs/toolkit'

export const apiDataSlice = createSlice({
    name: 'apiData',
    initialState: {
        requestLaunched: false,
        loadingApiData: true,
        data: {}
    },
    reducers: {
        onSetData: (state, { payload }) => {
            state.data = payload  // payload: e.g. { colors, products } 
        },
        onSetRequestLaunched: (state, { payload }) => {
            state.requestLaunched = payload
        },
        onSetLoadingApiData: (state, { payload }) => {
            state.loadingApiData = payload
        }
    }
})
export const { onSetData, onSetRequestLaunched, onSetLoadingApiData } = apiDataSlice.actions