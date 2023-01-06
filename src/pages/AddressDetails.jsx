import { ArrowLongLeftIcon, CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import { Link, useLocation, useNavigate, useParams } from "react-router-dom"
import { errors, InputField } from "../components/form"
import { Message } from "../components/Message"
// import { addresses } from "../data"
import { useApi, useAuthStore, useForm } from "../hooks"

const addressModel = {
    address_line: '',
    city: '',
    state: '',
    phone: ''
}

export const AddressDetails = () => {
    // Edit: Recieve the addressId actual
    const { user } = useAuthStore()
    const { addresses } = user
    const navigate = useNavigate()

    const param = useParams()
    const addressId = Number(param.id)
    
    // Create:
    const route = useLocation().pathname  // Aunque tambien 'param' aqui da la misma informacion
    

    // # Actual Address
    // const [address, setAddress] = useState(addressModel)
    const getActualAddress = () => {
        if(route.includes('create')) return

        // Address To Edit
        const addressFinded = addresses.find(address => address.id === addressId)
        const res = {...addressFinded} 
        delete res.id
        initializeFormValues(res)  // Usar en ProductPage
    }
    useEffect(() => {
        getActualAddress()
    }, [])


    const firstInput = useRef()


    // ## Form
    const { formValues:addressValues, errorMessage, setErrorMessage, onChangeValue, initializeFormValues,
            isValidForm } = useForm(addressModel)  // Si o si, todos los fields deben estar llenos
    
    const { startUpdateUser, messageApi, setMessageApi, loadingApi, dataApi  } = useApi()
    useEffect(() => {
        setMessageApi('')
    }, [addressValues])
    
    const onSubmitData = async(e) => {
        e.preventDefault()
        if(!isValidForm) return setErrorMessage('Some fields are invalid')

        let id; // id: undefined
        if(!isNaN(addressId)) id = addressId  // Para indicar que no hay id. Se creara uno

        await startUpdateUser({ address: { id,  ...addressValues } })  // Mando el field address

        // En create una vez creado el address volvemos a la parte principal
        if(route.includes('create')) navigate('/settings/user_addresses')
    }
    
    const message = errorMessage ? errorMessage : messageApi  // o nada
    const type = errorMessage ? 'error' : messageApi ? 'fine' : ''

    return (
        <div className="w-full">
            {/* Title - Button */}
            <div className="flex justify-between items-center py-5 ">
                <h2 className="uppercase text-sm md:text-xl font-bold">Address Details</h2>
                <button className="flex items-center py-2 px-5 font-bold border-[1.5px] md:text-sm text-xs
                    text-black border-black hover:bg-black hover:text-white transform duration-150 ease-in-out"
                    onClick={() => navigate('/settings/addresses')}>
                    <ArrowLongLeftIcon className="w-[17px]"/>
                    <span className="pl-4">Go Back</span>
                </button>
            </div>

            <form onSubmit={onSubmitData} noValidate>
            <div className="grid md:grid-cols-4 gap-x-5 mb-4">
                <div className="col-span-2">
                <InputField title='AddressLine' required name='address_line' autoFocus reff={firstInput}
                    className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                    focus:border-black mb-2' placeholder='e.g. 111 Hillinois Com'
                    onChange={onChangeValue} value={ addressValues.address_line } { ...errors.addressLine }
                />
                </div>
                <InputField title='City' notEmpty required 
                    className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                    focus:border-black mb-2' 
                    onChange={onChangeValue} value={ addressValues.city } 
                />
                <InputField title='State' notEmpty required
                    className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                    focus:border-black mb-2' 
                    onChange={onChangeValue} value={ addressValues.state } 
                />
                <InputField title='Phone' required
                    className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                    focus:border-black mb-2' placeholder='e.g. 000-000-000'
                    onChange={onChangeValue} value={ addressValues.phone } { ...errors.phone }
                />
            </div>
            <div className="flex flex-col items-start gap-y-3 md:flex-row md:items-center">
                <button className='block py-3 px-8 mr-4 font-medium uppercase border-[1.5px] text-xs
                text-black border-black hover:bg-black hover:text-white transform duration-150 ease-in-out'>
                    { route.includes('create') ? 'Create Address': 'Save Address' }
                </button>
                <Message message={message} type={type} />
            </div>
            </form>

        </div>
    )
}