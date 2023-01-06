import { useDispatch, useSelector } from "react-redux"
import { api } from "../api"
import { clearErrorMessage, onLoading, onLogin, onLogout } from "../store/reducers/authSlice"
import { useCartStore } from "./useCartStore"

export const useAuthStore = () => {
    const { status, user, errorMessage, loadingAuth } = useSelector(state => state.auth)
    const dispatch = useDispatch()
    const { items, startLoadCartItems } = useCartStore()


    const startRegister = async(dataUser) => {
        dispatch(onLoading())
        try {  // Ver si hay cartItems en el localStorage para llevarlos a la DB con el nuevo User creado
            
            const { data } = await api.post('/auth/register', dataUser)    
            localStorage.setItem('token', data.token)   // Store token on the Client
            const { user } = data

            // Get the actual cartItems
            // let cartItems = JSON.parse(localStorage.getItem('cartItems')) ?? []
            items

            // Si no hay Items, no se realizara ninguna request
            const promisedItems = items.map(item => api.post(`/cart/user/${user.id}`, item))
            await Promise.all([ ...promisedItems ])
            console.log('LocalItems saved in DB!')

            // Limpio los items del localStorage
            localStorage.removeItem('cartItems') 

            dispatch(onLogin({ user }))  // Al iniciar, las routes /register y /login no existen, pero en nuestro pathname
            // actual es alguno de estos. Con lo cual, nos vamos al Navigate to='/home' replace=true. Pero, aun con ese replace,
            // react router no me deja hacer go back para ir a esas routes. Quiza si voy pero estan rapido la validacion que no lo veo
            // y vuelvo al home, puede ser no se
            
            await startLoadCartItems(user)  // Hay user, obtiene los items desde DB
            // Si no manipulo nada de los items, los dejo tal cual
        } catch (err) {
            // console.log(err)
            const { error, msg } = err.response.data
            console.log({ error, msg })
            dispatch(onLogout({}))
        }

    }

    const startLogin = async({ email, password }) => {
        dispatch(onLoading())
        try {
            const { data } = await api.post('/auth/login', { email, password })
            localStorage.setItem('token', data.token)   // Store token on the Client
            const { user } = data

            // Una vez con session del User, cualquier items en el localStorage se elimina. El user ya tiene sus cartItems en DB
            localStorage.removeItem('cartItems')

            dispatch(onLogin({ user }))  // Mismo caso que el de arriba

            await startLoadCartItems(user)  // Hay user, obtiene los items desde DB
            // Si no manipulo nada de los items, los dejo tal cual

        } catch (err) {
            // Habria que manejar mejor los posibles errors
            const { error, msg } = err.response.data
            console.log({ error, msg })
            dispatch(onLogout({ error: 'Incorrect email or password.' }))
        }
    }

    const startLogout = async() => {
        localStorage.removeItem('token')  // Remuevo solo el token
        dispatch(onLoading())
        // Podriamos saltear este paso, ya que el propio checkToken() se encarga de usar el onLogout()
        // Para ello su useEffect debera correr siempre.
        console.log('logout')

        await startLoadCartItems()  // No hay user, y no hay cartItems en localStorage en <logout></logout>
        setTimeout(() => {
            dispatch(onLogout()) // Es muy rapido el cambio que hace que no se vea el Loading
            

        }, 0.3*1000);


    }

    const checkToken = async() => {
        dispatch(onLoading())
        // Cuando no existe el token
        console.log('Check')
        const token = localStorage.getItem('token')
        
        if(!token){
            dispatch(onLogout())
            console.log('Not User')
            await startLoadCartItems()
            return 
        }

        let user;
        try {
            // Cuando el token es valido
            const { data } = await api.get('/auth/check')
            user = data.user
        
            await startLoadCartItems(user)
            dispatch(onLogin({ user }))
            console.log(data.msg)

        } catch (err) {
            // Cuando expiro el token
            const { error } = err.response.data
            console.log({ tokenErr: error })
            dispatch(onLogout())
            console.log('Not User')
            localStorage.clear()
            await startLoadCartItems()

        }




    }

    const startClearMessage = () => {
        dispatch(clearErrorMessage())
    }

    return {
        status, user, errorMessage, loadingAuth,
        startRegister,
        startLogin,
        startLogout,
        startClearMessage,
        checkToken
    }
       
    
}