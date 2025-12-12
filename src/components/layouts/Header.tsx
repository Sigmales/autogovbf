import React from 'react'
import { Menu, Bell, User, Building, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/Button'

export interface HeaderProps {
  onMenuClick?: () => void
  userName?: string
  ministry?: string
}

export const Header: React.FC<HeaderProps> = ({ 
  onMenuClick, 
  userName = "Jean Dupont",
  ministry = "Ministère de l'Économie"
}) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-4">
        {/* Left side - Menu button */}
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onMenuClick}
            className="lg:hidden"
            aria-label="Menu principal"
          >
            <Menu className="w-5 h-5" />
          </Button>
          
          <div className="hidden lg:flex items-center space-x-3">
            <div className="w-8 h-8 bg-bf-green rounded-lg flex items-center justify-center">
              <Building className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">{ministry}</h1>
              <p className="text-sm text-gray-600">AutoGov BF</p>
            </div>
          </div>
        </div>

        {/* Right side - User menu & notifications */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="sm"
            className="relative"
            aria-label="Notifications"
          >
            <Bell className="w-5 h-5 text-gray-600" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
              3
            </span>
          </Button>

          {/* User menu */}
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-gray-600" />
            </div>
            <div className="hidden md:block text-right">
              <p className="text-sm font-medium text-gray-900">{userName}</p>
              <p className="text-xs text-gray-600">Agent administratif</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              aria-label="Déconnexion"
            >
              <LogOut className="w-5 h-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}