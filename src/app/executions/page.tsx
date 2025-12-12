'use client'

import React from 'react'
import { 
  Calendar, 
  Filter, 
  FileText, 
  User, 
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Play,
  RotateCcw,
  Eye,
  ChevronDown,
  Mail,
  Building
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

export default function ExecutionsPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)
  const [selectedStatus, setSelectedStatus] = React.useState('all')
  const [expandedExecution, setExpandedExecution] = React.useState<string | null>(null)

  // Données simulées d'exécutions
  const executions = [
    {
      id: 'exec-001',
      workflowName: 'Validation demandes subventions',
      status: 'success' as const,
      startTime: new Date('2024-01-15T14:30:00'),
      endTime: new Date('2024-01-15T14:32:15'),
      duration: '2m 15s',
      triggeredBy: 'Jean Dupont',
      type: 'Automatique',
      documents: 15,
      errors: 0,
      logs: [
        { time: '14:30:00', level: 'info', message: 'Démarrage du workflow' },
        { time: '14:30:05', level: 'info', message: 'Vérification des critères de sélection' },
        { time: '14:30:45', level: 'info', message: '15 dossiers validés avec succès' },
        { time: '14:32:15', level: 'success', message: 'Workflow terminé avec succès' }
      ]
    },
    {
      id: 'exec-002',
      workflowName: 'Traitement dossiers RH',
      status: 'error' as const,
      startTime: new Date('2024-01-15T13:00:00'),
      endTime: new Date('2024-01-15T13:05:30'),
      duration: '5m 30s',
      triggeredBy: 'Système',
      type: 'Automatique',
      documents: 8,
      errors: 2,
      logs: [
        { time: '13:00:00', level: 'info', message: 'Démarrage du workflow' },
        { time: '13:02:15', level: 'error', message: 'Erreur lors de la validation dossier #1234' },
        { time: '13:04:30', level: 'error', message: 'Connexion à la base de données échouée' },
        { time: '13:05:30', level: 'error', message: 'Workflow terminé avec des erreurs' }
      ]
    },
    {
      id: 'exec-003',
      workflowName: 'Notification échéances',
      status: 'pending' as const,
      startTime: new Date('2024-01-15T15:00:00'),
      endTime: null,
      duration: 'En cours...',
      triggeredBy: 'Système',
      type: 'Automatique',
      documents: 25,
      errors: 0,
      logs: [
        { time: '15:00:00', level: 'info', message: 'Démarrage du workflow' },
        { time: '15:00:30', level: 'info', message: 'Préparation des notifications' },
        { time: '15:01:15', level: 'info', message: 'Envoi des emails en cours...' }
      ]
    },
    {
      id: 'exec-004',
      workflowName: 'Archivage documents',
      status: 'success' as const,
      startTime: new Date('2024-01-15T11:30:00'),
      endTime: new Date('2024-01-15T11:45:20'),
      duration: '15m 20s',
      triggeredBy: 'Marie Ouédraogo',
      type: 'Manuel',
      documents: 156,
      errors: 0,
      logs: [
        { time: '11:30:00', level: 'info', message: 'Démarrage manuel du workflow' },
        { time: '11:30:15', level: 'info', message: 'Scan des documents à archiver' },
        { time: '11:35:45', level: 'info', message: '156 documents trouvés' },
        { time: '11:45:20', level: 'success', message: 'Archivage terminé avec succès' }
      ]
    },
    {
      id: 'exec-005',
      workflowName: 'Planification réunions',
      status: 'success' as const,
      startTime: new Date('2024-01-15T10:00:00'),
      endTime: new Date('2024-01-15T10:01:45'),
      duration: '1m 45s',
      triggeredBy: 'Système',
      type: 'Automatique',
      documents: 3,
      errors: 0,
      logs: [
        { time: '10:00:00', level: 'info', message: 'Démarrage du workflow' },
        { time: '10:00:30', level: 'info', message: '3 réunions planifiées' },
        { time: '10:01:15', level: 'info', message: 'Notifications envoyées aux participants' },
        { time: '10:01:45', level: 'success', message: 'Workflow terminé avec succès' }
      ]
    },
    {
      id: 'exec-006',
      workflowName: 'Gestion immobilière',
      status: 'warning' as const,
      startTime: new Date('2024-01-15T09:00:00'),
      endTime: new Date('2024-01-15T09:10:30'),
      duration: '10m 30s',
      triggeredBy: 'Système',
      type: 'Automatique',
      documents: 12,
      errors: 1,
      logs: [
        { time: '09:00:00', level: 'info', message: 'Démarrage du workflow' },
        { time: '09:05:15', level: 'warning', message: 'Maintenance prévue pour le bâtiment B' },
        { time: '09:08:30', level: 'info', message: '11 bâtiments traités avec succès' },
        { time: '09:10:30', level: 'warning', message: 'Workflow terminé avec des avertissements' }
      ]
    }
  ]

  const statusFilters = [
    { id: 'all', name: 'Tous', count: 156 },
    { id: 'success', name: 'Succès', count: 134 },
    { id: 'pending', name: 'En cours', count: 8 },
    { id: 'warning', name: 'Avertissement', count: 9 },
    { id: 'error', name: 'Erreur', count: 5 }
  ]

  const filteredExecutions = selectedStatus === 'all' 
    ? executions 
    : executions.filter(exec => exec.status === selectedStatus)

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-600" />
      case 'error':
        return <XCircle className="w-4 h-4 text-red-600" />
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />
      case 'warning':
        return <AlertCircle className="w-4 h-4 text-orange-600" />
      default:
        return null
    }
  }

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'success':
        return 'Succès'
      case 'error':
        return 'Erreur'
      case 'pending':
        return 'En cours'
      case 'warning':
        return 'Avertissement'
      default:
        return status
    }
  }

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
                Historique d'exécutions
              </h1>
              <p className="text-gray-600">
                Suivez l'activité de vos workflows et consultez les logs détaillés
              </p>
            </div>
            
            <div className="mt-4 lg:mt-0 flex space-x-3">
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="date"
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus-ring transition-smooth"
                />
              </div>
              
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filtrer
              </Button>
            </div>
          </div>

          {/* Status Filters */}
          <div className="mb-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {statusFilters.map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setSelectedStatus(filter.id)}
                    className={cn(
                      'py-2 px-1 border-b-2 font-medium text-sm transition-colors',
                      selectedStatus === filter.id
                        ? 'border-bf-green text-bf-green'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    )}
                  >
                    {filter.name}
                    <span className="ml-2 bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                      {filter.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Executions Timeline */}
          <div className="space-y-4">
            {filteredExecutions.map((execution) => (
              <Card key={execution.id} className="hover:shadow-md transition-shadow">
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setExpandedExecution(expandedExecution === execution.id ? null : execution.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {getStatusIcon(execution.status)}
                      </div>
                      
                      <div>
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {execution.workflowName}
                          </h3>
                          <StatusBadge
                            status={execution.status}
                            label={getStatusLabel(execution.status)}
                            size="sm"
                          />
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User className="w-3 h-3 mr-1" />
                            {execution.triggeredBy}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {execution.duration}
                          </div>
                          <div className="flex items-center">
                            <FileText className="w-3 h-3 mr-1" />
                            {execution.documents} documents
                          </div>
                          {execution.errors > 0 && (
                            <div className="flex items-center text-red-600">
                              <XCircle className="w-3 h-3 mr-1" />
                              {execution.errors} erreur(s)
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {formatDate(execution.startTime)}
                        </p>
                        <p className="text-xs text-gray-600">
                          Type: {execution.type}
                        </p>
                      </div>
                      
                      <ChevronDown
                        className={cn(
                          'w-5 h-5 text-gray-400 transition-transform',
                          expandedExecution === execution.id && 'rotate-180'
                        )}
                      />
                    </div>
                  </div>
                </CardHeader>
                
                {expandedExecution === execution.id && (
                  <CardContent className="border-t border-gray-200">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Execution Details */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Détails de l'exécution
                        </h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Heure de début</span>
                            <span className="font-medium">{formatDate(execution.startTime)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Heure de fin</span>
                            <span className="font-medium">
                              {execution.endTime ? formatDate(execution.endTime) : 'En cours'}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Durée</span>
                            <span className="font-medium">{execution.duration}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Documents traités</span>
                            <span className="font-medium">{execution.documents}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Erreurs</span>
                            <span className={cn(
                              'font-medium',
                              execution.errors > 0 ? 'text-red-600' : 'text-green-600'
                            )}>
                              {execution.errors}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Logs */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3">
                          Journal d'exécution
                        </h4>
                        <div className="bg-gray-50 rounded-lg p-4 max-h-48 overflow-y-auto">
                          <div className="space-y-2">
                            {execution.logs.map((log, index) => (
                              <div key={index} className="flex items-start space-x-2 text-sm">
                                <span className="text-gray-500 font-mono text-xs">
                                  {log.time}
                                </span>
                                <span className={cn(
                                  'px-2 py-0.5 rounded text-xs font-medium',
                                  log.level === 'info' && 'bg-blue-100 text-blue-800',
                                  log.level === 'success' && 'bg-green-100 text-green-800',
                                  log.level === 'warning' && 'bg-yellow-100 text-yellow-800',
                                  log.level === 'error' && 'bg-red-100 text-red-800'
                                )}>
                                  {log.level}
                                </span>
                                <span className="text-gray-700 flex-1">
                                  {log.message}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Actions */}
                    <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-200">
                      {execution.status === 'error' && (
                        <Button variant="outline" size="sm">
                          <RotateCcw className="w-4 h-4 mr-2" />
                          Relancer
                        </Button>
                      )}
                      
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        Voir les détails
                      </Button>
                      
                      <Button variant="outline" size="sm">
                        <Mail className="w-4 h-4 mr-2" />
                        Signaler un problème
                      </Button>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          {/* Empty State */}
          {filteredExecutions.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                Aucune exécution trouvée
              </h3>
              <p className="text-gray-600 mb-4">
                Aucune exécution ne correspond à votre filtre actuel.
              </p>
              <Button onClick={() => setSelectedStatus('all')}>
                Voir toutes les exécutions
              </Button>
            </div>
          )}

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Charger plus d'exécutions
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}