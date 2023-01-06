import { MapPinIcon, PencilIcon, PlusSmallIcon, TrashIcon } from "@heroicons/react/24/outline"
import { Link, useNavigate } from "react-router-dom"
import { useApi, useAuthStore } from "../hooks"


export const AddressPage = () => {
    const { user } = useAuthStore()
    const { addresses } = user

    const navigate = useNavigate()

    const { startDeleteAddress, messageApi } = useApi()
    const onDelete = (address) => {
        startDeleteAddress(address)
    }
    

    return (
       <div className="w-full">
           <div className="flex justify-between items-center py-5 ">
                <h2 className="uppercase text-xl font-bold">Addresses</h2>
                {/* Create Button */}
                <button className="flex items-center py-2 pl-4 pr-5 font-bold border-[1.5px] md:text-sm text-xs
                    text-black border-black hover:bg-black hover:text-white
                    transform duration-150 ease-in-out"
                    onClick={() => navigate('/settings/addresses/create')}>
                    {/* Hago pl y pr porque con mismo px se ve mal esteticamente */}
                    <PlusSmallIcon className="w-[17px]"/>
                    <span className="pl-3">Create</span>
                </button>
            </div>
            {/* Addresses List  */}
            <div className="flex flex-col gap-y-6">
                { addresses.length > 0 ? addresses.map((address, i) => (
                        <AddressItem key={i} { ...address } onDelete={onDelete} />
                    )) :
                    // Empty Logo 
                    <div className="flex flex-col gap-y-5 items-center text-black ">
                        <MapPinIcon className="w-[50px]"/>
                        <h3 className="text-xl">No addresses founded</h3>
                    </div>

                }
            </div>
       </div>
    )
}
export const AddressItem = ({ id, address_line, city, phone, state, onDelete }) => {
    const shortAddress = address_line.split(' ').slice(0,3).join(' ') + ' ...'

    return (
        <div className="flex justify-between border px-5 py-1">
            {/* Data */}
            <div className="flex gap-x-5 items-center ">
                <span className="text-xs md:text-sm hidden md:block">{address_line}</span>  {/* Wide */}
                <span className="text-xs md:text-sm md:hidden font-montserrat ">{shortAddress}</span> {/* Mobile */}
                <span className="text-xs md:text-sm hidden md:block">{city}</span>
                <span className="text-xs md:text-sm hidden md:block">{state}</span>
                <span className="text-xs md:text-sm hidden md:block">{phone}</span>
                
            </div>
            {/* Buttons */}
            <div className="flex items-center">
                <Link to={`/settings/addresses/${id}`}
                        className="py-2 px-4">
                <PencilIcon className="w-[17px]"/>
                </Link>
                <button className="py-2 px-4 "
                    onClick={() => onDelete({ id })}>
                <TrashIcon className="w-[17px]"/>
                </button>
            </div>
        </div>
    )
}