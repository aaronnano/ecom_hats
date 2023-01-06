import { CloudArrowUpIcon } from "@heroicons/react/24/outline"
import { useRef } from "react"

export const InputFile = ({ title, className, name, file, onChange, errorMessage }) => {
    // File: object file para hacer cosas con el
    const ref = useRef()


    return (
        <div className="mb-3">
            <h2 className="font-semibold text-sm pb-1">{ title }</h2>
            <button type="button" className={className}
            onClick={() => ref.current.click()}> {/* Con type button evito que el form lo tome al button como un submit */}
                <CloudArrowUpIcon className="w-[16px]" />
                <span className="text-xs"> {/* text-stone-500. Se supone que className ya tiene el text-xs, pero no me lo toma aca */}
                    { file?.name || 'No File Selected' }
                </span>
            </button>
            <span className={`py-2 text-[13px] text-rose-600 ${errorMessage ? '' : 'hidden'}`}>
                { errorMessage }
            </span>
            
            <input type="file" ref={ref} name={name} onChange={onChange} className="hidden" />
            {/* Si lo pongo como required sale un error comun, no me deja hacer submit */}
        </div>
    )
}