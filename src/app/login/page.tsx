'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { 
  Mail, 
  Lock, 
  Shield, 
  Eye, 
  EyeOff,
  ArrowRight,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function LoginPage() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulation de connexion
    setTimeout(() => {
      setIsLoading(false)
      window.location.href = '/dashboard'
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-bf-green rounded-xl flex items-center justify-center">
              <Building className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">AutoGov BF</h1>
              <p className="text-sm text-gray-600">République du Burkina Faso</p>
            </div>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Connexion sécurisée
          </h2>
          <p className="text-gray-600">
            Accédez à votre espace de travail sécurisé
          </p>
        </div>

        {/* Security Illustration */}
        <div className="text-center mb-8">
          <Image
            src="/security-shield.png"
            alt="Sécurité et protection des données"
            width={120}
            height={120}
            className="mx-auto"
          />
        </div>

        {/* Login Card */}
        <Card className="shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Bienvenue</CardTitle>
            <CardDescription>
              Connectez-vous avec vos identifiants professionnels
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div>
                <label 
                  htmlFor="email" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email professionnel
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus-ring transition-smooth"
                    placeholder="nom.prenom@ministere.gouv.bf"
                  />
                </div>
                <p className="mt-1 text-xs text-gray-500">
                  Utilisez votre email professionnel @gouv.bf
                </p>
              </div>

              {/* Password Field */}
              <div>
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Mot de passe
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus-ring transition-smooth"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 focus-ring rounded"
                    aria-label={showPassword ? "Cacher le mot de passe" : "Afficher le mot de passe"}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-bf-green focus:ring-bf-green border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Se souvenir de moi
                  </label>
                </div>
                
                <Link 
                  href="/forgot-password" 
                  className="text-sm text-bf-green hover:text-green-700 transition-colors"
                >
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Security Note */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-green-800">
                      Connexion sécurisée
                    </p>
                    <p className="text-xs text-green-700 mt-1">
                      Vos données sont hébergées en conformité ISO 27001 et chiffrées selon les standards gouvernementaux.
                    </p>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full" 
                size="lg"
                loading={isLoading}
              >
                <span className="flex items-center justify-center">
                  Connexion sécurisée
                  <ArrowRight className="w-4 h-4 ml-2" />
                </span>
              </Button>
            </form>

            {/* First time user */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Première connexion ?{' '}
                <Link 
                  href="/register" 
                  className="font-medium text-bf-green hover:text-green-700 transition-colors"
                >
                  Activez votre compte
                </Link>
              </p>
            </div>

            {/* Divider */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Support technique
                  </span>
                </div>
              </div>
            </div>

            {/* Support Info */}
            <div className="mt-6 text-center">
              <p className="text-xs text-gray-500">
                Besoin d'aide ? Contactez le support : support@autogov.bf
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Disponible 24/7 pour les agents gouvernementaux
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500">
            En vous connectant, vous acceptez les 
            <Link href="/terms" className="text-bf-green hover:text-green-700">
              conditions d'utilisation
            </Link> 
            et la 
            <Link href="/privacy" className="text-bf-green hover:text-green-700">
              politique de confidentialité
            </Link>.
          </p>
        </div>
      </div>
    </div>
  )
}