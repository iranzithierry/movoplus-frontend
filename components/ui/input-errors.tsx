import React from 'react'

interface InputErrorsProps {
    errors?: string | string[]
}

export const InputErrors: React.FC<InputErrorsProps> = ({ errors }) => {
    if (!errors) return null

    const errorList = Array.isArray(errors) ? errors : errors.split('.')

    return (
        <ul className={`${errorList.length > 1 ? 'list-disc px-4' : ''}`}>
            {errorList.map((error, index) => (
                <li key={index} className="text-sm text-red-500 font-medium items-center">
                    {error.trim()}
                </li>
            ))}
        </ul>
    )
}

export default InputErrors
