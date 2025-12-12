import React from 'react'
import { 
  Search, 
  Filter, 
  Plus, 
  Play, 
  Settings,
  FileText,
  Clock,
  Users,
  Mail,
  Building,
  Calendar,
  Archive
} from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'

export default function WorkflowsPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [activeFilter, setActiveFilter] = React.useState('all')

  const workflowTemplates = [
    {
      id: 'template-1',
      title: 'Validation demandes subventions',
      description: 'Automatisez le processus de validation des demandes de subventions avec vérification automatique des critères',
      category: 'Finance',
      icon: <FileText className="w-6 h-6" />,
      color: 'bg-blue-100 text-blue-600',
      status: 'active' as const,
      executions: 156,
      lastUsed: '2 heures',
      difficulty: 'Facile'
    },
    {
      id: 'template-2',
      title: 'Traitement dossiers RH',
      description: 'Gérez automatiquement les dossiers du personnel : congés, avancements, mutations',
      category: 'Ressources Humaines',
      icon: <Users className="w-6 h-6" />,
      color: 'bg-green-100 text-green-600',
      status: 'active' as const,
      executions: 89,
      lastUsed: '1 jour',
      difficulty: 'Moyen'
    },
    {
      id: 'template-3',
      title: 'Archivage documents',
      description: 'Archivez automatiquement les documents selon les normes gouvernementales avec indexation',
      category: 'Administration',
      icon: <Archive className="w-6 h-6" />,
      color: 'bg-purple-100 text-purple-600',
      status: 'inactive' as const,
      executions: 234,
      lastUsed: '3 jours',
      difficulty: 'Facile'
    },
    {
      id: 'template-4',
      title: 'Notification échéances',
      description: 'Envoyez automatiquement des rappels pour les échéances importantes et les deadlines',
      category: 'Communication',
      icon: <Mail className="w-6 h-6" />,
      color: 'bg-orange-100 text-orange-600',
      status: 'active' as const,
      executions: 412,
      lastUsed: '30 minutes',
      difficulty: 'Facile'
    },
    {
      id: 'template-5',
      title: 'Gestion immobilière',
      description: 'Suivez les bâtiments gouvernementaux : maintenance, locations, affectations',
      category: 'Infrastructure',
      icon: <Building className="w-6 h-6" />,
      color: 'bg-red-100 text-red-600',
      status: 'active' as const,
      executions: 67,
      lastUsed: '5 heures',
      difficulty: 'Moyen'
    },
    {
      id: 'template-6',
      title: 'Planification réunions',
      description: 'Organisez automatiquement les réunions avec gestion des salles et invitations',
      category: 'Organisation',
      icon: <Calendar className="w-6 h-6" />,
      color: 'bg-indigo-100 text-indigo-600',
      status: 'active' as const,
      executions: 123,
      lastUsed: '1 heure',
      difficulty: 'Facile'
    }
  ]

  const categories = [
    { id: 'all', name: 'Tous', count: 12 },
    { id: 'active', name: 'Actifs', count: 8 },
    { id: 'inactive', name: 'Inactifs', count: 4 },
    { id: 'finance', name: 'Finance', count: 3 },
    { id: 'hr', name: 'Ressources Humaines', count: 2 },
    { id: 'admin', name: 'Administration', count: 4 },
    { id: 'communication', name: 'Communication', count: 2 },
    { id: 'infrastructure', name: 'Infrastructure', count: 1 }
  ]

  const filteredWorkflows = activeFilter === 'all' 
    ? workflowTemplates 
    : workflowTemplates.filter(workflow => {
        if (activeFilter === 'active') return workflow.status === 'active'
        if (activeFilter === 'inactive') return workflow.status === 'inactive'
        return workflow.category.toLowerCase().includes(activeFilter.toLowerCase())
      })

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Mes Workflows
              </h1>
              <p className="text-gray-600">
                Gérez et configurez vos processus d'automatisation
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Rechercher un workflow..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus-ring transition-smooth w-64"
                />
              </div>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
              
              <Link href="/workflows/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Nouveau workflow
                </Button>
              </Link>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveFilter(category.id)}
                    className={cn(
                      'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                      activeFilter === category.id
                        ? 'border-bf-green text-bf-green'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    {category.name}
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Workflows Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredWorkflows.map((workflow) => (
              <Card key={workflow.id} className="hover:shadow-lg transition-shadow flex flex-col">
                <CardHeader>
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-3 rounded-lg", workflow.color)}>
                      {workflow.icon}
                    </div>
                    <StatusBadge
                      status={workflow.status}
                      label={workflow.status === 'active' ? 'Actif' : 'Inactif'}
                      size="sm"
                    />
                  </div>
                  
                  <CardTitle className="text-lg mb-2">
                    {workflow.title}
                  </CardTitle>
                  
                  <CardDescription className="flex-1">
                    {workflow.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Catégorie</span>
                      <span className="font-medium text-gray-900">
                        {workflow.category}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Exécutions</span>
                      <span className="font-medium text-gray-900">
                        {workflow.executions}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Dernière utilisation</span>
                      <span className="font-medium text-gray-900">
                        {workflow.lastUsed}
                      </span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Difficulté</span>
                      <span className={cn(
                        'font-medium',
                        workflow.difficulty === 'Facile' ? 'text-green-600' : 'text-orange-600'
                      )}>
                        {workflow.difficulty}
                      </span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="flex space-x-2">
                  <Button 
                    size="sm" 
                    className="flex-1"
                    disabled={workflow.status !== 'active'}
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Exécuter
                  </Button>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="flex-1"
                  >
                    <Settings className="w-4 h-4 mr-2" />
                    Configurer
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Empty State (si pas de workflows) */}
          {filteredWorkflows.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Workflow className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucun workflow trouvé
              </h3>
              <p className="text-gray-600 mb-4">
                Aucun workflow ne correspond à votre filtre actuel.
              </p>
              <Button onClick={() => setActiveFilter('all')}>
                Voir tous les workflows
              </Button>
            </div>
          )}

          {/* Floating Action Button */}
          <div className="fixed bottom-6 right-6">
            <Link href="/workflows/new">
              <Button 
                size="lg" 
                className="rounded-full shadow-lg"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nouveau workflow
              </Button>
            </Link>
          </div>
        </main>
      </div>
    </div>
  )
}