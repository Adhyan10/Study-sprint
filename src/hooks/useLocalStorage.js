import { useCallback, useState } from 'react'

function readValue(key, initialValue) {
  try {
    const raw = window.localStorage.getItem(key)
    if (raw === null) {
      return initialValue
    }
    return JSON.parse(raw)
  } catch {
    return initialValue
  }
}

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => readValue(key, initialValue))

  const setValue = useCallback(
    (value) => {
      setStoredValue((prev) => {
        const valueToStore = value instanceof Function ? value(prev) : value
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
        return valueToStore
      })
    },
    [key],
  )

  const removeValue = useCallback(() => {
    window.localStorage.removeItem(key)
    setStoredValue(initialValue)
  }, [initialValue, key])

  return [storedValue, setValue, removeValue]
}
