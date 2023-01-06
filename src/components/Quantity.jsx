import { MinusIcon, MinusSmallIcon, PlusIcon, PlusSmallIcon } from "@heroicons/react/24/outline"

export const Quantity = ({ name, value, onChange }) => {
    // Es mejor que el componente requiera que le pongas siempre el valor actual con un useState de afuera
    
    const onChangeValue = (newValue) => {
        if(newValue === 0) return 
        
        onChange({target: {
            name, value: newValue
        }})

    }

    return (
        <div className="flex items-center text-lg font-medium">  {/* Quantity */}
            <button className="p-2 hover:bg-gray-100" onClick={() => onChangeValue(value - 1)}>
                <MinusIcon className="w-[16px]"/>
            </button>
            <p className="px-2">{value}</p>
            <button className="p-2 hover:bg-gray-100" onClick={() => onChangeValue(value + 1)}>
                <PlusIcon className="w-[16px]" />
            </button>
        </div>
    )
}