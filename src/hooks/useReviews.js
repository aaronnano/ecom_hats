import { useEffect, useState } from "react"
import { api } from "../api"
import { useAuthStore } from "./useAuthStore"

export const useReviews = (productId) => {  // Tendremos en este hook el id del product
    const [loadingComment, setLoadingComment] = useState(false)
    const [reviews, setReviews] = useState([])
    const { user } = useAuthStore()

    const startGetCommentsFromProduct = async() => {
        setLoadingComment(true)
        try {
            const { data } = await api.get(`reviews/product/${productId}`)
            const { reviews:newReviews } = data
            
            // [#]
            // Pongo la review del user actual primero
            // const userActualReview = newReviews.find(({ user: userReview }) => userReview.id === user?.id)
            // console.log(userActualReview)
            // const reviews = newReviews.filter(({ user: userReview }) => userReview.id !== user?.id)
            // setReviews([userActualReview, ...reviews])
            setReviews(newReviews)

        } catch (err) {
            if (err.response.status === 500){
                const { error, msg } = err.response.data
                console.log({error, msg})
            }
        }
        setLoadingComment(false)
    }

    const startSendComment = async(review, type = 'create') => {
        setLoadingComment(true)
        try {
            if(type === 'create'){
                const { data } = await api.post(`reviews/user/${user.id}`, review)
                const { review: newReview } = data
                console.log(newReview)
                console.log('Comment created in DB!')

            } else {
                const { data } = await api.put(`reviews/${review.id}/user/${user.id}`, review)  // id y comment
                const { review: newReview } = data
                console.log(newReview)
                console.log('Comment update in DB!')
            }

        } catch (err) {
            if (err.response.status === 500){
                const { error, msg } = err.response.data
                console.log({error, msg})
            }
        }

        await startGetCommentsFromProduct()

        setLoadingComment(false)
    }

    const startDeleteComment = async(review) => {
        setLoadingComment(true)
        try {
            const { data } = await api.delete(`reviews/${review.id}/user/${user.id}`)
            const { review: newReview } = data
            console.log(newReview)
            console.log('Comment deleted from DB!')

        } catch (err) {
            if (err.response.status === 500){
                const { error, msg } = err.response.data
                console.log({error, msg})
            }
        }

        await startGetCommentsFromProduct()

        setLoadingComment(false)
    }

    useEffect(() => {
        startGetCommentsFromProduct()
    },[])


    return {
        startGetCommentsFromProduct, startSendComment, startDeleteComment,
        reviews,
        loadingComment,
    }
}