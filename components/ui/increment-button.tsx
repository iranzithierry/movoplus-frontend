import _ from 'lodash'
import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Minus, Plus } from "lucide-react"

export default function IncrementButton({ updateQuantity }: {updateQuantity: (newQuantity: number) => void}) {
    const [count, setCount] = useState(1)

    const handleIncrement = () => {
        setCount(prevCount => {
            const newCount = prevCount + 1
            _.debounce(() => updateQuantity(newCount), 100)()
            return newCount
        })
    }

    const handleDecrement = () => {
        setCount(prevCount => {
            const newCount = Math.max(0, prevCount - 1)
            if (newCount === 0) return newCount+1
            _.debounce(() => updateQuantity(newCount), 100)()
            return newCount
        })
    }

    return (
        <div className="flex w-fit items-center space-x-2 border border-gray-200 rounded-lg px-2 py-1">
            <Button
                variant="ghost"
                size="sm"
                className="w-6 h-6 p-0 rounded-full"
                onClick={handleDecrement}
            >
                <Minus className="w-4 h-4" />
            </Button>
            <span className="text-sm font-medium" aria-readonly>
                {count}
            </span>
            <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 p-0 rounded-full"
                onClick={handleIncrement}
            >
                <Plus className="w-4 h-4"/>
            </Button>
        </div>
    )
}