import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Label } from '@/components/ui/label'
export default function AddCategoryFormCard() {
    return (
        <div className="grid gap-6 sm:grid-cols-3">
            <div className="grid gap-3">
                <Label htmlFor="category">Category</Label>
                <Select>
                    <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="grid gap-3">
                <Label htmlFor="subcategory">Subcategory (optional)</Label>
                <Select>
                    <SelectTrigger id="subcategory" aria-label="Select subcategory">
                        <SelectValue placeholder="Select subcategory" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>

    )
}
