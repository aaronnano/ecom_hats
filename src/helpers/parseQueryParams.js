export const parseQueryParams = (params) => {
    if(!params) return ''
    let res = Object.entries(params).reduce((store, [name, value]) => {
        let parse = `${store}${name}=` 
        if(value instanceof Array){
            parse = value.length === 0 ? parse + '' : parse + value.join(',') + ','
            
        } else {
            parse = parse + value
        }

        parse = parse + '&'

        return parse

    },'?')

    res = res.slice(0,-1)  // Remove the last '&'

    return res
}