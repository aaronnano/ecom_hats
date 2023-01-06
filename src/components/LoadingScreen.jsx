import { SpinnerCircular, SpinnerCircularFixed } from "spinners-react"
import hat from '../assets/hatLogo.png'

export const LoadingScreen = ({ withLogo, show }) => {
    

    // const toShow = ['init', 'loading'].some(code => code === status)

    return (
        <div className={ show ? 'fixed top-0 right-0 w-full h-[100%] z-30 bg-white/80 flex justify-center items-center' : 'hidden'}>
            { withLogo ? 
                <div className="flex items-center gap-11 drop-shadow-lg">
                    <div className="flex items-center gap-3">
                        <img src={hat} className="w-[40px]" alt="" />
                        <p className="font-bold text-4xl text-black">Hats.</p>
                    </div>
                    <SpinnerCircularFixed  className='z-30'
                        size={50}
                        speed={150}
                        color='#000'
                        secondaryColor='transparent'
                    />    
                </div>
                :
                <SpinnerCircular className='z-30'
                    size={40}
                    speed={150}
                    color='#9ca3af'
                    secondaryColor='#e5e7eb'
                />
            } 
        </div>
    )
}