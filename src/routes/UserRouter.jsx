import { Cog8ToothIcon, CurrencyDollarIcon, MapPinIcon } from "@heroicons/react/24/outline"
import { Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Footer } from "../components/Footer"
import { SelectPage } from "../components/form/SelectPage"
import { LoadingScreen } from "../components/LoadingScreen"
import { Navbar } from "../components/Navbar"
import { useApi } from "../hooks"
import { useAuthStore } from "../hooks/useAuthStore"
import { AddressDetails } from "../pages/AddressDetails"
import { AddressPage } from "../pages/AddressPage"
import { OrderDetails } from "../pages/OrderDetails"
import { OrdersPage } from "../pages/OrdersPage"
import { UserPage } from "../pages/UserPage"

export const UserRouter = () => {

    const { user, loadingAuth } = useAuthStore()
    const { loadingApi } = useApi()
    // const nameRoute = user.username

    const route = useLocation().pathname
    
    const showLoading = loadingAuth || loadingApi 
    // Si ninguno esta en ese estado, el valor es null y no se muestra el spinning
    
    const options = [
        { route: '/settings/profile', title: 'Profile Info', icon: <Cog8ToothIcon className="w-[16px]" /> },
        { route: '/settings/addresses', title: 'Addresses', icon: <MapPinIcon className="w-[16px]" /> },
        { route: '/settings/orders', title: 'Orders History', icon: <CurrencyDollarIcon className="w-[16px]" /> },
    ]   // [#]: cuando vamos al addresses/:id, la option Addresses no se selecciona


    return (
        <>
        <Navbar />
        <div className="max-w-[1200px] mx-auto">  { /* h-screen porque esta page es solo de tamaño Screen */}
            <div className="px-8">
                <div className="grid md:grid-cols-8">

                    <div className="hidden md:block md:col-span-2 py-[68px] pr-10">
                        <SelectPage page={route} options={options} />
                    </div>
                    <div className="md:col-span-6">
                    <Routes>
                        <Route path="/profile" element={ <UserPage /> } />
                        <Route path="/addresses" element={ <AddressPage /> } />
                        <Route path="/addresses/create" element={ <AddressDetails /> } /> 
                        <Route path="/addresses/:id" element={ <AddressDetails /> } />
                        <Route path="/orders" element={ <OrdersPage /> } />
                        <Route path="/orders/:id" element={ <OrderDetails /> } />
                        <Route path="/*" element={<Navigate to="/settings/profile" replace={true} />} /> 
                        {/* Aqui tambien el replace, para que Navigate deje acceder al historial de routes */}
                    </Routes>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
        <LoadingScreen show={showLoading}/>
        </>
    )
    
}
