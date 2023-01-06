import { ArrowLongLeftIcon, ArrowLongRightIcon, CheckBadgeIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo, useRef, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Circle } from "../components/Circle"
import { Footer } from "../components/Footer"
import { errors, InputField, Select } from "../components/form"
import { LoadingScreen } from "../components/LoadingScreen"
import { Message } from "../components/Message"
import { Navbar } from "../components/Navbar"
import { createDates, getQueryParams } from "../helpers"
import { useApi, useAuthStore, useForm } from "../hooks"
import { useCartStore } from "../hooks/useCartStore"

export const CheckoutPage = () => {
    const { items, total } = useCartStore()
    const { user } = useAuthStore()
    const navigate = useNavigate()
    const { search } = useLocation()
    const params = getQueryParams(search)

    const [order, setOrder] = useState(null)


    const addresses = useMemo(() => {
        return user.addresses.map(({address_line, phone}) => {
            return `${address_line}, ${phone}`
        })
    },[])

    const dates = useMemo(() => {
        return createDates('now', 10)
    },[])

    useEffect(() => {
        console.log('Checkout first')
        if(items.length === 0) navigate('/home')
    },[])

    const { startUpdateUser, startCreateOrder, messageApi, setMessageApi, loadingApi} = useApi()


    const firstInput = useRef()
    const [createAddressMode, setCreateAddressMode] = useState(true)

    // Form solo para el create de un Address nuevo
    const { onChangeValue:onChangeAddressValues, formValues:addressValues, isValidForm:isValidAddress } = useForm({
        address_line: '',
        city: '',
        state: '',
        phone: ''
    })
    useEffect(() => {
        setErrorMessage('')
    }, [addressValues])

    const { onChangeValue, formValues:orderValues, errorMessage, setErrorMessage, initializeFormValues, isValidForm } = useForm({
        delivery_date: '',
        address: ''
    })

    const onSubmitData = async(e) => {
        e.preventDefault()

        let actualAddress;
        if(createAddressMode){
            if(!isValidAddress) return setErrorMessage('Some fields are wrong')
            if(orderValues.delivery_date === '') return setErrorMessage('You have to pick a date')

            // Create new address
            const actualUser = await startUpdateUser({ address: { ...addressValues } })
            if(!actualUser) return console.log('No se pudo hacer a request')
            actualAddress = actualUser.addresses.find((address) => address.address_line === addressValues.address_line)
        } else {
            if(!isValidForm) return setErrorMessage('You have to pick both')
            
            // Find Address
            actualAddress = user.addresses.find((address) => orderValues.address.includes(address.address_line))
        }


        const orderItems = items.map(({ quantity, color, product }) => {
            return {
                quantity, color, productId: product.id
            }
        })

        let order = {
            delivery_date: orderValues.delivery_date,  // Date
            delivery_addressId: actualAddress.id,  // Id del address
            total: total.toString(),
            orderItems
            // purchase_date: DB
            // status: DB
        }


        const newOrder = await startCreateOrder(order)
        if(!newOrder) return console.log('Error a la hora de generar la orden')

        setOrder(newOrder)
        navigate('/checkout?order=successful', { replace: true })
        // replace:true -> Reemplaza la route actual por esta nueva. Ya no podre hacer backpage a la de antes que era '/checkout'
        
    }
    
    // Si todo salio bien y hay una orden
    if(params.order === 'successful' && order != null){ 
        return <>
            <Navbar />
            <div className="max-w-[1200px] mx-auto ">
            <div className="px-8 md:px-11">
                {/* Title */}
                <div className="flex justify-center items-center py-5 ">
                    <h2 className="uppercase text-base md:text-xl font-bold">Order Generated Successfully</h2>
                </div>

                <div className="flex flex-col gap-y-5 items-center text-black ">
                    <CheckBadgeIcon className="w-[50px]"/>
                    {/* Order ID */}
                    <div className="flex items-center gap-x-4 text-base md:text-lg font-montserrat">
                        <h3 className="font-medium">Order ID:</h3>
                        <h3 className="text-amber-900 font-semibold">#{order?.order_id.slice(0,8)}</h3>
                    </div>
                    {/* Buttons */}
                    <div className="w-full md:w-fit flex items-center justify-between md:gap-x-[200px]">
                        <button className="flex items-center py-2 px-4 font-bold md:text-sm text-xs
                        text-gray-500 hover:text-black transform duration-150 ease-in-out"
                        onClick={() => navigate('/home/shop', { replace: true })}>
                        {/* Eeemplaza la route en la que estoy por la nueva. Entonces, el cliente no podra
                            hacer back page no podra ir a la pagina en la que estaba antes, ira a la de antes antes */}
                            <ArrowLongLeftIcon className="w-[17px]"/>
                            <span className="pl-3 underline underline-offset-4">Back to Shop</span>
                        </button>
                        <button className="flex items-center py-2 px-4 font-bold md:text-sm text-xs
                        text-gray-500 hover:text-black transform duration-150 ease-in-out"
                        onClick={() => navigate('/settings/orders', { replace: true })}>
                            <span className="pr-3 underline underline-offset-4">View Orders</span>
                            <ArrowLongRightIcon className="w-[17px]"/>
                        </button>
                    </div>

                </div>
            </div>
            </div>
            <Footer />
        </>
    }

    const message = errorMessage 
    const type = errorMessage ? 'error' : ''
    
    return (<>
        <Navbar />
        <div className="max-w-[1200px] mx-auto ">
            <div className="px-8 md:px-11">    
                <div className="flex justify-center items-center py-5 ">
                    <h2 className="uppercase text-xl font-bold">Checkout</h2>
                </div>

                <div className="flex flex-col md:flex-row gap-x-6">
                    {/* Form */}
                    <div className="md:w-[65%]">
                    <form onSubmit={onSubmitData} className="md:px-3">
                        {/* Title Delivery Address */}
                        <div className="flex flex-col items-start md:flex-row md:items-center gap-y-1 justify-between py-4 ">
                            <div className="flex items-center">
                                <Circle value={1} className='font-semibold' />
                                <h1 className="text-lg font-semibold">Delivery Address</h1>
                            </div>
                            <div className="flex items-center justify-center w-full md:w-fit">
                                <button type="button" className={`block py-2 px-5 font-bold text-xs ${createAddressMode ? 'ring-b-1 text-black' : 'text-gray-500'}`}
                                onClick={() => setCreateAddressMode(true)}>
                                    Create One
                                </button>
                                <button type="button" className={`block py-2 px-5 font-bold text-xs ${!createAddressMode ? 'ring-b-1 text-black' : 'text-gray-500'}`}
                                onClick={() => setCreateAddressMode(false)}>
                                    Pick One
                                </button>
                                
                            </div>
                        </div>

                        {/* Create/Choose Address */}
                        {createAddressMode ? 
                        <div className="grid md:grid-cols-4 gap-x-5">
                            <div className="col-span-2">
                            <InputField title='AddressLine'  name='address_line' autoFocus reff={firstInput}
                                className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black mb-2' placeholder='e.g. 111 Hillinois Com'
                                onChange={onChangeAddressValues} value={addressValues.address_line}  { ...errors.addressLine }
                            />
                            </div>
                            <InputField title='City' notEmpty  
                                className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black mb-2' 
                                onChange={onChangeAddressValues} value={addressValues.city}
                            />
                            <InputField title='State' notEmpty 
                                className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black mb-2' 
                                onChange={onChangeAddressValues} value={addressValues.state}
                            />
                            <InputField title='Phone' 
                                className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black mb-2' placeholder='e.g. 000-000-000'
                                onChange={onChangeAddressValues} value={addressValues.phone} { ...errors.phone }
                            />
                        </div> :
                        <div className="w-full md:w-[50%]">
                            <div className="mb-3">
                            <Select options={addresses} title='Pick one' name="address" placeholder='Delivery Address' 
                                className="w-full flex items-center justify-between px-5 py-3 mb-2 border-[1.5px] border-stone-300
                                text-xs outline-none focus:border-black" { ...errors.select }
                                // Si se hay errores en submit, muestro 
                                onChange={onChangeValue}
                            />
                            </div>
                        </div> 
                            // [#] Ver cuando no hay address existentes
                        }
                        
                        {/* Delivery Date */}
                        <div className="flex items-center justify-between py-4 ">
                            <div className="flex items-center">
                                <Circle value={2} className='font-semibold' />
                                <h1 className="text-lg font-semibold">Delivery Date</h1>
                            </div>
                            
                        </div>
                        <div className="w-full md:w-[50%]">
                            <div className="mb-3">
                            <Select options={dates} title='Pick one' name="delivery_date" placeholder='Delivery Date'
                                className="w-full flex items-center justify-between px-5 py-3 mb-2 border-[1.5px] border-stone-300
                                text-xs outline-none focus:border-black" { ...errors.select }
                                onChange={onChangeValue}
                            />
                            </div>
                        </div>

                        <div className="flex flex-col pt-4 items-start gap-y-3 justify-center">
                            <button className='w-full md:w-[80%] block py-3 px-8 mr-4 font-semibold uppercase border-[1.5px] text-xs
                            text-black border-black hover:bg-black hover:text-white transform duration-150 ease-in-out'>
                                Place Order
                            </button>
                            <Message message={message} type={type} />
                        </div>

                    </form>  {/* Form */}
                    </div>
                    
                    {/* Order Details */}
                    <div className="pt-4 md:pt-0 md:w-[35%] h-[365px]">
                    <div className="px-6 py-4 bg-gray-100 h-full ring-b-1">
                        <div className="flex flex-col h-full justify-between">
                        {/* Title - Items */}
                        <div className="">
                            {/* Title */}
                            <h1 className="text-lg font-semibold pb-4">Your Order</h1>
                            {/* Items */}
                            <div className="flex flex-col gap-y-2 pb-4 border-b-[1.5px]">
                            { items.map(({ id, quantity, color, product }, i) => (
                                <div key={i} className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <h2 className="pr-3 text-xs font-medium">{product.title} x {quantity}</h2>
                                        <div className="w-3 h-3 rounded-full text-white"
                                        style={{ backgroundColor: color }}>
                                        </div>
                                    </div>
                                    <h2 className="text-sm font-medium">$ {Number((product.price * quantity).toFixed(2))}</h2>
                                </div>
                            ))}
                            </div>
                        </div>
                        {/* Total */}
                        <div className="flex items-center justify-between py-4 font-semibold">
                            <h2 className="">Total:</h2>
                            <h2 className="">$ {total}</h2>
                        </div>

                        </div>
                    </div>
                    </div>

                </div>
            </div>
        </div>
        <Footer />
        <LoadingScreen show={loadingApi}/>
        
        </>
    )
}