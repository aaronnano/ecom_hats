import React, { useState } from "react"
// El forwardRef es usado para pasar el ref a un componente hijo

export const InputField = (
    { title = '', notEmpty = false, className, placeholder, type, maxLength = 30, onChange, pattern, errorMessage, reff, 
    ...rest }) => {
    // El errorMessage siempre estara presentar, siempre tendremos el mensaje, pero con el visibleError
    // lo mostramos o no. Usado con pattern
    if(notEmpty) errorMessage = 'Field empty'

    const [visibleError, setVisibleError] = useState(false)
        
    // title :  data, name, htmlFor, id, placeholder
    // const props = { title, className, type, id, placeholder, maxLength }

    const onChangeValue = (e) => {  // ViewPattern too
        const { value } = e.target
        // Si esta vacio o matchea con el pattern, no muestro el error
        let res = value.match(pattern)  // Si o si debe matchear, no puede estar vacio
        if(notEmpty && value === '') res = false  // Por si es importante que el field no este vacio     
        e.target.isValid = !!res   // Paso por el event el estado de este input, true or false validation
        setVisibleError(!res)
        
        onChange(e)
    }

    const id = rest.id || title  // For htmlFor - id

    return (
        <div className="mb-3">
            <label htmlFor={id} className='block font-semibold text-sm pb-1' >{ title }</label>
            <input type={type} className=
                {'outline-none ' + className + (visibleError ? ' border-[1.5px] border-red-500 focus:border-red-500'  : '')} 
                name={title.toLowerCase()} id={id} placeholder={placeholder || title} maxLength={maxLength}
                onChange={onChangeValue} ref={reff}
                {...rest}  // Si mando un 'name', reemplazara al name de arriba
            />
            <span className={`py-2 text-[13px] text-rose-600 ${visibleError ? '' : 'hidden'}`}>
                { errorMessage }
            </span>
        </div>
    )
}