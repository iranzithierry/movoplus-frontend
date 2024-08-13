import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function FormCard({ children, title, description }: { children: React.ReactNode, title?: string, description?: string }) {
    return (
        <Card>
            {title && (
                <CardHeader>
                    <CardTitle>{title}</CardTitle>
                    {description && (
                        <CardDescription>{description}</CardDescription>
                    )}
                </CardHeader>
            )}
            <CardContent className={!title ? "pt-6" : ""}>
                {children}
            </CardContent>
        </Card>
    )
}
