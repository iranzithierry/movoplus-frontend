import React from 'react'
import BoringAvatar from 'boring-avatars'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { cn, getUserAvatar } from '@/lib/utils'
import { User } from '@/api'
interface AvatarProps { 
    user: User | null, 
    success?: boolean, 
    size?: 'sm' | 'md', 
    extraClass?: string, 
    loading?: "lazy" | "eager" 
}

export default function UserAvatar({ user, loading = 'eager', success = true, size = 'md', extraClass }: AvatarProps) {
    const AvatarSizeClasses = {
        xs: 'h-4 w-4',
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-10 w-10',
        xl: 'h-12 w-12'
    }
    const BoringAvatarSizeClass = {
        xs: 16,
        sm: 24,
        md: 32,
        lg: 40,
        xl: 48,
    }
    return (
        <div className={cn('relative', extraClass)} >
            {user?.profile_picture ?
                <Avatar className={AvatarSizeClasses[size]} >
                    <AvatarImage loading={loading} alt={user?.name} src={getUserAvatar(user, size === 'sm' ? 'small_square_crop' : 'medium_square_crop')} />
                    <AvatarFallback className='bg-black/70 text-white'>{user?.name?.toUpperCase()[0]}</AvatarFallback>
                </Avatar>
                : <BoringAvatar
                    size={BoringAvatarSizeClass[size]}
                    name={user?.name}
                    variant="beam"
                    colors={['#0A0310', '#49007E', '#FF005B', '#FF7D10', '#FFB238']}
                />}
            {/* <span className={`${size ==='sm' ? 'w-2 h-2 bottom-0 right-0':  'w-3 h-3 bottom-0.5 right-0.5'} rounded-full ${success ? 'bg-green-500' : 'bg-gray-500'} border-2 border-white z-50 absolute `}></span> */}
        </div>
    )
}
