import { Link } from "react-router-dom"

export const ProductCard = ({ id, title, category, image, price, imageLoaded, onLoadImage }) => {

    return (
        <div className="p-3 md:w-[50%] lg:w-1/3">
        <Link to={`/home/product/${id}`} > {/* outline outline-1 outline-gray-200  shadow-lg  */}
           <div className="flex justify-center py-4 px-9 bg-stone-100">
               {/* A medida que cambio el p-{} del div, el size de la imagen se ajusta */}
                <img src={image} className="transform duration-200 ease-in-out hover:scale-105 "
                    onLoad={ onLoadImage } />
                {/* style={imageLoaded ? {} : {display: 'none'}} */}
                {/* Este loading="lazy" implica que el browser requerira del recurso solo cuando este aparezca por 1st vez
                    en Screen */}
                {/* h-[168px] */}
           </div>
           <div className="p-3 pb-5 text-center text-sm">  { /* border-t border-t-1 */}
               <p className="uppercase text-gray-500 pb-1">{ category }</p>
               <h3 className="text-base font-bold pb-2">{ title }</h3>
               <h2 className="text-sm font-semibold">$ {price}</h2>
                
           </div>
       </Link></div>
    )
}

{
// <div className="h-[200px] bg-gray-50  transform duration-200 ease-in-out hover:scale-105">
//     <img src={img} className="h-full p-4 m-auto " />
//     {/* A medida que cambio el p-{} del div, el size de la imagen se ajusta */}
// </div>

// <div className="flex justify-center h-[200px]  p-4 bg-gray-50  transform duration-200 ease-in-out hover:scale-105"> 
//    <img src={img} className="h-full " />
    // {/* A medida que cambio el p-{} del div, el size de la imagen se ajusta */}
// </div> 
}

/* <div className="border border-b-1 h-[200px] w-full p-7">
    <img src={img} className="h-full w-full object-cover" />
</div> */