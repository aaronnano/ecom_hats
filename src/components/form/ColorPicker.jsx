import { useState } from "react"
import { ChromePicker } from "react-color"

export const ColorPicker = ({ color = '#', onChangeComplete }) => {
    const [colorState, setColorState] = useState(color)

    const onChangeColor = (color) => {
        setColorState(color)
        onChangeComplete(color.hex)
    }


    return (
       <div className="w-full z-30">
            <ChromePicker color={colorState} onChange={(color) => setColorState(color)}
                onChangeComplete={onChangeColor}
            />
       </div>
    )
}