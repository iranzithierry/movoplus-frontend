import { LinkButton } from '@/components/ui/link-button'
import React from 'react'

export default function EmptyProducts() {
    return (
        <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-2xl font-bold tracking-tight">
                    You have no products
                </h3>
                <p className="text-sm text-muted-foreground">
                    You can start selling as soon as you add a product.
                </p>
                <LinkButton linkTo="/dashboard/products/create" className="mt-4">Add Product</LinkButton>
            </div>
        </div>
    )
}
