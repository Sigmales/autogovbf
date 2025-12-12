import { createClient } from '@supabase/supabase-js'

// --- TYPES DÉFINITIONS ---

export type Ministere = {
  id: string
  nom: string
  code: string
  email_contact: string
  n8n_account_email: string | null
  quota_executions: number
  created_at: string
}

export type User = {
  id: string
  ministere_id: string
  email: string
  role: 'admin' | 'operator' | 'viewer'
  full_name: string | null
  last_login: string | null
  created_at: string
  // Jointure optionnelle
  ministeres?: Ministere
}

export type WorkflowTemplate = {
  id: string
  nom: string
  description: string | null
  categorie: string | null
  n8n_json: any // Idéalement typer avec une interface N8nWorkflow
  config_schema: any
  is_public: boolean
  created_at: string
}

export type Workflow = {
  id: string
  ministere_id: string
  template_id: string | null
  nom_custom: string | null
  config: any
  n8n_workflow_id: string | null
  is_active: boolean
  created_by: string | null
  created_at: string
  // Jointure optionnelle
  workflow_templates?: WorkflowTemplate
}

export type Execution = {
  id: string
  workflow_id: string
  n8n_execution_id: string | null
  status: 'running' | 'success' | 'error'
  started_at: string
  finished_at: string | null
  duration_seconds: number | null
  input_data: any
  output_data: any
  error_message: string | null
  triggered_by: string | null
  // Jointure optionnelle
  users?: Pick<User, 'full_name' | 'email'>
}

// --- SETUP CLIENT ---

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Supabase env vars are missing')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// --- HELPER FUNCTIONS ---

/**
 * Récupère l'utilisateur courant avec les infos de son ministère.
 */
export async function getCurrentUser(): Promise<User | null> {
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  
  const { data: userData, error } = await supabase
    .from('users')
    .select(`
      *,
      ministeres (*)
    `)
    .eq('id', user.id)
    .single()
  
  if (error) {
    console.error('Error fetching user profile:', error)
    return null
  }
  
  return userData as User
}

/**
 * Récupère tous les workflows d'un ministère donné.
 */
export async function getMinistereWorkflows(ministereId: string): Promise<Workflow[]> {
  const { data, error } = await supabase
    .from('workflows')
    .select(`
      *,
      workflow_templates (*)
    `)
    .eq('ministere_id', ministereId)
    .order('created_at', { ascending: false })
  
  if (error) throw error
  return data as Workflow[]
}

/**
 * Récupère l'historique des exécutions pour un workflow spécifique.
 */
export async function getWorkflowExecutions(workflowId: string, limit = 50): Promise<Execution[]> {
  const { data, error } = await supabase
    .from('executions')
    .select(`
      *,
      users (
        full_name,
        email
      )
    `)
    .eq('workflow_id', workflowId)
    .order('started_at', { ascending: false })
    .limit(limit)
  
  if (error) throw error
  return data as Execution[]
}

/**
 * Enregistre le début d'une exécution.
 */
export async function createExecution(execution: Partial<Execution>): Promise<Execution> {
  const { data, error } = await supabase
    .from('executions')
    .insert(execution)
    .select()
    .single()
  
  if (error) throw error
  return data as Execution
}