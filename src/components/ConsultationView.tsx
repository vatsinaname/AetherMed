import { useState } from 'react'
import * as Tabs from '@radix-ui/react-tabs'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, Stethoscope, TestTube2, Pill, 
  AlertTriangle, ChevronRight, Save, Clock,
  LucideIcon
} from 'lucide-react'
import { useConsultation } from '../hooks/useConsultation'
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts'
import { LoadingState } from './LoadingState'
import { type ConsultationMode } from '../lib/types'

interface TabProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string
  icon: LucideIcon
  label: string
  shortcut: string
}

interface ConsultationViewProps {
  mode?: ConsultationMode
}

interface VitalSignInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// Animation variants for tab content
const tabContentVariants = {
  initial: { opacity: 0, y: 10 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 }
}

export function ConsultationView({ mode = 'new' }: ConsultationViewProps) {
  const { form, isSubmitting, aiSuggestions, onSubmit } = useConsultation()
  const { register, formState: { errors }, watch } = form
  const [activeTab, setActiveTab] = useState('symptoms')
  const { consultationShortcuts } = useKeyboardShortcuts()
  
  const symptoms = watch('chiefComplaints')
  const hasEnoughSymptoms = symptoms?.length > 10

  // Use mode to conditionally render UI if needed
  console.log('Consultation mode:', mode)

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Top Bar */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">New Consultation</h1>
            <div className="flex items-center mt-1 text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              Started at {new Date().toLocaleTimeString()}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-500">
              Press {consultationShortcuts.save} to save
            </div>
            <button 
              data-action="save-consultation"
              onClick={() => onSubmit()}
              disabled={isSubmitting}
              className="inline-flex items-center px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700 disabled:opacity-50"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Consultation
            </button>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content Area */}
          <div className="col-span-2">
            <Tabs.Root value={activeTab} onValueChange={setActiveTab}>
              <Tabs.List className="flex space-x-1 border-b border-gray-200">
                <ConsultationTab 
                  value="symptoms" 
                  icon={FileText} 
                  label="Symptoms"
                  shortcut={consultationShortcuts.symptoms}
                  data-tab="symptoms"
                />
                <ConsultationTab 
                  value="diagnosis" 
                  icon={Stethoscope} 
                  label="Diagnosis"
                  shortcut={consultationShortcuts.diagnosis}
                  data-tab="diagnosis"
                />
                <ConsultationTab 
                  value="tests" 
                  icon={TestTube2} 
                  label="Tests"
                  shortcut={consultationShortcuts.tests}
                  data-tab="tests"
                />
                <ConsultationTab 
                  value="treatment" 
                  icon={Pill} 
                  label="Treatment"
                  shortcut={consultationShortcuts.treatment}
                  data-tab="treatment"
                />
              </Tabs.List>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="initial"
                  animate="enter"
                  exit="exit"
                  variants={tabContentVariants}
                  transition={{ duration: 0.2 }}
                  className="mt-6"
                >
                  <Tabs.Content value="symptoms" className="space-y-6">
                    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Chief Complaints</h3>
                      <textarea
                        {...register('chiefComplaints')}
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Describe the patient's main symptoms and concerns..."
                      />
                      {errors.chiefComplaints && (
                        <p className="mt-2 text-sm text-red-600">{errors.chiefComplaints.message}</p>
                      )}
                    </section>

                    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Vital Signs</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <VitalSignInput
                          label="Blood Pressure"
                          {...register('vitalSigns.bloodPressure')}
                          error={errors.vitalSigns?.bloodPressure?.message}
                        />
                        <VitalSignInput
                          label="Heart Rate"
                          {...register('vitalSigns.heartRate')}
                          error={errors.vitalSigns?.heartRate?.message}
                        />
                        <VitalSignInput
                          label="Temperature"
                          {...register('vitalSigns.temperature')}
                          error={errors.vitalSigns?.temperature?.message}
                        />
                        <VitalSignInput
                          label="Respiratory Rate"
                          {...register('vitalSigns.respiratoryRate')}
                          error={errors.vitalSigns?.respiratoryRate?.message}
                        />
                      </div>
                    </section>
                  </Tabs.Content>

                  <Tabs.Content value="diagnosis" className="space-y-6">
                    {!hasEnoughSymptoms ? (
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start">
                        <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 mr-3" />
                        <p className="text-sm text-amber-800">
                          Please provide more detailed symptoms to receive AI-assisted diagnosis suggestions.
                        </p>
                      </div>
                    ) : isSubmitting ? (
                      <LoadingState message="Analyzing symptoms..." />
                    ) : (
                      <div className="space-y-6">
                        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">AI Suggestions</h3>
                          <div className="space-y-4">
                            {aiSuggestions.diagnoses.map((diagnosis, index) => (
                              <div 
                                key={index}
                                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                              >
                                <div>
                                  <p className="font-medium text-gray-900">{diagnosis.name}</p>
                                  <p className="text-sm text-gray-500">Based on reported symptoms</p>
                                </div>
                                <div className="text-right">
                                  <span className={`
                                    inline-block px-2 py-1 text-xs rounded-full
                                    ${diagnosis.confidence > 80 
                                      ? 'bg-green-100 text-green-800' 
                                      : 'bg-amber-100 text-amber-800'
                                    }
                                  `}>
                                    {diagnosis.confidence}% confidence
                                  </span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </section>

                        <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <h3 className="text-lg font-medium text-gray-900 mb-4">Clinical Notes</h3>
                          <textarea
                            {...register('diagnosis')}
                            className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                            placeholder="Enter your diagnosis and clinical notes..."
                          />
                        </section>
                      </div>
                    )}
                  </Tabs.Content>

                  <Tabs.Content value="tests" className="space-y-6">
                    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Recommended Tests</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          'Complete Blood Count',
                          'Basic Metabolic Panel',
                          'Lipid Panel',
                          'Thyroid Function',
                          'HbA1c',
                          'Liver Function',
                          'Urinalysis',
                          'ECG'
                        ].map((test) => (
                          <label
                            key={test}
                            className="flex items-start p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"
                          >
                            <input
                              type="checkbox"
                              value={test}
                              {...register('selectedTests')}
                              className="mt-1 rounded text-medical-600 focus:ring-medical-500"
                            />
                            <div className="ml-3">
                              <p className="text-sm font-medium text-gray-900">{test}</p>
                              <p className="text-xs text-gray-500">Standard diagnostic test</p>
                            </div>
                          </label>
                        ))}
                      </div>
                    </section>
                  </Tabs.Content>

                  <Tabs.Content value="treatment" className="space-y-6">
                    <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                      <h3 className="text-lg font-medium text-gray-900 mb-4">Treatment Plan</h3>
                      {aiSuggestions.treatments.length > 0 && (
                        <div className="mb-4 p-4 bg-medical-50 rounded-lg">
                          <h4 className="text-sm font-medium text-medical-900 mb-2">AI Recommendations</h4>
                          <ul className="space-y-2">
                            {aiSuggestions.treatments.map((treatment, index) => (
                              <li key={index} className="flex items-start">
                                <ChevronRight className="w-4 h-4 text-medical-500 mt-0.5 mr-2" />
                                <span className="text-sm text-medical-800">{treatment}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <textarea
                        {...register('treatmentPlan')}
                        className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                        placeholder="Enter your treatment plan and recommendations..."
                      />
                    </section>
                  </Tabs.Content>
                </motion.div>
              </AnimatePresence>
            </Tabs.Root>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Patient Summary</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-900">John Smith</p>
                    <p className="text-sm text-gray-500">45 years • Male • P-12345</p>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-900">Medical History</p>
                    <ul className="mt-2 space-y-2">
                      <li className="text-sm text-gray-500">• Hypertension (2020)</li>
                      <li className="text-sm text-gray-500">• Type 2 Diabetes (2021)</li>
                    </ul>
                  </div>
                  <div className="border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-red-600">Allergies</p>
                    <p className="mt-1 text-sm text-gray-500">Penicillin</p>
                  </div>
                </div>
              </section>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <section className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Previous Visits</h3>
                <div className="space-y-4">
                  {[
                    { date: '2025-03-15', reason: 'Routine Check-up' },
                    { date: '2025-01-22', reason: 'Flu Symptoms' }
                  ].map((visit, index) => (
                    <div 
                      key={index}
                      className="flex justify-between items-start border-b border-gray-200 pb-4 last:border-0 last:pb-0"
                    >
                      <div>
                        <p className="text-sm text-gray-900">{visit.reason}</p>
                        <p className="text-xs text-gray-500">
                          {new Date(visit.date).toLocaleDateString()}
                        </p>
                      </div>
                      <button className="text-xs text-primary-600 hover:text-primary-700">
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Enhanced ConsultationTab with animation
function ConsultationTab({ 
  value, 
  icon: Icon, 
  label, 
  shortcut,
  ...props 
}: TabProps) {
  return (
    <Tabs.Trigger
      value={value}
      className={`
        group inline-flex items-center px-4 py-2 border-b-2 text-sm font-medium
        border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300
        focus:outline-none focus:text-primary-600 focus:border-primary-600
        data-[state=active]:border-primary-500 data-[state=active]:text-primary-600
        relative transition-all duration-200
      `}
      {...props}
    >
      <Icon className="w-4 h-4 mr-2 transition-transform group-hover:scale-110" />
      {label}
      <kbd className="ml-2 text-xs text-gray-400 group-hover:text-gray-500 transition-colors">
        {shortcut}
      </kbd>
      <motion.div
        className="absolute -bottom-[2px] left-0 right-0 h-0.5 bg-primary-500"
        initial={false}
        animate={{
          opacity: props['data-state' as keyof typeof props] === 'active' ? 1 : 0,
          scale: props['data-state' as keyof typeof props] === 'active' ? 1 : 0.95,
        }}
        transition={{ duration: 0.2 }}
      />
    </Tabs.Trigger>
  )
}

// Enhanced VitalSignInput with animation
function VitalSignInput({ label, error, ...props }: VitalSignInputProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
      <div className="relative">
        <input
          type="text"
          className={`
            w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500
            transition-all duration-200
            ${error ? 'border-red-300' : 'border-gray-300'}
          `}
          {...props}
        />
        <AnimatePresence>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-1 text-sm text-red-600"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}