import Link from "next/link"
import { Metadata } from "next"
import Logo from "@/components/base/logo"
import { RegisterForm } from "@/components/forms/register-form"

export const metadata: Metadata = {
    title: "Sign up",
}
export const dynamic = 'force-static'

export default function Page() {
    return (
        <>
            <div className="container relative  h-screen flex items-center justify-center">
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <Logo size={'xl'} />
                            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                                Sign in to your account
                            </h2>
                        </div>
                        <RegisterForm />
                        <p className="text-end text-sm">
                            Already have an account? {" "}
                            <Link href='/login' className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</Link>
                        </p>
                        <div className="sm:w-[400px] mx-auto">
                            <p className="px-8 text-center text-sm text-muted-foreground">
                                By clicking continue, you agree to our{" "}
                                <Link href="/terms" className="underline underline-offset-4 hover:text-primary" >
                                    Terms of Service
                                </Link>
                                {" "}and{" "}
                                <Link href="/privacy" className="underline underline-offset-4 hover:text-primary" >
                                    Privacy Policy
                                </Link>.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}