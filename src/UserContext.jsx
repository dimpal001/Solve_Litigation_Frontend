import { useState, createContext, useEffect } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = sessionStorage.getItem('user')
    return storedUser ? JSON.parse(storedUser) : null
  })

  useEffect(() => {
    const storedUser = JSON.parse(sessionStorage.getItem('user'))
    if (storedUser) {
      setUser(storedUser)
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
