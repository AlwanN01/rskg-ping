import type { NextFunction, Request, Response } from 'express'
import { z } from 'zod'
import resJson from '../helper/resJson'
interface ReqData {
  [key: string]: string | undefined
}
type HandlersQuery<TQuery> = (
  req: Request<{ id: string | undefined } & ReqData, ReqData | undefined, ReqData | undefined, TQuery & ReqData>,
  res: Response,
  next: NextFunction
) => Promise<Response | void>
type HandlersBody<TBody> = (
  req: Request<{ id: string | undefined } & ReqData, TBody, TBody, ReqData | undefined>,
  res: Response,
  next: NextFunction
) => Promise<Response | void>
/**  pada callback saat baris kode return resJson(res, 'OK', data) or return res.json(data) data dari instance sequelize
 maka data akan kehilangan type / autocomplete nya jika ingin mengedit hapus dulu return resJson(res, 'OK', data)*/
function tryCatch<TQuery>(handler: HandlersQuery<TQuery>): HandlersQuery<TQuery>
function tryCatch<TBody>(schema: z.Schema<TBody>, handler: HandlersBody<TBody>): HandlersBody<TBody>
function tryCatch<T>(schemaOrHandler: z.Schema<T> | HandlersQuery<T>, handler?: HandlersQuery<T> | HandlersBody<T>) {
  return async function (req: any, res: any, next: NextFunction) {
    const callback = handler || schemaOrHandler
    if (schemaOrHandler instanceof z.Schema) {
      const queryParamsResult = schemaOrHandler.safeParse({ ...req.query, ...req.body })
      if (!queryParamsResult.success) {
        const errors = {
          name: queryParamsResult.error.name,
          message: 'ValidationError',
          issues: queryParamsResult.error.issues
        }
        return resJson(res, 'Bad Request', errors)
      }
    }
    try {
      if (typeof callback == 'function') await callback(req, res, next)
    } catch (error) {
      next(error)
    }
    next()
  }
}
export default tryCatch
