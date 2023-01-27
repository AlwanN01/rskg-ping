import 'dotenv/config'
import jwt from 'jsonwebtoken'

export const generateToken = (data: any): string => {
  const token = jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: '1h' })
  return token
}
export const generateRefreshToken = (data: any): string => {
  const token = jwt.sign(data, process.env.SECRET_TOKEN, { expiresIn: '1d' })
  return token
}

export const decodeToken = (token: string): Payload => {
  let resData: any
  jwt.verify(token, process.env.SECRET_TOKEN, (err, decode) => {
    if (err) resData = null
    else resData = decode
  })
  return resData
}
