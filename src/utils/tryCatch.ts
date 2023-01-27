import type { Request, Response, NextFunction } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
import { z } from 'zod'
import resJson from '../helper/resJson'

type Controller<TQuery> = (
  req: Request<{ id: string } & ParamsDictionary, TQuery, TQuery, TQuery>,
  res: Response,
  next: NextFunction
) => Promise<Response | void>

type TryCatchRes = <TQuery>(schema: z.Schema<TQuery>, controller: Controller<TQuery>) => Controller<TQuery>

const tryCatch: TryCatchRes = (schema, controller) => async (req, res, next) => {
  const queryParamsResult = schema.safeParse(req.body)
  if (!queryParamsResult.success) {
    const errors = queryParamsResult.error.issues.map(data => data)
    return resJson(res, 'Bad Request', queryParamsResult.error)
  }
  try {
    await controller(req, res, next)
  } catch (error) {
    next()
  }
}
export default tryCatch

/**  pada callback saat baris kode return resJson(res, 'OK', data) or return res.json(data) data dari instance sequelize
 maka data akan kehilangan type / autocomplete nya
 jika ingin mengedit hapus dulu return resJson(res, 'OK', data)*/
// const tryCatch =
//   <ReqBodyProps>(controller: (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next) => Promise<Res | void>) =>
//   async (req: Req<Infer<ReqBodyProps>>, res: Res, next: Next): Promise<Res | void> => {
//     try {
//       return await controller(req, res, next)
//     } catch (error) {
//       next(error)
//     }
//   }

function add(a: number, b: number, c: number): number
function add(a: number, b: number): any
function add(a: string, b: string): string

function add(a: any, b: any, c?: any): any {
  if (c) {
    return a + c
  }
  if (typeof a === 'string') {
    return `a is ${a}, b is ${b}`
  } else {
    return a + b
  }
}

const tambah = add('sdt', 'ye')
