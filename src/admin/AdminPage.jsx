import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"
import { useEffect, useRef } from "react"
import { Link } from "react-router-dom"
import { errors, InputField, InputTextArea, InputFile, Select } from "../components/form"
import { LoadingScreen } from "../components/LoadingScreen"
import { useApi } from "../hooks/useApi"
import { useApiData } from "../hooks/useApiData"
import { useForm } from "../hooks/useForm"

export const AdminPage = () => {

    const { startCreateProduct, loadingApi, messageApi, setMessageApi  } = useApi()
    const { colors, loadingApiData } = useApiData(['colors'])
    
    const { onChangeValue, formValues, errorMessage, setErrorMessage } = useForm({
        title: '', 
        description: '',
        image: null, // File
        price: '',
        category: '',
        colors: []
    })
    
    useEffect(() => {  // Luego de confirmar la creacion del product y de que cambien el formValues, borro el msg
        setMessageApi('')
    }, [formValues])

    console.log(formValues)

    
    const firstInput = useRef()
    // Usare al errorMessage como un indicio de que hay errores al hacer submit
    const onSubmitData = async(e) => {
        e.preventDefault()
        if(!formValues.image) return setErrorMessage(true)
        if(formValues.colors.length === 0) return setErrorMessage(true)
        // Estaria mal. Con que uno este mal, habilita que se muestre todos los errores.

        let category = formValues.category.toLowerCase()
        category = category.split('')[0].toUpperCase() + category.slice(1)
        console.log(category)

        console.log('Sended!')
        await startCreateProduct({ ...formValues, category })

        firstInput.current.focus()  // Luego de enviarse y recibir todo, pongo foco en el primer input
        
    }

    
    return (
        <>
        <div className="max-w-[1200px] mx-auto">  { /* h-screen porque esta page es solo de tamaño Screen */}
            <div className="px-11 md:px-8">
                <h3 className="pb-4 pt-8 md:py-4 font-bold text-xl text-black ">
                    <Link to="/admin" className="">Admin.</Link>
                </h3>
                <div className="md:px-20 mb-20">
                    <div className="flex pb-4 pt-8 md:py-4 ">
                        <span className="font-medium text-md uppercase text-black">Create Product</span>
                        {   messageApi.includes('Error') ? 
                            <span className='flex items-center pl-4 font-medium text-rose-600 text-[14px]'>
                                <XCircleIcon className="w-[17px]"/>
                                <span className="pl-2">{ messageApi }</span>
                            </span> :
                            messageApi.includes('Product') ?
                            <span className='flex items-center pl-4 font-medium text-green-700 text-[14px]'>
                                <CheckCircleIcon className="w-[17px]"/>
                                <span className="pl-2">{ messageApi }</span>
                            </span> : 
                            <span className='flex items-center pl-4 font-medium text-gray-400 italic text-[14px]'>
                                No changes
                            </span>
                        }
                    
                    </div>
                    <form onSubmit={onSubmitData}>
                        <div className="grid md:grid-cols-2 gap-x-5 mb-4">
                        { /* Otro modo: Usando flex flex-wrap, con 'flex-1' en cada item para separar y tomar todo el width en vez de usar 
                            w-1/2, util para usar el gap. Como no me sirvio para esto use grid  */}
                            <InputField title='Title' autoFocus reff={firstInput}
                                className='w-full px-5 py-3 mb-2 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black ' 
                                onChange={onChangeValue} value={ formValues.title } required
                            />
                            <InputField title='Price' type='text' 
                                className='w-full px-5 py-3 mb-2 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black '  { ...errors.decimal } // Para que sea un decimal
                                onChange={onChangeValue} value={ formValues.price } required
                            />
                            <InputTextArea title='Description'
                                className="w-full px-5 py-3 mb-2 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black "
                                rows="3" maxLength={255} placeholder="Write a comment..." 
                                onChange={onChangeValue} value={ formValues.description } required
                            />
                            <InputField title='Category' maxLength={11}
                                className='w-full px-5 py-3 mb-2 border-[1.5px] border-stone-300 text-xs outline-none 
                                focus:border-black '
                                onChange={onChangeValue} value={ formValues.category } required
                            />
                            <InputFile title='Choose an Image' name="image"
                                className="w-full flex items-center gap-x-4 px-5 py-3 mb-2 border-[1.5px] border-stone-300
                                duration-150 ease-in-out hover:drop-shadow-md "
                                { ...( errorMessage ? errors.file : {}) }  // Si se hay errores en submit, muestro 
                                file={ formValues.image } onChange={onChangeValue} // OnChange file
                            />
                            <div className="mb-3">
                            <Select multiple title='Choose a color' options={colors} name="colors" 
                                className="w-full flex items-center justify-between px-5 py-3 mb-2 border-[1.5px] border-stone-300
                                text-xs focus:border-black"
                                { ...( errorMessage ? errors.select : {}) }  // Si se hay errores en submit, muestro 
                                onChange={onChangeValue}
                            />
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button className='p-3 px-8 font-medium uppercase border-[1.5px] text-xs
                            text-black border-black hover:bg-black hover:text-white transform duration-150 ease-in-out'>
                                Create Product
                            </button>
                        </div>
                    </form>
                    
                </div>
            </div>
        </div>
        <LoadingScreen show={loadingApi || loadingApiData} />
        </>
    )
}

{/* <Select title='Choose a category' name="categories" 
    className="w-full flex items-center justify-between px-5 py-3 mb-2 border-[1.5px] border-stone-300 text-xs outline-none focus:border-black"
    { ...( errorMessage ? errors.select : {}) }  // Si se hay errores en submit, muestro 
    onChange={onChangeValue}
    options={['Hat', 'Earphones', 'Shoes', 'Glasses']}
/>  Decido que el usuaerio ingrese el mismo la category, creandose una nueva o usando una existente */}