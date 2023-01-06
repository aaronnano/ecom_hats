import { useEffect, useRef, useState } from "react"
import { ArrowRightOnRectangleIcon, CurrencyDollarIcon, Cog8ToothIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import { useAuthStore } from "../hooks/useAuthStore"

export const DropDownUser = ({ user }) => {
    const [active, setActive] = useState(false)
    const { startLogout } = useAuthStore()

    const onLogout = () => {
        startLogout()
    }
    
    const ref = useRef()

    const onClickOutside = (e) => {
        if(ref.current.contains(e.target)) return  // Si hice click dentro del div Options, no hago nada
        setActive(false) // Para ocultar las Options del dropDown
    }

    useEffect(() => {  // Una sola vez para definir el event
        document.addEventListener('mousedown', onClickOutside)
        return () => {
            document.removeEventListener('mousedown', onClickOutside)
            // Al morir el componente, deshago este event
        }
    },[])


    return (
        <div className="relative text-xs" ref={ref} >
            {/* El button se hace autofocus al tocarlo */}
            <button className="p-1 px-3 text-black border-[1.5px] rounded-md border-black
            font-bold text-xs focus:ring-offset-2 focus:ring-stone-300 focus:ring-1"  
            onClick={() => setActive(!active)} >
                 {/* Se podria usar por algun lado el onBlur  */}
                Hi, { user.name }! 
            </button>

            {/* Options  */}
            <div className={active ? `absolute top-[30px] right-[0px]
                rounded-md border bg-white font-medium min-w-[200px]` : 'hidden' }>

                <Link to='/settings/profile' className="flex items-center p-3 px-4 hover:bg-gray-100"
                    onClick={() => setActive(!active)} >
                    <Cog8ToothIcon className="w-[16px]" />
                    <span className="pl-2">Profile Info.</span>
                </Link>
                <Link to='/settings/orders' className="flex items-center p-3 px-4 hover:bg-gray-100"
                    onClick={() => setActive(!active)} >
                    <CurrencyDollarIcon className="w-[16px]" />
                    <span className="pl-2">Orders History.</span>
                </Link>
                <div className="flex cursor-pointer items-center p-3 px-4 border-t hover:bg-gray-100"
                onClick={onLogout}>
                    <ArrowRightOnRectangleIcon className="w-[16px]" />
                    <span className="pl-2">Logout.</span> 
                </div>

            </div>
        </div>
    )
}