'use client'

import React from 'react'
import Link from 'next/link'
import { 
  Play, 
  Clock, 
  CheckCircle, 
  TrendingUp,
  Plus,
  FileText,
  Calendar,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/Table'
import { Header } from '@/components/layouts/Header'
import { Sidebar } from '@/components/layouts/Sidebar'
import { formatDate, formatNumber, cn } from '@/lib/utils'

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  // Données simulées pour le dashboard
  const kpis = [
    {
      title: 'Workflows actifs',
      value: '12',
      change: '+2',
      trend: 'up',
      icon: <Play className="w-6 h-6" />,
      color: 'text-bf-green'
    },
    {
      title: 'Exécutions ce mois',
      value: formatNumber(247),
      change: '+18%',
      trend: 'up',
      icon: <Clock className="w-6 h-6" />,
      color: 'text-blue-600'
    },
    {
      title: 'Gain temps estimé',
      value: `${formatNumber(156)}h`,
      change: '+23h',
      trend: 'up',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'text-purple-600'
    },
    {
      title: 'Taux succès',
      value: '98.5%',
      change: '+1.2%',
      trend: 'up',
      icon: <CheckCircle className="w-6 h-6" />,
      color: 'text-green-600'
    }
  ]

  const recentWorkflows = [
    {
      id: 'wf-001',
      name: 'Validation demandes subventions',
      status: 'active' as const,
      lastRun: new Date('2024-01-15T10:30:00'),
      executions: 45,
      nextRun: '2024-01-16 09:00'
    },
    {
      id: 'wf-002',
      name: 'Traitement dossiers RH',
      status: 'active' as const,
      lastRun: new Date('2024-01-15T09:15:00'),
      executions: 23,
      nextRun: 'Automatique'
    },
    {
      id: 'wf-003',
      name: 'Archivage documents',
      status: 'inactive' as const,
      lastRun: new Date('2024-01-14T16:00:00'),
      executions: 156,
      nextRun: 'Manuel'
    },
    {
      id: 'wf-004',
      name: 'Notification échéances',
      status: 'active' as const,
      lastRun: new Date('2024-01-15T08:00:00'),
      executions: 89,
      nextRun: 'Quotidien'
    }
  ]

  const executionData = [
    { name: 'Lun', value: 12 },
    { name: 'Mar', value: 19 },
    { name: 'Mer', value: 15 },
    { name: 'Jeu', value: 22 },
    { name: 'Ven', value: 18 },
    { name: 'Sam', value: 8 },
    { name: 'Dim', value: 5 }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:ml-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Tableau de bord
            </h1>
            <p className="text-gray-600">
              Vue d'ensemble de vos workflows et automatisation
            </p>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {kpis.map((kpi, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className={cn("p-2 rounded-lg bg-gray-50", kpi.color)}>
                      {kpi.icon}
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{kpi.value}</p>
                      <p className="text-sm text-gray-600">{kpi.title}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm">
                    <span className={cn(
                      'font-medium',
                      kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    )}>
                      {kpi.change}
                    </span>
                    <span className="text-gray-500 ml-1">vs mois dernier</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Recent Workflows */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Workflows récents</CardTitle>
                    <CardDescription>
                      Vos workflows actifs et leurs dernières exécutions
                    </CardDescription>
                  </div>
                  <Link href="/workflows">
                    <Button size="sm" variant="outline">
                      Voir tous
                    </Button>
                  </Link>
                </CardHeader>
                
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Workflow</TableHead>
                        <TableHead>Statut</TableHead>
                        <TableHead>Dernière exécution</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentWorkflows.map((workflow) => (
                        <TableRow key={workflow.id}>
                          <TableCell>
                            <div className="flex items-center">
                              <FileText className="w-4 h-4 text-gray-400 mr-3" />
                              <div>
                                <p className="font-medium text-gray-900">
                                  {workflow.name}
                                </p>
                                <p className="text-sm text-gray-500">
                                  {workflow.executions} exécutions
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge
                              status={workflow.status}
                              label={workflow.status === 'active' ? 'Actif' : 'Inactif'}
                              size="sm"
                            />
                          </TableCell>
                          <TableCell>
                            <div className="text-sm text-gray-900">
                              {formatDate(workflow.lastRun)}
                            </div>
                            <div className="text-xs text-gray-500">
                              Prochain: {workflow.nextRun}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="ghost">
                                <Play className="w-4 h-4" />
                              </Button>
                              <Button size="sm" variant="ghost">
                                Voir
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle>Actions rapides</CardTitle>
                  <CardDescription>
                    Lancez une automatisation ou créez un nouveau workflow
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link href="/workflows/new" className="block">
                    <Button className="w-full" size="sm">
                      <Plus className="w-4 h-4 mr-2" />
                      Nouveau workflow
                    </Button>
                  </Link>
                  <Button 
                    variant="outline" 
                    className="w-full" 
                    size="sm"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Exécuter un workflow
                  </Button>
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Activité récente</CardTitle>
                  <CardDescription>
                    Les dernières actions sur votre compte
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Workflow complété
                      </p>
                      <p className="text-xs text-gray-500">
                        Validation subventions - 15 min
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Planning mis à jour
                      </p>
                      <p className="text-xs text-gray-500">
                        Nouvelles échéances ajoutées
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        Accès modifié
                      </p>
                      <p className="text-xs text-gray-500">
                        Permissions mises à jour
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Performance */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                  <CardDescription>
                    Statistiques d'exécution cette semaine
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Succès</span>
                      <span className="text-sm font-medium text-green-600">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Temps moyen</span>
                      <span className="text-sm font-medium text-gray-900">2.3 min</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Économisé</span>
                      <span className="text-sm font-medium text-bf-green">156h</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}