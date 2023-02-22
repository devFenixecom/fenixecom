import { ButtonHTMLAttributes } from 'react'




interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {

    children?: React.ReactNode;
}

export const Button = ({ children, ...rest }: Props) => {
    return (

        <>
 <button {...rest} className='inline-flex items-center justify-center rounded-md border border-transparent bg-fenix py-2 px-4  text-base font-medium text-white hover:opacity-80'>{children}</button>
        </>
    )
}