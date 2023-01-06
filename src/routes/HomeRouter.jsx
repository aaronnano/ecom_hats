import { Navigate, Route, Routes } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Alert } from "../components/Alert"
import { Navbar } from "../components/Navbar"
import { useAlertStore } from "../hooks/useAlertStore"
import { Home } from "../pages/Home"
import { ProductPage } from "../pages/ProductPage"
import { Shop } from "../pages/Shop"
import { Cart } from "../pages/Cart"
import { LoadingScreen } from "../components/LoadingScreen"
import { useAuthStore } from "../hooks"

export const HomeRouter = () => {  //  ./home
    const { isActive, message, closeAlert, color } = useAlertStore()
    const { loadingAuth } = useAuthStore()

    const showLoading = loadingAuth

    return (
        <>
        <Navbar />
        <div className="max-w-[1200px] mx-auto ">
            <div className="px-8">
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/shop" element={<Shop />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/*" element={<Navigate to="/home/shop"/>} />
            
            </Routes>
            </div>
        </div>
        <Alert message={message} color={color}
            isActive={isActive} 
            onClose={closeAlert}
        />
        {/* Segun el active, nuestro componente se comportara de una manera u otra. El close es importante para que el componente
            nos avise cuando intenta hacer el Close, para poner el active = false 
            Esta forma de implementar componentes que se montan y luego se desmontan no es para mi la correcta */}
        <Footer />
        <LoadingScreen show={showLoading} />
        </>
    )
}