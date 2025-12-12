import React from 'react'
import { cn } from '@/lib/utils'

export interface StatusBadgeProps {
  status: 'active' | 'inactive' | 'pending' | 'success' | 'error' | 'warning'
  label: string
  size?: 'sm' | 'md'
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ 
  status, 
  label, 
  size = 'md' 
}) => {
  const baseClasses = 'inline-flex items-center font-medium rounded-full transition-smooth'
  
  const sizeClasses = {
    sm: 'px-2.5 py-0.5 text-xs',
    md: 'px-3 py-1 text-sm'
  }
  
  const statusClasses = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    pending: 'bg-yellow-100 text-yellow-800',
    success: 'bg-green-100 text-green-800',
    error: 'bg-red-100 text-red-800',
    warning: 'bg-orange-100 text-orange-800'
  }
  
  const dotClasses = {
    active: 'bg-green-500',
    inactive: 'bg-gray-500',
    pending: 'bg-yellow-500',
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-orange-500'
  }
  
  return (
    <span className={cn(baseClasses, sizeClasses[size], statusClasses[status])}>
      <span className={cn('w-1.5 h-1.5 rounded-full mr-1.5', dotClasses[status])} />
      {label}
    </span>
  )
}