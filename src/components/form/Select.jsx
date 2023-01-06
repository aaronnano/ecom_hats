import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline"
import { useEffect, useMemo, useRef, useState } from "react"

// multiple: Permite que este Select pueda seleccionar solo uno o varias segun el tipo
export const Select = ({ multiple = false, title, options, optionsSelected, className, name, size, placeholder, onChange, errorMessage }) => {
    const [active, setActive] = useState(false)  // Options displayed or not
    const [visibleError, setVisibleError] = useState(false)

    const initializeDefaultValues = () => {
        return optionsSelected.reduce((store, next) =>  ({...store, [next]: true  }), {})
    }

    const [selectedList, setSelectedList] = useState(!optionsSelected || optionsSelected.length === 0 ? 
        {} : initializeDefaultValues())  // Inicializar los valores

    const [valuesSelected, setValuesSelected] = useState(!optionsSelected || optionsSelected.length === 0 ? [] : optionsSelected) 
    
    

    // Actualizo valores, y lo mando al onChange
    const onClickOption = (value) => {
        let newList;
        console.log(value)
        if(multiple){
            newList = {
                ...selectedList, [value]: !selectedList[value]    
                // List:  { 'name1': true,   'name2': false,  ... }
                // true ->  'selected' , false ->  'not-selected' 
            }
        } else {
            newList = {
                [value]: !selectedList[value]
                // Not multiple, only the option selected is setted
                // { 'name1': true } or { 'name1': false } or { 'name2': false }
            }
        }

        setSelectedList(newList)

        const valuesSelected = Object.keys(newList).filter((key) => newList[key])
        setValuesSelected(valuesSelected)
        // Lista de options-names selected  {'name1': true , 'name2': false} -> ['name1']
        
        // Al momento de tener actualizados los valores seleccionados, muestro esos valores hacia arriba
        const isValid = !!valuesSelected[0]
        onChange({target: { 
            name, value: multiple ? valuesSelected : valuesSelected[0] ?? '',
            isValid  // Valid es si hay contenido
        }})
        setVisibleError(!isValid)

    }
    


    const ref_div = useRef()
    const ref_btn = useRef()
    const onClickOutside = (e) => {
        if(ref_div.current.contains(e.target)) return  // Si hice click dentro del div Options, no hago nada
        setActive(false) // Para ocultar las Options del dropDown
    }

    useEffect(() => {  // Una sola vez para definir el event
        document.addEventListener('mousedown', onClickOutside)
        return () => {
            document.removeEventListener('mousedown', onClickOutside)
            // Al morir el componente, deshago este event
        }
    },[])

    const height = ref_btn.current?.offsetHeight


    return (
        <div className='' style={{width: size}} ref={ref_div} >
            {/* Para ajustar el size de todo el Select. Nota: si pongo 80% no funciona, no se  */}

            {/* Title or not */}
            { title ? <h2 className="font-semibold text-sm pb-1">{ title }</h2> : null }

            <div className="relative">
            <button type="button" className={'outline-none ' + className} ref={ref_btn}
            onClick={() => setActive(!active)}>
                {/* Placeholder */}
                { placeholder ? 
                <h3 className="font-semibold">
                    {!multiple && valuesSelected.length !== 0 ? valuesSelected[0] : placeholder }
                </h3> :
                <span className="inline-block">
                    { valuesSelected.length !== 0 ? `${ valuesSelected.length } opciones escogidas` : 'None' }
                </span>
                }
                {/* Icon */}
                { active ? <ChevronUpIcon className="w-3" /> : <ChevronDownIcon className="w-3" /> }
            </button>

            <span className={`py-2 text-[13px] text-rose-600 ${visibleError ? '' : 'hidden'}`}>
                { errorMessage }
            </span>
            
            {/* Options */}
            <div className={active ? `absolute w-full z-10 top-[] left-[0px]
                text-xs border bg-white font-medium 
                min-w-[50px] max-h-[150px] overflow-auto` : 'hidden' } style={{ top: `${height + 3}px`}}>
                {options?.map((value,i) => (
                    <div key={i} className={`flex items-center gap-x-4 py-3 px-4 hover:bg-gray-100 cursor-pointer
                        ${selectedList[value] ? 'ring-l-1.5 border-black' : ''}`}  // Si de los seleccionados, este esta en 'true' 
                        // pongo un borde
                        onClick={() => onClickOption(value)}>

                        {/* Aqui determinamos si la opcion es un color o no */}
                        <div className={ value.includes('#') ? 'w-4 h-4 flex justify-center rounded-full cursor-pointer'
                           : 'hidden' }
                            style={{ backgroundColor: value }} >
                        </div>
                        <h2 className="">{value}</h2>
                    </div>
                ))}
                
            </div>
            </div>
        </div>
    )
}