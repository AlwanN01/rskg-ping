import bcrypt from 'bcrypt'

export const passHashing = async (password: string) => {
  const result = await bcrypt.hash(password, 10)
  return result
}

export const passCompare = async (password: string, passwordHash: string) => {
  const matched = await bcrypt.compare(password, passwordHash)
  return matched
}
