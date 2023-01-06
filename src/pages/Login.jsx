import { Link } from 'react-router-dom'
import m2 from '../assets/m2.png'
import { InputField, InputPass, errors } from '../components/form'
import { useAuthStore } from '../hooks/useAuthStore'
import { useForm } from '../hooks/useForm'
import { LoadingScreen } from '../components/LoadingScreen'
import { useEffect, useRef } from 'react'

const modelValues = {
    email: '',
    password: ''
}


export const Login = () => {
    const { onChangeValue, formValues, isValidForm } = useForm(modelValues)
    const { email, password } = formValues
    const { startLogin, errorMessage: errorMessageAuth, loadingAuth, startClearMessage } = useAuthStore()
    const showLoading = loadingAuth

    useEffect(() => {
        startClearMessage()
    }, [])

    const ref = useRef() // Ref al input y ante cada render poner el focus al Input

    const onSubmitData = (e) => {
        e.preventDefault() 
        if(!isValidForm) return
        
        startLogin({ email, password })

        ref.current.focus() // Aunque inicie o no sesion, pongo el focus igualmente
    }
    
    return (
        <>
        <div className='w-full flex'>
        <div className="w-full md:w-2/5 py-3 md:px-3">
            <h2 className="mb-4 text-xl font-bold">Login.
                {errorMessageAuth ? <span className='pl-4 text-sm text-rose-600 font-medium'>
                    { errorMessageAuth }
                </span> : null }
            </h2>

            {/* Form */}
            <form onSubmit={onSubmitData}>
                <InputField title='Email' type='email' autoFocus reff={ref}
                    className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-sm focus:border-amber-700 mb-2'
                    onChange={onChangeValue} required { ...errors.email }
                />
                <InputPass title='Password' type='password'
                    className='w-full px-5 pr-12 py-3 border-[1.5px] border-stone-300 text-sm focus:border-amber-700 mb-2'
                    onChange={onChangeValue} required maxLength={11} { ...errors.password }
                />

                <div className="flex justify-between items-center">
                    <Link to='/register' className='text-sm text-amber-800 hover:text-stone-900' >Create an account</Link>
                    <button className='p-3 px-10 font-medium uppercase border-[1.5px] text-sm
                    text-amber-700 border-amber-700 hover:bg-amber-700 hover:text-white transform duration-150 ease-in-out
                    disabled:border-amber-700/50 disabled:bg-amber-700/50 disabled:text-white'
                    disabled={ loadingAuth } >
                        Login
                    </button>
                </div>

            </form>
        </div>
        {/* Image on MD */}
        <div className="hidden md:w-3/5 md:block">
            <div className="">
                <img src={m2} className="w-full px-3 lg:px-8" alt="" />
            </div>
        </div>
        </div>
        <LoadingScreen show={showLoading}/>  { /* Inicia solo si status esta en 'loading' */}
        
        </>
    )
}