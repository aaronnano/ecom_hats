import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
// Nota: https://firebase.google.com/docs/storage/web/upload-files

const { VITE_APIKEY,
    VITE_AUTHDOMAIN,
    VITE_PROJECTID,
    VITE_STORAGEBUCKET,
    VITE_MESSAGINGSENDERID,
    VITE_APPID } = import.meta.env

const firebaseConfig = {
    apiKey: VITE_APIKEY,
    authDomain: VITE_AUTHDOMAIN,
    projectId: VITE_PROJECTID,
    storageBucket: VITE_STORAGEBUCKET,
    messagingSenderId: VITE_MESSAGINGSENDERID,
    appId: VITE_APPID
};


const app = initializeApp(firebaseConfig);

export const storage = getStorage(app)


export const uploadFile = async(file, folder='unknown', name='default') => {
    const storageRef = ref(storage, `${folder}/${name}`)
    const snapshot = await uploadBytes(storageRef, file)  // snapshot, info de lo que se ha subido
    const url = await getDownloadURL(storageRef)
    return url
    
}