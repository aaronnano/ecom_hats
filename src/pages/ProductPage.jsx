import { Link, useParams } from "react-router-dom"
import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { useEffect, useMemo, useRef, useState } from "react"
import { Quantity } from "../components/Quantity"
import { useCartStore, useAlertStore, useApiData, useForm, useAuthStore } from "../hooks"
import { Review } from "../components/Review"
import { InputTextArea } from "../components/form"
import { useReviews } from "../hooks/useReviews"
import { SpinnerCircularFixed } from "spinners-react"
import { LoadingScreen } from "../components/LoadingScreen"
import { SelectV2 } from "../components/form/SelectV2"



const productModel = {
    title: '', 
    description: '',
    image: '', 
    price: '',
    category: '',
    colors: []  // TOdos tendran al menos un color
}

export const ProductPage = () => {
    const param = useParams()  // Recieve the id actual del Product
    const { id } = param
    const productId = Number(id)

    const { user } = useAuthStore()
    const { items, startSavingItem } = useCartStore()
    const { showAlert } = useAlertStore()
    
    const { products, loadingApiData } = useApiData(['products'])


    // ## Form para el Cart. CartModel
    const { formValues: itemValues, onChangeValue: onChangeItemValue } = useForm({
        quantity: 1,
        color: '#',  // Lo inicializo con el primer color pero cuando se obtenga los datos en getProduct
        product: {},
        // user: {}
    })
    
    // ## Product Actual
    const [product, setProduct] = useState(productModel)  
    const getProduct = () => {
        const productFinded = products.find(pr => pr.id === productId)
        setProduct(productFinded)

        // Al momento de obtener el product, inicializo el color del ItemForm con
        // el primer color
        onChangeItemValue({ target: {
            name: 'color', value: productFinded.colors[0]
        }}) 

        
    }
    useEffect(() => {
        getProduct()   // Si hay products, llamo a la funcion
    }, [])  // Cuando inicie la app, el loadingApiData ya estara en false, lo puedo sacar


    // Usar useImages()

    // ## Add to Cart. Submit
    const addToCart = async() => {
        // ## Puedo sacar esto porque ahora todos tendra un color asignado al principio
        // Requerir el color solo cuando la lista colors exista. 
        // if(colorSelected === '' && product.colors.length > 0)
        //     return showAlert('Its required choose a color.', 'red')

        // Obtengo las instancias de este producto actual del Cart.
        // Hago check si el producto ya fue elegido con ese color
        const exists = items.filter(item => item.product.id === product.id)
            .some(item => item.color === itemValues.color)
        // Nota: seria mejor que el boton cambie a retirarlo del Cart. Poner esto en onChangeColor
        if(exists) return showAlert('The item with this color exists on your Cart', 'red')
        
         
        // ## Create Item
        // Podria pasar todo con el formValues, pero no. 
        // Falta poner el productId, el user lo manda la funcion
        const item = {
            ...itemValues, 
            product  // [#] Hay que probar cuando se crea un nuevo user y una nueva orden
            
            // : {  // Product selected
            //     id: product.id
            // },
            
        }

        await startSavingItem(item, user)  // Esta funcion se encargara de asignarle el user
        showAlert('Item added to Cart!!')  // Creo que capaz seria mejor poner esto es un useEffect cuando un message
        // del useCartStore lo pida
    }


    // ## Reviews
    const { reviews, startSendComment, startDeleteComment, loadingComment } = useReviews(productId)  
    // Mandamos el id del product para obtener reviews de este product
    const [stateInputReview, setStateInputReview] = useState('')
    const existentReview = useMemo(() => {
        if(!user) return null
        return reviews.find(({ user: userReview }) => userReview.id === user.id)
    },[reviews])

    const onChooseStateInputReview = () => {
        if(!user) return setStateInputReview('disabled')
        
        // User Exist
        if(existentReview) setStateInputReview('disabled')
        else setStateInputReview('create')
    }
    useEffect(() => {
        onChooseStateInputReview()
        
        // Dependiendo de las reviews, la 1st vez la reviews estan vacias
    },[reviews])
    
    const { formValues: reviewValues, onChangeValue: onChangeReviewValue } = useForm({
        comment: '',
        product: { id: productId }

    })

    const sendReview = async(e) => {
        e.preventDefault()
        const { comment } = reviewValues
        if(comment == '' || comment.length <= 5) return
        // Si esta vacio, o el comentario tiene menos de 10 characters, no hacemos nada

        await startSendComment({id: existentReview?.id, ...reviewValues}, stateInputReview)
        // Lo del id solo sirve para el UpdateReview, nada mas

        onChangeReviewValue({ target: { name:'comment', value:'' }})  // Dejamos vacio el comment
        setStateInputReview('disabled')
    }
    
    // loadingComment || !user || ( stateInputReview !== 'update' && existentReview )
    const disabledInputReview = loadingComment || stateInputReview === 'disabled'
    // Disabled cuando este loadingComment. Si no, lo es cuando no haya user
    // Si no, estando ya enviado la review, vemos si con esto el InputReview esta en modo update o no

    const TextRef = useRef()
    const onUpdateReview = (review) => {
        setStateInputReview('update')
        onChangeReviewValue({ target: { name:'comment', value: review.comment }})  // Dejamos vacio el comment

        // Como estaba en disabled, al activar el TextArea es tan "rapido" la transicion que
        // no logra captar el focus. Por eso el setTimeout
        setTimeout(() => {  
            TextRef.current.focus()
        },0)
    }
    const onCancelUpdateReview = () => {
        onChangeReviewValue({ target: { name:'comment', value:'' }})  // Dejamos vacio el comment
        setStateInputReview('disabled')
    }

    const onDeleteReview = async(review) => {
        setStateInputReview('delete')
        await startDeleteComment(review)

        onChangeReviewValue({ target: { name:'comment', value:'' }})  // Dejamos vacio el comment
        setStateInputReview('create')
    }


    return (
        <>
        <div className="w-full"> { /* Background */}
            { /* Path directory */}
            <div className="flex py-4 gap-3 items-center border-b border-b-1 mb-7 text-gray-400">
                <Link to={'/home/shop'} className="hover:text-gray-800" >
                    <span>Products</span>
                </Link>
                <ChevronRightIcon className="h-4"/>

                <Link to={`/home/shop?cat=${product.category},`}>
                    <span>{ product.category }</span>
                </Link>
                <ChevronRightIcon className="h-4"/>

                <span className="">{ product.title }</span>
            </div>



            {/* Product: Image - Description */}
            <div className="w-full flex flex-col md:flex-row gap-y-10 font-montserrat pb-10 mb-7 border-b border-b-1">
                {/* Image */}
                <div className="md:w-1/2 flex items-start px-0 md:px-5">  {/* Tengo la idea de poner otro div adentro */}
                    <img src={product.image} className="w-full p-16 bg-stone-100" alt="" />
                    {/* Cambiando el p-{} se hace resize a la imagen */}
                </div>
                
                {/* Description */}
                <div className=" md:w-1/2 px-0 md:px-5">
                    <h2 className="uppercase pb-4">{product.category}</h2>
                    <h1 className="text-3xl font-bold pb-5">{ product.title}</h1>
                    <p className="text-gray-500 text-sm border-b pb-4 border-b-1">{product.description}</p>
                    <div className="flex">
                        <span className="text-3xl py-6 text-amber-700 font-medium">$ {product.price}</span>
                    </div>
                    <div className="flex items-center gap-3 pb-4">
                        <h5 className="text-sm text-gray-500">Quantity:</h5>
                        <Quantity name="quantity" value={itemValues.quantity} onChange={onChangeItemValue} />
                    </div>

                    {/* Colors. Siempre habran colors, solo se usa para el productModel con colors: [] */}
                    { product.colors.length > 0 && 
                    <div className="pb-8">
                        <h5 className="text-sm pb-4 text-gray-500">Choose a color:</h5>
                        <SelectV2 type="color" options={product.colors} onChange={onChangeItemValue} name="color"
                            optionsSelected={[itemValues.color]} // Voy poniendo en seleccionado el color seleccionado
                        />
                    </div>
                    }

                    <button className="p-3 px-10 font-medium uppercase border-[1.5px] text-xs md:text-sm
                    text-amber-700 border-amber-700 hover:bg-amber-700 hover:text-white transform duration-150 ease-in-out" 
                        onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>

            {/* My comment: */}
            <div className="w-full pb-10 mb-7 border-b border-b-1">
                {/* Title */}
                <div className="py-3">
                    <span className="text-xl font-bold pr-3">Leave a feedback</span>
                    {/* Mensaje por si no hay User */}
                    { !user ?
                        <div className='md:inline-block text-sm font-medium'>
                            <span className="text-lg font-bold pr-2">&#x2022;</span>
                            <span className="">Please, </span>
                            <Link to="/login" className="text-amber-700 hover:font-bold">Login </Link>
                            <span className="">or </span>
                            <Link to="/register" className="hover:font-bold">Register </Link>
                            <span className="">for comment.</span>
                        </div> : null }
                    { stateInputReview === 'update' ?   // Indicamos que estamos en este status: update
                        <div className='md:inline-block text-sm font-medium'>
                            <span className="text-lg font-bold pr-2">&#x2022;</span>
                            <span className="font-bold text-amber-900"> Update Review </span>
                        </div> : null 
                    }
                    {/* [#] Podriamos mandar un msg cuando se hace create, update o delete */}

                </div>
                {/* Habria que arrastrar al User hacia este InputReview cuando toca en 'Update' */}
                <form className="w-full md:w-[70%]" onSubmit={sendReview}>
                    <InputTextArea className="w-full px-5 py-3 text-xs md:text-sm border outline-none focus:border-amber-700"
                        rows="3" maxLength={255} name="comment" value={reviewValues.comment}
                        placeholder="Write a comment..." refr={TextRef}  required
                        onChange={onChangeReviewValue} disabled={disabledInputReview}
                    />
                    
                    <div className="flex gap-x-5">
                        <button className="flex items-center py-3 px-10 font-bold uppercase border-[1.5px] text-xs md:text-sm bg-amber-700 text-white hover:bg-amber-800 transform duration-150 ease-in-out
                            disabled:bg-amber-700/50"
                            disabled={disabledInputReview} >

                            <span className="">Submit</span>
                            { loadingComment ? 
                                <div className="pl-4">
                                <SpinnerCircularFixed 
                                    size={20} speed={150}
                                    color='#b45309' 
                                    secondaryColor='#e5e7eb'
                                />
                                </div> : null
                            }
                        </button>
                        { stateInputReview === 'update' ? 
                            <button type='button' className="font-bold uppercase text-xs md:text-sm disabled:text-gray-200"
                            disabled={disabledInputReview}
                            onClick={onCancelUpdateReview}>
                                Cancel Update
                            </button> : null
                        }
                    </div>
                </form> 
            </div>
            
            {/* Reviews: */}
            <div className="w-full pb-8 mb-7 border-b border-b-1">
                <h5 className="pt-3 pb-6 text-2xl font-bold">Reviews</h5>
                <div className="w-full">
                    {reviews.length > 0 ? reviews.map((review, i) => (
                        <Review key={i} { ...review } isActualUser={ user?.id === review.user.id }
                            onUpdate={() => onUpdateReview(review)}
                            onDelete={() => onDeleteReview(review)}/>
                        )) : 
                        <div className="w-full h-[120px] text-gray-400 border text-center pt-4">
                            No Reviews for moment.
                        </div>
                    }
                </div>
            </div>
        </div>
        <LoadingScreen show={loadingComment && stateInputReview === 'delete'}/>
        </>
    )
}