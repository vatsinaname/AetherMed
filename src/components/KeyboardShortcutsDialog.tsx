import { useState } from 'react'
import { Command } from 'lucide-react'

export function KeyboardShortcutsDialog() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Command className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/30 z-50" onClick={() => setIsOpen(false)}>
          <div className="fixed inset-0 flex items-center justify-center p-4" onClick={e => e.stopPropagation()}>
            <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md">
              <h2 className="text-lg font-medium mb-4">Keyboard Shortcuts</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">⌘ + K</div>
                  <div className="text-gray-600">Search</div>
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">⌘ + /</div>
                  <div className="text-gray-600">Show shortcuts</div>
                  <div className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">⌘ + N</div>
                  <div className="text-gray-600">New consultation</div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="mt-6 w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}