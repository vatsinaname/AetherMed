import { z } from 'zod'

export const vitalSignsSchema = z.object({
  bloodPressure: z.string()
    .regex(/^\d{2,3}\/\d{2,3}$/, 'Must be in format 120/80')
    .refine(
      (bp) => {
        const [systolic, diastolic] = bp.split('/').map(Number)
        return systolic > diastolic && systolic <= 200 && diastolic >= 40
      },
      'Invalid blood pressure range'
    ),
  heartRate: z.string()
    .regex(/^\d{2,3}$/, 'Must be a number')
    .refine(
      (hr) => {
        const rate = Number(hr)
        return rate >= 40 && rate <= 200
      },
      'Heart rate must be between 40-200'
    ),
  temperature: z.string()
    .regex(/^\d{2}(\.\d)?$/, 'Must be in format 37.5')
    .refine(
      (temp) => {
        const t = Number(temp)
        return t >= 35 && t <= 42
      },
      'Temperature must be between 35-42°C'
    ),
  respiratoryRate: z.string()
    .regex(/^\d{1,2}$/, 'Must be a number')
    .refine(
      (rr) => {
        const rate = Number(rr)
        return rate >= 8 && rate <= 40
      },
      'Respiratory rate must be between 8-40'
    ),
})

export const consultationSchema = z.object({
  chiefComplaints: z.string()
    .min(10, 'Please provide detailed symptoms')
    .max(1000, 'Description too long'),
  vitalSigns: vitalSignsSchema,
  diagnosis: z.string()
    .min(10, 'Please provide a diagnosis')
    .optional(),
  selectedTests: z.array(z.string())
    .optional(),
  treatmentPlan: z.string()
    .min(10, 'Please provide a treatment plan')
    .optional(),
  status: z.enum(['draft', 'completed', 'reviewed'])
    .default('draft'),
})

export type VitalSigns = z.infer<typeof vitalSignsSchema>
export type ConsultationData = z.infer<typeof consultationSchema>
export type ConsultationFormData = z.infer<typeof consultationSchema>

export const patientSchema = z.object({
  id: z.string(),
  name: z.string().min(2),
  status: z.enum(['active', 'inactive']),
  age: z.number().min(0).max(150),
  gender: z.string(),
  contactInfo: z.object({
    phone: z.string(),
    email: z.string().email().optional(),
  }),
  medicalHistory: z.object({
    conditions: z.array(z.string()),
    medications: z.array(z.string()),
    allergies: z.array(z.string()),
  }),
})

export type PatientData = z.infer<typeof patientSchema>

// Utility function to validate vital signs in real-time
export function validateVitalSign(
  field: keyof typeof vitalSignsSchema.shape,
  value: string
): string | null {
  try {
    const schema = vitalSignsSchema.shape[field]
    schema.parse(value)
    return null
  } catch (error) {
    if (error instanceof z.ZodError) {
      return error.errors[0].message
    }
    return 'Invalid value'
  }
}