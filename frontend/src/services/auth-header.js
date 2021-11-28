export default function authHeader() {
  const tokens = JSON.parse(localStorage.getItem('tokens'))

  if (tokens && tokens.access) {
    return { authorization: `Bearer ${tokens.access}` }
  }
  return {}
}
