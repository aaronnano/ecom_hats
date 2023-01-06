import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { v4 } from "uuid"
import { api } from "../api"
import { onAddItem, onClearItems, onDeleteItem, onSetLoadingCart } from "../store/reducers/cartSlice"
import { useAuthStore } from "./useAuthStore"

export const useCartStore = () => {
    // Si hay user, usamos solo la DB para que los Items persistan.
    // Si no hay, usamos el localStorage para los Items
    // Una vez guardados, pasamos los datos al cartStore de redux 
    // Nota: Creo que los mejor seria crear el model Cart en la DB y luego que se relacione con CartItems. Cart tendria e.g. el
    // field: total

    const { items, total, loadingCart } = useSelector(state => state.cart)
    const dispatch = useDispatch()

    const startSavingItem = async(cartItem, user) => {
        dispatch(onSetLoadingCart(true))
        console.log('Create cartItem')
        // Hay que cambiarlo, cuando creas un item y lo agregas al cartStore estos no tienen Id aun
        // Siguiendo se creara en la DB en donde si tienen Id. Solo tendran el id si hacer refresh de la pagina

        // Si no hay user, no llamo a la api. Solo hare lo del localStorage
        if(!user){
            // Debo crear un custom Id, porque no hay User con lo cual no puede usar la DB para crear el Id
            cartItem = { ...cartItem, id: v4().slice(0,8)}
            const localItems = [ ...items, cartItem ]           
            localStorage.setItem('cartItems', JSON.stringify(localItems))
            
        } else {
            try {
                const { data } = await api.post(`/cart/user/${user.id}`, cartItem)
                console.log('Items saved in DB!')
                cartItem = data.cartItem
    
            } catch (err) {
                if (err.response.status === 500){
                    const { error, msg } = err.response.data
                    console.log({error, msg})
                }
            }

        }
        
        dispatch(onAddItem(cartItem))
        dispatch(onSetLoadingCart(false))

    }
    const startDeletingItem = async(cartItem, user) => {
        dispatch(onSetLoadingCart(true))
        console.log({cartItem})
        
        if(!user){ // Si no hay user, no llamo a la api. Solo hare lo del localStorage
            const localItems = items.filter(item => item.id !== cartItem.id)
            localStorage.setItem('cartItems', JSON.stringify(localItems))
            
        } else {
            try {
                const { data } = await api.delete(`/cart/${cartItem.id}/user/${user.id}`)
                // Habria que cambiar en el backed el que no sea necesario pasar por el path el id del User
                // Ya que el user lo tenemos en el token y axios hace uso de el.
                console.log('Items deleted on DB!')
    
            } catch (err) {
                if (err.response.status === 500){
                    const { error, msg } = err.response.data
                    console.log({err: error + ' ' + msg})
                }
            }
        }


        dispatch(onDeleteItem(cartItem)) // Los items cambiaran. Lo podria poner arriba de todo tambien
        dispatch(onSetLoadingCart(false))

    }
    
    const startLoadCartItems = async(user) => {  // Recoge los items cuando el User cambia
        dispatch(onSetLoadingCart(true))
        let cartItems;  // Solo items que iran para el cartStore en state.items

        dispatch(onClearItems())
        // Llega user vacio, limpio todo el Store del Cart de redux. Tomara los items del localStorage
        // Llega user (logged), limpia tambien. Tomara los items de la DB
        // User logged, localStorage nada -> User logout, localStorage nada
        
        // User without Session
        if(!user){
            cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? []
            console.log('Items getted from localStorage! ' + (cartItems.length === 0 ? 'Empty' : 'Full'))
            // Se queda vacio el Store

        } else {
        // User with Session
            try {
                const { data } = await api.get(`/cart/user/${user.id}`)
                cartItems = data.cartItems
                console.log('Items getted from DB!')

            } catch (err) {
                if (err.response.status === 500){
                    const { error, msg } = err.response.data
                    console.log({error, msg})
                }
            }
        }

        console.log({cartItems})
        // Save en el store
        cartItems.map(item => dispatch(onAddItem(item)))
        dispatch(onSetLoadingCart(false))

    }


    return {
        items, total, loadingCart,
        startSavingItem,
        startDeletingItem,
        startLoadCartItems
    }
}


// const startDeletingItems = items.map((item) => 
//         //         api.delete(`/cart/${item.id}/user/${user.id}`))

//         //     await Promise.all([ ...startDeletingItems ])
//         //     console.log('Items removed from DB!')