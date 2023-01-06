// Sources:

import { v4 } from "uuid"

// https://www.hats.com/mens
const hat1 = "https://www.hats.com/media/catalog/product/3/8/38368BH-Bailey-1922-CYD-Fedora-WHISKEY-1B.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=340&width=340&canvas=340:340"
const hat2 = "https://www.hats.com/media/catalog/product/3/7/37190bh-bailey-of-hollywood-trevel-fedora-copper-1_4.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=340&width=340&canvas=340:340"
const hat3 = "https://www.hats.com/media/catalog/product/2/0/20007BH-Bailey-of-Hollywood-Clorindon-Fedora-UNBLEACHED-1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=340&width=340&canvas=340:340"
const hat4 = "https://www.hats.com/media/catalog/product/W/2/W2204D-Bailey-Western-Elko-Western-Hat-BLACK-1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=340&width=340&canvas=340:340"
const hat5 = "https://www.hats.com/media/catalog/product/7/0/70150-melin-melin-hydro-a-game-xl-baseball-cap-baseball-cap-black-1.jpg?quality=80&bg-color=255,255,255&fit=bounds&height=340&width=340&canvas=340:340"

// name: 'Jonathan Sanchez',

export const addresses = [
    {
        id: 1,
        address_line: '2004 Alfred Drive',
        city: 'Forest Hills',
        state: 'New York',
        phone:'914-204-8684'
    },
    {
        id: 2,
        address_line: '2144 Dye Street',
        city: 'Mesa',
        state: 'Arizona',
        phone:'626-290-8369'
    },
    {
        id: 3,
        address_line: '4588 Rainbow Road',
        city: 'Gardena',
        state: 'California',
        phone:'310-307-0614'
    },
]
export const orders = [
    {
        order_id: v4().slice(0,8),
        purchase_date: new Date(),
        delivery_date: new Date(Date.now() + 2*24*60*60*1000),
        total: '300.39',
        status: 'received',
        delivery_address: {
            address_line: '3573 Medical Center',
            phone: '880-332-112'
        },
        orderItems: [
            {
                id: 2, 
                quantity: 2,
                color: "#78350F",  
                product: {
                    // description
                    id: 4,
                    title: "Floyd Fedora",
                    price: "79.00",
                    image: "https://firebasestorage.googleapis.com/v0/b/react-hats-ea4bd.appspot.com/o/Products%2Fff797bd4?alt=media&token=9dee888f-74c3-40c7-ab73-396b96d679e7",
                }
            },
            {
                id: 32, 
                quantity: 3,
                color: "#000",
                product: {
                    // description
                    id: 6,
                    title: "Thaler Outback",
                    price: "55.03",
                    image: "https://firebasestorage.googleapis.com/v0/b/react-hats-ea4bd.appspot.com/o/Products%2Fcddd9ee8?alt=media&token=05dea238-97e1-46f5-b6e1-be0363bb2dad",
                },
            }
        ]
    },
    {
        order_id: v4().slice(0,8),  
        purchase_date: new Date(),
        delivery_date: new Date(Date.now() + 2*24*60*60*1000),
        total: '300.39',
        status: 'pending',
        delivery_address: {
            line: '3573 Medical Center ',
            phone: '880-332-112'
        },
        orderItems: [
            {
                id: 11, 
                quantity: 10,
                color: "#FEF08A",
                product: {
                    // description
                    id: 5,
                    title: "Trevel Fedora",
                    price: "79.00",
                    image: "https://firebasestorage.googleapis.com/v0/b/react-hats-ea4bd.appspot.com/o/Products%2Fcbfcb244?alt=media&token=aca087fc-8769-4bc7-8a37-7418cb13b750",
                }
                
            }
        ]
    },

]