export const getQueryParams = (params) => {
    if(params === '') return ({})

    let list = params.slice(1).split('&')  // Remove '?'

    list = list.map((param) => param.split('=')).map(([name, value]) => {
        const res = value.includes(',')
        value = value.replace(/%20/g, ' ')
        // Normal
        if(!res) return [name, value]
        
        // List
        const list = value.split(',') 
        
        if(list[list.length - 1] === '') list.pop()


    
        return [name, list]
    })

    list = list.reduce((store, [name, value]) => ({ ...store, [name]: value  }), {})

    return list
}