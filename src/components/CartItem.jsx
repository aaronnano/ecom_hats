import { XMarkIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '../hooks/useCartStore'
import 'animate.css'
import { useState } from 'react'
import { useAuthStore } from '../hooks'

export const CartItem = ({ id, quantity, color, product }) => {
    const [isMounted, setIsMounted] = useState(true)  // Puede servir para hacer una animacion
    const { title, image, price } = product
    const { user } = useAuthStore()
    const { startDeletingItem } = useCartStore()
    const itemPrice = Number((price * quantity).toFixed(2))
    
    const toDelete = () => {
        startDeletingItem({ id, product, quantity }, user)
        // setIsMounted(false)
        // Falta animacion cuando este item es desmontado
    }
    


    return (
       <div className="w-full flex items-cente mb-5 font-montserrat tacking-wider font-semibold
        border-stone-200 border-[1px]">
            {/* Image */}
            <div className="shrink-0 flex items-center">
                <img src={image} className="w-[100px] md:w-[150px] h-auto px-3 md:px-6" alt="" />
            </div>
            <div className="w-full px-3 py-4">
               {/* Title - Mark */}
                <div className="flex justify-between items-center pb-1 relative">
                    <h3 className="text-sm md:text-lg font-bold">{title}</h3>
                    <div className="p-1 cursor-pointer" onClick={toDelete} >
                        <XMarkIcon className='w-[17px]' />
                    </div>
                </div>
                
                <div className="flex justify-between">
                    <div className=''>
                        {/* Color */}
                        <div className="flex items-center pb-2">
                            <div className="text-xs text-gray-500 pr-3">Color:</div>
                            <div className="w-3 h-3 rounded-full text-white"
                                style={{ backgroundColor: color }}>
                            </div>
                        </div>
                        {/* Quantity */}
                        <div className="text-xs text-gray-500">{quantity} x ${price}</div>
                    </div>

                    {/* Price */}
                    <div className="pr-1 self-end">
                        <span className="text-[15px] md:text-base">$ {itemPrice}</span>
                    </div>
                </div>
               
           </div>
       </div>
    )
}