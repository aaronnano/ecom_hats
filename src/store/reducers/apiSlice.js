import { createSlice } from '@reduxjs/toolkit'

export const apiSlice = createSlice({
    name: 'api',
    initialState: {
        // messageApi: '',  // Este store solo es usado por el useApi por ser un caso unico
        loadingApi: false
    },
    reducers: {
        // onSetMessageApi: (state, { payload }) => {
        //     state.messageApi = payload
        // },
        onSetLoadingApi: (state, { payload }) => {
            state.loadingApi = payload
        }
    }
})
export const { onSetLoadingApi } = apiSlice.actions