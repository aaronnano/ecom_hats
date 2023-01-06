import { useState } from "react"

export const useForm = ( formValues ) => {  // Siempre tendremos a la mano el Form inicial
    const [data, setData] = useState(formValues)  // Toda la data del formando que ira mutando conformen cambien los Inputs
    const [formErrors, setFormErrors] = useState(formValues)  // Misma estructura. Al principio todos los values son Validos
    const [errorMessage, setErrorMessage] = useState('')

    const initializeFormValues = (formValues) => {
        // Se supone que cuando inicializas, esos valores al principio son Validos
        setData(formValues)  // Cuando necesitamos inicializar y no nos sirva inicializarlo de los props
        setFormErrors(formValues)
    }

    const onChangeValue = ({ target }) => {
        setErrorMessage('')  // En cambios de form values, limpio el messageError
        
        const value = target.files?.[0] || target.value  // Para el manejo de files
        setData({
            ...data, [target.name]: value
        })
        const { isValid } = target
        setFormErrors({
            ...formErrors, [target.name]: isValid  // Pongo a este atributo en valid o no
        })
           
    }
    
    // Ver si el form es valido, la 1st vez tendra false.
    const isValidForm = !Object.values(formErrors).some(value => !value)  
    // Recibo los solo values de los fields escritos
    const formValuesOnlyFilled = Object.entries(data).reduce((form, [key, value]) => {
        if(!value) return form  // Si el value es '', continue
        return { ...form, [key]: value  }
    }, {})
    
    // Ver si el form es valido pero para campos llenos. Si no hay ningun campo, no es valido para que no se envie
    const isValidFormFilledFields = Object.keys(formValuesOnlyFilled).length === 0 ? false :
        !Object.keys(formValuesOnlyFilled).map(key => formErrors[key]).some(value => !value)
    

    return {
        onChangeValue, setErrorMessage, initializeFormValues,
        formValues: data,
        isValidForm,
        formValuesOnlyFilled,
        isValidFormFilledFields,
        errorMessage
        // ...data // Si hago esto no obtengo el intellisense
    }
}