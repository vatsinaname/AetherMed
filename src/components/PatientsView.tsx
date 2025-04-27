import { useState } from 'react'
import { Search, Plus, Filter, ChevronDown, UserPlus } from 'lucide-react'
import type { PatientData } from '../lib/types'

export function PatientsView() {
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'inactive'>('all')

  const patients: PatientData[] = [
    {
      id: 'P001',
      name: 'Jatin Sharma',
      status: 'active',
      lastVisit: '2025-04-25',
      age: 45,
      gender: 'Male',
      contactInfo: {
        phone: '+91-9876543210',
        email: 'jatin.sharma@email.com'
      },
      medicalHistory: {
        conditions: ['Hypertension', 'Type 2 Diabetes'],
        medications: ['Metformin', 'Lisinopril'],
        allergies: ['Penicillin']
      }
    },
    // Add more mock patients here
  ]

  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Patients</h1>
          <p className="mt-1 text-sm text-gray-500">Manage and view patient records</p>
        </div>
        <button className="inline-flex items-center justify-center px-4 py-2 bg-medical-600 text-white rounded-lg hover:bg-medical-700">
          <UserPlus className="w-4 h-4 mr-2" />
          Add New Patient
        </button>
      </header>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search patients by name, ID, or condition..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div className="flex gap-4">
            <div className="relative">
              <button className="px-4 py-2 border border-gray-300 rounded-lg inline-flex items-center text-sm text-gray-700 bg-white hover:bg-gray-50">
                <Filter className="w-4 h-4 mr-2" />
                Status: {filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)}
                <ChevronDown className="w-4 h-4 ml-2" />
              </button>
              {/* Status dropdown would go here */}
            </div>
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Visit
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Medical History
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {patients.map((patient) => (
                <tr key={patient.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{patient.name}</div>
                        <div className="text-sm text-gray-500">
                          {patient.id} • {patient.age} yrs • {patient.gender}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`
                      inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                      ${patient.status === 'active' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                      }
                    `}>
                      {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(patient.lastVisit).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {patient.medicalHistory.conditions.join(', ')}
                    </div>
                    {patient.medicalHistory.allergies.length > 0 && (
                      <div className="text-xs text-red-600 mt-1">
                        Allergies: {patient.medicalHistory.allergies.join(', ')}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button className="text-primary-600 hover:text-primary-900 mr-4">
                      View Details
                    </button>
                    <button className="text-medical-600 hover:text-medical-900">
                      Start Consultation
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-4 py-3 border-t border-gray-200 sm:px-6">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">10</span> of{' '}
              <span className="font-medium">20</span> results
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-3 py-1 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}