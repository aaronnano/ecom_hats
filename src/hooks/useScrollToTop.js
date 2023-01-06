import { useEffect } from "react"
import { useLocation } from "react-router-dom"

export const useScrollToTop = () => {
    const pathname = useLocation()

    useEffect(() => {   // Ante un cambio en el pathname, en la ruta, hago scroll top
        window.scrollTo(0,0)
    }, [pathname])
    

    return null
}