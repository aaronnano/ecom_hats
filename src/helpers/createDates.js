import { format } from "date-fns"

export const createDates = (from, quantity) => {
    if(from === 'now') from = Date.now()
    return new Array(quantity).fill().map((_,i) => {
        return format(new Date(from + i*24*60*60*1000), 'dd MMMM yyyy')
    })
}