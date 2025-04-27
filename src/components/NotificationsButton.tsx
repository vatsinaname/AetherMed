import { useState } from 'react'
import { Bell } from 'lucide-react'

interface Notification {
  id: number
  text: string
}

export function NotificationsButton() {
  const [isOpen, setIsOpen] = useState(false)
  const [notifications] = useState<Notification[]>([])

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-500 hover:text-gray-600 hover:bg-gray-100 rounded-lg"
      >
        <Bell className="w-5 h-5" />
        {notifications.length > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            {notifications.length}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 z-50 mt-2 w-80 rounded-md bg-white p-4 shadow-lg ring-1 ring-black ring-opacity-5">
            {notifications.length === 0 ? (
              <p className="text-center text-gray-500">No new notifications</p>
            ) : (
              <ul className="divide-y divide-gray-100">
                {notifications.map((notification) => (
                  <li key={notification.id} className="py-2">
                    {notification.text}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </>
      )}
    </div>
  )
}