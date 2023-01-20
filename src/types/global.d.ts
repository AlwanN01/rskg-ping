import type { Request, Response, NextFunction, RequestParamHandler } from 'express'
import type { InferAttributes } from 'sequelize'
import type { ParamsDictionary } from 'express-serve-static-core'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      readonly SECRET_TOKEN: string
      readonly REFRESH_TOKEN: string
      readonly PORT?: number
      readonly DB_HOST: string
      readonly DB_PORT: string
      readonly DB_USERNAME: string
      readonly DB_PASSWORD: string
      readonly DB_NAME: string
    }
  }

  interface Payload {
    email: string | null
    roleId: number | null
    active: boolean | null
  }
  namespace Express {
    interface Request {
      payload?: Payload
    }
  }
  type Infer<T> = InferAttributes<T>
  type Req<reqBodyProps = any> = Request<{ id: string } & ParamsDictionary, {}, reqBodyProps>
  type Res = Response
  type Next = NextFunction
  type RH = (req: Request, res: Response, next: NextFunction) => any //request handler
}

export default {}
