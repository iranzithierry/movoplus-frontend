import React from 'react'
import { Metadata } from 'next'
import Logo from '@/components/base/logo'
import { ResetPasswordForm } from "@/components/forms/reset-password-form"

export const metadata: Metadata = {
    title: "Reset Password",
}
export const dynamic = 'force-static'

export default function Page() {
    return (
        <div className='w-full h-screen flex flex-col items-center justify-center px-4'>
            <div className='max-w-sm w-full'>
                <div className='text-center'>
                    <Logo />
                    <div className='mt-5 space-y-2'>
                        <h1 className='text-gray-800 text-2xl font-bold sm:text-3xl'>
                            Reset your password
                        </h1>
                        <p>
                            Enter your email and we&apos;ll send you a link to reset your
                            password.
                        </p>
                    </div>
                </div>
                <ResetPasswordForm />
            </div>
        </div>
    )
}
