import { ReactNode } from 'react'
import { LucideIcon } from 'lucide-react'

export interface NavLinkProps {
  to: string
  icon: LucideIcon
  children: ReactNode
}

export interface QuickAccessCardProps {
  title: string
  items: Array<{
    label: string
    value?: string
    meta?: string
  }>
}

export interface ClinicalAlertProps {
  type: 'info' | 'warning' | 'error' | 'success'
  title: string
  message: string
  actions?: Array<{
    label: string
    onClick: () => void
    variant?: 'primary' | 'secondary'
  }>
}

export interface TabTriggerProps {
  value: string
  label: string
  icon: LucideIcon
  shortcut?: string
  isActive?: boolean
}

export interface KeyboardShortcut {
  key: string
  description: string
  modifier?: 'Ctrl' | 'Alt' | 'Shift' | 'Meta'
  scope?: 'global' | 'consultation' | 'patients'
}

export interface VitalSignsData {
  bloodPressure: string
  heartRate: string
  temperature: string
  respiratoryRate: string
}

export interface ConsultationViewProps {
  patientId?: string
  mode?: 'new' | 'edit' | 'view'
}

export interface PatientDataSummary {
  id: string
  name: string
  age: number
  gender: string
  lastVisit?: string
  status: 'active' | 'inactive'
  conditions: string[]
  allergies: string[]
}

export interface ConsultationData {
  id: string
  patientId: string
  date: string
  chiefComplaints: string
  vitalSigns: VitalSignsData
  diagnosis?: string
  selectedTests: string[]
  treatmentPlan?: string
  status: 'draft' | 'completed' | 'reviewed'
  aiSuggestions?: {
    diagnoses: Array<{
      name: string
      confidence: number
    }>
    treatments: string[]
  }
}

export type ConsultationMode = 'new' | 'view' | 'edit'

export type ConsultationTab = 'symptoms' | 'diagnosis' | 'tests' | 'treatment'

export interface Patient {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  bloodGroup?: string
  allergies?: string[]
  medicalHistory?: string[]
}

export interface Consultation {
  id: string
  patientId: string
  date: Date
  symptoms: string[]
  diagnosis: {
    primary: string
    differential: string[]
  }
  tests: {
    ordered: Test[]
    results: TestResult[]
  }
  treatment: {
    medications: Medication[]
    instructions: string[]
    followUp?: Date
  }
  status: ConsultationStatus
  doctorId: string
}

export type ConsultationStatus = 'draft' | 'completed' | 'follow-up' | 'cancelled'

export interface Test {
  id: string
  name: string
  type: TestType
  orderedDate: Date
  status: 'pending' | 'completed' | 'cancelled'
}

export type TestType = 'blood' | 'urine' | 'imaging' | 'other'

export interface TestResult {
  testId: string
  resultDate: Date
  values: Record<string, string | number>
  notes?: string
  attachments?: string[]
}

export interface Medication {
  name: string
  dosage: string
  frequency: string
  duration: string
  notes?: string
  startDate: Date
  endDate?: Date
}

export interface Notification {
  id: string
  type: 'info' | 'warning' | 'success' | 'error'
  title: string
  message: string
  timestamp: Date
  read: boolean
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  notifications: {
    enabled: boolean
    desktop: boolean
    sound: boolean
  }
  keyboardShortcuts: boolean
  consultationView: {
    defaultTab: ConsultationTab
    autoSave: boolean
    confirmExit: boolean
  }
}