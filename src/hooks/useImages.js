import { useEffect, useMemo, useState } from "react"

export const useImages = (listIds) => {  // Ids para identificar a las images
    const [listImagesLoaded, setListImagesLoaded] = useState({})
    
    useEffect(() => {
        initializeList()
    },[listIds])
    const initializeList = () => {
        const newList = listIds.reduce((store, value) => {
            if(!listImagesLoaded[value]) return { ...store }
            // Los true solo me ayudan para saber si de la nueva listIds, ya cargue su respectiva img
            return { ...store, [value]: true }  
        }, {})

        setListImagesLoaded(newList)
    }

    const onLoadedImage = (ImageId) => {
        setListImagesLoaded((list) => ({ ...list, [ImageId]: true }))
        // Lo importante es ver si existen la cantidad de true como Images hay. Que indica que todos estan cargados
    }
    
    const imagesLoaded = useMemo(() => {
        if(Object.values(listImagesLoaded).length === 0) return false
        // Vuelvo a recargar el valor de imagesLoaded solo cuando la lista cambie
        
        return listIds.length === Object.values(listImagesLoaded).length
    },[listImagesLoaded])


    
    

    return {
        onLoadedImage,
        imagesLoaded
        // Lo asigno a cada onLoad de cada <img /> y conforme vayan cargandose, la [] se ira cargando de [true, ...]
    }
}