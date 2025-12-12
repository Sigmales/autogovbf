'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  LayoutDashboard,
  Workflow,
  PlusCircle,
  History,
  Settings,
  ChevronRight,
  Building
} from 'lucide-react'
import { cn } from '@/lib/utils'

export interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

interface NavItem {
  name: string
  href: string
  icon: React.ReactNode
  badge?: number
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname()

  const navItems: NavItem[] = [
    {
      name: 'Vue d\'ensemble',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
      name: 'Mes workflows',
      href: '/workflows',
      icon: <Workflow className="w-5 h-5" />
    },
    {
      name: 'Nouvelle automatisation',
      href: '/workflows/new',
      icon: <PlusCircle className="w-5 h-5" />
    },
    {
      name: 'Historique',
      href: '/executions',
      icon: <History className="w-5 h-5" />,
      badge: 12
    },
    {
      name: 'Paramètres',
      href: '/settings',
      icon: <Settings className="w-5 h-5" />
    }
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard'
    }
    return pathname.startsWith(href)
  }

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-center p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bf-green rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AutoGov BF</h1>
                <p className="text-xs text-gray-600">Gouvernement</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={onClose}
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-lg transition-colors',
                  isActive(item.href)
                    ? 'bg-bf-green text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                )}
              >
                <div className="flex items-center space-x-3">
                  {React.cloneElement(item.icon as React.ReactElement, {
                    className: cn(
                      'w-5 h-5',
                      isActive(item.href) ? 'text-white' : 'text-gray-500'
                    )
                  })}
                  <span className="font-medium">{item.name}</span>
                </div>
                <div className="flex items-center space-x-2">
                  {item.badge && (
                    <span className={cn(
                      'px-2 py-0.5 text-xs rounded-full',
                      isActive(item.href)
                        ? 'bg-white/20 text-white'
                        : 'bg-red-100 text-red-800'
                    )}>
                      {item.badge}
                    </span>
                  )}
                  <ChevronRight className={cn(
                    'w-4 h-4',
                    isActive(item.href) ? 'text-white' : 'text-gray-400'
                  )} />
                </div>
              </Link>
            ))}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-900 mb-1">
                Besoin d'aide ?
              </h3>
              <p className="text-xs text-gray-600 mb-3">
                Support technique disponible 24/7
              </p>
              <a
                href="mailto:support@autogov.bf"
                className="text-xs text-bf-green hover:text-green-700 font-medium"
              >
                support@autogov.bf
              </a>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}