import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { api } from "../api"
import { onSetData, onSetRequestLaunched, onSetLoadingApiData } from "../store/reducers/apiDataSlice"

export const useApiData = (listRoutes = []) => {   // Cuando se llame al hook en donde sea la first vez hace el request
    // pero ante cualquiersegunda llamada en cualquier parte de la app, no volvera a hacer request

    // El hook ya tiene a loadingApiData en true
    const { requestLaunched, data, loadingApiData } = useSelector(state => state.apiData)
    const dispatch = useDispatch()
    
    // Request data according to some route
    const startGetRequest = async(route) => {
        try {
            const { data: dataApi } = await api.get(`/${route}`)

            // setData(data => ({  // Forma anterior con:  const [data, setData] = useState({})
            //     ...data, [route]: dataApi[route]
            // }))
            
            return dataApi[route]  // data de e.g. colors o products

        } catch (err) {
            console.log(err)
            if(err.response.status === 404){
                console.log({[route]: err.message})  // Error al tratar de acceder a tal route

            } else if (err.response.status === 500){
                const { error, msg } = err.response.data
                console.log({error, msg})
            }
        }
    }

    // Example of the handler de arriba
    const startGetColors = async() => {
        try {
            const { data: dataApi } = await api.get('/colors')  // products
            const { colors } = dataApi // products

            setData(data => ({
                ...data, colors // products
            }))

        } catch (err) {
            if(typeof err === 'object'){
                const { error, msg } = err.response.data
                console.log(error + ' ' + msg)
            }
        }    
    }


    const makeRequests = async() => {
        if(requestLaunched) return 

        dispatch(onSetRequestLaunched(true))
        console.log('First request Data')
        // Podria poner que los datos una vez recogidas persistan en el localStorage, y asi evito hacer la request

        const startedRequests = listRoutes.map(route => startGetRequest(route))
        let data = await Promise.all([ ...startedRequests ])
        // Map de la list de data a data object:  e.g.  ['colorsData', 'productsData']  ->  { colors: colorsData, ... }
        data = listRoutes.reduce((store, route, i) => ({ ...store, [route]: data[i] }), {})

        dispatch(onSetData(data))
        dispatch(onSetLoadingApiData(false))
    }

    useEffect(() => {
        makeRequests()
    }, [])

    

    return {
        colors: data.colors,
        products: data.products,
        categories: data.categories,
        loadingApiData,
        // ...data  // Si hago esto no obtengo el intellisense de colors y products
    }
}