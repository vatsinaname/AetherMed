import { ReactNode } from 'react'
import type { QuickAccessCardProps } from '../lib/types'

export function QuickAccessCard({ title, items, children }: QuickAccessCardProps & { children?: ReactNode }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">{title}</h3>
        {children ? children : (
          <div className="space-y-3">
            {items.map((item, i) => (
              <div key={i} className="flex justify-between items-center">
                <span className="text-sm text-gray-700">{item.label}</span>
                {item.value && <span className="font-medium">{item.value}</span>}
                {item.meta && (
                  <span className={`text-sm ${
                    item.meta.toLowerCase().includes('priority')
                      ? item.meta.toLowerCase().includes('high')
                        ? 'text-red-600'
                        : item.meta.toLowerCase().includes('medium')
                        ? 'text-amber-600'
                        : 'text-gray-500'
                      : 'text-gray-500'
                  }`}>
                    {item.meta}
                  </span>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Optional footer section for cards that need it */}
      {items.length > 3 && (
        <div className="px-6 py-3 bg-gray-50 border-t border-gray-200">
          <button className="text-sm text-primary-600 hover:text-primary-700">
            View all
          </button>
        </div>
      )}
    </div>
  )
}