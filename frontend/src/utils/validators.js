export const validateAuthForm = ({ username, password }, mode = 'login') => {
  const errors = {}

  if (!username?.trim()) errors.username = mode === 'register' ? 'Username is required' : 'Enter username'

  if (!password?.trim()) errors.password = 'Password is required'
  else if (password.length < 6) errors.password = 'Password must be at least 6 characters'

  return errors
}
