import { useEffect, useRef } from "react"
import { ArrowRightOnRectangleIcon, Cog8ToothIcon, CurrencyDollarIcon, HomeIcon, BuildingStorefrontIcon, ArrowRightIcon, UserIcon, MapPinIcon } from '@heroicons/react/24/outline'
import { Link } from "react-router-dom"
import userImage from '../assets/user.png'
import { useAuthStore } from "../hooks/useAuthStore"

export const Sidebar = ({ active, onClose }) => {
    const { user, startLogout } =  useAuthStore()

    const ref = useRef()

    const onClickOutside = (e) => {
        if(ref.current.contains(e.target)) return  // Si hice click dentro del div Options, no hago nada
        onClose() // Para ocultar las Options del dropDown
    }

    useEffect(() => {  // Una sola vez para definir el event
        document.addEventListener('mousedown', onClickOutside)
        return () => {
            document.removeEventListener('mousedown', onClickOutside)
            // Al morir el componente, deshago este event
        }
    },[])

    const onLogout = () => {
        onClose()
        startLogout()
    }


    return (
        <>  {/* Background */}
        <div className={`${active ? 'show' : 'hide'}
                fixed top-0 z-20 w-full h-screen bg-black/[0.15] duration-150 ease-in-out`}>
            {/* Content */}
            <div className={`${active ? 'left-0':'left-[-100%]'}
                absolute w-[70%] h-full text-sm bg-white font-mdium duration-150 ease-in-out`} ref={ref}>
            <div className=""> {/* Algun padding */} 
                <div className="flex items-center pl-7 py-8 border-b-[1.5px]"> {/* bg-gray-100 */}
                    <div className="shrink-0">
                    <img src={user?.avatar || userImage} className={
                        `w-[40px] h-[40px] rounded-full object-cover object-center
                        ${user?.avatar ? ' ring-2 ring-black' : '' } `} />
                    </div>
                    <div className="px-5">
                        <h3 className="font-bold">{ user?.name || 'Test'} </h3>
                        <h3 className="text-gray-500">{ user?.email || 'test@mail.com'}</h3>
                    </div>
                </div>

                {/* Common Pages  */}
                <div className="border-b-[1.5px] py-3">  
                    <Link to={"/home"} className="flex items-center p-3 pl-7 hover:bg-gray-100"
                    onClick={() => onClose()} >
                        {/* No se porque al ir a la route, el showSideBar se pone en false, se oculta el sidebar, no se */}
                        <HomeIcon className="w-[16px]" />
                        <span className="pl-3">Home</span>
                    </Link>
                    <Link to={"/home/shop"} className="flex items-center p-3 pl-7 hover:bg-gray-100"
                    onClick={() => onClose()} >
                        <BuildingStorefrontIcon className="w-[16px]" />
                        <span className="pl-3">Shop</span>
                    </Link>
                </div>

                {/* User Pages  */}
                <div className="py-3">  {/* border-b-[1.5px] */}
                { user ? <>
                    <Link to={"/settings"} className="flex items-center p-3 pl-7 hover:bg-gray-100"
                    onClick={() => onClose()} >
                        <Cog8ToothIcon className="w-[16px]" />
                        <span className="pl-3">Profile.</span>
                    </Link>
                    <Link to='/settings/addresses' className='flex items-center p-3 pl-7 hover:bg-gray-100'
                    onClick={() => onClose()} >
                        <MapPinIcon className="w-[16px]" />
                        <span className="pl-3">Addresses</span>
                    </Link>
                    <Link to={"/settings/orders"} className="flex items-center p-3 pl-7 hover:bg-gray-100"
                    onClick={() => onClose()} >
                        <CurrencyDollarIcon className="w-[16px]" />
                        <span className="pl-3">Orders History.</span>
                    </Link>
                    <button className="flex items-center p-3 pl-7 hover:bg-gray-100"
                    onClick={onLogout} >
                        <ArrowRightOnRectangleIcon className="w-[16px]" />
                        <span className="pl-3">Logout.</span> 
                    </button>

                    </> : <>

                    <Link to={"/login"} className="flex items-center p-3 pl-7  hover:bg-gray-100"
                    onClick={() => onClose()} >  {/* Mejorar style */}
                        <UserIcon className="w-[14px]" />
                        <span className="pl-3">Log In.</span>
                    </Link>
                    </>
                }
                </div>
            </div>
            </div>

        </div>
        </>
    )
}