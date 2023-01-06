import { CurrencyDollarIcon } from "@heroicons/react/24/outline"
import { format } from "date-fns"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "../hooks"

export const OrdersPage = () => {
    const { user } = useAuthStore()
    const { orders } = user
    

    return (
        <div className="w-full">
            <div className="flex justify-between items-center py-5">  
                { /* height porque no hay button. Para que los titulso tengan la misma altura */}
                <h2 className="uppercase text-xl font-bold flex h-[39px]"><span className="self-center">Orders</span></h2>
            </div>
            
            { orders.length > 0 ? <>
                {/* Header Orders */}
                <div className="hidden md:flex px-3 py-3 ">
                    <div className="w-[20%] text-xs font-semibold uppercase">ID</div>
                    <div className="w-[18%] text-xs font-semibold uppercase">Status</div>
                    <div className="w-[20%] text-xs font-semibold uppercase">Purchase Date</div>
                    <div className="w-[20%] text-xs font-semibold uppercase">Total</div>
                </div>
                {/* Order List */}
                <div className="flex flex-col divide-y-[1px]">
                    {orders.map((order, i) => (
                        <OrderItem key={i} { ...order } />
                    ))}
                </div></> : 
                <div className="flex flex-col gap-y-5 items-center text-black ">
                    <CurrencyDollarIcon className="w-[50px]"/>
                    <h3 className="text-xl">No orders placed</h3>
                </div> 
                }
        </div>
    )
}


                

export const OrderItem = ({ order_id, total, purchase_date, status }) => {
    purchase_date = format(new Date(purchase_date), 'MMM dd, yyyy')
    const navigate = useNavigate()

    return (<>   
        {/* Mobile */}
        <div className="flex md:hidden flex-col gap-y-1 py-3 cursor-pointer
        hover:bg-gray-50 duration-100 ease-in-out"
        onClick={() => navigate(`/settings/orders/${order_id}`)}>
            
            <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm font-montserrat"># {order_id.slice(0,8)}</h3>
                <h3 className="">
                <span className={`inline-block font-medium font-montserrat text-[11px] p-1 px-3 rounded-xl 
                    ${status === 'received' ? 'bg-green-200 text-green-900' : 'bg-gray-200 text-gray-800'}`}>
                    {status}
                </span>
                </h3>
            </div>
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-xs font-montserrat text-gray-500">{purchase_date}</h3>
                <h3 className="font-medium text-sm font-montserrat pr-2">$ {total}</h3>
            </div>

        </div>

        {/* PC */}
        <div className="hidden md:flex items-center px-3 py-2 cursor-pointer
        hover:bg-gray-50 duration-100 ease-in-out"
        onClick={() => navigate(`/settings/orders/${order_id}`)}>
            
            <div className="w-[20%] font-medium text-xs font-montserrat"># {order_id.slice(0,8)}</div>
            <div className="w-[18%]">
            <span className={`inline-block font-medium font-montserrat text-[11px] p-1 px-3 rounded-xl 
                ${status === 'received' ? 'bg-green-200 text-green-900' : 'bg-gray-200 text-gray-800'}`}>
                {status}
            </span>
            </div>
            <div className="w-[20%] font-medium text-xs font-montserrat">
                {purchase_date}
            </div>
            <div className="w-[20%] font-medium text-xs font-montserrat">$ {total}</div>

        </div>
        </>
    )
}