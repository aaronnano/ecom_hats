import { useEffect } from 'react'
import { Link, useLocation, useNavigate, useNavigation } from 'react-router-dom'
import m1 from '../assets/m1.png'
import { InputField, InputPass, errors } from '../components/form'

import { LoadingScreen } from '../components/LoadingScreen'
import { getQueryParams } from '../helpers/getQueryParams'
import { useCartStore } from '../hooks'

import { useAuthStore } from '../hooks/useAuthStore'
import { useForm } from '../hooks/useForm'

const modelValues = {
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: ''
}



export const Register = () => {
    const { startRegister, status, loadingAuth } = useAuthStore()
    const { items } = useCartStore()
    const { search } = useLocation()
    const params = getQueryParams(search)
    const navigate = useNavigate()


    useEffect(() => {
        // Acceso no permitido. 
        // Solo podremos generar una cuenta y orden cuando hayan items
        if(items.length === 0 && params.order === 'true') navigate('/')
    },[])


    const { onChangeValue, formValues, isValidForm } = useForm(modelValues)
    const { username, email, password } = formValues
    const showLoading = loadingAuth

    const onSubmitData = async(e) => {
        e.preventDefault()
        if(!isValidForm) return

        const first = formValues.firstname[0].toUpperCase() + formValues.firstname.slice(1)
        const last = formValues.lastname[0].toUpperCase() + formValues.lastname.slice(1)
        const name = first + ' ' + last

        await startRegister({ name, username, email, password })
        // Aqui ya habria un User Session, y ya con los cartItems en DB.

        //  Si se registra para hacer una orden
        if(params.order === 'true') navigate('/checkout')
        // [#]
    }

    return (
        <>
        <div className='w-full flex'>
            <div className="w-full md:w-2/5 py-3 md:px-3">
                <div className="flex items-center pb-4 justify-between">
                    <h2 className="text-xl font-bold">Sign Up.</h2>
                    { params.order === 'true' ? // text-[11px] inline-block
                        <div className=" p-1 px-3 text-xs text-amber-900 font-semibold italic border-[1.5px] border-amber-900 rounded-xl" >
                            For place order.
                        </div> : null
                    }
                </div>

                {/* Form */}
                <form onSubmit={onSubmitData}>
                    <div className="grid grid-cols-2 gap-x-5">
                    <InputField title='Firstname' autoFocus  // [#] Focus ref
                        className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-sm outline-none focus:border-amber-700 mb-2' onChange={onChangeValue} required { ...errors.name }  // pattern errorMessage
                    />
                    <InputField title='Lastname'
                        className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-sm outline-none focus:border-amber-700 mb-2' onChange={onChangeValue} required { ...errors.name }  // pattern errorMessage
                    />
                    </div>
                    <InputField title='Username'
                        className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-sm outline-none focus:border-amber-700 mb-2' onChange={onChangeValue} required { ...errors.username }  // pattern errorMessage
                    />
                    <InputField title='Email' type='email' 
                        className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-sm outline-none focus:border-amber-700 mb-2'
                        onChange={onChangeValue} required maxLength={30} { ...errors.email }
                    />
                    <InputPass title='Password' type='password' 
                        className='w-full px-5 pr-12 py-3 border-[1.5px] border-stone-300 text-sm outline-none focus:border-amber-700 mb-2'
                        onChange={onChangeValue} required maxLength={11}  { ...errors.password }
                    />
                    <div className="flex justify-between items-center">
                        { /* w-fit sirve para dejar el width como lo estaba antes, normal, para no usar w-full */}
                        <Link to='/login' className='w-[50%] md:w-fit text-sm text-amber-800 hover:text-stone-900' >
                            Alredy you have an account?
                        </Link>
                        <button className='p-3 px-10 font-medium uppercase border-[1.5px] text-sm
                        text-amber-700 border-amber-700 hover:bg-amber-700 hover:text-white transform duration-150 ease-in-out'>
                            Sign up
                        </button>
                    </div>
                </form>


            </div>
            <div className="hidden md:w-3/5 md:block">
                <div className="">
                    <img src={m1} className="w-full px-3 lg:px-8" alt="" />
                </div>
            </div>
        </div>
        <LoadingScreen show={showLoading} /> 
        </>
    )
}