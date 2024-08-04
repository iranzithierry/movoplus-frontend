import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="min-h-screen bg-white">
            <div className="flex justify-center py-2 bg-[#4A3AFF] text-white">
                <Skeleton className="w-64 h-4" />
            </div>
            <header className="flex items-center justify-between h-16 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center space-x-4">
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-20 h-6" />
                    <Skeleton className="w-20 h-6" />
                </div>
                <div className="flex items-center space-x-4">
                    <Skeleton className="w-12 h-6" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                    <Skeleton className="w-8 h-8 rounded-full" />
                </div>
            </header>
           <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Array.from({ length: 8 }).map((_, index) => (
                        <div key={index} className="border p-0.5 rounded-lg relative flex w-full justify-center">
                            <Skeleton className="w-full h-72 rounded-lg" />
                            <div className="mt-4 space-y-2 absolute bottom-0 left-0 right-0 p-2">
                                <Skeleton className="w-2/4 h-8  mx-auto rounded-full" />
                            </div>
                            <div className='absolute z-10 top-0 right-0 flex w-full p-2 justify-end'>
                                <Skeleton className="h-8 rounded-full w-8" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}