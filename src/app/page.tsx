import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { 
  Play, 
  Clock, 
  Shield, 
  TrendingUp, 
  Users, 
  Settings,
  ArrowRight,
  CheckCircle,
  Award,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

export default function LandingPage() {
  const benefits = [
    {
      icon: <Clock className="w-8 h-8 text-bf-green" />,
      title: "Gain de temps 80%",
      description: "Automatisez les tâches répétitives et concentrez-vous sur l'essentiel"
    },
    {
      icon: <Shield className="w-8 h-8 text-bf-green" />,
      title: "Réduction erreurs",
      description: "Minimisez les erreurs humaines avec des processus standardisés"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-bf-green" />,
      title: "Traçabilité totale",
      description: "Suivez chaque étape de vos workflows avec un audit complet"
    }
  ]

  const steps = [
    {
      number: "1",
      title: "Choisissez votre template",
      description: "Sélectionnez parmi nos modèles pré-conçus pour les processus gouvernementaux courants"
    },
    {
      number: "2",
      title: "Configurez votre workflow",
      description: "Personnalisez les étapes selon vos besoins spécifiques sans code"
    },
    {
      number: "3",
      title: "Lancez l'automatisation",
      description: "Votre workflow s'exécute automatiquement avec suivi en temps réel"
    }
  ]

  const testimonials = [
    {
      ministry: "Ministère de l'Économie",
      name: "M. Kaboré",
      role: "Directeur des Systèmes d'Information",
      quote: "AutoGov BF a révolutionné nos processus de validation. Nous gagnons 5 heures par semaine !"
    },
    {
      ministry: "Ministère de la Santé",
      name: "Mme Ouédraogo",
      role: "Chef de Service Administratif",
      quote: "La simplicité d'utilisation est remarquable. Mon équipe s'est adaptée en une journée."
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container-responsive">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-bf-green rounded-lg flex items-center justify-center">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">AutoGov BF</h1>
                <p className="text-sm text-gray-600">République du Burkina Faso</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#benefits" className="text-gray-700 hover:text-bf-green transition-colors">
                Bénéfices
              </a>
              <a href="#how-it-works" className="text-gray-700 hover:text-bf-green transition-colors">
                Comment ça marche
              </a>
              <a href="#testimonials" className="text-gray-700 hover:text-bf-green transition-colors">
                Témoignages
              </a>
            </nav>
            
            <div className="flex items-center space-x-3">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Connexion
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button size="sm">
                  Essayer maintenant
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="container-responsive">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                  Automatisez vos processus 
                  <span className="text-bf-green">gouvernementaux</span> 
                  en 3 clics
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  La plateforme officielle du Burkina Faso pour transformer vos workflows administratifs. 
                  Simple, sécurisé, et conçu pour les agents gouvernementaux.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/dashboard">
                  <Button size="lg" className="w-full sm:w-auto">
                    <Play className="w-5 h-5 mr-2" />
                    Commencer maintenant
                  </Button>
                </Link>
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="w-full sm:w-auto"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView()}
                >
                  Voir la démo
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Sécurisé & conforme</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                  <span>Support technique inclus</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="/hero-automation.png"
                alt="Illustration de l'automatisation gouvernementale"
                width={600}
                height={400}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Pourquoi choisir AutoGov BF ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Des bénéfices concrets et mesurables pour transformer votre administration
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="w-16 h-16 bg-bf-green/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl mb-2">{benefit.title}</CardTitle>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Comment ça marche ?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trois étapes simples pour automatiser vos processus
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-bf-green text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
                  {step.number}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/dashboard">
              <Button size="lg">
                Essayer maintenant
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-white">
        <div className="container-responsive">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Ils utilisent AutoGov BF
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Les retours d'expérience de nos utilisateurs
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-bf-green/10 rounded-full flex items-center justify-center">
                      <Users className="w-6 h-6 text-bf-green" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{testimonial.ministry}</CardTitle>
                      <CardDescription>
                        {testimonial.name} - {testimonial.role}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <blockquote className="text-gray-700 italic">
                    "{testimonial.quote}"
                  </blockquote>
                  <div className="flex mt-4">
                    {[...Array(5)].map((_, i) => (
                      <Award key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bf-green text-white">
        <div className="container-responsive text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Prêt à transformer votre administration ?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Rejoignez les ministères qui ont déjà adopté AutoGov BF
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" variant="secondary" className="bg-white text-bf-green hover:bg-gray-100">
                <Settings className="w-5 h-5 mr-2" />
                Démarrer maintenant
              </Button>
            </Link>
            <Button 
              size="lg" 
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-bf-green"
              onClick={() => document.getElementById('how-it-works')?.scrollIntoView()}
            >
              En savoir plus
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container-responsive">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-bf-green rounded-lg flex items-center justify-center">
                  <Building className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">AutoGov BF</h3>
                  <p className="text-sm text-gray-400">République du Burkina Faso</p>
                </div>
              </div>
              <p className="text-gray-400 text-sm">
                Plateforme officielle d'automatisation des processus gouvernementaux.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Liens utiles</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/login" className="hover:text-white transition-colors">
                    Connexion
                  </Link>
                </li>
                <li>
                  <a href="#benefits" className="hover:text-white transition-colors">
                    Bénéfices
                  </a>
                </li>
                <li>
                  <a href="#how-it-works" className="hover:text-white transition-colors">
                    Comment ça marche
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>support@autogov.bf</li>
                <li>+226 25 49 36 00</li>
                <li>Système d'aide en ligne 24/7</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>
              © 2024 République du Burkina Faso - Tous droits réservés. 
              Conforme aux standards internationaux de sécurité et d'accessibilité.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}