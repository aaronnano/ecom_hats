import { useEffect } from "react"

// Nota: las animations vienen apegados a display: normal to hidden
//       las transitions vienen con propiedades, width, padding, translate, top, left
//       opacity invisible

const chooseColor = (color) => {
    return color === 'cafe' ? 'bg-amber-50 border-amber-800' :
           color === 'red' ? 'bg-red-50 border-red-800' :
           color === 'white' ? 'bg-white border border-gray-700 rounded-sm' : null

}

export const Alert = ({ message = 'Alert', isActive = true, onShow, onClose, duration = 1.1, color = 'cafe' }) => {
    const customClass = chooseColor(color)
    useEffect(() => {
        if(isActive){
            // onShow()  // Avisar a la parte superior de que se esta en Show
            setTimeout(() => {
                // setIsActive(false)
                onClose()  // Avisar de que se esta en Close
            }, duration*1000)
        }
    }, [isActive])

    {/* Este container fixed es para el background, e.g. bg-gray-500. Si no queremos, lo podremos sacar */}
    return (
        <div className={`${isActive ? 'show' : 'hide'}
                fixed top-0 h-screen w-full transition-all duration-150 ease-in-out `}>
            <div className={`
                absolute top-[50px] right-[10%] p-3 px-8 text-sm italic font-medium border-[1.5px] ${customClass}
                 duration-150 ease-in-out ${ isActive ? 'top-[80px]' : '' }` 
            }>
                { message }
            </div>
        </div>
    )
}



// Background del alert, 
// <div className={`fixed top-0 h-screen w-full transition-all duration-150 ease-in-out ${isActive ? 'show' : 'hide'}`}>
//         {/* Este container fixed es para el background, e.g. bg-gray-500. Si no queremos, lo podremos sacar */}
//     <div className={`
//         p-3 px-8 text-sm italic font-medium bg-green-100 border-2 border-green-500
//         absolute top-[50px] right-[10%] 
//         duration-150 ease-in-out ${ isActive ? 'top-[80px]' : '' }` 
//     }>
//         { message }
//     </div>
// </div>


// Modal

// export const Modal = ({ message = 'Modal', open = false, onOpen, onClose, duration = 1.5 }) => {
//     useEffect(() => {
//         if(open){
//             onOpen()
//             setTimeout(() => {
//                 onClose()
//             }, duration*1000)
//         } 
//     }, [open])


// <div className="absolute z-10 top-0">
//     <div className={`fixed h-screen w-full bg-gray-500 bg-opacity-50 transition-all duration-150 ease-in-out ${open ? 'show' : 'hide'}`}>
//          <div className={`
//              p-3 px-8 text-sm italic font-medium bg-green-100 border-2 border-green-600
//              absolute top-[50px] right-[10%] 
//              duration-150 ease-in-out ${ open ? 'top-[80px]' : '' }` 
//          }>
//              { message }
//          </div>   
//         </div>
//     </div>