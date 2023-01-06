import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline"
import { useState } from "react"

export const InputPass = ({ title = '', className, type, onChange, maxLength, required, 
        pattern, errorMessage, ...rest }) => {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [visibleError, setVisibleError] = useState(false)
    
    // const props = {
    //     title, className, type, id, placeholder, maxLength
    // }

    const onViewPattern = (e) => {
        const { value = '' } = e.target
        const res = value === '' || value.match(pattern)
        e.target.isValid = !!res
        setVisibleError(!res)

        onChange(e)
    }
    const id = rest.id || title  // For htmlFor - id
    const toSmallText = className.includes('text-xs')

    return (
        <div className="mb-3">
            <label htmlFor={id} className="block font-semibold text-sm pb-1">{ title }</label>
            <div className="relative">
                <input type={ passwordVisible ? 'text' : 'password' } 
                    className=
                    {'outline-none ' + className + (visibleError ? ' border-[1.5px] border-red-500 focus:border-red-500'  : '')}
                    name={title.toLowerCase()}
                    required={required} id={id} placeholder={title} maxLength={maxLength}
                    onChange={onViewPattern} { ...rest } // Se hace override a e.g. placeholder
                />
                {/* Antes top-[15px] */}
                <div className="absolute top-[50%] translate-y-[-67%] right-[20px] text-stone-500 cursor-pointer" 
                    onClick={() => setPasswordVisible(v => !v)}>
                    { passwordVisible ? <EyeIcon className="w-[20px]" /> : <EyeSlashIcon className="w-[20px]" />} 
                </div>
            </div>
            <span className={`py-2 text-rose-600 ${toSmallText ? 'text-xs' : 'text-[13px]'} ${visibleError ? '' : 'hidden'}`}>
                    { errorMessage }
            </span>
        </div>
    )
}