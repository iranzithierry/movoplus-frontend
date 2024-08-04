import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
                <div key={index} className="border p-0.5 rounded-lg relative flex w-full justify-center">
                    <Skeleton className="w-full h-72 rounded-lg" />
                    <div className='absolute z-10 top-0 right-0 flex w-full p-2 justify-end'>
                        <Skeleton className="h-8 rounded-full w-8" />
                    </div>
                </div>
            ))}
        </div>
    )
}