import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'gabiroba:discoveries'

function readDiscoveries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || []
  } catch {
    return []
  }
}

export function useDiscoveries() {
  const [discoveries, setDiscoveries] = useState(() => readDiscoveries())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(discoveries))
  }, [discoveries])

  const discover = useCallback((slug) => {
    let added = false
    setDiscoveries((current) => {
      if (current.includes(slug)) return current
      added = true
      return [...current, slug]
    })
    return added
  }, [])

  const reset = useCallback(() => setDiscoveries([]), [])

  return { discoveries, discover, reset }
}
