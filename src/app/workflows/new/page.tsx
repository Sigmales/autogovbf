'use client'

import React from 'react'
import { 
  ChevronLeft, 
  ChevronRight, 
  X, 
  CheckCircle,
  FileText,
  Users,
  Building,
  Mail,
  Calendar,
  Settings,
  ArrowRight,
  Plus,
  Clock,
  Shield
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'
import { cn } from '@/lib/utils'

export default function NewWorkflowPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [currentStep, setCurrentStep] = React.useState(1)
  const [selectedTemplate, setSelectedTemplate] = React.useState<string | null>(null)

  const steps = [
    { id: 1, name: 'Sélection template', icon: FileText },
    { id: 2, name: 'Configuration', icon: Settings },
    { id: 3, name: 'Confirmation', icon: CheckCircle }
  ]

  const templates = [
    {
      id: 'subventions',
      title: 'Validation demandes subventions',
      description: 'Automatisez la validation des demandes de subventions avec vérification des critères',
      category: 'Finance',
      icon: <FileText className="w-8 h-8" />,
      color: 'bg-blue-100 text-blue-600',
      features: ['Vérification automatique', 'Calcul des montants', 'Notification décideurs'],
      estimatedTime: '15 min',
      difficulty: 'Facile'
    },
    {
      id: 'rh',
      title: 'Traitement dossiers RH',
      description: 'Gérez les dossiers du personnel : congés, avancements, mutations',
      category: 'Ressources Humaines',
      icon: <Users className="w-8 h-8" />,
      color: 'bg-green-100 text-green-600',
      features: ['Validation hiérarchique', 'Mise à jour dossiers', 'Calcul congés'],
      estimatedTime: '20 min',
      difficulty: 'Moyen'
    },
    {
      id: 'archivage',
      title: 'Archivage documents',
      description: 'Archivez les documents selon les normes gouvernementales',
      category: 'Administration',
      icon: <Building className="w-8 h-8" />,
      color: 'bg-purple-100 text-purple-600',
      features: ['Classement automatique', 'Indexation', 'Conservation légale'],
      estimatedTime: '10 min',
      difficulty: 'Facile'
    },
    {
      id: 'notifications',
      title: 'Notification échéances',
      description: 'Envoyez des rappels automatiques pour les échéances importantes',
      category: 'Communication',
      icon: <Mail className="w-8 h-8" />,
      color: 'bg-orange-100 text-orange-600',
      features: ['Programmation flexible', 'Templates personnalisables', 'Suivi accusés'],
      estimatedTime: '12 min',
      difficulty: 'Facile'
    }
  ]

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate)

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setTimeout(() => setCurrentStep(2), 300)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  Nouvelle automatisation
                </h1>
                <p className="text-gray-600">
                  Créez un nouveau workflow en 3 étapes simples
                </p>
              </div>
              
              <Link href="/workflows">
                <Button variant="outline">
                  <X className="w-4 h-4 mr-2" />
                  Annuler
                </Button>
              </Link>
            </div>

            {/* Progress Steps */}
            <div className="flex items-center justify-center">
              <div className="flex items-center space-x-8">
                {steps.map((step, index) => (
                  <div key={step.id} className="flex items-center">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          'w-10 h-10 rounded-full flex items-center justify-center transition-colors',
                          currentStep >= step.id
                            ? 'bg-bf-green text-white'
                            : 'bg-gray-200 text-gray-600'
                        )}
                      >
                        <step.icon className="w-5 h-5" />
                      </div>
                      <div className="ml-3">
                        <p
                          className={cn(
                            'text-sm font-medium',
                            currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                          )}
                        >
                          {step.name}
                        </p>
                      </div>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div className="ml-8 w-16 h-0.5 bg-gray-300" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto">
            {/* Step 1: Template Selection */}
            {currentStep === 1 && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Choisissez votre template
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Sélectionnez un modèle pré-conçu pour démarrer rapidement. 
                    Vous pourrez le personnaliser ensuite selon vos besoins.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {templates.map((template) => (
                    <Card
                      key={template.id}
                      className={cn(
                        'hover:shadow-lg transition-all cursor-pointer',
                        selectedTemplate === template.id && 'ring-2 ring-bf-green'
                      )}
                      onClick={() => handleTemplateSelect(template.id)}
                    >
                      <CardHeader>
                        <div className="flex items-start justify-between mb-4">
                          <div className={cn("p-3 rounded-lg", template.color)}>
                            {template.icon}
                          </div>
                          <div className="text-right">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                              {template.category}
                            </span>
                          </div>
                        </div>
                        
                        <CardTitle className="text-xl mb-2">
                          {template.title}
                        </CardTitle>
                        
                        <CardDescription>
                          {template.description}
                        </CardDescription>
                      </CardHeader>
                      
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Temps estimé</span>
                            <span className="font-medium text-gray-900 flex items-center">
                              <Clock className="w-3 h-3 mr-1" />
                              {template.estimatedTime}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Difficulté</span>
                            <span className={cn(
                              'font-medium',
                              template.difficulty === 'Facile' ? 'text-green-600' : 'text-orange-600'
                            )}>
                              {template.difficulty}
                            </span>
                          </div>
                        </div>
                        
                        <div className="mt-4">
                          <p className="text-xs text-gray-600 mb-2">Fonctionnalités incluses :</p>
                          <div className="space-y-1">
                            {template.features.map((feature, index) => (
                              <div key={index} className="flex items-center text-xs text-gray-700">
                                <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                                {feature}
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                      
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant={selectedTemplate === template.id ? 'primary' : 'outline'}
                        >
                          {selectedTemplate === template.id ? 'Sélectionné' : 'Sélectionner'}
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Configuration */}
            {currentStep === 2 && selectedTemplateData && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Configurez votre workflow
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Personnalisez les paramètres de votre workflow "{selectedTemplateData.title}"
                  </p>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center space-x-4">
                      <div className={cn("p-3 rounded-lg", selectedTemplateData.color)}>
                        {selectedTemplateData.icon}
                      </div>
                      <div>
                        <CardTitle>{selectedTemplateData.title}</CardTitle>
                        <CardDescription>{selectedTemplateData.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="space-y-6">
                    {/* Configuration Form */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom du workflow
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring transition-smooth"
                          placeholder="Ex: Validation subventions 2024"
                          defaultValue={selectedTemplateData.title}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Fréquence d'exécution
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring transition-smooth">
                          <option>Automatique (détection)</option>
                          <option>Toutes les heures</option>
                          <option>Quotidien</option>
                          <option>Hebdomadaire</option>
                          <option>Manuel</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Responsable
                        </label>
                        <input
                          type="text"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring transition-smooth"
                          placeholder="Nom du responsable"
                          defaultValue="Jean Dupont"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Priorité
                        </label>
                        <select className="w-full px-4 py-2 border border-gray-300 rounded-lg focus-ring transition-smooth">
                          <option>Haute</option>
                          <option selected>Normale</option>
                          <option>Basse</option>
                        </select>
                      </div>
                    </div>
                    
                    {/* Advanced Settings */}
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">
                        Paramètres avancés
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Notifications email
                            </p>
                            <p className="text-sm text-gray-600">
                              Recevoir des notifications en cas d'erreur
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-bf-green/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bf-green"></div>
                          </label>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Mode test
                            </p>
                            <p className="text-sm text-gray-600">
                              Exécuter en mode test avant activation
                            </p>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input type="checkbox" className="sr-only peer" defaultChecked />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-bf-green/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-bf-green"></div>
                          </label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Step 3: Confirmation */}
            {currentStep === 3 && selectedTemplateData && (
              <div>
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">
                    Confirmation et test
                  </h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Vérifiez les paramètres de votre workflow avant de l'activer
                  </p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Summary */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Récapitulatif</CardTitle>
                      <CardDescription>
                        Configuration de votre workflow
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className={cn("p-2 rounded-lg", selectedTemplateData.color)}>
                          {selectedTemplateData.icon}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {selectedTemplateData.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {selectedTemplateData.category}
                          </p>
                        </div>
                      </div>
                      
                      <div className="space-y-3 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Fréquence</span>
                          <span className="font-medium">Automatique</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Responsable</span>
                          <span className="font-medium">Jean Dupont</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Priorité</span>
                          <span className="font-medium">Normale</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Mode test</span>
                          <span className="font-medium text-green-600">Activé</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Test Results */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Test de configuration</CardTitle>
                      <CardDescription>
                        Résultats du test de votre workflow
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Configuration valide
                            </p>
                            <p className="text-xs text-gray-600">
                              Tous les paramètres sont corrects
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <Shield className="w-4 h-4 text-green-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">
                              Sécurité vérifiée
                            </p>
                            <p className="text-xs text-gray-600">
                              Conforme aux standards gouvernementaux
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                          <p className="text-sm text-green-800">
                            <strong>Prêt à l'activation !</strong> Votre workflow peut être activé en toute sécurité.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Activation Options */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Activation</CardTitle>
                    <CardDescription>
                      Choisissez comment activer votre workflow
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <label className="relative">
                        <input type="radio" name="activation" value="immediate" className="sr-only peer" defaultChecked />
                        <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-bf-green peer-checked:bg-bf-green/5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">Activation immédiate</h4>
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-bf-green peer-checked:bg-bf-green" />
                          </div>
                          <p className="text-sm text-gray-600">
                            Votre workflow sera actif immédiatement après création
                          </p>
                        </div>
                      </label>
                      
                      <label className="relative">
                        <input type="radio" name="activation" value="scheduled" className="sr-only peer" />
                        <div className="p-4 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-bf-green peer-checked:bg-bf-green/5">
                          <div className="flex items-center justify-between mb-2">
                            <h4 className="font-medium text-gray-900">Activation programmée</h4>
                            <div className="w-4 h-4 border-2 border-gray-300 rounded-full peer-checked:border-bf-green peer-checked:bg-bf-green" />
                          </div>
                          <p className="text-sm text-gray-600">
                            Planifier l'activation à une date ultérieure
                          </p>
                        </div>
                      </label>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <Button 
                variant="outline" 
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Précédent
              </Button>
              
              <div className="flex space-x-3">
                {currentStep < 3 && (
                  <Button onClick={handleNext} className="flex items-center">
                    Suivant
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                )}
                
                {currentStep === 3 && (
                  <Link href="/workflows">
                    <Button className="flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Créer le workflow
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}