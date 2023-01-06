import { CheckCircleIcon, CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef, useState } from "react"
import { errors, InputField, InputPass } from "../components/form"
import { LoadingScreen } from "../components/LoadingScreen"
import { useApi } from "../hooks/useApi"
import { useAuthStore } from "../hooks/useAuthStore"
import { useForm } from "../hooks/useForm"
import userImage from '../assets/user2.png'
import { Message } from "../components/Message"

export const UserPage = () => {
    // Nota: como nuestra ruta es dinamica (cambia segun el /username), React hara render de este componente desde cero
    // solo si cambia el /username. Con lo cual, se crea un nuevo ciclo de vida
    // const [initMount, setInitMount] = useState(true) // Un state para indicar si el primer Mount del Componente

    const { user } = useAuthStore()
    const { startUpdateUser, messageApi, setMessageApi, loadingApi, startUploadAvatar  } = useApi()
        
    const { onChangeValue, formValues, isValidFormFilledFields, formValuesOnlyFilled,
            errorMessage, setErrorMessage } = useForm({
        firstname: user.name.split(' ')[0],
        lastname:user.name.split(' ')[1],
        username: user.username,
        email: user.email,
        password: '',
        password2: ''
    })

    // Cuanda haya notificacion de 'Changes Done' de la api, lo normalizo cuando alguien empieze a llenar algun field
    useEffect(() => {  
        setMessageApi('')

    }, [formValues])

    
    const onSubmitData = async(e) => {
        e.preventDefault()
        const { username, email, password, password2 } = formValuesOnlyFilled
        // # Validations
        if(!isValidFormFilledFields) return
        if( !password && password2 || password && !password2 ) 
            return setErrorMessage('You need to rewrite the password.')  // Cuando un pass esta vacio y el otro tiene contenido 
        if( password && password2 && password !== password2) // Si existen los campos, prosigo 
            return setErrorMessage('There are different passwords.')

        const first = formValues.firstname[0].toUpperCase() + formValues.firstname.slice(1)
        const last = formValues.lastname[0].toUpperCase() + formValues.lastname.slice(1)
        const name = first + ' ' + last

        // # ID y los fields del User to update
        await startUpdateUser({ name, username, email, password })
        // La api se encargara de ver si hacer la accion o no con el token. Si no es valido el token, llamo checkToken()
        // para ponerlo en Logout

    }
    

    // File Handler. Habria que mejorarlo y juntarlo con useApi
    const ref = useRef()
    // Maneja el state: errorFile
    const onChangeFile = async(e) => {
        const file = e.target.files[0]
        await startUploadAvatar(file)
    }

    const message = errorMessage ? errorMessage : messageApi  // o nada
    const type = errorMessage ? 'error' : messageApi ? 'fine' : ''

    return (
        <>
        <div className="w-full">  {/* max 750px, md:p- */}
            <h2 className="py-5 uppercase text-xl font-bold">Profile.</h2>
                {/* Content */}
                <div className="mb-6">
                    { /* Title Avatar and Errors */}
                    <div className="flex pb-4">
                        <span className="font-semibold text-sm">Profile Photo.</span>
                        {/* Messages */}
                        { messageApi.includes('Error') ? 
                            <span className='flex items-center pl-4 font-medium text-rose-600 text-[14px]'>
                                <XCircleIcon className="w-[17px]"/>
                                <span className="pl-2">{ messageApi }</span>
                            </span> :
                            messageApi.includes('Avatar Updated') ?
                            <span className='flex items-center pl-4 font-medium text-green-700 text-[14px]'>
                                <CheckCircleIcon className="w-[17px]"/>
                                <span className="pl-2">{ messageApi }</span>
                            </span> : 
                            <span className='flex items-center pl-4 font-medium text-gray-400 italic text-[14px]'>
                                No changes
                            </span>
                        }
                    </div>

                    { /* Avatar */}
                    <div className="flex justify-start gap-6 items-end relative">
                        { !user.avatar ?
                            <div className="rounded-full ring-1 ring-black opacity-50">
                                <img src={userImage} className="w-[70px] h-[70px]
                                    p-6 object-cover object-center" />    
                            </div> : 
                            <img src={user.avatar} className="w-[70px] h-[70px] rounded-full ring-black
                            object-cover object-center" />
                        }
                        {/* Icon Avatar */}
                        <div className="absolute bottom-[3px] left-[52px]">
                            <button className="flex items-center bg-white rounded-full ring-1 ring-gray-300 p-1
                            hover:bg-gray-100 duration-150 ease-in-out" 
                            onClick={() => ref.current.click()}>
                                {/* Poner el 'block' es importante, si no como que el button genera height de mas */}
                                <CloudArrowUpIcon className="w-[20px]" />
                            </button>
                            <input type="file" ref={ref} onChange={onChangeFile} className="hidden" />
                        </div>

                    </div>

                </div>  {/* <div className="mb-6"> */}

                { /* Info Title and Errors */}
                {/* <span className="font-medium text-lg text-gray-800"></span> */}

                <form onSubmit={onSubmitData} noValidate>
                    { /* No validate para que no aparezcan cuadros de validacion en inputs */}    
                    <div className="grid md:grid-cols-2 gap-x-5 mb-4">
                    { /* Otro modo: Usando flex flex-wrap, con 'flex-1' en cada item para separar y tomar todo el width en vez de usar 
                        w-1/2, util para usar el gap. Como no me sirvio para esto use grid  */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-x-5">
                        <InputField title='Firstname' autoFocus
                            className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none
                            focus:border-black mb-2'
                            onChange={onChangeValue} { ...errors.name } value={formValues.firstname}
                        />
                        <InputField title='Lastname'
                            className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none
                            focus:border-black mb-2'
                            onChange={onChangeValue} { ...errors.name } value={formValues.lastname}
                        />
                        </div>
                        <InputField title='Username'
                            className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                            focus:border-black mb-2' 
                            onChange={onChangeValue} { ...errors.username } value={ formValues.username } 
                        />
                        <InputField title='Email' type='email'
                            className='w-full px-5 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                            focus:border-black mb-2' 
                            onChange={onChangeValue} { ...errors.email } value={ formValues.email } 
                        />
                        <InputPass title='Password' type='password'
                            className='w-full px-5 pr-12 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                            focus:border-black mb-2' id={1}
                            onChange={onChangeValue} maxLength={11}  { ...errors.password }
                        />
                        <InputPass title='Password' type='password'
                            className='w-full px-5 pr-12 py-3 border-[1.5px] border-stone-300 text-xs outline-none 
                            focus:border-black mb-2' id={2} placeholder='Repeat Password' name='password2'
                            onChange={onChangeValue} maxLength={11}  { ...errors.password }
                        />
                    </div>
                    {/* Button */}
                    <div className="flex md:flex-row items-center">
                        <button className='block p-3 px-8 mr-4 font-medium uppercase border-[1.5px] text-xs
                        text-black border-black hover:bg-black hover:text-white transform duration-150 ease-in-out'>
                            Update Changes
                        </button>
                        <Message message={message} type={type} />
                    </div>
                </form>
        </div>
        </>
    )
}