import { useDispatch, useSelector } from "react-redux"
import { onSetActive, onSetClose } from "../store/reducers/alertSlice"


export const useAlertStore = () => {
    const { isActive, message, color } = useSelector(state => state.alert)
    const dispatch = useDispatch()

    const showAlert = (message, color) => {
        dispatch(onSetActive({ message, color }))
    }
    const closeAlert = () => {
        dispatch(onSetClose())
    }
    
    return {
        isActive, message, color,
        showAlert,
        closeAlert,

    }
}