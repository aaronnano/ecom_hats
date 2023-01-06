import { MagnifyingGlassIcon } from "@heroicons/react/24/outline"
import { useLocation, useNavigate } from "react-router-dom"
import { getQueryParams } from "../helpers"
import { parseQueryParams } from "../helpers/parseQueryParams"

export const SearchBar = ({ value, onChangeValue, placeholder }) => {
    const navigate = useNavigate()
    const { pathname, search } = useLocation()
    const params = getQueryParams(search)
    

    const onSubmit = (e) => {
        e.preventDefault()
        params.q = value
        if(value === '') delete params.q


        navigate(`/home/shop${parseQueryParams(params)}`)
    }
    const onChange = (e) => {
        e.target.value = e.target.value.trim()
        onChangeValue(e)
    }
    
    return (
        <div className="w-full font-montserrat">
            {/* Search */}
            <div className="relative">
                <form onSubmit={onSubmit}>
                <input type="text" 
                    className="w-[300px] pl-10 pr-3 py-[11px] text-zinc-900 border-[1.5px] focus:border-black text-xs    appearance-none outline-none"
                    name="search" value={value} placeholder={placeholder} onChange={onChange}
                    autoComplete='off'
                />
                </form>
                <div className="absolute left-[20px] translate-x-[-50%] top-[50%] translate-y-[-50%] cursor-pointer"
                onClick={onSubmit}>
                    <MagnifyingGlassIcon className="w-[16px] font-semibold"/>
                </div>
            </div>

            {/* Options */}
            <div className="absolute ">

            </div>
        </div>
    )
}