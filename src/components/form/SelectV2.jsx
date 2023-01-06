import { useState } from "react"

export const SelectV2 = ({ multiple = false, type='check', options, optionsSelected, className, name, value, onChange, size, 
sizeColor = '24px' }) => {
    // Type: color | check

    const initializeDefaultValues = () => {
        return optionsSelected.reduce((store, next) =>  ({...store, [next]: true  }), {})
    }

    const [selectedList, setSelectedList] = useState(!optionsSelected || optionsSelected.length === 0 ? 
        {} : initializeDefaultValues())  // Inicializar los valores


    const onClickOption = (value) => {
        let newList;
        if(multiple){
            newList = {
                ...selectedList, [value]: !selectedList[value]    
            }
        } else {
            newList = {
                [value]: !selectedList[value]
            }   
        }
        setSelectedList(newList)

        const valuesSelected = Object.keys(newList).filter((key) => newList[key])
        onChange({ target: {
            name, value: multiple ? valuesSelected : valuesSelected[0] ?? '',
        }})
    }

    return (
        <>
        { type === 'check' ? 
        <div className="" style={{width: `${size}%`}}>
            { options.map((value, i) => (
            <div key={i} className="flex items-center gap-x-4 py-2 cursor-pointer"
            onClick={() => onClickOption(value)}>
                {/* CheckBox */}
                <div className="w-4 h-4 flex items-center justify-center border-[1px] border-black rounded-sm">
                    <div className={`p-1 rounded-sm ${selectedList[value] ? 'bg-amber-900' : ''}`}></div>
                </div>
                {/* Value */}
                <h3 className="font-medium text-sm">{value}</h3>
            </div>
            ))}
        </div> 

        : type === 'color' ? 
        <div className="flex flex-wrap gap-5">
            {options.map((color, i) => (
                <div key={i} className={` flex justify-center rounded-full cursor-pointer text-white
                ${selectedList[color] ? 'ring-1 ring-amber-800 ring-offset-[3px]' : ''}`}
                style={{ backgroundColor: color, width: `${sizeColor}`, height: `${sizeColor}` }} 
                onClick={() => onClickOption(color)}>

                    {/* { color === optionSelected ? <CheckIcon className={`w-[${size}%]`}/> : null } */}
                    {/* Seleccionar el color segun el index */}
                </div>
            ))}
        </div>

        : null 
        }
       </>
    )
}


{
    //     <div className="flex gap-x-5">
    //     {product.colors.map((color, i) => (
    //         <div key={i} className="w-6 h-6 flex justify-center rounded-full cursor-pointer text-white" 
    //         // No muestra el color con bg-[${}]
    //             style={{ backgroundColor: color }} 
    //             onClick={() => onChangeColor(i)}>
    //             { i === colorSelected ? <CheckIcon className="w-[75%]"/> : null }
    //             {/* Seleccionar el color segun el index */}
    //         </div>
    //     ))}
    // </div>
    
    }