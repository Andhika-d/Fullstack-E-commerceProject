"use client"

import { createContext, useState, useCallback } from "react"

export const ToastContext = createContext()

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const addToast = useCallback((message, type = "success") => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 3000)
  }, [])

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <div className="fixed bottom-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <Toast key={toast.id} type={toast.type} message={toast.message} />
        ))}
      </div>
    </ToastContext.Provider>
  )
}

// 🔥 Ini yang errornya nyari
export function Toast({ type, message }) {
  return (
    <div
      className={`px-4 py-2 rounded shadow text-white ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  )
}