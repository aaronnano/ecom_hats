import { Link, Navigate, Route, Routes, useLocation } from "react-router-dom"
import { Footer } from "../components/Footer"
import { Login } from "../pages/Login"
import { Register } from "../pages/Register"

export const AuthRouter = () => {
    const route = useLocation().pathname
    const pageName = route.split('/').pop()
    let page;

    if(pageName === 'register') page = <Register />
    if(pageName === 'login') page = <Login />


    return (
        <>
        <div className="flex flex-col justify-between h-screen">  
        { /* En una page ScreenSolo, uso esto para poner el Footer al fondo 
            Ojo al item este de abajo poner w-full. El flex-col como que achica el item*/}
            <div className="w-full max-w-[1200px] mx-auto">
                <div className="px-8">
                    <h3 className="pb-4 pt-8 md:py-4 mb-12 font-bold text-3xl text-black ">
                        <Link to="/" className="">Hats.</Link>
                    </h3>

                    <div className="">
                        <Routes>
                            <Route path="/" element={ page } />
                            <Route path="/*" element={<Navigate  to="/register"/>} /> 
                            {/* Seria bueno incluir un page de error, page no founded */}
                        </Routes>
                    </div>
                    
                </div>
            </div>
            <Footer />
        </div>
        
        </>
    )
}