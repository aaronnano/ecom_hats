import { useEffect, useRef, useState } from "react"
import { Link } from "react-router-dom"
import icon2 from '../assets/icon2.png'
import hats from '../assets/hats.png'
import headphones from '../assets/headphones.png'
import glasses from '../assets/glasses.png'

export const Home = () => {
    const div = useRef()

    const [state, setState] = useState(null)
    const onResize = () => {
        setState({})
    }
    useEffect(() => {
        setTimeout(() => {
            setState({})
        }, 50)
        window.addEventListener('resize', onResize)

        return () => {
            window.removeEventListener('resize', onResize)
        }
    }, [])

    console.log(div.current?.offsetHeight)

    return (
        <div className="w-full">
            {/* Banner */}
            <div className="" style={{ height: div.current?.offsetHeight }} >
            <div className="absolute left-0 w-full bg-amber-50" ref={div}>
            <div className="max-w-[1200px] mx-auto ">
            <div className="w-full flex px-8 ">
                <div className="md:w-1/2 flex flex-col justify-center pr-10 py-8">
                    <h3 className="uppercase text-amber-800 pb-2">Hats Shop</h3>    
                    <h3 className="text-3xl font-semibold pb-8">A Gorgeous Collection. </h3>
                    <Link to='/home/shop' className='w-fit p-3 px-10 border-[1.5px] text-sm font-semibold
                    text-amber-900 border-amber-900 
                    hover:border-amber-600 hover:text-amber-600 transform duration-150 ease-in-out'>
                        Shop Now
                    </Link>
                </div>    
                <div className="hidden md:w-1/2 md:block">
                    <img src={icon2} className='p-10' />
                </div>
            </div>    
            </div>
            </div>
            </div>

            {/* Categories */}
            <h3 className="text-xl font-semibold text-center pt-10 pb-5 uppercase">Categories</h3>
            <div className="flex flex-col md:flex-row justify-center gap-x-5 gap-y-7">
                <Link to='/home/shop?cat=Hats,' 
                className="md:w-[25%] flex items-center gap-x-5 px-7 py-5  bg-stone-100/40 shadow-lg duration-150 ease-in-out
                hover:text-black/40">  
                    <img src={hats} className='w-[50px]' />
                    <h3 className="font-medium font-montserrat text-sm">Hats</h3>
                </Link>
                <Link to='/home/shop?cat=Headphones,' 
                className="md:w-[25%] flex items-center gap-x-5 px-7 py-5  bg-stone-100/40 shadow-lg duration-150 ease-in-out
                hover:text-black/40">  
                    <img src={headphones} className='w-[50px]' />
                    <h3 className="font-medium font-montserrat text-sm">Headphones</h3>
                </Link>
                <Link to='/home/shop?cat=Glasses,' 
                className="md:w-[25%] flex items-center gap-x-5 px-7 py-5  bg-stone-100/40 shadow-lg duration-150 ease-in-out
                hover:text-black/40">  
                    <img src={glasses} className='w-[50px]' />
                    <h3 className="font-medium font-montserrat text-sm">Glasses</h3>
                </Link>
            </div>
           
        </div>
    )
}