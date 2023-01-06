import { useMemo } from "react"
import { useImages } from "../hooks/useImages"
import { ProductCard } from "./ProductCard"

export const Products = ({ products }) => {
     
    const listIds = useMemo(() => products.map(({id}) => id), [products])

    const { imagesLoaded, onLoadedImage } = useImages(listIds)


    return (
       <div className="w-full"> { /* Background */}
            <div className={`w-full flex flex-wrap justify-center md:justify-start duration-150 ease-in-out
            ${imagesLoaded ? 'show' : 'hide'}`}
                // style={{ visibility: imagesLoaded ? 'visible' : 'hidden' }}
                >
                {products.map((product, i) => (  // Si pongo el LoadingScreen en Routes con LoadingApiData, puedo sacar el '?'
                    <ProductCard key={product.id} onLoadImage={ () => onLoadedImage(product.id) } 
                    // Paso a onLoadedImage a que imagen me refiero
                    imageLoaded={imagesLoaded} { ...product } />
                ))}
            </div>
       </div>
    )
}