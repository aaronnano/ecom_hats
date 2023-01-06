import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline"

export const Message = ({ message, type='error', initMessage='' }) => {

    return (
        <>
        { type === 'error' ?
            <span className='flex items-center font-medium text-rose-600 text-[14px] '>
                <XCircleIcon className="w-[17px]"/>
                <span className="pl-2">{ message }</span>
            </span> :
          type === 'fine' ? 
            <span className='flex items-center font-medium text-green-700 text-[14px]'>
                <CheckCircleIcon className="w-[17px]"/>
                <span className="pl-2">{ message }</span>
            </span> : 
            <span className='flex items-center font-medium text-gray-400 italic text-[14px] pl-4'>
                {initMessage}
            </span>
        }
        </>
    )
}