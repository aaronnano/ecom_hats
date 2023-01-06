import { useEffect } from "react"
import { Navigate, Route, Routes } from "react-router-dom"
import { AdminPage } from "../admin/AdminPage"
import { LoadingScreen } from "../components/LoadingScreen"
import { useScrollToTop, useApiData, useAuthStore } from "../hooks"
import { CheckoutPage } from "../pages/CheckoutPage"
import { AuthRouter } from "./AuthRouter"
import { HomeRouter } from "./HomeRouter"
import { UserRouter } from "./UserRouter"

export const Routers = () => {
    useScrollToTop()
    const { loadingApiData } = useApiData(['colors', 'products', 'categories'])  // Fijo el hook para cargar la data y mandarlo al store al iniciar la app

    const { checkToken, status, user, loadingAuth } = useAuthStore()

    // ### INIT. Se considera esta componente Routers como lugar de inicio.
    // Vemos si exista algun token en el client. Asi solo funcionara la primera vez, cuando arranque el sitio
    // Corre cuando vamos al sitio poniendo su URL, desde ahi, sin importar a que ruta vayamos    
    useEffect(() => { 
        setTimeout(() => {
            checkToken()

        },0.3*1000)
        
    },[])
    
    // El logo se mostrara cuando se esten obteniendo los colors/products
    // Con el tema de los login/logout, se mostrara solo los loadingScreens comunes
    if(status === 'init' || loadingApiData)
        return <LoadingScreen withLogo show />

    
    return (
        <Routes>
            <Route path="/home/*" element={<HomeRouter />} />

            {/* Public routes only for 'not-auth'. Si existe un User, no muestro las rutas */}
            { status === 'not-auth' ? <>  
                <Route path="/register/*" element={<AuthRouter />} />  
                <Route path="/login/*" element={<AuthRouter />} /> 
                </> : null
            }

            {/* Private routes */}
            { status === 'auth' ? <>
                <Route path="/settings/*" element={<UserRouter />} /> 
                <Route path="/checkout" element={<CheckoutPage />} /> 
                </> : null 

            }
            
            {/* El '[path]/*' es importante solo si el </> de element tiene dentro un Routes nuevo */ }
            <Route path="/admin" element={<AdminPage />} />
            <Route path="/*" element={<Navigate to="/home" replace={true}/>} />
            {/* Este replace segun yo permite que ante cualquier ruta que, el Navigate lo agregue al historial de stack
                de rutas accedidas. Con lo cual, ahora si podras hacer 'go back page' */}
        </Routes>
    )
}
