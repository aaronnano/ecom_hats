import { format } from 'date-fns'
import userImage from '../assets/user2.png'
import ThreeDots from '../assets/three.svg'
import { useEffect, useRef, useState } from 'react'

export const Review = ({ comment, user, createdAt, onUpdate, onDelete, isActualUser }) => {
    const [active, setActive] = useState(false) // CommentOption
    const date = format(new Date(createdAt), 'MMMMMM dd, yyyy')  
    

    const ref = useRef()
    const onClickOutside = (e) => {
        if(ref.current.contains(e.target)) return  // Si hice click dentro del div Options, no hago nada
        setActive(false) // Para ocultar las Options del dropDown
    }

    useEffect(() => {  // Una sola vez para definir el event
        document.addEventListener('mousedown', onClickOutside)
        return () => {
            document.removeEventListener('mousedown', onClickOutside)
            // Al morir el componente, deshago este event
        }
    },[])

    const onClickOption = (option) => {
        setActive(false)
        if(option === 'update'){
            onUpdate()
        } else {
            onDelete()
        }
    }


    return (
       <div className="w-full md:w-[80%] pb-6">
           <div className="flex">
                {/* Image */}
                <div className="shrink-0"> 
                {/* shrink-0 o min-w-[100px] Para que la img no se reduzca o se modifique por el div del comentario */}
                { !user.avatar ?
                    <div className="rounded-full border-2 border-gray-500 opacity-50">
                        <img src={userImage} className="w-[46px] h-[46px] md:w-[96px] md:h-[96px] 
                        p-[32%] object-cover object-center" />
                    </div> :
                    <img src={user.avatar} className="w-[50px] h-[50px] md:w-[100px] md:h-[100px] rounded-full object-cover object-center" alt="" />
                }
                </div>
                {/* Side */}
                <div className="px-5 relative">
                    <div className="flex items-center justify-between">
                        {/* Name */}
                        <div className="flex items-center  font-medium">
                            <span className="text-xs md:text-base">{user.name}</span>
                            <span className="text-lg font-bold">&nbsp;&nbsp;&#x2022;&nbsp;&nbsp;</span>
                            <span className="text-xs text-gray-400">{ date }</span>
                        </div>
                        {/* CommentOption */}
                        <div className="relative" ref={ref}>
                            <button type="button" className={`px-2 py-1 rounded-lg duration-150 ease-in-out hover:bg-gray-100
                            ${!isActualUser ? 'hidden' : ''}`}
                            onClick={() => setActive(!active)} >
                                <img src={ThreeDots} className="w-3 " /> 
                            </button>
                            <div className={active ? `absolute text-xs border z-10
                                top-[30px] right-0 md:left-[0px] md:right-full 
                                bg-white font-medium min-w-[120px] max-h-[150px] overflow-auto` : 'hidden' } >
                                    {/* right-full basicamente para omitir el right en mobile y usar el left */}
                                <div className={`flex items-center gap-x-4 py-2 px-3 hover:bg-gray-100 cursor-pointer`}
                                    onClick={() => onClickOption('update')}>
                                    <h2 className="">Update </h2>
                                </div>
                                <div className={`flex items-center gap-x-4 py-2 px-3 hover:bg-gray-100 cursor-pointer`}
                                    onClick={() => onClickOption('delete')}>
                                    <h2 className="">Delete </h2>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                    {/* Comment */}
                    <p className="py-1 text-xs md:text-sm text-gray-500"> {comment} </p>
                </div>
           </div>
           
       </div>
    )
}