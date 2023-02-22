
import { InputHTMLAttributes } from 'react'




export function Input({ ...rest }: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <>
            <input {...rest} className='w-full bg-inputbg outline-none text-sm focus:border-zinc-600/50 text-zinc-200 px-3 h-12 rounded-md border border-zinc-800' />

                      
        </>
    )

}