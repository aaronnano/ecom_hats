export const loadImage = (url) => {
    return new Promise((res, rej) => {
        const img = new Image()
        img.onload = () => res(img)
        img.onerror = () => rej()
        img.src = url
    })
}

