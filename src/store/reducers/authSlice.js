import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        status: 'init',  // 'init: al iniciar la app' / 'auth': existe user  / 'not-auth': no existe user
        user: null,  // {}
        loadingAuth: false,
        errorMessage: null
    },
    reducers: {
        onLogin: (state, { payload }) => {
            state.status = 'auth'
            state.user = payload.user
            state.errorMessage = null
            state.loadingAuth = false
        },
        onLogout: (state, { payload }) => {
            state.status = 'not-auth'
            state.user = null
            state.errorMessage = payload?.error  // Ante un error siempre estaremos en 'not-auth'
            // Si no hay payload, el error es un undefined
            state.loadingAuth = false
        },
        onLoading: (state, { payload }) => {
            state.loadingAuth = true
            state.errorMessage = null
            // No hacemos nada con el user
        },
        clearErrorMessage: (state, { payload }) => {
            state.errorMessage = null
        }
    }
})
export const { onLogin, onLogout, onLoading, clearErrorMessage  } = authSlice.actions