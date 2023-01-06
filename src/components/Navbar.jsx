import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { UserIcon, ShoppingBagIcon, Bars3Icon } from '@heroicons/react/24/outline'
import { useCartStore } from "../hooks/useCartStore"
import { useAuthStore } from "../hooks/useAuthStore"
import { DropDownUser } from "./DropDownUser"
import { Sidebar } from "./Sidebar"
import { getQueryParams } from "../helpers"
import { SearchBar } from "./SearchBar"
import { useForm } from "../hooks"


export const Navbar = () => {
    const { search, pathname:route } = useLocation()
    const params = getQueryParams(search)
    // const name = route.split('/').pop().toLowerCase()
    const { status, user } = useAuthStore()
    const { items } = useCartStore()
    
    const [showSidebar, setShowSidebar] = useState(false)

    // SearchBar
    const { onChangeValue, formValues } = useForm({
        search: params.q ?? ''  // Si es undefined -> ''
    })
    
    return (
        <>
        <div className="sticky top-0 z-10 border-b-[1px] border-gray-300 bg-white text-gray-500">  
        {/* z-index porque al usar transform en algun div, este incrementa su z-index. Y pongo al navbar un z-index mas alto */}
        <div className="max-w-[1200px] mx-auto">
           <div className="px-8 py-4 flex justify-between items-center">

                <div className="font-bold text-3xl text-black">
                    <Link to="/" className="">Hats.</Link>
                </div>

                <div className="hidden md:flex items-center gap-10 text-base">  {/* Hidden en mobile */}
                    <Link to="/" className={`hover:text-amber-800
                    ${ route === '/home' ? 'text-amber-800 font-medium' : ''}`}>
                        Home
                    </Link>
                    <Link to="/home/shop" className={`hover:text-amber-800  
                    ${ route === '/home/shop' ? 'text-amber-800 font-medium' : ''}`}>
                        Shop
                    </Link>
                    <SearchBar value={formValues.search} onChangeValue={onChangeValue}
                        placeholder='Search products...'
                    />
                </div>

                <div className="hidden md:flex gap-x-[24px] text-black items-center">  {/* Hidden en mobile */}
                    <Link to="/home/cart" className="relative">
                        <ShoppingBagIcon className="h-4"/>
                        <div className="absolute font-bold text-xs top-[-10px] right-[-8px]">
                            { items.length === 0 ? undefined : items.length }
                        </div>
                    </Link>
                    { status !== 'auth' ? 
                        <Link to="/login" className="">
                            <UserIcon className="h-4"/>
                        </Link> :
                        <DropDownUser user={ user } />
                    }
                </div>
                <div className="md:hidden flex gap-x-[24px] text-black items-center"> {/* Only en mobile */}
                    <Link to="/home/cart" className="relative">
                        <ShoppingBagIcon className="h-4"/>
                        <div className="absolute font-bold text-xs top-[-10px] right-[-8px]">
                            { items.length === 0 ? undefined : items.length }
                        </div>
                    </Link>
                    <button className="relative" onClick={() => setShowSidebar(true)}>
                        <Bars3Icon className="h-[19px] relative top-[1px]"/>
                        {/* Use relative porque no estaba bien centrado el icon */}
                    </button>
                </div>

           </div>
        </div>
        </div>
        <Sidebar active={showSidebar} onClose={() => setShowSidebar(false)}/>  {/* Only en mobile */}
        </>
    )
}
{/* <LoadingScreen />  Cuando corre e.g. el logout del DropDown */}