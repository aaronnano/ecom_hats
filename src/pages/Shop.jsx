import { useMemo } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Select } from "../components/form"
import { SelectV2 } from "../components/form/SelectV2"
import { Products } from "../components/Products"
import { getQueryParams } from "../helpers"
import { parseQueryParams } from "../helpers/parseQueryParams"
import { useForm, useApiData, useEffectDep } from "../hooks"

export const Shop = () => {
    const navigate = useNavigate()
    // const categoriesApi = ['Hats', 'Glasses', 'Shoes', 'Headphones']
    const { products:productList, categories:categoriesData, colors:colorsData } = useApiData()
    const { search, pathname } = useLocation()
    const params = getQueryParams(search)

    
    params.q = params.q ?? ''  // Search
    params.cat = typeof params.cat === 'string' || !params.cat ? [] : params.cat  // Category
    params.col = typeof params.col === 'string' || !params.col ? [] : params.col.map(color => '#'+color)
    params.sort = params.sort ?? ''

    
    const { formValues, onChangeValue } = useForm({
        categories: params.cat,  // []
        sort: params.sort,    // ''
        colors: params.col   // []
    })
    const { sort, categories, colors } = formValues

    // Effect que Solo se dispara ante cambios de la dependencias
    useEffectDep(() => {  // Editamos el 'params'
        console.log('effect')

        if(categories.length === 0) delete params.cat
        else params.cat = categories

        if(sort === '') delete params.sort
        else params.sort = sort

        if(colors.length === 0) delete params.col
        else params.col = colors.map(color => color.slice(1))

        
        console.log({params})

        navigate(`${pathname}${parseQueryParams(params)}`)
    },[categories, sort, colors])

    

    // ProductFilter
    const products = useMemo(() => {
        // Search
        let res = productList.filter((product) => product.title.toLowerCase().includes(params.q.toLowerCase()))

        // Sort 
        if(sort.includes('Low to High')){
            res.sort((a,b) => Number(a.price) - Number(b.price))
        } else if(sort.includes('High to Low')){
            res.sort((a,b) => Number(b.price) - Number(a.price))    
        }

        // Categories        
        res = categories.length > 0 ? res.filter((product) => categories.includes(product.category)) : res

        // Colors
        res = colors.length > 0 ? res.filter((product) => colors.some(color => product.colors.includes(color))) : res

        return res
    },[params.q, sort, categories, colors])

    console.log(colors)

    return (
        <div className="w-full">
            {/* Title of Search */}
            { params.q !== '' ? 
            <div className="flex items-center font-medium py-5 px-5 bg-zinc-50">
                <h3 className="">Searching for <span className="font-bold">"{params.q}"</span></h3>
            </div> : null }


            <div className="flex gap-x-">
                {/* Side */}
                <div className="hidden md:block md:w-[25%] px-5 pt-12">
                    {/* Categories */}
                    <div className="w-full">
                        <h3 className="pt-4 pb-5 font-semibold">Categories</h3>
                        <SelectV2 type="check" multiple options={categoriesData} optionsSelected={categories}
                            name='categories' onChange={onChangeValue} size={70}
                        />
                    </div>
                    {/* Colors */}
                    <div className="w-full">
                        <h3 className="pt-4 pb-5 font-semibold">Colors</h3>
                        <SelectV2 type="color" multiple options={colorsData} sizeColor='20px'
                            name='colors' onChange={onChangeValue} optionsSelected={colors}
                        />
                    </div>

                </div>
                {/* Products */}
                <div className="w-full md:w-[75%]">
                    <div className="flex flex-col md:flex-row justify-between items-center py-4 px-3">
                        <h3 className="">
                            <span className="">Showing </span>
                            <span className="text-amber-700 font-semibold">{products.length}</span>
                            <span className=""> of </span>
                            <span className="text-amber-700 font-semibold">{productList.length}</span>
                            <span className=""> results</span>
                        </h3>
                        <div className="flex items-center">
                            <h3 className="text-sm shrink-0 pr-4">Sort By:</h3>
                            <Select options={['Price: Low to High', 'Price: High to Low']} name="sort" 
                                className="w-full flex items-center justify-between px-3 py-2 border-[1.5px] border-stone-300
                                text-xs focus:border-black" placeholder='Choose Sort' optionsSelected={sort ? [sort] : []}
                                onChange={onChangeValue} size='200px'
                            />
                        </div>
                    </div>
                    <Products products={products} />
                </div>
            </div>
            
        </div>
    )
}
{/* <h4 className="py-5 uppercase text-center text-2xl font-bold">Products</h4> */}