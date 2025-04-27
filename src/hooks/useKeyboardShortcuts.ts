import { useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

export interface ShortcutDefinition {
  key: string
  description: string
  action: () => void
}

export interface ConsultationShortcuts {
  save: string
  symptoms: string
  diagnosis: string
  tests: string
  treatment: string
}

export function useKeyboardShortcuts() {
  const navigate = useNavigate()

  const shortcuts: ShortcutDefinition[] = [
    {
      key: 'g d',
      description: 'Go to Dashboard',
      action: () => navigate('/dashboard')
    },
    {
      key: 'g p',
      description: 'Go to Patients',
      action: () => navigate('/patients')
    },
    {
      key: 'g c',
      description: 'Go to Consultations',
      action: () => navigate('/consultations')
    },
    {
      key: '?',
      description: 'Show Keyboard Shortcuts',
      action: () => {
        const event = new CustomEvent('toggle-shortcuts-dialog')
        window.dispatchEvent(event)
      }
    }
  ]

  const consultationShortcuts: ConsultationShortcuts = {
    save: '⌘ + S',
    symptoms: '⌘ + 1',
    diagnosis: '⌘ + 2',
    tests: '⌘ + 3',
    treatment: '⌘ + 4'
  }

  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    const activeElement = document.activeElement
    if (activeElement?.tagName === 'INPUT' || activeElement?.tagName === 'TEXTAREA') {
      return
    }

    shortcuts.forEach(shortcut => {
      const keys = shortcut.key.split(' ')
      const lastKey = keys[keys.length - 1]
      
      if (event.key === lastKey) {
        shortcut.action()
      }
    })
  }, [shortcuts, navigate])

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [handleKeyPress])

  return { shortcuts, consultationShortcuts }
}