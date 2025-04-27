import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type ConsultationFormData, consultationSchema } from '../lib/schemas'

interface AISuggestion {
  diagnoses: Array<{ name: string; confidence: number }>
  treatments: string[]
}

const mockAISuggestions: AISuggestion = {
  diagnoses: [
    { name: 'Hypertensive Crisis', confidence: 85 },
    { name: 'Acute Coronary Syndrome', confidence: 65 },
  ],
  treatments: [
    'Start IV nitroprusside for immediate BP control',
    'ECG monitoring',
    'Complete blood count and metabolic panel',
    'Chest X-ray to assess for pulmonary edema'
  ]
}

export function useConsultation() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [aiSuggestions, setAISuggestions] = useState<AISuggestion>({ diagnoses: [], treatments: [] })
  const [lastAnalyzed, setLastAnalyzed] = useState('')

  const form = useForm<ConsultationFormData>({
    defaultValues: {
      status: 'draft',
      selectedTests: [],
      chiefComplaints: '',
      vitalSigns: {
        bloodPressure: '',
        heartRate: '',
        temperature: '',
        respiratoryRate: ''
      }
    },
    resolver: zodResolver(consultationSchema)
  })

  const chiefComplaints = form.watch('chiefComplaints')

  useEffect(() => {
    if (!chiefComplaints || chiefComplaints.length < 10) return
    if (Math.abs(chiefComplaints.length - lastAnalyzed.length) < 10) return

    const timer = setTimeout(() => {
      setIsSubmitting(true)
      setTimeout(() => {
        setAISuggestions(mockAISuggestions)
        setLastAnalyzed(chiefComplaints)
        setIsSubmitting(false)
      }, 1500)
    }, 1000)

    return () => clearTimeout(timer)
  }, [chiefComplaints, lastAnalyzed])

  const validateVitalSigns = (field: keyof ConsultationFormData['vitalSigns'], value: string) => {
    try {
      consultationSchema.shape.vitalSigns.shape[field].parse(value)
      form.clearErrors(`vitalSigns.${field}` as const)
    } catch (error) {
      if (error instanceof Error) {
        form.setError(`vitalSigns.${field}` as const, { message: error.message })
      }
    }
  }

  const onSubmit = async (data?: ConsultationFormData) => {
    try {
      setIsSubmitting(true)
      const formData = data || form.getValues()
      
      const validatedData = await consultationSchema.parseAsync(formData)
      console.log('Saving consultation:', validatedData)
      
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      return true
    } catch (error) {
      console.error('Consultation validation failed:', error)
      return false
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    form,
    isSubmitting,
    aiSuggestions,
    validateVitalSigns,
    onSubmit
  }
}