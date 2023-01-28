import type { NextFunction, Request, Response } from 'express'
import type { z } from 'zod'
import resJson from '../helper/resJson'
interface ReqData {
  [key: string]: string | undefined
}
type HandlersQuery<TQuery> = (
  req: Request<{ id: string | undefined } & ReqData, ReqData | undefined, ReqData | undefined, TQuery>,
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
function tryCatch(schemaOrHandler: any, handler?: any) {
  return async function (req: any, res: any, next: any) {
    const callback = handler || schemaOrHandler
    if (handler) {
      const queryParamsResult = schemaOrHandler.safeParse({ ...req.query, ...req.body })
      if (!queryParamsResult.success) return resJson(res, 'Bad Request', queryParamsResult.error.issues)
    }
    try {
      await callback(req, res, next)
    } catch (error) {
      next(error)
    }
  }
}
export default tryCatch
