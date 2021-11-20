import { useState } from 'react'

export default function useToken() {
  const getToken = () => {
    const tokenString = localStorage.getItem('token')
    const userToken = tokenString ? JSON.parse(tokenString) : ''
    return userToken?.token
  }

  const [token, setToken] = useState(getToken())

  const saveToken = (userToken = null) => {
    if (userToken) {
      localStorage.setItem('token', JSON.stringify(userToken))
      setToken(userToken.token)
    } else {
      localStorage.removeItem('token')
      setToken(null)
    }
  }

  return {
    setToken: saveToken,
    token,
  }
}
