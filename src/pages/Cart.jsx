import { MapPinIcon, ShoppingCartIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"
import { CartItem } from "../components/CartItem"
import { LoadingScreen } from "../components/LoadingScreen"
import { useAuthStore } from "../hooks"
import { useCartStore } from "../hooks/useCartStore"

export const Cart = () => {
    const { items, total, startCheckout, loadingCart } = useCartStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()

    const onCheckout = () => {
        if(!user){
            navigate('/register?order=true', { replace: true })
        } else {
            navigate('/checkout')        
        }
    }

    return (
        <>
       <div className="w-full">
            <h2 className="py-5 uppercase text-2xl text-center font-bold">Your Cart</h2>
            
            { items.length > 0 ?
                // With Items    
                <div className="w-full flex flex-col items-start gap-y-4 md:flex-row">
              
                {/* Cart */}
                <div className="w-full md:w-4/6 md:px-2">
                    {items.map((item, i) => (
                        <CartItem key={i} { ...item } />
                    ))}
                </div>

                {/* Checkout */}
                <div className="w-full md:w-2/6">
                <div className="py-7 md:py-0 md:px-7 font-bold">
                    <h2 className="text-xl pb-3">Cart Total</h2>
                    <div className="flex justify-between pb-5">
                        <h3 className="text-gray-500">Total Price:</h3>
                        <span className="">$ {total}</span>
                    </div>
                    <button className="w-full py-3 px-4 font-bold uppercase border-[2px] border-black 
                    text-sm bg-white hover:bg-black text-black hover:text-white
                    transform duration-150 ease-in-out"
                    onClick={onCheckout}> 
                        { user ? 'Checkout' : 'Register for Checkout'}
                    </button>
                </div>
                </div>

                </div> :
                // No Items
                <div className="flex flex-col gap-y-5 items-center text-black ">
                    <ShoppingCartIcon className="w-[50px]"/>
                    <h3 className="text-xl">Cart Empty</h3>
                </div>
            }

       </div>
       <LoadingScreen show={loadingCart}/>
       </>
    )
}