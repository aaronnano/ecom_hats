import { ArrowLongLeftIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { orders } from "../data"
import { useAuthStore } from "../hooks"

export const OrderDetails = () => {
    const { user } = useAuthStore()
    const { orders } = user
    const param = useParams()
    const orderId = param.id
    const navigate = useNavigate()

    const [order, setOrder] = useState({})
    const getActualOrder = () => {
        const order = orders.find(order => order.order_id === orderId)
        setOrder(order)

        if(!order) return navigate('/settings') 
        // [#] En vez de redireccionar podriamos poner un 404Page

    }
    
    useEffect(() => {
        getActualOrder()
    }, [])

    // Cuando 'order' sea {}
    if(Object.keys(order).length === 0)
       return <div className="w-full "></div> 

    return (
       <div className="w-full ">
           {/* Title */}
           <div className="flex justify-between items-center py-5 ">
                <h2 className="uppercase text-sm md:text-xl font-bold">Order Details</h2>
                <button className="flex items-center py-2 px-5 font-bold border-[1.5px] md:text-sm text-xs
                    text-black border-black hover:bg-black hover:text-white transform duration-150 ease-in-out"
                    onClick={() => navigate('/settings/orders')}>
                    <ArrowLongLeftIcon className="w-[17px]"/>
                    <span className="pl-4">Go Back</span>
                </button>
            </div>

            <div className="font-montserrat">
            {/* Subtitle */}
            <div className="flex items-center mb-3">
            <span className="text-sm pr-7 font-bold">#{order.order_id.slice(0,8)}</span>
                <span className={`inline-block font-medium font-montserrat text-[11px] p-1 px-3 rounded-xl capitalize 
                    ${order.status === 'received' ? 'bg-green-200 text-green-900' : 'bg-gray-200 text-gray-800'}`}>
                    {order.status}
                </span>
            </div>

            {/* Header 1 */}
            <h3 className="text-xs font-semibold uppercase text-gray-500 py-2 border-b-[1.5px]">Details</h3>
            <div className="flex items-center pt-3 pb-6 ">
                <div className="w-1/2 md:w-[20%] flex flex-col gap-y-2">
                    <div className="text-xs font-medium text-gray-500">Placed On:</div>
                    <div className="text-xs font-medium text-gray-500">Delivery Date:</div>
                    <div className="text-xs font-medium text-gray-500">Delivery Address:</div>
                    <div className="text-xs font-medium text-gray-500">Phone Number:</div>
                    <div className="text-xs font-medium text-gray-500">Total:</div>
                </div>
                <div className="w-1/2 flex flex-col gap-y-2">
                    <div className="text-xs font-medium">{format(new Date(order.purchase_date), 'MMM dd, yyyy')}</div>
                    <div className="text-xs font-medium">{format(new Date(order.delivery_date), 'MMM dd, yyyy')}</div>
                    <div className="text-xs font-medium">
                        {`${order.delivery_address.address_line},
                        ${order.delivery_address.city}, 
                        ${order.delivery_address.state}`}
                    </div>
                    <div className="text-xs font-medium">{order.delivery_address.phone}</div>
                    <div className="text-xs font-bold">$ {order.total}</div>
                </div>
            </div>
            {/* Header 2 */}
            {/* PC */}
            <div className="hidden md:flex items-center text-gray-500 py-2 border-b-[1.5px]">
                <div className="w-[40%] text-xs font-semibold">Product</div>
                <div className="w-[15%] text-xs font-semibold">Quantity</div>
                <div className="w-[22.5%] text-xs font-semibold">Unit Price</div>
                <div className="w-[22.5%] text-xs font-semibold">Amount</div>
            </div>
            {/* Mobile */}
            <h3 className="block md:hidden text-xs font-semibold uppercase text-gray-500 py-2 border-b-[1.5px]">Products</h3>

            { order.orderItems.map(({ product, quantity, color }, i) => (<div key={i}>
                {/* PC */}
                <div className="hidden md:flex items-center py-2">
                    <div className="w-[40%] flex items-center gap-x-6">
                        {/* Image */}
                        <div className="shrink-0">
                        <img src={product.image} className="w-[60px] h-auto" alt="" />
                        </div>
                        {/* Mini Details Product */}
                        <div className="">
                            <h2 className="text-xs font-medium text-black pb-1">{product.title}</h2>

                            <div className="flex items-center">
                                <h3 className="text-xs text-gray-400 font-medium pr-3">Color:</h3>
                                <div className="w-3 h-3 rounded-full text-white" style={{ backgroundColor: color }}></div>
                            </div>
                        </div>

                    </div>
                    <div className="w-[15%] text-xs font-semibold">{quantity}</div>
                    <div className="w-[22.5%] text-xs font-semibold">$ {product.price}</div>
                    <div className="w-[22.5%] text-xs font-semibold">$ {Number((product.price * quantity).toFixed(2))}</div>
                </div>
                {/* Mobile */}
                <div className="flex md:hidden items-center gap-x-6 px-2">
                    {/* Image */}
                    <div className="shrink-0">
                    <img src={product.image} className="w-[60px] h-auto" alt="" />
                    </div>
                    {/* Details */}
                    <div className="w-full flex items-center justify-between py-3">
                        {/* Mini Details */}
                        <div className="flex flex-col gap-y-1">
                            <h2 className="text-sm font-semibold text-black">{product.title}</h2>
                            <div className="flex items-center">
                                <h3 className="text-xs text-gray-500 font-medium pr-3">Color:</h3>
                                <div className="w-[10px] h-[10px] rounded-full text-white" style={{ backgroundColor: color }}></div>
                            </div>
                            <h2 className="text-xs font-medium text-gray-500">$ {product.price} x {quantity}</h2>
                        </div>
                        {/* Total Price */}
                        <h2 className="self-end text-sm font-semibold text-black">
                            $ {Number((product.price * quantity).toFixed(2))}
                        </h2>
                    </div>
                </div>
                
            </div>
            ))}

            </div>  {/* Montserrat */}
            
       </div>
    )
}