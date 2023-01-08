import { useDispatch, useSelector } from "react-redux"
import { api } from "../api"
import { uploadFile } from "../firebase/config"
import { onSetLoadingApi } from "../store/reducers/apiSlice"
import { onLoading, onLogin } from "../store/reducers/authSlice"
import { useAuthStore } from "./useAuthStore"
import { v4 } from 'uuid'
import { useState } from "react"
import { useCartStore } from "./useCartStore"


export const useApi = () => {  // Nota: el messageApi como modo de excepcion debe estar en un Store si o si
    // Esto por el cambio de ruta del settings/{user}
    const { loadingApi } = useSelector(state => state.api)
    const dispatch = useDispatch()
    const [messageApi, setMessageApi] = useState('')
    const { user, checkToken } = useAuthStore()
    const { items, startLoadCartItems } = useCartStore()
    const [dataApi, setDataApi] = useState({})


    const startUpdateUser = async(dataUser) => {
        dispatch(onLoading())
        try {
            const { data } = await api.put(`users/${user.id}`, dataUser) 
            // Recuerda que se envia el token y ve si es valido o no
            // Prisma no toma en cuenta los undefined
            const { user: newUser } = data
            
            // Keep the Session. Podria llamar a checkToken() para ver si la session sigue o no
            dispatch(onLogin({ user: newUser }))
            setMessageApi('Changes Done !')

            return newUser

        } catch (err) {
            await checkToken() // Logout si el token expira, Login si sigue siendo valido
            // Ponerlo en los lugares fijos para que ante cada accion vaya a hacer el checkToken()
            // Aqui esta bien.
            await startLoadCartItems()
            const { error, msg } = err.response.data
            console.log(error)
        }
        
        // No se envia ningun User
    }

    const startUploadAvatar = async(file) => {  // Capaz habria que unificarlo con startUpdateUser
        dispatch(onSetLoadingApi(true))
        // Hacer un checkToken para que no se suba si el user expiro
        try {
            
            const url = await uploadFile(file, 'Avatars', user.uuid)  // Avatars/uuid de la imagen
            console.log('Update Done: ' + url)

            // Podria usar el startUpdateUser pero debe ser modificado
            const { data } = await api.put(`users/${user.id}`, { avatar: url  }) 
            const { user: userUpdated } = data
            
            dispatch(onLogin({ user: userUpdated }))
            setMessageApi('Avatar Updated !')
            
        } catch (err) {
            await checkToken()
            await startLoadCartItems()

            console.log({err})
            
            setMessageApi('Error in updating the avatar')
        }
        return dispatch(onSetLoadingApi(false))
    }

    // # Product: { title, description, image, price, category, colors }
    const startCreateProduct = async(newProduct) => {
        dispatch(onSetLoadingApi(true))

        try {
            const image = await uploadFile(newProduct.image, 'Products', v4().slice(0,8))
            // Algun dia el uuid generando ya exista en firebase
            // UrlImage. Deberia incluir el uuid del product, pero recien estoy creandolo. 
            console.log('Update Done: ' + image)
            newProduct.image = image

            const { data } = await api.post('/products', newProduct)
            // Aqui si no cambio el header, lleva el token (existente o vacio). Por ahora no requiero de ningun token
            setDataApi(data)  // Muestro la data recibida
            console.log('Successful!')
            setMessageApi('Product Created !')

        } catch (err) {
            if (err?.response?.status === 500){
                const { error, msg } = err.response.data
                console.log({error})
            }
            setMessageApi('Error in creating the product')
        }
        return dispatch(onSetLoadingApi(false))
    }

    const startDeleteAddress = async(address) => {
        dispatch(onSetLoadingApi(true))
        setMessageApi('')
        try {
            const { data } = await api.delete(`users/${user.id}/address/${address.id}`) 
            const { user: newUser } = data
            
            // Keep the Session. Podria llamar a checkToken() para ver si la session sigue o no
            dispatch(onLogin({ user: newUser }))
            setMessageApi('Changes Done !')

        } catch (err) {
            await checkToken()
            await startLoadCartItems()
            if (err.response.status === 500){
                const { error, msg } = err.response.data
                console.log({error, msg})
            }
        }
        return dispatch(onSetLoadingApi(false))
    }

    const startCreateOrder = async(order) => {
        dispatch(onSetLoadingApi(true))
        let newOrder;
        try {
            let { data } = await api.post(`order/user/${user.id}`, order)
            newOrder = data.order

            const { data:data2 } = await api.get(`/users/${user.id}`) 
            const newUser = data2.user

            await startLoadCartItems(newUser)
            dispatch(onLogin({ user: newUser }))
            console.log('Order Created !')


        } catch (err) {
            await checkToken()
            await startLoadCartItems()
            if (err.response.status === 500){
                const { error, msg } = err.response.data
                console.log({error, msg})
            }
            const { error, msg } = err.response.data
            console.log({error, msg})
        }
        dispatch(onSetLoadingApi(false))
        return newOrder
    }

    return {
        startUpdateUser, setMessageApi, startUploadAvatar,
        startCreateProduct, startDeleteAddress,
        startCreateOrder,
        dataApi,
        messageApi,
        loadingApi,
    }
}